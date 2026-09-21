import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh-CN' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 从 localStorage 读取保存的语言设置，默认繁体中文
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'zh-TW';
  });

  useEffect(() => {
    // 保存语言设置到 localStorage
    localStorage.setItem('app-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translations = language === 'zh-CN' ? translationsSimplified : translationsTraditional;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // 返回默认值，使组件在Figma预览环境中��能工作
    return {
      language: 'zh-CN' as const,
      setLanguage: () => {},
      t: (key: string) => key, // 返回key本身作为fallback
    };
  }
  return context;
}

// 简体中文翻译
const translationsSimplified: Record<string, string> = {
  // 通用
  'common.back': '返回',
  'common.continue': '继续',
  'common.skip': '跳过',
  'common.confirm': '确认',
  'common.cancel': '取消',
  'common.next': '下一步',
  'common.previous': '上一步',
  'common.close': '关闭',
  'common.save': '保存',
  
  // 首页
  'home.title': '拯救橘小橘',
  'home.subtitle': 'Save Little Orange',
  'home.start_game': '开始游戏',
  'home.growth_report': '成长报告',
  'home.achievements': '成就榜',
  'home.settings': '设置',
  'home.orange_journey': 'Orange Journey',
  'home.orange_journey_subtitle': '橘子的奇幻旅程',
  'home.click_to_start': '点击开始 / Skip',
  
  // 登录页
  'login.title': '欢迎来到橘小橘的世界',
  'login.subtitle': '让我们开始这段神奇的旅程吧！',
  'login.username': '请输入你的名字',
  'login.select_avatar': '选择你的头像',
  'login.start_adventure': '开始冒险',
  'login.skip_login': '跳过登录',
  'login.guest': '小游客',
  'login.welcome_back': '欢迎回来',
  'login.create_account': '创建账号',
  'login.continue_adventure': '登录继续你的冒险',
  'login.start_journey': '注册开启新的旅程',
  'login.login_tab': '登录',
  'login.register_tab': '注册',
  'login.phone': '手机号',
  'login.email': '邮箱地址',
  'login.password': '密码',
  'login.confirm_password': '确认密码',
  'login.phone_placeholder': '请输入手机号',
  'login.email_placeholder': '请输入邮箱地址',
  'login.password_placeholder': '请输入密码',
  'login.set_password_placeholder': '设置密码（至少6位）',
  'login.confirm_password_placeholder': '请再次输入密码',
  'login.login_button': '立即登录 🚀',
  'login.register_button': '立即注册 🎉',
  'login.no_account': '还没有账号？',
  'login.have_account': '已有账号？',
  'login.go_register': '立即注册',
  'login.go_login': '立即登录',
  'login.skip': '暂时跳过 →',
  'login.game_title': '橘子的奇幻旅程',
  'login.game_subtitle': 'Orange Journey',
  'login.feature_1': '开启精彩的历史冒险',
  'login.feature_2': '探索朝代故事与文化',
  'login.feature_3': '收获成长与快乐时光',
  'login.error_phone': '请输入正确的手机号',
  'login.error_email': '请输入正确的邮箱地址',
  'login.error_password_length': '密码至少需要6个字符',
  'login.error_password_mismatch': '两次输入的密码不一致',
  'login.error_password_empty': '请输入密码',
  
  // 年级选择
  'grade.select_title': '选择年级',
  'grade.select_subtitle': '让我们为你推荐合适的学习内容',
  'grade.lower_elementary': '小学低年级',
  'grade.upper_elementary': '小学高年级',
  'grade.grades_1_3': '1-3年级',
  'grade.grades_4_6': '4-6年级',
  'grade.lower_description': '适合刚开始探索世界的小朋友，通过趣味故事和互动游戏培养学习兴趣',
  'grade.upper_description': '适合有一定知识基础的同学，通过深度思考和逻辑训练提升综合能力',
  'grade.select_hint': '可以随时在设置中更改年级',
  
  // 游戏菜单
  'game.select_dynasty': '选择朝代',
  'game.spring_autumn': '春秋战国',
  'game.tang_dynasty': '唐朝',
  'game.song_dynasty': '宋朝',
  'game.ming_dynasty': '明朝',
  'game.coming_soon': '敬请期待',
  'game.start': '开始',
  'game.locked': '未解锁',
  
  // 章节选择
  'chapter.select': '选择章节',
  'chapter.nanjubeizhi': '《南橘北枳》- 晏子使楚',
  'chapter.nanjubeizhi_desc': '齐国大夫晏子出使楚国，以智慧化解楚王刁难',
  'chapter.quyuan': '《橘颂》- 屈原咏橘',
  'chapter.quyuan_desc': '屈原在故乡橘园中咏橘言志',
  'chapter.locked': '完成前置章节解锁',
  
  // 游戏进程
  'game_process.act': '第{number}幕',
  'game_process.dialogue_count': '对话数 {current}/{total}',
  'game_process.narrator': '旁白',
  'game_process.next_paragraph': '下一段',
  'game_process.prev_paragraph': '上一段',
  'game_process.start_story': '开始剧情',
  'game_process.next_sentence': '下一句',
  'game_process.prev_sentence': '上一句',
  'game_process.next_act': '下一幕',
  
  // 测试题
  'quiz.title': '第{number}幕测试',
  'quiz.question': '问题 {current}/{total}',
  'quiz.submit': '提交答案',
  'quiz.complete': '完成测试',
  'quiz.score': '得分',
  'quiz.correct': '回答正确！',
  'quiz.incorrect': '回答错误',
  'quiz.retry': '重新作答',
  
  // 成长报告
  'report.title': '成长报告',
  'report.subtitle': 'Growth Report',
  'report.view_iceberg': '查看冰山能力模型',
  'report.dimension': '维度',
  'report.score': '分数',
  'report.exploration': '探索倾向',
  'report.logic': '逻辑推演',
  'report.culture': '文化共情',
  'report.focus': '持久专注',
  'report.science': '科学观察',
  'report.extraction': '信息提取',
  'report.creativity': '创造力表现',
  'report.collaboration': '协作意识',
  
  // 成就系统
  'achievements.title': '成就榜',
  'achievements.subtitle': 'Achievements',
  'achievements.orange_garden': '橘子园',
  'achievements.collected': '已收集',
  'achievements.total': '个橘子',
  'achievements.unlock': '解锁',
  'achievements.locked': '未解锁',
  
  // 设置页面
  'settings.title': '设置',
  'settings.subtitle': 'Settings',
  'settings.profile': '个人资料',
  'settings.account': '账户设置',
  'settings.personal_info': '个人信息',
  'settings.edit_profile': '编辑资料',
  'settings.bind_email': '绑定邮箱',
  'settings.device_management': '设备管理',
  'settings.devices': '{count}台设备',
  'settings.parent_mode': '家长模式',
  'settings.parent_control': '家长控制',
  'settings.enter_parent_mode': '进入家长模式',
  'settings.parent_features': '🔒 家长模式功能：',
  'settings.parent_feature_1': '• 查看详细学习报告',
  'settings.parent_feature_2': '• 设置每日学习时长',
  'settings.parent_feature_3': '• 管理应用内购买',
  'settings.parent_feature_4': '• 自定义学习目标',
  'settings.notifications': '通知与音效',
  'settings.push_notifications': '推送通知',
  'settings.push_desc': '接收学习提醒和成就通知',
  'settings.sound': '音效',
  'settings.sound_desc': '游戏背景音乐和音效',
  'settings.dark_mode': '夜间模式',
  'settings.dark_mode_desc': '护眼模式，减少蓝光',
  'settings.language': '语言设置',
  'settings.language_select': '选择语言',
  'settings.simplified_chinese': '简体中文',
  'settings.traditional_chinese': '繁体中文',
  'settings.about': '关于游戏',
  'settings.version': '版本信息',
  'settings.privacy': '隐私政策',
  'settings.terms': '用户协议',
  'settings.contact': '联系我们',
  'settings.game_name': '🍊 拯救橘小橘',
  'settings.game_desc': '注儿童 STEM+A 教育的互动故事游戏',
  'settings.logout': '退出登录',
  'settings.age': '{age}岁',
  'settings.study_days': '已学习{days}天',
  'settings.level': 'Lv. {level}',
  'settings.achievements_count': '🏆 {count}个成就',
  
  // 冰山能力模型
  'iceberg.title': '冰山能力模型',
  'iceberg.subtitle': 'Iceberg Competency Model',
  'iceberg.surface': '表层能力（显性）',
  'iceberg.deep': '深层能力（隐性）',
  'iceberg.knowledge': '知识',
  'iceberg.skills': '技能',
  'iceberg.values': '价值观',
  'iceberg.traits': '个性特质',
  'iceberg.motives': '内在动机',
  
  // 南橘北枳游戏
  'nanjubeizhi.back': '返回',
  'nanjubeizhi.restart': '🔄 重新开始',
  'nanjubeizhi.start_game': '▶️ 开始游戏',
  'nanjubeizhi.start_test': '🎯 开始测试',
  'nanjubeizhi.game_progress': '游戏进度',
  'nanjubeizhi.game_illustration': '游戏插画',
  'nanjubeizhi.act_1': '第一幕',
  'nanjubeizhi.act_2': '第二幕',
  'nanjubeizhi.act_3': '第三幕',
  'nanjubeizhi.act_4': '第四幕',
  'nanjubeizhi.confirm_restart': '确定要重新开始游戏吗？',
  'nanjubeizhi.complete_message': '🎉 太棒了！你完成了所有问题！\\n\\n你对屈原和橘子的故事有了更深的理解！',
  
  // 《南橘北枳》故事内容 - 晏子使楚
  'yanzishichu.narrator': '旁白',
  'yanzishichu.yanzi': '晏子',
  'yanzishichu.king': '楚王',
  'yanzishichu.official': '官吏',
  
  // 场景1旁白
  'yanzishichu.scene1.narrative1': '春秋末期，周景王年间，齐国国君齐景公为缓和与楚国的边境矛盾，派遣大夫晏婴出使楚国。',
  'yanzishichu.scene1.narrative2': '晏婴，又称晏子，虽身材矮小，却满腹经纶、口才出众，是齐国出了名的能言善辩之士，深得齐景公信任。',
  'yanzishichu.scene1.narrative3': '而此时的楚国，在楚灵王的统治下国力强盛，楚灵王自视甚高，向来轻视齐国，听闻晏子出使，便早早与身边的近臣们密谋，想藉机羞辱晏子、打压齐国的气焰，彰显楚国的威风。',
  
  // 场景1对话
  'yanzishichu.scene1.dialogue1': '我叫晏子，是齐国的使者。\\n虽然我个子不高，但我最擅长用智慧解决问题。',
  'yanzishichu.scene1.dialogue2': '这次去楚国，可能会遇到不少难题……\\n你愿意和我一起面对吗？',
  'yanzishichu.scene1.dialogue3': '我是楚王，楚国的君主。\\n听说齐国派来了一位叫晏子的使者。',
  'yanzishichu.scene1.dialogue4': '有人说他很聪明，不过……我可要亲自考考他。\\n你觉得，他能通过我的考验吗？',
  
  // 场景2旁白
  'yanzishichu.scene2.narrative0': '几日后，楚王在宫中设宴，正式款待晏子。楚王端坐于大殿之上，面色威严，嘴角却带着一丝玩味的笑意，目光时而扫向下方的晏子，眼底藏着算计。左右大臣分列两侧，或低头饮酒，或交头接耳，眼神里满是期待，等着看晏子出丑。',
  'yanzishichu.scene2.narrative1': '晏子端坐于客座之上，身姿挺拔，神色平静，无论楚王和大臣们如何旁敲侧击、言语试探，他都应对自如，不卑不亢，既维护了齐国的体面，又没有冒犯楚国的威严。酒过三巡，菜过五味，众人都已有了几分醉意，殿内的气氛也渐渐热闹起来。就在这时，突然！',
  'yanzishichu.scene2.narrative2': '只见一名身著黑衣、面色严肃的楚国官吏，押著一个双手被捆綁、头发散乱、面色苍白的男子，缓缓从殿外走进来。那男子低著头，浑身微微颤抖，连大气都不敢喘，脚步声在寂静的大殿里格外清晰，引得满殿的人都看了过去。',
  
  // 场景2对话
  'yanzishichu.scene2.dialogue1': '啟稟大王，此人在街市上行竊，被我等當場抓獲，特來向大王稟報。',
  'yanzishichu.scene2.dialogue2': '哦？被綁的是什麼人？來自哪裡？為何要行竊？',
  'yanzishichu.scene2.dialogue3': '回大王,此人是齊國人，今日在街市上偷竊商戶的財物，被我等當場拿獲，人贓並獲，無從抵賴。',
  'yanzishichu.scene2.dialogue4': '晏子大夫，你看，這齊國人本來就是善於偷盜嗎？不然，為何他在齊國不偷，偏偏來到我楚國，就做起偷竊的勾當？',
  'yanzishichu.scene2.dialogue5': '（稍作沉思，緩緩起身）',
  
  // 场景3旁白
  'yanzishichu.scene3.narrative0': '晏子身边的随从们都面露焦急，示意他小心应对。然而，晏子却依旧神色平静，他的动作从容不迫，眼神坚定，目光平静地看向楚王，语气从容而有力，缓缓开口说道：',
  'yanzishichu.scene3.narrative1': '楚王脸上的得意渐渐褪去，皱起了眉头，神色变得有些凝重，他下意识地摇了摇头，低声说道：',
  'yanzishichu.scene3.narrative2': '说到这里，晏子话锋一转，目光再次落在楚王身上，语气带着几分反问，却又不失恭敬：',
  'yanzishichu.scene3.narrative3': '晏子的话语不卑不亢，条理清晰，每一句话都掷地有声，既没有直接反驳楚王的挑衅，也没有贬低楚国，而是用橘树和枳树的例子，巧妙地反击了楚王的羞辱。',
  'yanzishichu.scene3.narrative4': '过了许久，楚王才缓缓叹了口气，脸上露出一丝自嘲的笑容，语气带着几分无奈和愧疚，对着晏子躬身说道：',
  
  // 场景3对话
  'yanzishichu.scene3.dialogue1': '大王，臣听说过这样一件事，不知道大王是否知晓。',
  'yanzishichu.scene3.dialogue2': '淮南一带的土地肥沃，气候暖湿润，适合橘树生长，\\n那里长出来的橘子，个大饱满，皮薄多汁，\\n吃起来甘甜可口，堪称世间美味。',
  'yanzishichu.scene3.dialogue3': '可是，若是把淮南的橘树移栽到淮北去，\\n生长在淮北的土地上，接受着淮北的风雨和气候，\\n它就会慢慢变成枳树。果子，又小又涩，又苦又酸，根本无法食用。',
  'yanzishichu.scene3.dialogue4': '大王，您知道这是为什么吗？',
  'yanzishichu.scene3.dialogue5': '为何？难道不是同一种树吗？',
  'yanzishichu.scene3.dialogue6': '这并不是树的本身变了，而是生长它们的水土不一样啊！\\n淮南的水土肥沃、气候适宜，能让橘树长出甘甜的橘子，\\n而淮北的水土贫瘠、气候寒冷，橘树无法适应，便慢慢变成了枳树，结出了苦涩的果子。',
  'yanzishichu.scene3.dialogue7': '大王,如今这个齐国人，生长在齐国的时候，从来没有偷窃过别人的财物，品行端正，是个安分守己的百姓。',
  'yanzishichu.scene3.dialogue8': '可是，当他来到楚国之后，却做起了偷窃的勾当，\\\\n这难道不是因为楚国的水土——也就是楚国的社会风气，让他变成了这样吗？',
  
  // 场景4（第四幕）
  'yanzishichu.scene4.narrative0': '楚王听完晏子的话，脸上的神色一阵红一阵白，尴尬不已。他张了张嘴，想说什么，却发现无从反驳——晏子的比喻十分贴切，逻辑严密。',
  'yanzishichu.scene4.narrative1': '殿内的楚国大臣们也都鸦雀无声，纷纷低下头，不敢再看楚王和晏子。过了许久，楚王才缓缓叹了口气，对着晏子躬身说道：',
  'yanzishichu.scene4.dialogue1': '晏子大夫果然名不虚传，真是圣人啊！圣人是不能随便戏弄的，\\\\n今日我本想借机羞辱大夫，没想到，反而自讨没趣，搬起石头砸了自己的脚，让楚国颜面尽失啊！',
  'yanzishichu.scene4.narrative2': '说完，楚王连忙命人解开那名齐人的捆绑，赦免了他的罪过，又亲自向晏子敬酒，表达自己的歉意。楚国的大臣们再也不敢轻视晏子，纷纷对他露出了敬佩的神色。',
  'yanzishichu.scene4.narrative3': '这便是"南橘北枳"的故事。晏子用自己的智慧和口才，不仅维护了自己和齐国的尊严，还巧妙地化解了一场外交危机，也让这个故事流传千古，成了后世家喻户晓的典故。',
  
  // 游戏进程UI文本
  'yanzishichu.act_label': '第{act}幕',
  'yanzishichu.dialogue_count': '对话数 {current}/{total}',
  'yanzishichu.prev_paragraph': '上一段',
  'yanzishichu.next_paragraph': '下一段',
  'yanzishichu.start_story': '开始剧情',
  'yanzishichu.prev_dialogue': '上一句',
  'yanzishichu.next_dialogue': '下一句',
  'yanzishichu.continue': '继续',
  'yanzishichu.next_act': '下一幕',
  'yanzishichu.complete_all': '🎉 恭喜完成所有测试！\\n总得分：{score}/5',
  
  // 测试题通用UI
  'quiz.act_test': '第{act}幕测试',
  'quiz.single_choice': '单选题',
  'quiz.multiple_choice': '多选题',
  'quiz.drag_drop': '拖拽题',
  'quiz.submit_answer': '提交���案',
  'quiz.next_question': '下一题 →',
  'quiz.complete_test': '完成测试 🎉',
  'quiz.skip_question': '暂时跳过',
  'quiz.correct_answer': '回答正确！获得一颗星星 🌟',
  'quiz.wrong_answer': '回答错误，再接再厉！',
  'quiz.act_one': '一',
  'quiz.act_two': '二',
  'quiz.act_three': '三',
  'quiz.act_four': '四',
  'quiz.act_five': '五',
  
  // 拖拽题角色和地点
  'quiz.character.yanzi': '晏子',
  'quiz.character.king': '楚王',
  'quiz.location.qi': '齐国',
  'quiz.location.chu': '楚国',
  
  // 第一幕测试题
  'quiz.act1.q1.question': '🔬 S (科學) - 晏子的身高很矮，但齊王依然派他去楚國。這告訴我們一個什麼科學道理？',
  'quiz.act1.q1.optionA': 'A. 個子矮的人跑得比較快 🏃‍♂️',
  'quiz.act1.q1.optionB': 'B. 腦袋裡的「智慧」，和身高的「尺寸」是沒有關係的！ 🧠',
  'quiz.act1.q1.optionC': 'C. 矮小的人力氣最大 💪',
  
  'quiz.act1.q2.question': '💻 T (科技) - 在沒有手機的古代，楚王早就知道晏子要來了。古人通常用什麼「工具」傳遞遠方的消息？',
  'quiz.act1.q2.optionA': 'A. 用電視廣播 📺',
  'quiz.act1.q2.optionB': 'B. 派快馬和馬車送信 🐎',
  'quiz.act1.q2.optionC': 'C. 寄電子郵件 (Email) 📧',
  
  'quiz.act1.q3.question': '⚙️ E (工程) - 楚王在晏子還沒到時，就「早早密謀」想欺負他。就像搭樂高積木一樣，這是在做什麼？',
  'quiz.act1.q3.optionA': 'A. 預先設計一個壞「計畫」 📝',
  'quiz.act1.q3.optionB': 'B. 準備去睡覺 🛏️',
  'quiz.act1.q3.optionC': 'C. 在做大掃除 🧹',
  
  'quiz.act1.q4.question': '🎨 A (藝術) - 故事說晏子「口才出眾」。如果晏子來到我們學校，他最厲害的科目應該是什麼？',
  'quiz.act1.q4.optionA': 'A. 體育跑步 👟',
  'quiz.act1.q4.optionB': 'B. 畫畫塗鴉 🖍️',
  'quiz.act1.q4.optionC': 'C. 講故事和朗誦（語言藝術） 🗣️',
  
  'quiz.act1.q5.question': '🔢 M (數學) - 楚國很大（國家強），晏子很矮（個子小）。這場比試，是不是「大的」一定會贏「小的」？',
  'quiz.act1.q5.optionA': 'A. 對，大的絕對會贏。',
  'quiz.act1.q5.optionB': 'B. 不一定，小小的晏子也能用智慧打敗強大的楚王！ ⚖️',
  'quiz.act1.q5.optionC': 'C. 他們大小完全一樣。',

  // 第二幕测试题
  'quiz.act2.q1.question': '🔬 S (科學) - 被綁上來的齊國人「面色蒼白，全身發抖」。我們的身體遇到什麼情況時會這樣？',
  'quiz.act2.q1.optionA': 'A. 吃了很多美味的雪糕 🍦',
  'quiz.act2.q1.optionB': 'B. 感到非常害怕和緊張 😨',
  'quiz.act2.q1.optionC': 'C. 在太陽下曬得太熱了 ☀️',
  
  'quiz.act2.q2.question': '💻 T (科技) - 楚國士兵讓犯人無法亂動，他們使用了什麼「古代技術」？',
  'quiz.act2.q2.optionA': 'A. 用膠水黏住腳 🧴',
  'quiz.act2.q2.optionB': 'B. 用繩子把他緊緊綁住 🪢',
  'quiz.act2.q2.optionC': 'C. 用隱形斗篷蓋住他 👻',
  
  'quiz.act2.q3.question': '⚙️ E (工程) - 楚王高高坐在大殿上，旁邊站滿了大臣看笑話。這個大殿的「設計」是為了讓晏子覺得怎樣？',
  'quiz.act2.q3.optionA': 'A. 覺得很舒服、想睡覺 💤',
  'quiz.act2.q3.optionB': 'B. 覺得非常有壓力、很害怕 🏢',
  'quiz.act2.q3.optionC': 'C. 覺得肚子很餓 🍔',
  
  'quiz.act2.q4.question': '🎨 A (藝術) - 如果請你畫下此時楚王的臉，你應該給他畫什麼表情？',
  'quiz.act2.q4.optionA': 'A. 流眼淚的傷心臉 😭',
  'quiz.act2.q4.optionB': 'B. 偷笑、得意洋洋的壞笑臉 😏',
  'quiz.act2.q4.optionC': 'C. 溫柔微笑的臉 😊',
  
  'quiz.act2.q5.question': '🔢 M (數學) - 楚王抓到「1個」齊國小偷，就說「全部」齊國人都是小偷。這種算法對嗎？',
  'quiz.act2.q5.optionA': 'A. 不對！1個人犯錯，不代表全部人都是壞人。 🔢',
  'quiz.act2.q5.optionB': 'B. 完全正確。',
  'quiz.act2.q5.optionC': 'C. 晏子也會跟著變壞。',

  // 第三幕测试题
  'quiz.act3.q1.question': '🔬 S (科學) - 為什麼溫暖的南方長出甜「橘子」🍊，到了寒冷北方就變成苦「枳子」🍏？',
  'quiz.act3.q1.optionA': 'A. 因為水果自己變心了 💔',
  'quiz.act3.q1.optionB': 'B. 因為「溫度」和「泥土」不同，改變了植物的生長！ 🌡️',
  'quiz.act3.q1.optionC': 'C. 因為有魔法師把果子變酸了 🧙‍♂️',

  'quiz.act3.q2.question': '把橘树种在：',

  'quiz.act3.q3.question': '💻 T (科技) - 把一棵橘子樹連根挖起來，搬到很遠的北方重新種下，這在種植技術裡叫什麼？',
  'quiz.act3.q3.optionA': 'A. 拔草 🌿',
  'quiz.act3.q3.optionB': 'B. 澆水 🚿',
  'quiz.act3.q3.optionC': 'C. 移植（搬家） 🌳',

  'quiz.act3.q4.question': '⚙️ E (工程) - 晏子面對楚王的欺負，他像工程師解決難題一樣，用了什麼「秘密武器」？',
  'quiz.act3.q4.optionA': 'A. 大聲哭鬧，找人幫忙 😭',
  'quiz.act3.q4.optionB': 'B. 講了一個橘子樹的道理，聰明地反擊對方 🧠',
  'quiz.act3.q4.optionC': 'C. 拿起椅子亂砸 🪑',

  'quiz.act3.q5.question': '🎨 A (藝術) - 晏子生氣了嗎？旁白說他「不卑不亢」，表示他說話的態度是怎樣的？',
  'quiz.act3.q5.optionA': 'A. 很生氣，大吼大叫 🤬',
  'quiz.act3.q5.optionB': 'B. 冷靜、有禮貌但很堅定 😌',
  'quiz.act3.q5.optionC': 'C. 嚇得躲在桌子底下 🫣',

  'quiz.act3.q6.question': '🔢 M (數學) - 南方和北方的距離非常遙遠，這告訴我們距離的改變，會讓天氣和環境：',
  'quiz.act3.q6.optionA': 'A. 完全沒有改變 ➡️',
  'quiz.act3.q6.optionB': 'B. 产生巨大的差别（冷和热） 🌍',
  'quiz.act3.q6.optionC': 'C. 距离会越变越短 ➖',

  // 第四幕测试题
  'quiz.act4.q1.question': '🔬 S (科学) - 楚王被晏子打败后，「脸上一阵红一阵白」。这是因为楚王感到「惭愧」时，脸上的什么产生了变化？',
  'quiz.act4.q1.optionA': 'A. 长出了青春痘 🔴',
  'quiz.act4.q1.optionB': 'B. 脸部皮肤下的血管因为情绪而扩张了 🩸',
  'quiz.act4.q1.optionC': 'C. 被人涂了水彩颜料 🎨',

  'quiz.act4.q2.question': '💻 T (科技) - 楚王叫人解开齐国人的绳子。这个动作把犯人身上的「什么」解除了？',
  'quiz.act4.q2.optionA': 'A. 衣服的纽扣 👕',
  'quiz.act4.q2.optionB': 'B. 束缚他身体的装置（解锁） 🔓',
  'quiz.act4.q2.optionC': 'C. 头发的发夹 🎀',

  'quiz.act4.q3.question': '⚙️ E (工程) - 原本两国要吵架了，晏子用他的智慧，把「危险的悬崖」变成了一座什么？',
  'quiz.act4.q3.optionA': 'A. 高高的铁塔 🗼',
  'quiz.act4.q3.optionB': 'B. 沟通与和平的桥梁 🌉',
  'quiz.act4.q3.optionC': 'C. 深深的坑洞 🕳️',

  'quiz.act4.q4.question': '🎨 A (艺术) - 这个精彩的故事流传下来，变成了四个字的美丽词语，叫什么？',
  'quiz.act4.q4.optionA': 'A. 对牛弹琴 🐮',
  'quiz.act4.q4.optionB': 'B. 南橘北枳 🍊',
  'quiz.act4.q4.optionC': 'C. 守株待兔 🐇',

  'quiz.act4.q5.question': '🔢 M (数学) - 游戏结束！楚王本来想拿100分，最后谁才是拿满分、赢得大家尊重的超级赢家？',
  'quiz.act4.q5.optionA': 'A. 坏心眼的楚王 👿',
  'quiz.act4.q5.optionB': 'B. 被绑的犯人 🥺',
  'quiz.act4.q5.optionC': 'C. 聪明有礼貌的晏子 🏆',

  // 橘树拖拽题相关
  'quiz.character.tree': '橘树',
  'quiz.location.north': '淮北（北方）',
  'quiz.location.south': '淮南（南方）',
  'quiz.result.north': '→ 结果苦',
  'quiz.result.south': '→ 长得好',

  // ============ 高年级题目翻译 ============
  
  // 第一幕高年级题目
  'quiz.upper.act1.q1.question': '🔬 S (科学) - 中国气候与地理特征 - 从常识科的地理知识来看，晏子从北方的「齐国」去到南方的「楚国」。这段旅途中，他会感受到「气候」发生怎样的明显改变？',
  'quiz.upper.act1.q1.optionA': 'A. 从炎热干燥，变成经常下雪的严寒天气',
  'quiz.upper.act1.q1.optionB': 'B. 纬度越来越低，天气变得比较温暖和湿润 🌡️',
  'quiz.upper.act1.q1.optionC': 'C. 气温没有任何变化，因为都在同一个地球上',

  'quiz.upper.act1.q2.question': '💻 T (科技) - 古代的通讯技术 - 在没有互联网的春秋时代，楚王居然提前掌握了「晏子身材矮小」的资讯。这依赖了古代的什么「信息传递网络」？',
  'quiz.upper.act1.q2.optionA': 'A. 依靠飞鸽传书或快马驿站传递军事与外交情报 🐎',
  'quiz.upper.act1.q2.optionB': 'B. 在城墙上安装了隐蔽的闭路电视（CCTV）',
  'quiz.upper.act1.q2.optionC': 'C. 楚王使用了穿越时空的望远镜',

  'quiz.upper.act1.q3.question': '⚙️ E (工程) - 解难与计划设计 - 楚王为了羞辱晏子，「早早与近臣密谋」。如果把这当作一个工程设计专案，楚王正在进行设计循环（Design Cycle）中的哪一个重要步骤？',
  'quiz.upper.act1.q3.optionA': 'A. 制作产品的最后测试',
  'quiz.upper.act1.q3.optionB': 'B. 在行动前进行「计划与草图设计」📝',
  'quiz.upper.act1.q3.optionC': 'C. 分发工程的结算薪水',

  'quiz.upper.act1.q4.question': '🎨 A (艺术) - 人物性格的反差设定 - 剧本介绍晏子时，强调他「身材矮小」却「口才出众」。作者运用这种强烈的「对比」写作手法，主要是想向读者表达什么？',
  'quiz.upper.act1.q4.optionA': 'A. 晏子的外貌非常引人注目',
  'quiz.upper.act1.q4.optionB': 'B. 人的智慧与才华，远比外表的高低美丑更强大、更重要 📖',
  'quiz.upper.act1.q4.optionC': 'C. 古代的人通常都不太注重说话技巧',

  'quiz.upper.act1.q5.question': '🔢 M (数学) - 变量之间的关联（正比与反比） - 楚王以为自己个子高、力气大，就一定比晏子聪明。从数学的变量关系来看，「人的身高」和「大脑的智慧」，两者存在什么关系？',
  'quiz.upper.act1.q5.optionA': 'A. 正比例关系（身高越高，必定越聪明）',
  'quiz.upper.act1.q5.optionB': 'B. 反比例关系（身高越矮，必定越聪明）',
  'quiz.upper.act1.q5.optionC': 'C. 互相独立的变量（两者之间没有必然的数学计算关系） 📊',

  // 第二幕高年级题目
  'quiz.upper.act2.q1.question': '🔬 S (科学) - 观察人体的生理反应 - 那名被押上来的齐国人「面色苍白、浑身颤抖、大气都不敢喘」。这在科学上，是人体感受到极大危险时，身体机能产生的什么本能反应？',
  'quiz.upper.act2.q1.optionA': 'A. 消化系统加速，准备吃下大量食物',
  'quiz.upper.act2.q1.optionB': 'B. 血液流向四肢并加快心跳，准备「战斗或逃跑」（应激反应） 🫀',
  'quiz.upper.act2.q1.optionC': 'C. 大脑正在进入深层睡眠状态',

  'quiz.upper.act2.q2.question': '💻 T (科技) - 古代建筑学与阶级威慑 - 楚王「高高端坐于大殿之上」，而晏子和齐国人则在下方。这种殿堂设计在古代建筑技术中，除了看得清楚，还有一种什么特殊的心理作用？',
  'quiz.upper.act2.q2.optionA': 'A. 方便空气流通',
  'quiz.upper.act2.q2.optionB': 'B. 为了在视觉上制造「居高临下」的威慑感，展现王权 👑',
  'quiz.upper.act2.q2.optionC': 'C. 单纯因为椅子太高了',

  'quiz.upper.act2.q3.question': '⚙️ E (工程) - 社会规则的约束结构 - 犯人的双手被士兵用粗绳捆绑（物理工程的约束）。但在一个良好的社会结构中，真正阻止人们不去偷窃的「无形结构」是什么？',
  'quiz.upper.act2.q3.optionA': 'A. 大街上设置的陷阱',
  'quiz.upper.act2.q3.optionB': 'B. 人们内心的道德教育以及国家的法律制度 🏛️',
  'quiz.upper.act2.q3.optionC': 'C. 商店老板的力气大小',

  'quiz.upper.act2.q4.question': '🎨 A (艺术) - 场景气氛的营造 - 旁白特别描写楚国大臣们「交头接耳，满是期待，等着看晏子出丑」。如果你在写作文，加上这句旁白可以发挥什么写作功用？',
  'quiz.upper.act2.q4.optionA': 'A. 拖延故事的时间，让文章字数变多',
  'quiz.upper.act2.q4.optionB': 'B. 烘托出晏子身处敌营「孤军奋战」的紧张气氛，增加戏剧感 🎭',
  'quiz.upper.act2.q4.optionC': 'C. 告诉读者大臣们其实很喜欢晏子',

  'quiz.upper.act2.q5.question': '🔢 M (数学) - 数据统计的谬误 - 楚王抓到「1个」齐国小偷，就大声说「你们齐国人都是善于偷盗的」。从常识科的统计概念来看，楚王犯了什么错？',
  'quiz.upper.act2.q5.optionA': 'A. 用极少的样本数（N=1）去概括整体的百分比，是以偏概全 📉',
  'quiz.upper.act2.q5.optionB': 'B. 他算错了人数，其实抓了两个',
  'quiz.upper.act2.q5.optionC': 'C. 楚王使用了完美的数据图表分析',

  // 第三幕高年级题目
  'quiz.upper.act3.q1.question': '🔬 S (科学) - 植物生长的必备条件 - 常识科教过我们植物生长的条件。橘树在南方长出甜美的橘子，到了北方变成苦涩的枳树，这证明了哪种科学事实？',
  'quiz.upper.act3.q1.optionA': 'A. 植物在生长时，如果改变了气候和土壤（水土），果实特征也会改变 🌱',
  'quiz.upper.act3.q1.optionB': 'B. 植物不需要阳光和水分，只靠运气生长',
  'quiz.upper.act3.q1.optionC': 'C. 植物会因为感到寂寞而结出苦的果子',

  'quiz.upper.act3.q2.question': '把橘树种在：',

  'quiz.upper.act3.q3.question': '💻 T (科技) - 农业与跨地域种植技术 - 想要把温暖地区的「橘树」成功移植到寒冷的地区生存并结出甜果，现代农业科学技术可能会怎么做？',
  'quiz.upper.act3.q3.optionA': 'A. 用油漆把苦涩的果子涂成橘色',
  'quiz.upper.act3.q3.optionB': 'B. 建造温室（控制温度与湿度），或者进行抗寒品种的杂交试验 💡',
  'quiz.upper.act3.q3.optionC': 'C. 在橘树旁边大声播放热情的音乐',

  'quiz.upper.act3.q4.question': '⚙️ E (工程) - 解难模型（公平测试 / Fair Test） - 在科学的「公平测试」中，只可以改变一个条件。晏子的论点中：橘子的品种（种子）是「不变的」，那改变果实味道的「测试变数（改变条件）」是什么？',
  'quiz.upper.act3.q4.optionA': 'A. 水果的颜色',
  'quiz.upper.act3.q4.optionB': 'B. 淮南与淮北的不同生活环境与气候 🌍',
  'quiz.upper.act3.q4.optionC': 'C. 摘橘子的时间',

  'quiz.upper.act3.q5.question': '🎨 A (艺术) - 修辞手法：比喻的应用 - 晏子不直接反驳，而是用「橘变枳」的自然规律来讲道理。这在中文里称为「比喻/借物喻理」。这样说话的最大艺术魅力在哪里？',
  'quiz.upper.act3.q5.optionA': 'A. 能把话讲得很有深意，让对方无可反驳，既有力量又保全面子 📜',
  'quiz.upper.act3.q5.optionB': 'B. 让楚王肚子饿，想吃水果',
  'quiz.upper.act3.q5.optionC': 'C. 用复杂的文言文把大家弄糊涂',

  'quiz.upper.act3.q6.question': '🔢 M (数学) - 逻辑方程式的转换 - 晏子的逻辑可以写成一个数学因果式：『橘子+坏环境=坏果子』。因此他推导出：『好好的齐国人 + ? = 变成偷盗犯』。横线处应该填什么？',
  'quiz.upper.act3.q6.optionA': 'A. 肚子饿的状态',
  'quiz.upper.act3.q6.optionB': 'B. 楚国不良的社会风气与环境 🧮',
  'quiz.upper.act3.q6.optionC': 'C. 数学算错了的结果',

  // 第四幕高年级题目
  'quiz.upper.act4.q1.question': '🔬 S (科学) - 脸部血管扩张现象 - 楚王被晏子打败后，「脸上阵红阵白，尴尬不已」。这是因为人类在经历极度害羞或生气的情绪时，脸部皮肤底下的什么组织发生了扩张？',
  'quiz.upper.act4.q1.optionA': 'A. 微血管（血液流量增加） 🩸',
  'quiz.upper.act4.q1.optionB': 'B. 淋巴腺',
  'quiz.upper.act4.q1.optionC': 'C. 汗腺（会分泌水分）',

  'quiz.upper.act4.q2.question': '💻 T (科技) - 历史的保存技术 - 「南橘北枳」的故事流传千古。在发明纸张和互联网之前，春秋时期的人最可能是用什么技术把这段精彩的外交历史记录下来的？',
  'quiz.upper.act4.q2.optionA': 'A. 用打字机刻在钢板上',
  'quiz.upper.act4.q2.optionB': 'B. 用毛笔刻写在竹简或木牍上，再串联成书 ✍️',
  'quiz.upper.act4.q2.optionC': 'C. 录制成影音档案存在云端',

  'quiz.upper.act4.q3.question': '⚙️ E (工程) - 反作用力与结果反弹 - 楚王说自己「搬起石头砸了自己的脚」，在工程与物理的常识中，原本施加给对手的攻击结构因为设计错误，最终产生的「反作用力」伤害了谁？',
  'quiz.upper.act4.q3.optionA': 'A. 伤害了晏子和齐国人',
  'quiz.upper.act4.q3.optionB': 'B. 原路返回，严重伤害了楚王自己与楚国的尊严 🧱',
  'quiz.upper.act4.q3.optionC': 'C. 被旁边的大臣接住了',

  'quiz.upper.act4.q4.question': '🎨 A (艺术) - 成语的文化浓缩 - 一段长达几千字的外交故事，最后被总结为「南橘北枳」四个字的成语。这体现了中国文化传承的什么特点？',
  'quiz.upper.act4.q4.optionA': 'A. 文字十分精炼，四个字就能包含一个深刻的历史教训与人生智慧 🖋️',
  'quiz.upper.act4.q4.optionB': 'B. 为了方便抄写罚抄',
  'quiz.upper.act4.q4.optionC': 'C. 其实只是随便拼凑的四个字',

  'quiz.upper.act4.q5.question': '🔢 M (数学) - 分数的正负数概念 - 如果设定一场外交游戏，受到尊敬得「正分 (+)」，被羞辱得「负分 (-)」。楚王一开始企图让晏子得 -100分，但在晏子的智慧反击下，最终结算时，谁得了真正的正分大奖？',
  'quiz.upper.act4.q5.optionA': 'A. 双方都扣到了负分',
  'quiz.upper.act4.q5.optionB': 'B. 晏子赢得了最高的正分荣誉（+100），楚王输掉了自己的尊严 🏆',
  'quiz.upper.act4.q5.optionC': 'C. 没有任何人得分，平手收场',
};

// 繁体中文翻译
const translationsTraditional: Record<string, string> = {
  // 通用
  'common.back': '返回',
  'common.continue': '繼續',
  'common.skip': '跳過',
  'common.confirm': '確認',
  'common.cancel': '取消',
  'common.next': '下一步',
  'common.previous': '上一步',
  'common.close': '關閉',
  'common.save': '保存',
  
  // 首页
  'home.title': '拯救橘小橘',
  'home.subtitle': 'Save Little Orange',
  'home.start_game': '開始遊戲',
  'home.growth_report': '成長報告',
  'home.achievements': '成就榜',
  'home.settings': '設置',
  'home.orange_journey': 'Orange Journey',
  'home.orange_journey_subtitle': '橘子的奇幻旅程',
  'home.click_to_start': '點擊開始 / Skip',
  
  // 登录页
  'login.title': '歡迎來到橘小橘的世界',
  'login.subtitle': '讓我們開始這段神奇的旅程吧！',
  'login.username': '請輸入你的名字',
  'login.select_avatar': '選擇你的頭像',
  'login.start_adventure': '開始冒險',
  'login.skip_login': '跳過登錄',
  'login.guest': '小遊客',
  'login.welcome_back': '歡迎回來',
  'login.create_account': '創建賬號',
  'login.continue_adventure': '登錄繼續你的冒險',
  'login.start_journey': '註冊開啟新的旅程',
  'login.login_tab': '登錄',
  'login.register_tab': '註冊',
  'login.phone': '手機號',
  'login.email': '郵箱地址',
  'login.password': '密碼',
  'login.confirm_password': '確認密碼',
  'login.phone_placeholder': '請輸入手機號',
  'login.email_placeholder': '請輸入郵箱地址',
  'login.password_placeholder': '請輸入密碼',
  'login.set_password_placeholder': '設置密碼（至少6位）',
  'login.confirm_password_placeholder': '請再次輸入密碼',
  'login.login_button': '立即登錄 🚀',
  'login.register_button': '立即註冊 🎉',
  'login.no_account': '還沒有賬號？',
  'login.have_account': '已有賬號？',
  'login.go_register': '立即註冊',
  'login.go_login': '立即登錄',
  'login.skip': '暫時跳過 →',
  'login.game_title': '橘子的奇幻旅程',
  'login.game_subtitle': 'Orange Journey',
  'login.feature_1': '開啟精彩的历史冒險',
  'login.feature_2': '探索朝代故事與文化',
  'login.feature_3': '收獲成長與快樂時光',
  'login.error_phone': '請輸入正確的手機號',
  'login.error_email': '請輸入正確的郵箱地址',
  'login.error_password_length': '密碼至少需要6個字符',
  'login.error_password_mismatch': '兩次輸入的密碼不一致',
  'login.error_password_empty': '請輸入密碼',
  
  // 年级选择
  'grade.select_title': '選擇年级',
  'grade.select_subtitle': '讓我們為你推薦合適的學習內容',
  'grade.lower_elementary': '小學低年級',
  'grade.upper_elementary': '小學高年級',
  'grade.grades_1_3': '1-3年級',
  'grade.grades_4_6': '4-6年級',
  'grade.lower_description': '適合剛開始探索世界的小朋友，通過趣味故事和互動遊戲培養學習興趣',
  'grade.upper_description': '適合有一定知識基礎的同学，通過深度思考和邏輯訓練提升綜合能力',
  'grade.select_hint': '可以隨時在設置中更改年級',
  
  // 游戏菜单
  'game.select_dynasty': '選擇朝代',
  'game.spring_autumn': '春秋戰國',
  'game.tang_dynasty': '唐朝',
  'game.song_dynasty': '宋朝',
  'game.ming_dynasty': '明朝',
  'game.coming_soon': '敬請期待',
  'game.start': '開始',
  'game.locked': '未解鎖',
  
  // 章节选择
  'chapter.select': '選擇章節',
  'chapter.nanjubeizhi': '《南橘北枳》- 晏子使楚',
  'chapter.nanjubeizhi_desc': '齊國大夫晏子出使楚國，以智慧化解楚王刁難',
  'chapter.quyuan': '《橘頌》- 屈原詠橘',
  'chapter.quyuan_desc': '屈原在故鄉橘園中詠橘言志',
  'chapter.locked': '完成前置章節解鎖',
  
  // 游戏进程
  'game_process.act': '第{number}幕',
  'game_process.dialogue_count': '對話數 {current}/{total}',
  'game_process.narrator': '旁白',
  'game_process.next_paragraph': '下一段',
  'game_process.prev_paragraph': '上一段',
  'game_process.start_story': '開始劇情',
  'game_process.next_sentence': '下一句',
  'game_process.prev_sentence': '上一句',
  'game_process.next_act': '下一幕',
  
  // 测试题
  'quiz.title': '第{number}幕測試',
  'quiz.question': '問題 {current}/{total}',
  'quiz.submit': '提交答案',
  'quiz.complete': '完成測試',
  'quiz.score': '得分',
  'quiz.correct': '回答正確！',
  'quiz.incorrect': '回答錯誤',
  'quiz.retry': '重新作答',
  
  // 成长报告
  'report.title': '成長報告',
  'report.subtitle': 'Growth Report',
  'report.view_iceberg': '查看冰山能力模型',
  'report.dimension': '維度',
  'report.score': '分數',
  'report.exploration': '探索傾向',
  'report.logic': '邏輯推演',
  'report.culture': '文化共情',
  'report.focus': '持久專注',
  'report.science': '科學觀察',
  'report.extraction': '信息提取',
  'report.creativity': '創造力表現',
  'report.collaboration': '協作意識',
  
  // 成就系统
  'achievements.title': '成就榜',
  'achievements.subtitle': 'Achievements',
  'achievements.orange_garden': '橘子園',
  'achievements.collected': '已收集',
  'achievements.total': '個橘子',
  'achievements.unlock': '解鎖',
  'achievements.locked': '未解鎖',
  
  // 设置页面
  'settings.title': '設置',
  'settings.subtitle': 'Settings',
  'settings.profile': '個人資料',
  'settings.account': '賬戶設置',
  'settings.personal_info': '個人信息',
  'settings.edit_profile': '編輯資料',
  'settings.bind_email': '綁定郵箱',
  'settings.device_management': '設備管理',
  'settings.devices': '{count}台設備',
  'settings.parent_mode': '家長模式',
  'settings.parent_control': '家長控制',
  'settings.enter_parent_mode': '進入家長模式',
  'settings.parent_features': '🔒 家長模式功能：',
  'settings.parent_feature_1': '• 查看詳細學習報告',
  'settings.parent_feature_2': '• 設置每日學習時長',
  'settings.parent_feature_3': '• 管理應用內購買',
  'settings.parent_feature_4': '• 自定義學習目標',
  'settings.notifications': '通知與音效',
  'settings.push_notifications': '推送通知',
  'settings.push_desc': '接收學習提醒和成就通知',
  'settings.sound': '音效',
  'settings.sound_desc': '遊戲背景音樂和音效',
  'settings.dark_mode': '夜間模式',
  'settings.dark_mode_desc': '護眼模式，減少藍光',
  'settings.language': '語言設置',
  'settings.language_select': '選擇語言',
  'settings.simplified_chinese': '簡體中文',
  'settings.traditional_chinese': '繁體中文',
  'settings.about': '關於遊戲',
  'settings.version': '版本信息',
  'settings.privacy': '隱私政策',
  'settings.terms': '用戶協議',
  'settings.contact': '聯繫我們',
  'settings.game_name': '🍊 拯救橘小橘',
  'settings.game_desc': '專注兒童 STEM+A 教育的互動故事遊戲',
  'settings.logout': '退出登錄',
  'settings.age': '{age}歲',
  'settings.study_days': '已學習{days}天',
  'settings.level': 'Lv. {level}',
  'settings.achievements_count': '🏆 {count}個成就',
  
  // 冰山能力模型
  'iceberg.title': '冰山能力模型',
  'iceberg.subtitle': 'Iceberg Competency Model',
  'iceberg.surface': '表層能力（顯性）',
  'iceberg.deep': '深層能力（隱性）',
  'iceberg.knowledge': '知識',
  'iceberg.skills': '技能',
  'iceberg.values': '價值觀',
  'iceberg.traits': '個性特質',
  'iceberg.motives': '內在動機',
  
  // 南橘北枳游戏
  'nanjubeizhi.back': '返回',
  'nanjubeizhi.restart': '🔄 重新開始',
  'nanjubeizhi.start_game': '▶️ 開始遊戲',
  'nanjubeizhi.start_test': '🎯 開始測試',
  'nanjubeizhi.game_progress': '遊戲進度',
  'nanjubeizhi.game_illustration': '遊戲插畫',
  'nanjubeizhi.act_1': '第一幕',
  'nanjubeizhi.act_2': '第二幕',
  'nanjubeizhi.act_3': '第三幕',
  'nanjubeizhi.act_4': '第四幕',
  'nanjubeizhi.confirm_restart': '確定要重新開始遊戲嗎？',
  'nanjubeizhi.complete_message': '🎉 太棒了！你完成了所有問題！\\n\\n你對屈原和橘子的故事有了更深的理解！',
  
  // 《南橘北枳》故事内容 - 晏子使楚
  'yanzishichu.narrator': '旁白',
  'yanzishichu.yanzi': '晏子',
  'yanzishichu.king': '楚王',
  'yanzishichu.official': '官吏',
  
  // 场景1旁白
  'yanzishichu.scene1.narrative1': '春秋末期，周景王年間，齊國國君齊景公為緩和與楚國的邊境矛盾，派遣大夫晏嬰出使楚國。',
  'yanzishichu.scene1.narrative2': '晏嬰，又稱晏子，雖身材矮小，卻滿腹經綸、口才出眾，是齊國出了名的能言善辯之士，深得齊景公信任。',
  'yanzishichu.scene1.narrative3': '而此時的楚國，在楚靈王的統治下國力強盛，楚靈王自視甚高，向來輕視齊國，聽聞晏子出使，便早早與身邊的近臣們密謀，想藉機羞辱晏子、打壓齊國的氣焰，彰顯楚國的威風。',
  
  // 场景1对话
  'yanzishichu.scene1.dialogue1': '我叫晏子，是齊國的使者。\\n雖然我個子不高，但我最擅長用智慧解決問題。',
  'yanzishichu.scene1.dialogue2': '這次去楚國，可能會遇到不少難題……\\n你願意和我一起面對嗎？',
  'yanzishichu.scene1.dialogue3': '我是楚王，楚國的君主。\\n聽說齊國派來了一位叫晏子的使者。',
  'yanzishichu.scene1.dialogue4': '有人說他很聰明，不過……我可要親自考考他。\\n你覺得，他能通過我的考驗嗎？',
  
  // 场景2旁白
  'yanzishichu.scene2.narrative0': '幾日後，楚王在宮中設宴，正式款待晏子。楚王端坐於大殿之上，面色威嚴，嘴角卻帶著一絲玩味的笑意，目光時不時掃向下方的晏子，眼底藏著算計。左右大臣分列兩側，或低頭飲酒，或交頭接耳，眼神裡滿是期待，等著看晏子出醜。',
  'yanzishichu.scene2.narrative1': '晏子端坐於客座之上，身姿挺拔，神色平靜，無論楚王和大臣們如何旁敲側擊、言語試探，他都應對自如，不卑不亢，既維護了齊國的體面，又沒有冒犯楚國的威嚴。酒過三巡，菜過五味，眾人都已有了幾分醉意，殿內的氣氛也漸漸熱鬧起來。就在這時，突然！',
  'yanzishichu.scene2.narrative2': '只見一名身黑衣、面色嚴肅的楚國官吏，押著一個雙手被捆綁、頭髮散亂、面色蒼白的男子，緩緩從殿外走進來。那男子低著頭，渾身微微顫抖，連大氣都不敢喘，腳步聲在寂靜的大殿裡格外清晰，引得滿殿的人都看了過去。',
  
  // 场景2对话
  'yanzishichu.scene2.dialogue1': '啟稟大王，此人在街市上行竊，被我等當場抓獲，特來向大王稟報。',
  'yanzishichu.scene2.dialogue2': '哦？被綁的是什麼人？來自哪裡？為何要行竊？',
  'yanzishichu.scene2.dialogue3': '回大王,此人是齊國人，今日在街市上偷竊商戶的財物，被我等當場拿獲，人贓並獲，無從抵賴。',
  'yanzishichu.scene2.dialogue4': '晏子大夫，你看，這齊國人本來就是善於偷盜嗎？不然，為何他在齊國不偷，偏偏來到我楚國，就做起偷竊的勾當？',
  'yanzishichu.scene2.dialogue5': '（稍作沉思，緩緩起身）',
  
  // 场景3旁白
  'yanzishichu.scene3.narrative0': '晏子身邊的隨從們都面露焦急，示意他小心應對。然而，晏子卻依舊神色平靜，他的動作從容不迫，眼神堅定，目光平靜地看向楚王，語氣從容而有力，緩緩開口說：',
  'yanzishichu.scene3.narrative1': '楚王臉上的得意漸漸褪去，皺起了眉頭，神色變得有些凝重，他下意識地搖了搖頭，低聲說道：',
  'yanzishichu.scene3.narrative2': '說到這裡，晏子話鋒一轉，目光再次落在楚王身上，語氣帶著幾分反問，卻又不失恭敬：',
  'yanzishichu.scene3.narrative3': '晏子的話語不卑不亢，條理清晰，每一句話都擲地有聲，既沒有直接反駁楚王的挑釁，也沒有貶低楚國，而是用橘樹和枳樹的例子，巧妙地反擊了楚王的羞��。',
  'yanzishichu.scene3.narrative4': '過了許久，楚王才緩緩嘆了口氣，臉上露出一絲自嘲的笑容，語氣帶著幾分無奈和愧疚，對著晏子躬身說道：',
  
  // 场景3对话
  'yanzishichu.scene3.dialogue1': '大王��臣聽說過這樣一件事，不知道大王是否知曉。',
  'yanzishichu.scene3.dialogue2': '淮南一帶的土地肥沃，氣候溫暖濕潤，適合橘樹生長，\\\\n那裡長出來的橘子，個大飽滿，皮薄多汁，\\\\n吃起來甘甜可口，堪稱世間美味。',
  'yanzishichu.scene3.dialogue3': '可是，若是把淮南的橘樹移栽到淮北去，\\\\n生長在淮北的土地上，接受著淮北的風雨和氣候，\\\\n它就會慢慢變成枳樹。果子，又小又澀，又苦又酸，根本無法食用。',
  'yanzishichu.scene3.dialogue4': '大王，您知道這是為什麼嗎？',
  'yanzishichu.scene3.dialogue5': '為何？難道不是同一種樹嗎？',
  'yanzishichu.scene3.dialogue6': '這並不是樹的本身變了，而是生長它們的水土不一樣啊！\\\\n淮南的水土肥沃、氣候適宜，能讓橘樹長出甘甜的橘子，\\\\n而淮北的水土貧瘠、氣候寒冷，橘樹無法適應，便慢慢變成了枳樹，結出了苦澀的果子。',
  'yanzishichu.scene3.dialogue7': '大王,如今這個齊國人，生長在齊國的時候，從來沒有偷竊過別人的財物，品行端正，是個安分守己的百姓。',
  'yanzishichu.scene3.dialogue8': '可是，當他來到楚國之後，卻做起了偷竊的勾當，\\\\n這難道不是因為楚國的水土——也就是楚國的社會風氣，讓他變成了這樣嗎？',
  
  // 场景4（第四幕）
  'yanzishichu.scene4.narrative0': '楚王听完晏子的话，脸上的神色一阵红一阵白，尴尬不已。他张了张嘴，想说什么，却发现无从反驳——晏子的比喻十分贴切，逻辑严密。',
  'yanzishichu.scene4.narrative1': '殿内的楚国大臣们也都鸦雀无声，纷纷低下头，不敢再看楚王和晏子。过了许久，楚王才缓缓叹了口气，对着晏子躬身说道：',
  'yanzishichu.scene4.dialogue1': '晏子大夫果然名不虚传，真是圣人啊！圣人是不能随便戏弄的，\\\\n今日我本想借机羞辱大夫，没想到，反而自讨没趣，搬起石头砸了自己的脚，让楚国颜面尽失啊！',
  'yanzishichu.scene4.narrative2': '说完，楚王连忙命人解开那名齐人的捆绑，赦免了他的罪过，又亲自向晏子敬酒，表达自己的歉意。楚国的大臣们再也不敢轻视晏子，纷纷对他露出了敬佩的神色。',
  'yanzishichu.scene4.narrative3': '這便是「南橘北枳」的故事。晏子用自己的智慧和口才，不僅維護了自己和齊國的尊嚴，還巧妙地化解了一場外交危機，也讓這個故事流傳千古，成為了後世家喻戶曉的典故。',
  
  // 游戏进程UI文本
  'yanzishichu.act_label': '第{act}幕',
  'yanzishichu.dialogue_count': '對話數 {current}/{total}',
  'yanzishichu.prev_paragraph': '上一段',
  'yanzishichu.next_paragraph': '下一段',
  'yanzishichu.start_story': '開始劇情',
  'yanzishichu.prev_dialogue': '上一句',
  'yanzishichu.next_dialogue': '下一句',
  'yanzishichu.continue': '繼續',
  'yanzishichu.next_act': '下一幕',
  'yanzishichu.complete_all': '🎉 恭喜完成所有測試！\\n總得分：{score}/5',
  
  // 测试题通用UI
  'quiz.act_test': '第{act}幕测试',
  'quiz.single_choice': '单选题',
  'quiz.multiple_choice': '多选题',
  'quiz.drag_drop': '拖拽题',
  'quiz.submit_answer': '提交答案',
  'quiz.next_question': '下一题 →',
  'quiz.complete_test': '完成测试 🎉',
  'quiz.skip_question': '暂时跳过',
  'quiz.correct_answer': '回答正确！获得一颗星星 🌟',
  'quiz.wrong_answer': '回答错误，再接再厉！',
  'quiz.act_one': '一',
  'quiz.act_two': '二',
  'quiz.act_three': '三',
  'quiz.act_four': '四',
  'quiz.act_five': '五',
  
  // 拖拽题角色和地点
  'quiz.character.yanzi': '晏子',
  'quiz.character.king': '楚王',
  'quiz.location.qi': '齐国',
  'quiz.location.chu': '楚国',
  
  // 第一幕测试题
  'quiz.act1.q1.question': '🔬 S (科學) - 晏子的身高很矮，但齊王依然派他去楚國。這告訴我們一個什麼科學道理？',
  'quiz.act1.q1.optionA': 'A. 個子矮的人跑得比較快 🏃‍♂️',
  'quiz.act1.q1.optionB': 'B. 腦袋裡的「智慧」，和身高的「尺寸」是沒有關係的！ 🧠',
  'quiz.act1.q1.optionC': 'C. 矮小的人力氣最大 💪',
  
  'quiz.act1.q2.question': '💻 T (科技) - 在沒有手機的古代，楚王早就知道晏子要來了。古人通常用什麼「工具」傳遞遠方的消息？',
  'quiz.act1.q2.optionA': 'A. 用電視廣播 📺',
  'quiz.act1.q2.optionB': 'B. 派快馬和馬車送信 🐎',
  'quiz.act1.q2.optionC': 'C. 寄電子郵件 (Email) 📧',
  
  'quiz.act1.q3.question': '⚙️ E (工程) - 楚王在晏子還沒到時，就「早早密謀」想欺負他。就像搭樂高積木一樣，這是在做什麼？',
  'quiz.act1.q3.optionA': 'A. 預先設計一個壞「計畫」 📝',
  'quiz.act1.q3.optionB': 'B. 準備去睡覺 🛏️',
  'quiz.act1.q3.optionC': 'C. 在做大掃除 🧹',
  
  'quiz.act1.q4.question': '🎨 A (藝術) - 故事說晏子「口才出眾」。如果晏子來到我們學校，他最厲害的科目應該是什麼？',
  'quiz.act1.q4.optionA': 'A. 體育跑步 👟',
  'quiz.act1.q4.optionB': 'B. 畫畫塗鴉 🖍️',
  'quiz.act1.q4.optionC': 'C. 講故事和朗誦（語言藝術） 🗣️',
  
  'quiz.act1.q5.question': '🔢 M (數學) - 楚國很大（國家強），晏子很矮（個子小）。這場比試，是不是「大的」一定會贏「小的」？',
  'quiz.act1.q5.optionA': 'A. 對，大的絕對會贏。',
  'quiz.act1.q5.optionB': 'B. 不一定，小小的晏子也能用智慧打敗強大的楚王！ ⚖️',
  'quiz.act1.q5.optionC': 'C. 他們大小完全一樣。',

  // 第二幕测试题
  'quiz.act2.q1.question': '🔬 S (科學) - 被綁上來的齊國人「面色蒼白，全身發抖」。我們的身體遇到什麼情況時會這樣？',
  'quiz.act2.q1.optionA': 'A. 吃了很多美味的雪糕 🍦',
  'quiz.act2.q1.optionB': 'B. 感到非常害怕和緊張 😨',
  'quiz.act2.q1.optionC': 'C. 在太陽下曬得太熱了 ☀️',
  
  'quiz.act2.q2.question': '💻 T (科技) - 楚國士兵讓犯人無法亂動，他們使用了什麼「古代技術」？',
  'quiz.act2.q2.optionA': 'A. 用膠水黏住腳 🧴',
  'quiz.act2.q2.optionB': 'B. 用繩子把他緊緊綁住 🪢',
  'quiz.act2.q2.optionC': 'C. 用隱形斗篷蓋住他 👻',
  
  'quiz.act2.q3.question': '⚙️ E (工程) - 楚王高高坐在大殿上，旁邊站滿了大臣看笑話。這個大殿的「設計」是為了讓晏子覺得怎樣？',
  'quiz.act2.q3.optionA': 'A. 覺得很舒服、想睡覺 💤',
  'quiz.act2.q3.optionB': 'B. 覺得非常有壓力、很害怕 🏢',
  'quiz.act2.q3.optionC': 'C. 覺得肚子很餓 🍔',
  
  'quiz.act2.q4.question': '🎨 A (藝術) - 如果請你畫下此時楚王的臉，你應該給他畫什麼表情？',
  'quiz.act2.q4.optionA': 'A. 流眼淚的傷心臉 😭',
  'quiz.act2.q4.optionB': 'B. 偷笑、得意洋洋的壞笑臉 😏',
  'quiz.act2.q4.optionC': 'C. 溫柔微笑的臉 😊',
  
  'quiz.act2.q5.question': '🔢 M (數學) - 楚王抓到「1個」齊國小偷，就說「全部」齊國人都是小偷。這種算法對嗎？',
  'quiz.act2.q5.optionA': 'A. 不對！1個人犯錯，不代表全部人都是壞人。 🔢',
  'quiz.act2.q5.optionB': 'B. 完全正確。',
  'quiz.act2.q5.optionC': 'C. 晏子也會跟著變壞。',

  // 第三幕测试题
  'quiz.act3.q1.question': '🔬 S (科學) - 為什麼溫暖的南方長出甜「橘子」🍊，到了寒冷北方就變成苦「枳子」🍏？',
  'quiz.act3.q1.optionA': 'A. 因為水果自己變心了 💔',
  'quiz.act3.q1.optionB': 'B. 因為「溫度」和「泥土」不同，改變了植物的生長！ 🌡️',
  'quiz.act3.q1.optionC': 'C. 因為有魔法師把果子變酸了 🧙‍♂️',

  'quiz.act3.q2.question': '把橘树种在：',

  'quiz.act3.q3.question': '💻 T (科技) - 把一棵橘子樹連根挖起來，搬到很遠的北方重新種下，這在種植技術裡叫什麼？',
  'quiz.act3.q3.optionA': 'A. 拔草 🌿',
  'quiz.act3.q3.optionB': 'B. 澆水 🚿',
  'quiz.act3.q3.optionC': 'C. 移植（搬家） 🌳',

  'quiz.act3.q4.question': '⚙️ E (工程) - 晏子面對楚王的欺負，他像工程師解決難題一樣，用了什麼「秘密武器」？',
  'quiz.act3.q4.optionA': 'A. 大聲哭鬧，找人幫忙 😭',
  'quiz.act3.q4.optionB': 'B. 講了一個橘子樹的道理，聰明地反擊對方 🧠',
  'quiz.act3.q4.optionC': 'C. 拿起椅子亂砸 🪑',

  'quiz.act3.q5.question': '🎨 A (藝術) - 晏子生氣了嗎？旁白說他「不卑不亢」，表示他說話的態度是怎樣的？',
  'quiz.act3.q5.optionA': 'A. 很生氣，大吼大叫 🤬',
  'quiz.act3.q5.optionB': 'B. 冷靜、有禮貌但很堅定 😌',
  'quiz.act3.q5.optionC': 'C. 嚇得躲在桌子底下 🫣',

  'quiz.act3.q6.question': '🔢 M (數學) - 南方和北方的距離非常遙遠，這告訴我們距離的改變，會讓天氣和環境：',
  'quiz.act3.q6.optionA': 'A. 完全沒有改變 ➡️',
  'quiz.act3.q6.optionB': 'B. 产生巨大的差别（冷和热） 🌍',
  'quiz.act3.q6.optionC': 'C. 距离会越变越短 ➖',

  // 第四幕测试题
  'quiz.act4.q1.question': '🔬 S (科学) - 楚王被晏子打败后，「脸上一阵红一阵白」。这是因为楚王感到「惭愧」时，脸上的什么产生了变化？',
  'quiz.act4.q1.optionA': 'A. 长出了青春痘 🔴',
  'quiz.act4.q1.optionB': 'B. 脸部皮肤下的血管因为情绪而扩张了 🩸',
  'quiz.act4.q1.optionC': 'C. 被人涂了水彩颜料 🎨',

  'quiz.act4.q2.question': '💻 T (科技) - 楚王叫人解开齐国人的绳子。这个动作把犯人身上的「什么」解除了？',
  'quiz.act4.q2.optionA': 'A. 衣服的纽扣 👕',
  'quiz.act4.q2.optionB': 'B. 束缚他身体的装置（解锁） 🔓',
  'quiz.act4.q2.optionC': 'C. 头发的发夹 🎀',

  'quiz.act4.q3.question': '⚙️ E (工程) - 原本两国要吵架了，晏子用他的智慧，把「危险的悬崖」变成了一座什么？',
  'quiz.act4.q3.optionA': 'A. 高高的铁塔 🗼',
  'quiz.act4.q3.optionB': 'B. 沟通与和平的桥梁 🌉',
  'quiz.act4.q3.optionC': 'C. 深深的坑洞 🕳️',

  'quiz.act4.q4.question': '🎨 A (艺术) - 这个精彩的故事流传下来，变成了四个字的美丽词语，叫什么？',
  'quiz.act4.q4.optionA': 'A. 对牛弹琴 🐮',
  'quiz.act4.q4.optionB': 'B. 南橘北枳 🍊',
  'quiz.act4.q4.optionC': 'C. 守株待兔 🐇',

  'quiz.act4.q5.question': '🔢 M (数学) - 游戏结束！楚王本来想拿100分，最后谁才是拿满分、赢得大家尊重的超级赢家？',
  'quiz.act4.q5.optionA': 'A. 坏心眼的楚王 👿',
  'quiz.act4.q5.optionB': 'B. 被绑的犯人 🥺',
  'quiz.act4.q5.optionC': 'C. 聪明有礼貌的晏子 🏆',

  // 橘树拖拽题相关
  'quiz.character.tree': '橘树',
  'quiz.location.north': '淮北（北方）',
  'quiz.location.south': '淮南（南方）',
  'quiz.result.north': '→ 结果苦',
  'quiz.result.south': '→ 长得好',

  // ============ 高年級題目翻譯 ============
  
  // 第一幕高年級題目
  'quiz.upper.act1.q1.question': '🔬 S (科學) - 中國氣候與地理特徵 - 從常識科的地理知識來看，晏子從北方的「齊國」去到南方的「楚國」。這段旅途中，他會感受到「氣候」發生怎樣的明顯改變？',
  'quiz.upper.act1.q1.optionA': 'A. 從炎熱乾燥，變成經常下雪的嚴寒天氣',
  'quiz.upper.act1.q1.optionB': 'B. 緯度越來越低，天氣變得比較溫暖和濕潤 🌡️',
  'quiz.upper.act1.q1.optionC': 'C. 氣溫沒有任何變化，因為都在同一個地球上',

  'quiz.upper.act1.q2.question': '💻 T (科技) - 古代的通訊技術 - 在沒有互聯網的春秋時代，楚王居然提前掌握了「晏子身材矮小」的資訊。這依賴了古代的什麼「信息傳遞網絡」？',
  'quiz.upper.act1.q2.optionA': 'A. 依靠飛鴿傳書或快馬驛站傳遞軍事與外交情報 🐎',
  'quiz.upper.act1.q2.optionB': 'B. 在城牆上安裝了隱蔽的閉路電視（CCTV）',
  'quiz.upper.act1.q2.optionC': 'C. 楚王使用了穿越時空的望遠鏡',

  'quiz.upper.act1.q3.question': '⚙️ E (工程) - 解難與計劃設計 - 楚王為了羞辱晏子，「早早與近臣密謀」。如果把這當作一個工程設計專案，楚王正在進行設計循環（Design Cycle）中的哪一個重要步驟？',
  'quiz.upper.act1.q3.optionA': 'A. 製作產品的最後測試',
  'quiz.upper.act1.q3.optionB': 'B. 在行動前進行「計畫與草圖設計」📝',
  'quiz.upper.act1.q3.optionC': 'C. 分發工程的結算薪水',

  'quiz.upper.act1.q4.question': '🎨 A (藝術) - 人物性格的反差設定 - 劇本介紹晏子時，強調他「身材矮小」卻「口才出眾」。作者運用這種強烈的「對比」寫作手法，主要是想向讀者表達什麼？',
  'quiz.upper.act1.q4.optionA': 'A. 晏子的外貌非常引人注目',
  'quiz.upper.act1.q4.optionB': 'B. 人的智慧與才華，遠比外表的高低美醜更強大、更重要 📖',
  'quiz.upper.act1.q4.optionC': 'C. 古代的人通常都不太注重說話技巧',

  'quiz.upper.act1.q5.question': '🔢 M (數學) - 變量之間的關聯（正比與反比） - 楚王以為自己個子高、力氣大，就一定比晏子聰明。從數學的變量關係來看，「人的身高」和「大腦的智慧」，兩者存在什麼關係？',
  'quiz.upper.act1.q5.optionA': 'A. 正比例關係（身高越高，必定越聰明）',
  'quiz.upper.act1.q5.optionB': 'B. 反比例關係（身高越矮，必定越聰明）',
  'quiz.upper.act1.q5.optionC': 'C. 互相獨立的變量（兩者之間沒有必然的數學計算關係） 📊',

  // 第二幕高年級題目
  'quiz.upper.act2.q1.question': '🔬 S (科學) - 觀察人體的生理反應 - 那名被押上來的齊國人「面色蒼白、渾身顫抖、大氣都不敢喘」。這在科學上，是人體感受到極大危險時，身體機能產生的什麼本能反應？',
  'quiz.upper.act2.q1.optionA': 'A. 消化系統加速，準備吃下大量食物',
  'quiz.upper.act2.q1.optionB': 'B. 血液流向四肢並加快心跳，準備「戰鬥或逃跑」（應激反應） 🫀',
  'quiz.upper.act2.q1.optionC': 'C. 大腦正在進入深層睡眠狀態',

  'quiz.upper.act2.q2.question': '💻 T (科技) - 古代建築學與階級威懾 - 楚王「高高端坐於大殿之上」，而晏子和齊國人則在下方。這種殿堂設計在古代建築技術中，除了看得清楚，還有一種什麼特殊的心理作用？',
  'quiz.upper.act2.q2.optionA': 'A. 方便空氣流通',
  'quiz.upper.act2.q2.optionB': 'B. 為了在視覺上製造「居高臨下」的威懾感，展現王權 👑',
  'quiz.upper.act2.q2.optionC': 'C. 單純因為椅子太高了',

  'quiz.upper.act2.q3.question': '⚙️ E (工程) - 社會規則的約束結構 - 犯人的雙手被士兵用粗繩捆綁（物理工程的約束）。但在一個良好的社會結構中，真正阻止人們不去偷竊的「無形結構」是什麼？',
  'quiz.upper.act2.q3.optionA': 'A. 大街上設置的陷阱',
  'quiz.upper.act2.q3.optionB': 'B. 人們內心的道德教育以及國家的法律制度 🏛️',
  'quiz.upper.act2.q3.optionC': 'C. 商店老闆的力氣大小',

  'quiz.upper.act2.q4.question': '🎨 A (藝術) - 場景氣氛的營造 - 旁白特別描寫楚國大臣們「交頭接耳，滿是期待，等著看晏子出醜」。如果你在寫作文，加上這句旁白可以發揮什麼寫作功用？',
  'quiz.upper.act2.q4.optionA': 'A. 拖延故事的時間，讓文章字數變多',
  'quiz.upper.act2.q4.optionB': 'B. 烘托出晏子身處敵營「孤軍奮戰」的緊張氣氛，增加戲劇感 🎭',
  'quiz.upper.act2.q4.optionC': 'C. 告訴讀者大臣們其實很喜歡晏子',

  'quiz.upper.act2.q5.question': '��� M (數學) - 統計學謬誤 - 楚王說「齊國人在楚��偷盜 = 齊國人天生善於偷盜」。這在數學與統計學的邏輯分析中，犯了什麼明顯的邏輯錯誤？',
  'quiz.upper.act2.q5.optionA': 'A. 用極少的樣本數（N=1）去概括整體的百分比，是以偏概全 📉',
  'quiz.upper.act2.q5.optionB': 'B. 他算錯了人數，其實抓了兩個',
  'quiz.upper.act2.q5.optionC': 'C. 楚王使用了完美的數據圖表分析',

  // 第三幕高年級題目
  'quiz.upper.act3.q1.question': '🔬 S (科學) - 植物生長的必備條件 - 常識科教過我們植物生長的條件。橘樹在南方長出甜美的橘子，到了北方變成苦澀的枳樹，這證明了哪種科學事實？',
  'quiz.upper.act3.q1.optionA': 'A. 植物在生長時，如果改變了氣候和土壤（水土），果實特徵也會改變 🌱',
  'quiz.upper.act3.q1.optionB': 'B. 植物不需要陽光和水分，只靠運氣生長',
  'quiz.upper.act3.q1.optionC': 'C. 植物會因為感到寂寞而結出苦的果子',

  'quiz.upper.act3.q2.question': '把橘樹種在：',

  'quiz.upper.act3.q3.question': '💻 T (科技) - 農業與跨地域種植技術 - 想要把溫暖地區的「橘樹」成功移植到寒冷的地區生存並結出甜果，現代農業科學技術可能會怎麼做？',
  'quiz.upper.act3.q3.optionA': 'A. 用油漆把苦澀的果子塗成橘色',
  'quiz.upper.act3.q3.optionB': 'B. 建造溫室（控制溫度與濕度），或者進行抗寒品種的雜交試驗 💡',
  'quiz.upper.act3.q3.optionC': 'C. 在橘樹旁邊大聲播放熱情的音樂',

  'quiz.upper.act3.q4.question': '⚙️ E (工程) - 解難模型（公平測試 / Fair Test） - 在科學的「公平測試」中，只可以改變一個條件。晏子的論點中：橘子的品種（種子）是「不變的」，那改變果實味道的「測試變數（改變條件）」是什麼？',
  'quiz.upper.act3.q4.optionA': 'A. 水果的顏色',
  'quiz.upper.act3.q4.optionB': 'B. 淮南與淮北的不同生活環境與氣候 🌍',
  'quiz.upper.act3.q4.optionC': 'C. 摘橘子的時間',

  'quiz.upper.act3.q5.question': '🎨 A (藝術) - 修辭手法：比喻的應用 - 晏子不直接反駁，而是用「橘變枳」的自然規律來講道理。這在中文裡稱為「比喻/借物喻理」。這樣說話的最大藝術魅力在哪裡？',
  'quiz.upper.act3.q5.optionA': 'A. 能把話講得很有深意，讓對方無可反駁，既有力量又保全面子 📜',
  'quiz.upper.act3.q5.optionB': 'B. 讓楚王肚子餓，想吃水果',
  'quiz.upper.act3.q5.optionC': 'C. 用複雜的文言文把大家弄糊塗',

  'quiz.upper.act3.q6.question': '🔢 M (數學) - 邏輯方程式的轉換 - 晏子的邏輯可以寫成一個數學因果式：『橘子+壞環境=壞果子』。因此他推導出：『好好的齊國人 + ? = 變成偷盜犯』。橫線處應該填什麼？',
  'quiz.upper.act3.q6.optionA': 'A. 肚子餓的狀態',
  'quiz.upper.act3.q6.optionB': 'B. 楚國不良的社會風氣與環境 🧮',
  'quiz.upper.act3.q6.optionC': 'C. 數學算錯了的結果',

  // 第四幕高年級題目
  'quiz.upper.act4.q1.question': '🔬 S (科學) - 臉部血管擴張現象 - 楚王被晏子打敗後，「臉上陣紅陣白，尷尬不已」。這是因為人類在經歷極度害羞或生氣的情緒時，臉部皮膚底下的什麼組織發生了擴張？',
  'quiz.upper.act4.q1.optionA': 'A. 微血管（血液流量增加） 🩸',
  'quiz.upper.act4.q1.optionB': 'B. 淋巴腺',
  'quiz.upper.act4.q1.optionC': 'C. 汗腺（會分泌水分）',

  'quiz.upper.act4.q2.question': '💻 T (科技) - 歷史的保存技術 - 「南橘北枳」的故事流傳千古。在發明紙張和互聯網之前，春秋時期的人最可能是用什麼技術把這段精彩的外交歷史記錄下來的？',
  'quiz.upper.act4.q2.optionA': 'A. 用打字機刻在鋼板上',
  'quiz.upper.act4.q2.optionB': 'B. 用毛筆刻寫在竹簡或木牘上，再串聯成書 ✍️',
  'quiz.upper.act4.q2.optionC': 'C. 錄製成影音檔案存在雲端',

  'quiz.upper.act4.q3.question': '⚙️ E (工程) - 反作用力與結果反彈 - 楚王說自己「搬起石頭砸了自己的腳」，在工程與物理的常識中，原本施加給對手的攻擊結構因為設計錯誤，最終產生的「反作用力」傷害了誰？',
  'quiz.upper.act4.q3.optionA': 'A. 傷害了晏子和齊國人',
  'quiz.upper.act4.q3.optionB': 'B. 原路返回，嚴重傷害了楚王自己與楚國的尊嚴 🧱',
  'quiz.upper.act4.q3.optionC': 'C. 被旁邊的大臣接住了',

  'quiz.upper.act4.q4.question': '🎨 A (藝術) - 成語的文化濃縮 - 一段長達幾千字的外交故事，最後被總結為「南橘北枳」四個字的成語。這體現了中國文化傳承的什麼特點？',
  'quiz.upper.act4.q4.optionA': 'A. 文字十分精煉，四個字就能包含一個深刻的歷史教訓與人生智慧 🖋️',
  'quiz.upper.act4.q4.optionB': 'B. 為了方便抄寫罰抄',
  'quiz.upper.act4.q4.optionC': 'C. 其實只是隨便拼湊的四個字',

  'quiz.upper.act4.q5.question': '🔢 M (數學) - 分數的正負數概念 - 如果設定一場外交遊戲，受到尊敬得「正分 (+)」，被羞辱得「負分 (-)」。楚王一開始企圖讓晏子得 -100分，但在晏子的智慧反擊下，最終結算時，誰得了真正的正分大獎？',
  'quiz.upper.act4.q5.optionA': 'A. 雙方都扣到了負分',
  'quiz.upper.act4.q5.optionB': 'B. 晏子贏得了最高的正分榮譽（+100），楚王輸掉了自己的尊嚴 🏆',
  'quiz.upper.act4.q5.optionC': 'C. 沒有任何人得分，平手收場',
};