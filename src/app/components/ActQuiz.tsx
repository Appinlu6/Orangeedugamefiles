import { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActQuizProps {
  actNumber: number; // 第几幕
  userGrade?: 'lower' | 'upper'; // 年级
  onClose: () => void;
  onComplete: (score: number) => void;
  onNavigate?: (page: string) => void; // 添加导航函数
}

// 拖拽项类型
interface DragItem {
  id: string;
  name: string;
}

// 目标区域组件
interface DropZoneProps {
  targetId: string;
  label: string;
  acceptedId: string;
  droppedItem: string | null;
  onDrop: (item: DragItem) => void;
}

const DropZone = ({ targetId, label, acceptedId, droppedItem, onDrop }: DropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'person',
    drop: (item: DragItem) => {
      if (item.id === acceptedId) {
        onDrop(item);
      }
    },
    canDrop: (item: DragItem) => item.id === acceptedId && !droppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative h-32 rounded-2xl border-4 border-dashed flex items-center justify-center transition-all ${
        droppedItem
          ? 'bg-green-100 border-green-400'
          : isOver && canDrop
          ? 'bg-amber-100 border-amber-400 scale-105'
          : 'bg-white border-amber-300'
      }`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{targetId === 'qi' ? '🏛️' : '🏰'}</div>
        <div className="text-lg font-bold text-[#603913]">{label}</div>
        {droppedItem && (
          <div className="mt-2 text-2xl">{droppedItem === 'yanzi' ? '👨‍💼' : '👑'}</div>
        )}
      </div>
    </div>
  );
};

// 橘树目标区域组件（第三幕专用）
interface TreeDropZoneProps {
  targetId: string;
  label: string;
  emoji: string;
  result: string;
  droppedItem: boolean;
  onDrop: () => void;
}

const TreeDropZone = ({ targetId, label, emoji, result, droppedItem, onDrop }: TreeDropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'tree',
    drop: () => {
      if (!droppedItem) {
        onDrop();
      }
    },
    canDrop: () => !droppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative h-40 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center transition-all ${
        droppedItem
          ? 'bg-green-100 border-green-400'
          : isOver && canDrop
          ? 'bg-amber-100 border-amber-400 scale-105'
          : 'bg-white border-amber-300'
      }`}
    >
      <div className="text-center">
        <div className="text-5xl mb-2">{emoji}</div>
        <div className="text-xl font-bold text-[#603913] mb-1">{label}</div>
        {droppedItem && (
          <>
            <div className="text-3xl my-2">🌳</div>
            <div className="text-sm font-bold" style={{ color: targetId === 'south' ? '#22c55e' : '#ef4444' }}>
              {result}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 可拖拽人物组件
interface DraggablePersonProps {
  id: string;
  name: string;
  emoji: string;
  isPlaced: boolean;
}

const DraggablePerson = ({ id, name, emoji, isPlaced }: DraggablePersonProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'person',
    item: { id, name },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isPlaced) return null;

  return (
    <div
      ref={drag}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-3 border-[#603913] bg-[#FFF5E6] cursor-move transition-all hover:scale-110 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-lg font-bold text-[#603913]">{name}</span>
    </div>
  );
};

// 可拖拽橘树组件
interface DraggableTreeProps {
  id: string;
  name: string;
  emoji: string;
  isPlaced: boolean;
}

const DraggableTree = ({ id, name, emoji, isPlaced }: DraggableTreeProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'tree',
    item: { id, name },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isPlaced) return null;

  return (
    <div
      ref={drag}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-3 border-[#603913] bg-[#FFF5E6] cursor-move transition-all hover:scale-110 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-lg font-bold text-[#603913]">{name}</span>
    </div>
  );
};

// 第一幕的题目数据
const ACT1_QUESTIONS = [
  {
    type: 'single',
    question: '🔬 S (科學) - 晏子的身高很矮，但齊王依然派他去楚國。這告訴我們一個什麼科學道理？',
    options: [
      { label: 'A. 個子矮的人跑得比較快 🏃‍♂️', value: 'run_fast', isCorrect: false },
      { label: 'B. 腦袋裡的「智慧」，和身高的「尺寸」是沒有關係的！ 🧠', value: 'wisdom', isCorrect: true },
      { label: 'C. 矮小的人力氣最大 💪', value: 'strong', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 在沒有手機的古代，楚王早就知道晏子要來了。古人通常用什麼「工具」傳遞遠方的消息？',
    options: [
      { label: 'A. 用電視廣播 📺', value: 'tv', isCorrect: false },
      { label: 'B. 派快馬和馬車送信 🐎', value: 'horse', isCorrect: true },
      { label: 'C. 寄電子郵件 (Email) 📧', value: 'email', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 楚王在晏子還沒到時，就「早早密謀」想欺負他。就像搭樂高積木一樣，這是在做什麼？',
    options: [
      { label: 'A. 預先設計一個壞「計畫」 📝', value: 'plan', isCorrect: true },
      { label: 'B. 準備去睡覺 🛏️', value: 'sleep', isCorrect: false },
      { label: 'C. 在做大掃除 🧹', value: 'clean', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 故事說晏子「口才出眾」。如果晏子來到我們學校，他最厲害的科目應該是什麼？',
    options: [
      { label: 'A. 體育跑步 👟', value: 'pe', isCorrect: false },
      { label: 'B. 畫畫塗鴉 🖍️', value: 'art', isCorrect: false },
      { label: 'C. 講故事和朗誦（語言藝術） 🗣️', value: 'language', isCorrect: true },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 楚國很大（國家強），晏子很矮（個子小）。這場比試，是不是「大的」一定會贏「小的」？',
    options: [
      { label: 'A. 對，大的絕對會贏。', value: 'yes', isCorrect: false },
      { label: 'B. 不一定，小小的晏子也能用智慧打敗強大的楚王！ ⚖️', value: 'no', isCorrect: true },
      { label: 'C. 他們大小完全一樣。', value: 'same', isCorrect: false },
    ],
  },
];

// 第二幕的题目数据
const ACT2_QUESTIONS = [
  {
    type: 'single',
    question: '🔬 S (科學) - 被綁上來的齊國人「面色蒼白，全身發抖」。我們的身體遇到什麼情況時會這樣？',
    options: [
      { label: 'A. 吃了很多美味的雪糕 🍦', value: 'icecream', isCorrect: false },
      { label: 'B. 感到非常害怕和緊張 😨', value: 'afraid', isCorrect: true },
      { label: 'C. 在太陽下曬得太熱了 ☀️', value: 'hot', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 楚國士兵讓犯人無法亂動，他們使用了什麼「古代技術」？',
    options: [
      { label: 'A. 用膠水黏住腳 🧴', value: 'glue', isCorrect: false },
      { label: 'B. 用繩子把他緊緊綁住 🪢', value: 'rope', isCorrect: true },
      { label: 'C. 用隱形斗篷蓋住他 👻', value: 'cloak', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 楚王高高坐在大殿上，旁邊站滿了大臣看笑話。這個大殿的「設計」是為了讓晏子覺得怎樣？',
    options: [
      { label: 'A. 覺得很舒服、想睡覺 💤', value: 'comfortable', isCorrect: false },
      { label: 'B. 覺得非常有壓力、很害怕 🏢', value: 'pressure', isCorrect: true },
      { label: 'C. 覺得肚子很餓 🍔', value: 'hungry', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 如果請你畫下此時楚王的臉，你應該給他畫什麼表情？',
    options: [
      { label: 'A. 流眼淚的傷心臉 😭', value: 'sad', isCorrect: false },
      { label: 'B. 偷笑、得意洋洋的壞笑臉 😏', value: 'smirk', isCorrect: true },
      { label: 'C. 溫柔微笑的臉 😊', value: 'smile', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 楚王抓到「1個」齊國小偷，就說「全部」齊國人都是小偷。這種算法對嗎？',
    options: [
      { label: 'A. 不對！1個人犯錯，不代表全部人都是壞人。 🔢', value: 'wrong', isCorrect: true },
      { label: 'B. 完全正確。', value: 'correct', isCorrect: false },
      { label: 'C. 晏子也會跟著變壞。', value: 'yanzi_bad', isCorrect: false },
    ],
  },
];

// 第三幕的题目数据
const ACT3_QUESTIONS = [
  {
    type: 'single',
    question: '🔬 S (科學) - 為什麼溫暖的南方長出甜「橘子」🍊，到了寒冷北方就變成苦「枳子」🍏？',
    options: [
      { label: 'A. 因為水果自己變心了 💔', value: 'heartbreak', isCorrect: false },
      { label: 'B. 因為「溫度」和「泥土」不同，改變了植物的生長！ 🌡️', value: 'temperature', isCorrect: true },
      { label: 'C. 因為有魔法師把果子變酸了 🧙‍♂️', value: 'magic', isCorrect: false },
    ],
  },
  {
    type: 'drag-tree',
    question: '把橘树种在：',
  },
  {
    type: 'single',
    question: '💻 T (科技) - 把一棵橘子樹連根挖起來，搬到很遠的北方重新種下，這在種植技術裡叫什麼？',
    options: [
      { label: 'A. 拔草 🌿', value: 'weeding', isCorrect: false },
      { label: 'B. 澆水 🚿', value: 'watering', isCorrect: false },
      { label: 'C. 移植（搬家） 🌳', value: 'transplant', isCorrect: true },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 晏子面對楚王的欺負，他像工程師解決難題一樣，用了什麼「秘密武器」？',
    options: [
      { label: 'A. 大聲哭鬧，找人幫忙 😭', value: 'cry', isCorrect: false },
      { label: 'B. 講了一個橘子樹的道理，聰明地反擊對方 🧠', value: 'reasoning', isCorrect: true },
      { label: 'C. 拿起椅子亂砸 🪑', value: 'violence', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 晏子生氣了嗎？旁白說他「不卑不亢」，表示他說話的態度是怎樣的？',
    options: [
      { label: 'A. 很生氣，大吼大叫 🤬', value: 'angry', isCorrect: false },
      { label: 'B. 冷靜、有禮貌但很堅定 😌', value: 'calm', isCorrect: true },
      { label: 'C. 嚇得躲在桌子底下 🫣', value: 'scared', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 南方和北方的距離非常遙遠，這告訴我們距離的改變，會讓天氣和環境：',
    options: [
      { label: 'A. 完全沒有改變 ➡️', value: 'nochange', isCorrect: false },
      { label: 'B. 產生巨大的差別（冷和熱） 🌍', value: 'difference', isCorrect: true },
      { label: 'C. 距離會越變越短 ➖', value: 'shorter', isCorrect: false },
    ],
  },
];

// 第四幕的题目数据
const ACT4_QUESTIONS = [
  {
    type: 'single',
    question: '🔬 S (科學) - 楚王被晏子打敗後，「臉上一陣紅一陣白」。這是因為楚王感到「慚愧」時，臉上的什麼產生了變化？',
    options: [
      { label: 'A. 長出了青春痘 🔴', value: 'acne', isCorrect: false },
      { label: 'B. 臉部皮膚下的血管因為情緒而擴張了 🩸', value: 'blood', isCorrect: true },
      { label: 'C. 被人塗了水彩顏料 🎨', value: 'paint', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 楚王叫人解開齊國人的繩子。這個動作把犯人身上的「什麼」解除了？',
    options: [
      { label: 'A. 衣服的鈕扣 👕', value: 'button', isCorrect: false },
      { label: 'B. 束縛他身體的裝置（解鎖） 🔓', value: 'restraint', isCorrect: true },
      { label: 'C. 頭髮的髮夾 🎀', value: 'hairpin', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 原本兩國要吵架了，晏子用他的智慧，把「危險的懸崖」變成了一座什麼？',
    options: [
      { label: 'A. 高高的鐵塔 🗼', value: 'tower', isCorrect: false },
      { label: 'B. 溝通與和平的橋樑 🌉', value: 'bridge', isCorrect: true },
      { label: 'C. 深深的坑洞 🕳️', value: 'hole', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 這個精彩的故事流傳下來，變成了四個字的美麗詞語，叫什麼？',
    options: [
      { label: 'A. 對牛彈琴 🐮', value: 'idiom1', isCorrect: false },
      { label: 'B. 南橘北枳 🍊', value: 'nanjubeizhi', isCorrect: true },
      { label: 'C. 守株待兔 🐇', value: 'idiom2', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 遊戲結束！楚王本來想拿100分，最後誰才是拿滿分、贏得大家尊重的超級贏家？',
    options: [
      { label: 'A. 壞心眼的楚王 👿', value: 'king', isCorrect: false },
      { label: 'B. 被綁的犯人 🥺', value: 'prisoner', isCorrect: false },
      { label: 'C. 聰明有禮貌的晏子 🏆', value: 'yanzi', isCorrect: true },
    ],
  },
];

// ============ 高年级题目 ============

// 第一幕的高年级题目数据
const ACT1_QUESTIONS_UPPER = [
  {
    type: 'single',
    question: '🔬 S (科學) - 中國氣候與地理特徵 - 從常識科的地理知識來看，晏子從北方的「齊國」去到南方的「楚國」。這段旅途中，他會感受到「氣候」發生了什麼明顯改變？',
    options: [
      { label: 'A. 從炎熱乾燥，變成經常下雪的嚴寒天氣', value: 'cold', isCorrect: false },
      { label: 'B. 緯度越來越低，天氣變得比較溫暖和濕潤 🌡️', value: 'warmer', isCorrect: true },
      { label: 'C. 氣溫沒有任何變化，因為都在同一個地球上', value: 'nochange', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 古代的通訊技術 - 在沒有互聯網的春秋時代，楚王居然提前掌握了「晏子身材矮小」的資訊。這依賴了古代的什麼「信息傳遞網絡」？',
    options: [
      { label: 'A. 依靠飛鴿傳書或快馬驛站傳遞軍事與外交情報 🐎', value: 'messenger', isCorrect: true },
      { label: 'B. 在城牆上安裝了隱蔽的閉路電視（CCTV）', value: 'cctv', isCorrect: false },
      { label: 'C. 楚王使用了穿越時空的望遠鏡', value: 'telescope', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 解難與計劃設計 - 為了羞辱晏子，「早早與近臣密謀」。如果把這當作一個工程設計專案，楚王正在進行設計循環（Design Cycle）中的哪一個重要步驟？',
    options: [
      { label: 'A. 製作產品的最後測試', value: 'testing', isCorrect: false },
      { label: 'B. 在行動前進行「計畫與草圖設計」📝', value: 'planning', isCorrect: true },
      { label: 'C. 分發工程的結算薪水', value: 'payment', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 人物性格的反差設定 - 劇本介紹晏子時，強調他「身材矮小」卻「口才出眾」。作者運用這種強烈的「對比」寫作手法，主要是想向讀者表達什麼？',
    options: [
      { label: 'A. 晏子的外貌非常引人注目', value: 'appearance', isCorrect: false },
      { label: 'B. 人的智慧與才華，遠比外表的高低美醜更強大、更重要 📖', value: 'wisdom', isCorrect: true },
      { label: 'C. 古代的人通常都不太注重說話技巧', value: 'speaking', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 變量之間的關聯（正比與反比） - 楚王以為自己個子高、力氣大，就一定比晏子聰明。從數學的變量關係來看，「人的身高」和「大腦的智慧」，兩者存在什麼關係？',
    options: [
      { label: 'A. 正比例關係（身高越高，必定越聰明）', value: 'proportional', isCorrect: false },
      { label: 'B. 反比例關係（身高越矮，必定越聰明）', value: 'inverse', isCorrect: false },
      { label: 'C. 互相獨立的變量（兩者之間沒有必然的數學計算關係） 📊', value: 'independent', isCorrect: true },
    ],
  },
];

// 第二幕的高年级题目数据
const ACT2_QUESTIONS_UPPER = [
  {
    type: 'single',
    question: '🔬 S (科學) - 觀察人體的生理反應 - 那名被押上來的齊國人「面色蒼白、渾身顫抖、大氣都不敢喘」。這在科學上，是人體感受到極大危險時，身體機能產生的什麼本能反應？',
    options: [
      { label: 'A. 消化系統加速，準備吃下大量食物', value: 'digestive', isCorrect: false },
      { label: 'B. 血液流向四肢並加快心跳，準備「戰鬥或逃跑」（應激反應） 🫀', value: 'fight_or_flight', isCorrect: true },
      { label: 'C. 大腦正在進入深層睡眠狀態', value: 'sleep', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 古代建築學與階級威懾 - 楚王「高高端坐於大殿之上」，而晏子和齊國人則在下方。這種殿堂設計在古代建築技術中，除了看得清楚，還有一種什麼特殊的心理作用？',
    options: [
      { label: 'A. 方便空氣流通', value: 'ventilation', isCorrect: false },
      { label: 'B. 為了在視覺上製造「居高臨下」的威懾感，展現王權 👑', value: 'dominance', isCorrect: true },
      { label: 'C. 單純因為椅子太高了', value: 'chair', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 社會規則的約束結構 - 犯人的雙手被士兵用粗繩捆綁（物理工程的約束）。但在一個良好的社會結構中，真正阻止人們不去偷竊的「無形結構」是什麼？',
    options: [
      { label: 'A. 大街上設置的陷阱', value: 'trap', isCorrect: false },
      { label: 'B. 人們內心的道德教育以及國家的法律制度 🏛️', value: 'moral', isCorrect: true },
      { label: 'C. 商店老闆的力氣大小', value: 'strength', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 場景氣氛的營造 - 旁白特別描寫楚國大臣們「交頭接耳，滿是期待，等著看晏子出醜」。如果你在寫作文，加上這句旁白可以發揮什麼寫作功用？',
    options: [
      { label: 'A. 拖延故事的時間，讓文章字數變多', value: 'wordcount', isCorrect: false },
      { label: 'B. 烘托出晏子身處敵營「孤軍奮戰」的緊張氣氛，增加戲劇感 🎭', value: 'atmosphere', isCorrect: true },
      { label: 'C. 告訴讀者大臣們其實很喜歡晏子', value: 'like', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 數據統計的謬誤 - 楚王抓到「1個」齊國小偷，就大聲說「你們齊國人都是善於偷盜的」。從常識科的統計概念來看，楚王犯了什麼錯？',
    options: [
      { label: 'A. 用極少的樣本數（N=1）去概括整體的百分比，是以偏概全 📉', value: 'sample_error', isCorrect: true },
      { label: 'B. 他算錯了人數，其實抓了兩個', value: 'counting', isCorrect: false },
      { label: 'C. 楚王使用了完美的數據圖表分析', value: 'perfect', isCorrect: false },
    ],
  },
];

// 第三幕的高年级题目数据
const ACT3_QUESTIONS_UPPER = [
  {
    type: 'single',
    question: '🔬 S (科學) - 植物生長的必備條件 - 常識科教過我們植物生長的條件。橘樹在南方長出甜美的橘子，到了北方變成苦澀的枳樹，這證明了哪種科學事實？',
    options: [
      { label: 'A. 植物在生長時，如果改變了氣候和土壤（水土），果實特徵也會改變 🌱', value: 'environment', isCorrect: true },
      { label: 'B. 植物不需要陽光和水分，只靠運氣生長', value: 'luck', isCorrect: false },
      { label: 'C. 植物會因為感到寂寞而結出苦的果子', value: 'lonely', isCorrect: false },
    ],
  },
  {
    type: 'drag-tree',
    question: '把橘树种在：',
  },
  {
    type: 'single',
    question: '💻 T (科技) - 農業與跨地域種植技術 - 想要把溫暖地區的「橘樹」成功移植到寒冷的地區生存並結出甜果，現代農業科學技術可能會怎麼做？',
    options: [
      { label: 'A. 用油漆把苦澀的果子塗成橘色', value: 'paint', isCorrect: false },
      { label: 'B. 建造溫室（控制溫度與濕度），或者進行抗寒品種的雜交試驗 💡', value: 'greenhouse', isCorrect: true },
      { label: 'C. 在橘樹旁邊大聲播放熱情的音樂', value: 'music', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 解難模型（公平測試 / Fair Test） - 在科學的「公平測試」中，只可以改變一個條件。晏子的論點中：橘子的品種（種子）是「不變的」，那改變果實味道的「測試變數（改變條件）」是什麼？',
    options: [
      { label: 'A. 水果的顏色', value: 'color', isCorrect: false },
      { label: 'B. 淮南與淮北的不同生活環境與氣候 🌍', value: 'location', isCorrect: true },
      { label: 'C. 摘橘子的時間', value: 'time', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 修辭手法：比喻的應用 - 晏子不直接反駁，而是用「橘變枳」的自然規律來講道理。這在中文裡稱為「比喻/借物喻理」。這樣說話的最大藝術魅力在哪裡？',
    options: [
      { label: 'A. 能把話講得很有深意，讓對方無可反駁，既有力量又保全面子 📜', value: 'metaphor', isCorrect: true },
      { label: 'B. 讓楚王肚子餓，想吃水果', value: 'hungry', isCorrect: false },
      { label: 'C. 用複雜的文言文把大家弄糊塗', value: 'confuse', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 邏輯方程式的轉換 - 晏子的邏輯可以寫成一個數學因果式：『橘子+壞環境=壞果子』。因此他推導出：『好好的齊國人 + ? = 變成偷盜犯』。橫線處應該填什麼？',
    options: [
      { label: 'A. 肚子餓的狀態', value: 'hunger', isCorrect: false },
      { label: 'B. 楚國不良的社會風氣與環境 🧮', value: 'bad_environment', isCorrect: true },
      { label: 'C. 數學算錯了的結果', value: 'math_error', isCorrect: false },
    ],
  },
];

// 第四幕的高年级题目数据
const ACT4_QUESTIONS_UPPER = [
  {
    type: 'single',
    question: '🔬 S (科學) - 臉部血管擴張現象 - 楚王被晏子打敗後，「臉上陣紅陣白，尷尬不已」。這是因為人類在經歷極度害羞或生氣的情緒時，臉部皮膚底下的什麼組織發生了擴張？',
    options: [
      { label: 'A. 微血管（血液流量增加） 🩸', value: 'blood_vessel', isCorrect: true },
      { label: 'B. 淋巴腺', value: 'lymph', isCorrect: false },
      { label: 'C. 汗腺（會分泌水分）', value: 'sweat', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '💻 T (科技) - 歷史的保存技術 - 「南橘北枳」的故事流傳千古。在發明紙張和互聯網之前，春秋時期的人最可能是用什麼技術把這段精彩的外交歷史記錄下來的？',
    options: [
      { label: 'A. 用打字機刻在鋼板上', value: 'typewriter', isCorrect: false },
      { label: 'B. 用毛筆刻寫在竹簡或木牘上，再串聯成書 ✍️', value: 'bamboo', isCorrect: true },
      { label: 'C. 錄製成影音檔案存在雲端', value: 'cloud', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '⚙️ E (工程) - 反作用力與結果反彈 - 楚王說自己「搬起石頭砸了自己的腳」，在工程與物理的常識中，原本施加給對手的攻擊結構因為設計錯誤，最終產生的「反作用力」傷害了誰？',
    options: [
      { label: 'A. 傷害了晏子和齊國人', value: 'yanzi', isCorrect: false },
      { label: 'B. 原路返回，嚴重傷害了楚王自己與楚國的尊嚴 🧱', value: 'king', isCorrect: true },
      { label: 'C. 被旁邊的大臣接住了', value: 'minister', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🎨 A (藝術) - 成語的文化濃縮 - 一段長達幾千字的外交故事，最後被總結為「南橘北枳」四個字的成語。這體現了中國文化傳承的什麼特點？',
    options: [
      { label: 'A. 文字十分精煉，四個字就能包含一個深刻的歷史教訓與人生智慧 🖋️', value: 'concise', isCorrect: true },
      { label: 'B. 為了方便抄寫罰抄', value: 'copy', isCorrect: false },
      { label: 'C. 其實只是隨便拼湊的四個字', value: 'random', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '🔢 M (數學) - 分數的正負數概念 - 如果設定一場外交遊戲，受到尊敬得「正分 (+)」，被羞辱得「負分 (-)」。楚王一開始企圖讓晏子得 -100分，但在晏子的智慧反擊下，最終結算時，誰得了真正的正分大獎？',
    options: [
      { label: 'A. 雙方都扣到了負分', value: 'both_negative', isCorrect: false },
      { label: 'B. 晏子贏得了最高的正分榮譽（+100），楚王輸掉了自己的尊嚴 🏆', value: 'yanzi_win', isCorrect: true },
      { label: 'C. 沒有任何人得分，平手收場', value: 'tie', isCorrect: false },
    ],
  },
];

export function ActQuiz({ actNumber, userGrade, onClose, onComplete, onNavigate }: ActQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });
  const [showCompletionModal, setShowCompletionModal] = useState(false); // 完成提示框状态

  // 拖拽题状态
  const [dragDrops, setDragDrops] = useState<{ qi: string | null; chu: string | null }>({
    qi: null,
    chu: null,
  });

  const [treeDrops, setTreeDrops] = useState<{ north: boolean; south: boolean }>({
    north: false,
    south: false,
  });

  const questionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // 根据幕数选择题目集
  const questions = actNumber === 1 
    ? (userGrade === 'upper' ? ACT1_QUESTIONS_UPPER : ACT1_QUESTIONS) 
    : actNumber === 2 
    ? (userGrade === 'upper' ? ACT2_QUESTIONS_UPPER : ACT2_QUESTIONS) 
    : actNumber === 3 
    ? (userGrade === 'upper' ? ACT3_QUESTIONS_UPPER : ACT3_QUESTIONS) 
    : (userGrade === 'upper' ? ACT4_QUESTIONS_UPPER : ACT4_QUESTIONS);
  
  // 获取翻译后的题目数据
  const getTranslatedQuestion = (qIndex: number) => {
    const q = questions[qIndex];
    const prefix = userGrade === 'upper' ? 'quiz.upper' : 'quiz';
    const questionKey = `${prefix}.act${actNumber}.q${qIndex + 1}.question`;
    
    return {
      ...q,
      question: t(questionKey),
      options: q.options?.map((opt, optIndex) => ({
        ...opt,
        label: t(`${prefix}.act${actNumber}.q${qIndex + 1}.option${String.fromCharCode(65 + optIndex)}`),
      })),
    };
  };
  
  const currentQ = getTranslatedQuestion(currentQuestion);

  // 处理单选答案
  const handleSingleChoice = (value: string) => {
    if (showResult) return;
    setSelectedAnswer(value);
  };

  // 处理多选答案
  const handleMultipleChoice = (value: string) => {
    if (showResult) return;
    setSelectedMultiple((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 处理拖拽放置
  const handleDrop = (targetId: 'qi' | 'chu', item: DragItem) => {
    setDragDrops((prev) => ({
      ...prev,
      [targetId]: item.id,
    }));
  };

  // 处理橘树拖拽放置
  const handleTreeDrop = (targetId: 'north' | 'south') => {
    setTreeDrops((prev) => ({
      ...prev,
      [targetId]: true,
    }));
  };

  // 提交答案
  const handleSubmit = () => {
    const question = questions[currentQuestion];
    let correct = false;

    // 第5题（索引4）无论选什么都算正确
    if (currentQuestion === 4) {
      correct = true;
    } else if (question.type === 'single') {
      const correctOption = question.options?.find((opt) => opt.isCorrect);
      correct = selectedAnswer === correctOption?.value;
    } else if (question.type === 'multiple') {
      const correctOptions = question.options?.filter((opt) => opt.isCorrect).map((opt) => opt.value) || [];
      correct = correctOptions.length === selectedMultiple.length && 
                correctOptions.every((val) => selectedMultiple.includes(val));
    } else if (question.type === 'drag') {
      correct = dragDrops.qi === 'yanzi' && dragDrops.chu === 'chuwang';
    } else if (question.type === 'drag-tree') {
      // 第三幕拖拽题：两个区域都要拖拽才算完成
      correct = treeDrops.north && treeDrops.south;
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // 触发星星动画
      if (questionRef.current) {
        const rect = questionRef.current.getBoundingClientRect();
        setStarPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
      setShowStarAnimation(true);
      
      // 延迟增加分数，让动画先播放
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setShowStarAnimation(false);
      }, 800);
    }
  };

  // 下一题
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setSelectedMultiple([]);
      setDragDrops({ qi: null, chu: null });
      setTreeDrops({ north: false, south: false });
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // 完成所有题目 - 如果是第四幕，显示完成提示框
      const finalScore = score + (isCorrect ? 1 : 0);
      if (actNumber === 4) {
        setShowCompletionModal(true);
      } else {
        onComplete(finalScore);
      }
    }
  };

  const canSubmit = 
    (currentQ.type === 'single' && selectedAnswer) ||
    (currentQ.type === 'multiple' && selectedMultiple.length > 0) ||
    (currentQ.type === 'drag' && dragDrops.qi && dragDrops.chu) ||
    (currentQ.type === 'drag-tree' && treeDrops.north && treeDrops.south);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* 弹窗内容 */}
        <div 
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border-4 border-[#603913] shadow-2xl"
          style={{ backgroundColor: 'rgba(255, 245, 230, 0.98)' }}
        >
          {/* 头部 */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b-4 border-[#603913]"
            style={{ backgroundColor: 'rgba(255, 245, 230, 0.98)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <h2 className="text-2xl font-bold text-[#603913]">
                第{[t('quiz.act_one'), t('quiz.act_two'), t('quiz.act_three'), t('quiz.act_four'), t('quiz.act_five')][actNumber - 1]}幕{t('quiz.single_choice').includes('单选') ? '测试' : '測試'}
              </h2>
            </div>
            
            {/* 星星计数器 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border-3 border-amber-400">
                <span className="text-2xl">🌟</span>
                <span className="text-xl font-bold text-[#F26522]">{score}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-100 rounded-full transition-colors"
              >
                <X className="size-6 text-[#603913]" />
              </button>
            </div>
          </div>

          {/* 题目内容 */}
          <div ref={questionRef} className="p-8 space-y-6">
            {/* 题目标题 */}
            <div className="space-y-2">
              <div className="text-xl font-bold text-[#F26522]">
                {currentQuestion + 1}️⃣ {
                  currentQ.type === 'single' ? t('quiz.single_choice') : 
                  currentQ.type === 'drag' ? t('quiz.drag_drop') : 
                  t('quiz.multiple_choice')
                }
              </div>
              <div className="text-2xl font-bold text-[#603913]">
                {currentQ.question}
              </div>
            </div>

            {/* 题目选项 */}
            <div className="space-y-4">
              {currentQ.type === 'single' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice(option.value)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all ${
                        selectedAnswer === option.value
                          ? 'bg-amber-200 border-[#F26522] scale-105'
                          : 'bg-white border-[#603913] hover:bg-amber-50'
                      } ${
                        showResult && selectedAnswer === option.value
                          ? 'bg-green-100 border-green-500'
                          : ''
                      }`}
                    >
                      <span className="text-lg font-bold text-[#603913]">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === 'multiple' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleMultipleChoice(option.value)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all ${
                        selectedMultiple.includes(option.value)
                          ? 'bg-amber-200 border-[#F26522] scale-105'
                          : 'bg-white border-[#603913] hover:bg-amber-50'
                      } ${
                        showResult && selectedMultiple.includes(option.value)
                          ? 'bg-green-100 border-green-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selectedMultiple.includes(option.value)
                            ? 'bg-[#F26522] border-[#F26522]'
                            : 'bg-white border-[#603913]'
                        }`}>
                          {selectedMultiple.includes(option.value) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-[#603913]">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === 'drag' && (
                <div className="space-y-6">
                  {/* 拖拽源 */}
                  <div className="flex items-center justify-center gap-4 p-6 bg-amber-50 rounded-2xl border-3 border-[#603913]">
                    <DraggablePerson
                      id="yanzi"
                      name={t('quiz.character.yanzi')}
                      emoji="👨‍💼"
                      isPlaced={dragDrops.qi === 'yanzi' || dragDrops.chu === 'yanzi'}
                    />
                    <DraggablePerson
                      id="chuwang"
                      name={t('quiz.character.king')}
                      emoji="👑"
                      isPlaced={dragDrops.qi === 'chuwang' || dragDrops.chu === 'chuwang'}
                    />
                  </div>

                  {/* 放置目标 */}
                  <div className="grid grid-cols-2 gap-4">
                    <DropZone
                      targetId="qi"
                      label={t('quiz.location.qi')}
                      acceptedId="yanzi"
                      droppedItem={dragDrops.qi}
                      onDrop={(item) => handleDrop('qi', item)}
                    />
                    <DropZone
                      targetId="chu"
                      label={t('quiz.location.chu')}
                      acceptedId="chuwang"
                      droppedItem={dragDrops.chu}
                      onDrop={(item) => handleDrop('chu', item)}
                    />
                  </div>
                </div>
              )}

              {currentQ.type === 'drag-tree' && (
                <div className="space-y-6">
                  {/* 拖拽源 */}
                  <div className="flex items-center justify-center gap-4 p-6 bg-amber-50 rounded-2xl border-3 border-[#603913]">
                    <DraggableTree
                      id="tree"
                      name={t('quiz.character.tree')}
                      emoji="🌳"
                      isPlaced={false}
                    />
                  </div>

                  {/* 放置目标 */}
                  <div className="grid grid-cols-2 gap-4">
                    <TreeDropZone
                      targetId="north"
                      label={t('quiz.location.north')}
                      emoji="🌍"
                      result={t('quiz.result.north')}
                      droppedItem={treeDrops.north}
                      onDrop={() => handleTreeDrop('north')}
                    />
                    <TreeDropZone
                      targetId="south"
                      label={t('quiz.location.south')}
                      emoji="🌍"
                      result={t('quiz.result.south')}
                      droppedItem={treeDrops.south}
                      onDrop={() => handleTreeDrop('south')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 结果反馈 */}
            {showResult && (
              <div className={`p-4 rounded-2xl border-3 ${
                isCorrect
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                  <span className="text-lg font-bold" style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}>
                    {isCorrect ? t('quiz.correct_answer') : t('quiz.wrong_answer')}
                  </span>
                </div>
              </div>
            )}

            {/* 底部按钮 */}
            <div className="relative flex justify-center gap-4 pt-4">
              {!showResult ? (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`px-8 py-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                      canSubmit
                        ? 'bg-[#F26522] border-[#603913] text-white hover:scale-105 active:scale-95'
                        : 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {t('quiz.submit_answer')}
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 bottom-0 text-xs text-gray-400 hover:text-gray-500 transition-colors underline"
                  >
                    {t('quiz.skip_question')}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 rounded-2xl border-3 bg-[#F26522] border-[#603913] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {currentQuestion < questions.length - 1 ? t('quiz.next_question') : t('quiz.complete_test')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 星星飞入动画 */}
        <AnimatePresence>
          {showStarAnimation && (
            <motion.div
              initial={{ 
                x: starPosition.x, 
                y: starPosition.y, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: window.innerWidth - 100, 
                y: 80, 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 1] 
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed pointer-events-none z-[100]"
              style={{ fontSize: '48px' }}
            >
              🌟
            </motion.div>
          )}
        </AnimatePresence>

        {/* 完成游戏提示框 */}
        {showCompletionModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-orange-50 to-amber-100 rounded-3xl border-4 border-orange-500 shadow-2xl p-8"
            >
              {/* 恭喜图标 */}
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-3xl font-black text-orange-900 mb-2">恭喜您已游玩完成！</h2>
                <div className="text-lg text-orange-700 leading-relaxed">
                  AI正在生成您的 <strong className="text-orange-900">STEM-A 专业成长报告</strong><br/>
                  大约需要 1～3 分钟，是否回到主页？
                </div>
              </div>

              {/* 按钮组 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                {/* 主要按钮 - 查看成长报告 */}
                <button
                  onClick={() => {
                    console.log('点击查看成长报告按钮');
                    console.log('onNavigate 存在?', !!onNavigate);
                    onClose();
                    if (onNavigate) {
                      console.log('调用 onNavigate("growth-report")');
                      onNavigate('growth-report');
                    } else {
                      console.error('onNavigate 未定义！');
                      alert('导航功能未配置，请检查父组件是否传递了 onNavigate 属性');
                    }
                  }}
                  className="px-8 py-4 rounded-2xl border-3 bg-[#F26522] border-[#603913] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  📊 查看成长报告
                </button>

                {/* 次要按钮 - 回到主页 */}
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) {
                      onNavigate('main');
                    }
                  }}
                  className="px-8 py-4 rounded-2xl border-3 bg-gray-400 border-gray-600 text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  🏠 回到主页
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}