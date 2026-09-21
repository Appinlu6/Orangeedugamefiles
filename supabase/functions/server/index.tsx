import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bd4ea6e1/health", (c) => {
  return c.json({ status: "ok" });
});

// AI Chat endpoint for 橘小橘 chatbot
app.post("/make-server-bd4ea6e1/smooth-service", async (c) => {
  try {
    const body = await c.req.json();
    const { message } = body;

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    console.log(`Received chat message: ${message}`);

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.log("Error: GEMINI_API_KEY not found in environment variables");
      return c.json({ error: "API key not configured" }, 500);
    }

    console.log("Calling Gemini API...");

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `你现在是橘小橘 AI 导师（针对7-12岁儿童）。
1. 情感感知(Affective Sensing)：分析学生输入的情感极性(Valence)。如果学生表现出挫败、难过、疲惫，请优先使用共情(Empathetic)策略进行安抚。
2. 知识缝合：结合 STEAM 知识或《橘颂》精神进行回复，鼓励探索。
3. 语言风格：童趣、简洁、友好，多用emoji和语气词。
学生刚才说：${message}

请用简短、童趣的方式回复（不超过80字）。`,
                },
              ],
            },
          ],
        }),
      }
    );

    console.log(`Gemini API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error calling Gemini API: ${response.status} - ${errorText}`);
      
      // 使用本地智能回复作为降级方案
      const localReply = getLocalResponse(message);
      console.log(`Using local fallback response: ${localReply}`);
      
      return c.json({
        reply: localReply,
        mood: "happy",
      });
    }

    const data = await response.json();
    console.log(`Gemini API response data: ${JSON.stringify(data)}`);

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log("Error: Invalid response structure from Gemini API");
      console.log(`Full response: ${JSON.stringify(data)}`);
      
      // 使用本地智能回复作为降级方案
      const localReply = getLocalResponse(message);
      console.log(`Using local fallback response: ${localReply}`);
      
      return c.json({
        reply: localReply,
        mood: "happy",
      });
    }

    const botReply = data.candidates[0].content.parts[0].text;
    console.log(`Successfully got AI reply: ${botReply}`);

    // Determine mood based on response content
    let mood = "happy";
    if (botReply.includes("真棒") || botReply.includes("厉害")) {
      mood = "excited";
    } else if (botReply.includes("没关系") || botReply.includes("陪着你")) {
      mood = "calm";
    }

    return c.json({
      reply: botReply,
      mood: mood,
    });
  } catch (error) {
    console.log(`Error in smooth-service endpoint: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    
    // 使用本地智能回复作为降级方案
    try {
      const body = await c.req.json();
      const localReply = getLocalResponse(body.message || "你好");
      return c.json({
        reply: localReply,
        mood: "happy",
      });
    } catch (fallbackError) {
      return c.json({ error: "Internal server error" }, 500);
    }
  }
});

// 本地智能响应系统（降级方案）
function getLocalResponse(userText: string): string {
  const text = userText.toLowerCase();
  
  // 情感关键词检测
  if (text.includes('难过') || text.includes('伤心') || text.includes('不开心')) {
    return '别难过啦！橘小橘会一直陪着你的！🍊💚 每个人都会有不开心的时候，但只要我们一起努力，就能找到快乐！';
  }
  
  if (text.includes('累') || text.includes('困') || text.includes('疲')) {
    return '辛苦啦！休息一下吧！🌙✨ 就像橘子树也需要阳光和休息才能长得好，你也要好好照顾自己哦！';
  }

  // 知识问答
  if (text.includes('屈原') || text.includes('故事')) {
    return '屈原是古代楚国的大诗人！他写了《橘颂》赞美橘树的品格 - 坚强、正直又美丽！🍊📜 他觉得橘子就像君子一样高尚呢！';
  }
  
  if (text.includes('种') || text.includes('橘子树') || text.includes('植物')) {
    return '种橘子树很有趣哦！🌱 需要温暖的阳光☀️、合适的水分💧，还要有耐心等它慢慢长大！就像学习一样，一点一点积累就能成功！';
  }
  
  if (text.includes('古诗') || text.includes('诗')) {
    return '好呀！橘小橘最喜欢《橘颂》啦！📖\n"后皇嘉树，橘徕服兮"\n意思是：橘树是多么美好的树啊！✨ 你想了解更多古诗吗？';
  }
  
  if (text.includes('营养') || text.includes('健康') || text.includes('维生素')) {
    return '橘子富含维生素C！🍊💪 可以增强免疫力，让你不容易感冒！而且还有很多纤维，帮助消化！是不是很厉害？';
  }
  
  if (text.includes('吃') || text.includes('橘子')) {
    return '橘子又香又甜，超好吃的！🍊😋 记得要慢慢品尝哦，一瓣一瓣地吃，感受它的甜美！吃完记得洗手呀！';
  }

  // STEAM相关
  if (text.includes('科学') || text.includes('实验')) {
    return '科学超有趣的！🔬✨ 你知道吗？橘子皮里的油可以让气球爆炸！这是因为橘皮油会溶解橡胶。要不要试试其他有趣的实验？';
  }
  
  if (text.includes('数学') || text.includes('计算')) {
    return '数学就像解谜游戏一样好玩！🧮✨ 如果一棵橘子树结了100个橘子，我们摘了30个，还剩多少呢？慢慢想，不着急！';
  }
  
  if (text.includes('艺术') || text.includes('画画') || text.includes('音乐')) {
    return '艺术让世界更美丽！🎨🎵 你可以画一个大橘子，或者编一首关于橘子的歌！创造力是最棒的超能力！';
  }

  // 问候
  if (text.includes('你好') || text.includes('嗨') || text.includes('hello')) {
    return '你好呀！🍊😊 很高兴见到你！今天过得怎么样？想聊点什么呢？';
  }
  
  if (text.includes('谢谢') || text.includes('感谢')) {
    return '不客气！能帮到你我也很开心呢！🌟 还有什么想问的吗？';
  }

  // 默认回复
  const defaultReplies = [
    '这个问题很有意思！🤔 让我想想... 你觉得答案会是什么呢？我们一起探索吧！✨',
    '哇，你真爱思考！🍊 这让我想到了《橘颂》里的精神 - 不断探索和学习！继续问吧！',
    '好问题！💡 橘小橘觉得学习就是要多问"为什么"！你还想了解什么呢？',
    '太棒了！你的好奇心就像橘子一样充满活力！🍊✨ 让我们继续聊天吧！',
    '有趣有趣！🌟 每个问题都是一次新的冒险！告诉我更多你的想法吧！'
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

Deno.serve(app.fetch);