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
    throw new Error('useLanguage must be used within a LanguageProvider');
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
  'quiz.next_question': '下一题',
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
  'settings.game_desc': '专注儿童 STEM+A 教育的互动故事游戏',
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
  'nanjubeizhi.act_5': '第五幕',
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
  'yanzishichu.scene2.narrative2': '只见两名身著黑衣、面色严肃的楚国官吏，押著一个双手被捆綁、头发散乱、面色苍白的男子，缓缓从殿外走进来。那男子低著头，浑身微微颤抖，连大气都不敢喘，脚步声在寂静的大殿里格外清晰，引得满殿的人都看了过去。',
  
  // 场景2对话
  'yanzishichu.scene2.dialogue1': '启禀大王，此人在街市上行窃，被我等当场抓获，特来向大王禀报。',
  'yanzishichu.scene2.dialogue2': '哦？被绑的是什么人？来自哪里？为何要行窃？',
  'yanzishichu.scene2.dialogue3': '回大王，此人是齐国人，今日在街市上偷窃商户的财物，被我等当场拿获，人赃并获，无从抵赖。',
  'yanzishichu.scene2.dialogue4': '晏子大夫，你看，这齐国人本来就是善于偷盗吗？不然，为何他在齐国不偷，偏偏来到我楚国，就做起偷窃的勾当？',
  'yanzishichu.scene2.dialogue5': '（稍作沉思，缓缓起身）',
  
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
  'quiz.act1.q1.question': '晏子生活在哪个时期？',
  'quiz.act1.q1.optionA': 'A. 唐朝',
  'quiz.act1.q1.optionB': 'B. 春秋时期',
  'quiz.act1.q1.optionC': 'C. 明朝',
  
  'quiz.act1.q2.question': '把人物送回自己的国家：',
  
  'quiz.act1.q3.question': '晏子的工作更像？',
  'quiz.act1.q3.optionA': 'A. 农夫',
  'quiz.act1.q3.optionB': 'B. 外交官',
  'quiz.act1.q3.optionC': 'C. 士兵',
  
  'quiz.act1.q4.question': '为什么齐王派晏子出使？',
  'quiz.act1.q4.optionA': 'A. 因为他强壮',
  'quiz.act1.q4.optionB': 'B. 因为他聪明善辩',
  'quiz.act1.q4.optionC': 'C. 因为他跑得快',
  
  'quiz.act1.q5.question': '出使别国最重要的是？',
  'quiz.act1.q5.optionA': '有礼貌',
  'quiz.act1.q5.optionB': '有智慧',
  'quiz.act1.q5.optionC': '会沟通',
  
  // 第二幕测试题
  'quiz.act2.q1.question': '楚王这样说，是为了？',
  'quiz.act2.q1.optionA': 'A. 了解事实',
  'quiz.act2.q1.optionB': 'B. 嘲笑齐国',
  'quiz.act2.q1.optionC': 'C. 帮助犯人',
  
  'quiz.act2.q2.question': '一个人的错误能代表整个国家吗？',
  'quiz.act2.q2.optionA': '可以',
  'quiz.act2.q2.optionB': '不可以',
  
  'quiz.act2.q3.question': '如果别人误会你的朋友，你会？',
  'quiz.act2.q3.optionA': '帮他解释',
  'quiz.act2.q3.optionB': '不说话',
  'quiz.act2.q3.optionC': '一起嘲笑',
  
  'quiz.act2.q4.question': '晏子此时可能感到？',
  'quiz.act2.q4.optionA': '生气',
  'quiz.act2.q4.optionB': '紧张',
  'quiz.act2.q4.optionC': '冷静思考',
  
  'quiz.act2.q5.question': '晏子应该？',
  'quiz.act2.q5.optionA': 'A. 发怒',
  'quiz.act2.q5.optionB': 'B. 离开',
  'quiz.act2.q5.optionC': 'C. 用智慧回答',
  
  'quiz.act2.q6.question': '晏子站起来行礼说明：',
  'quiz.act2.q6.optionA': 'A. 害怕',
  'quiz.act2.q6.optionB': 'B. 尊重君王',
  'quiz.act2.q6.optionC': 'C. 想离开',
  
  'quiz.act2.q7.question': '聪明的人解决问题通常靠？',
  'quiz.act2.q7.optionA': '力气',
  'quiz.act2.q7.optionB': '智慧',
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
  'quiz.next_question': '下一題',
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
  'nanjubeizhi.act_5': '第五幕',
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
  'yanzishichu.scene2.narrative2': '只見兩名身著黑衣、面色嚴肅的楚國官吏，押著一個雙手被捆綁、頭髮散亂、面色蒼白的男子，緩緩從殿外走進來。那男子低著頭，渾身微微顫抖，連大氣都不敢喘，腳步聲在寂靜的大殿裡格外清晰，引得滿殿的人都看了過去。',
  
  // 场景2对话
  'yanzishichu.scene2.dialogue1': '启禀大王，此人在街市上行窃，被我等当场抓获，特来向大王禀报。',
  'yanzishichu.scene2.dialogue2': '哦？被绑的是什么人？来自哪里？为何要行窃？',
  'yanzishichu.scene2.dialogue3': '回大王，此人是齐国人，今日在街市上偷窃商户的财物，被我等当场拿获，人赃并获，无从抵赖。',
  'yanzishichu.scene2.dialogue4': '晏子大夫，你看，这齐国人本来就是善于偷盗吗？不然，为何他在齐国不偷，偏偏来到我楚国，就做起偷窃的勾当？',
  'yanzishichu.scene2.dialogue5': '（稍作沉思，缓缓起身）',
  
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
  'quiz.act1.q1.question': '晏子生活在哪个时期？',
  'quiz.act1.q1.optionA': 'A. 唐朝',
  'quiz.act1.q1.optionB': 'B. 春秋时期',
  'quiz.act1.q1.optionC': 'C. 明朝',
  
  'quiz.act1.q2.question': '把人物送回自己的国家：',
  
  'quiz.act1.q3.question': '晏子的工作更像？',
  'quiz.act1.q3.optionA': 'A. 农夫',
  'quiz.act1.q3.optionB': 'B. 外交官',
  'quiz.act1.q3.optionC': 'C. 士兵',
  
  'quiz.act1.q4.question': '为什么齐王派晏子出使？',
  'quiz.act1.q4.optionA': 'A. 因为他强壮',
  'quiz.act1.q4.optionB': 'B. 因为他聪明善辩',
  'quiz.act1.q4.optionC': 'C. 因为他跑得快',
  
  'quiz.act1.q5.question': '出使别国最重要的是？',
  'quiz.act1.q5.optionA': '有礼貌',
  'quiz.act1.q5.optionB': '有智慧',
  'quiz.act1.q5.optionC': '会沟通',
  
  // 第二幕测试题
  'quiz.act2.q1.question': '楚王这样说，是为了？',
  'quiz.act2.q1.optionA': 'A. 了解事实',
  'quiz.act2.q1.optionB': 'B. 嘲笑齐国',
  'quiz.act2.q1.optionC': 'C. 帮助犯人',
  
  'quiz.act2.q2.question': '一个人的错误能代表整个国家吗？',
  'quiz.act2.q2.optionA': '可以',
  'quiz.act2.q2.optionB': '不可以',
  
  'quiz.act2.q3.question': '如果别人误会你的朋友，你会？',
  'quiz.act2.q3.optionA': '帮他解释',
  'quiz.act2.q3.optionB': '不说话',
  'quiz.act2.q3.optionC': '一起嘲笑',
  
  'quiz.act2.q4.question': '晏子此时可能感到？',
  'quiz.act2.q4.optionA': '生气',
  'quiz.act2.q4.optionB': '紧张',
  'quiz.act2.q4.optionC': '冷静思考',
  
  'quiz.act2.q5.question': '晏子应该？',
  'quiz.act2.q5.optionA': 'A. 发怒',
  'quiz.act2.q5.optionB': 'B. 离开',
  'quiz.act2.q5.optionC': 'C. 用智慧回答',
  
  'quiz.act2.q6.question': '晏子站起来行礼说明：',
  'quiz.act2.q6.optionA': 'A. 害怕',
  'quiz.act2.q6.optionB': 'B. 尊重君王',
  'quiz.act2.q6.optionC': 'C. 想离开',
  
  'quiz.act2.q7.question': '聪明的人解决问题通常靠？',
  'quiz.act2.q7.optionA': '力气',
  'quiz.act2.q7.optionB': '智慧',
};