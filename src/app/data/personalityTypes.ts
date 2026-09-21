// 15种人才类型的完整数据配置

export interface PersonalityTypeData {
  // 基本信息
  id: string;
  name: string;
  englishName: string;
  order: number;
  description: string;
  
  // 总体表现画像
  stemScore: number;
  level: string;
  tasksCompleted: number;
  growthDays: number;
  
  // 专家解读
  strengths: Array<{ name: string; score: number }>;
  growthAdvice: {
    weakness: string;
    suggestion: string;
  };
  expertTip: string;
  
  // 雷达图数据
  coreAbilityData: Array<{
    id: string;
    subject: string;
    myScore: number;
    average: number;
    fullMark: number;
  }>;
  
  potentialRadarData: Array<{
    id: string;
    dimension: string;
    myScore: number;
    average: number;
    fullMark: number;
  }>;
  
  // 学习类型分布
  pieData: Array<{
    id: string;
    name: string;
    value: number;
    color: string;
  }>;
  
  // 潜能标签
  badges: Array<{
    id: string;
    emoji: string;
    name: string;
    metric: string;
    score: number;
  }>;
  
  // 潜能概述
  potentialSummary: string;
}

export const personalityTypesData: Record<string, PersonalityTypeData> = {
  '科技创新型': {
    id: '科技创新型',
    name: '科技创新型',
    englishName: 'Science & Technology Innovation Type',
    order: 1,
    description: '您的孩子在 Science 和 Technology 两个维度表现突出，显示出强烈的科技创新潜力。既具备科学探究能力，又善于运用技术手段实现创新想法。在问题解决中展现出较强的创造性和实践能力。建议参与科技创新项目，如科学发明、技术开发、创客竞赛等，同时加强工程和数学基础，提升创新方案的可行性和科学性。',
    stemScore: 85,
    level: '领先水平',
    tasksCompleted: 20,
    growthDays: 8,
    strengths: [
      { name: '学习热情', score: 90 },
      { name: '逻辑思维', score: 88 },
      { name: '科学观察', score: 90 }
    ],
    growthAdvice: {
      weakness: '耐心专注（65分）方面还有提升空间',
      suggestion: '建议通过游戏化的方式，逐步增加专注时间：从每次5分钟开始，配合趣味性强的科学实验，逐渐延长到15-20分钟。可以使用番茄钟技巧配合奖励机制。'
    },
    expertTip: '科技创新型的孩子往往对新事物充满好奇。家长可以多提供动手实验的机会，如简单的电路制作、植物观察日记等，既能满足探索欲，又能培养持久专注力。记得给予充分的试错空间。',
    coreAbilityData: [
      { id: 'core-1-1', subject: '抗压能力', myScore: 78, average: 70, fullMark: 100 },
      { id: 'core-1-2', subject: '挑战精神', myScore: 82, average: 68, fullMark: 100 },
      { id: 'core-1-3', subject: '学习热情', myScore: 90, average: 75, fullMark: 100 },
      { id: 'core-1-4', subject: '创造力', myScore: 85, average: 65, fullMark: 100 },
      { id: 'core-1-5', subject: '逻辑思维', myScore: 88, average: 72, fullMark: 100 },
      { id: 'core-1-6', subject: '耐心专注', myScore: 65, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-1-1', dimension: '探索倾向', average: 70, myScore: 85, fullMark: 100 },
      { id: 'potential-1-2', dimension: '逻辑推演', average: 68, myScore: 88, fullMark: 100 },
      { id: 'potential-1-3', dimension: '文化共情', average: 65, myScore: 82, fullMark: 100 },
      { id: 'potential-1-4', dimension: '持久专注', average: 72, myScore: 65, fullMark: 100 },
      { id: 'potential-1-5', dimension: '科学观察', average: 60, myScore: 90, fullMark: 100 },
      { id: 'potential-1-6', dimension: '信息提取', average: 70, myScore: 87, fullMark: 100 },
      { id: 'potential-1-7', dimension: '创造力', average: 66, myScore: 86, fullMark: 100 },
      { id: 'potential-1-8', dimension: '协作意识', average: 68, myScore: 79, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-1-1', name: '逻辑推理', value: 30, color: '#FF7A00' },
      { id: 'pie-1-2', name: '创意思维', value: 25, color: '#FFA940' },
      { id: 'pie-1-3', name: '问题解决', value: 20, color: '#FFD591' },
      { id: 'pie-1-4', name: '团队协作', value: 15, color: '#87d9d4' },
      { id: 'pie-1-5', name: '情绪管理', value: 10, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-1-1', emoji: '🔬', name: '小小博物学家', metric: '科学观察高分', score: 90 },
      { id: 'badge-1-2', emoji: '🧩', name: '逻辑小达人', metric: '逻辑推演高分', score: 88 },
      { id: 'badge-1-3', emoji: '🏮', name: '文化守护者', metric: '文化共情高分', score: 82 },
      { id: 'badge-1-4', emoji: '🎨', name: '创意探索者', metric: '探索倾向高分', score: 85 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了极高的科学观察能力（90分）和逻辑推演能力（88分），在四幕决策题中能够独立分析问题并提出创新性解决方案。同时在文化共情（82分）和探索倾向（85分）方面也表现优异。虽然在持久专注维度还有提升空间（65分），但其出色的综合表现预示了极佳的学习潜力。建议在后续学习中，通过有趣的游戏化互动和动手实验，逐步提升专注力和协作意识。'
  },

  '工程实践型': {
    id: '工程实践型',
    name: '工程实践型',
    englishName: 'Engineering Practice Type',
    order: 2,
    description: '您的孩子在 Engineering 维度表现突出，得分显著高于其他维度，显示出强烈的动手实践能力和系统设计思维。在任务中善于将想法转化为具体方案，注重可行性和实用性。建议提供更多工程类项目机会，如机器人搭建、结构设计、产品原型制作等，同时加强数学和科学理论学习，提升工程设计的科学性和创新性。',
    stemScore: 88,
    level: '领先水平',
    tasksCompleted: 22,
    growthDays: 10,
    strengths: [
      { name: '创造力', score: 92 },
      { name: '逻辑推演', score: 90 },
      { name: '持久专注', score: 88 }
    ],
    growthAdvice: {
      weakness: '文化共情（74分）方面还有提升空间',
      suggestion: '建议通过游戏化的方式，结合真实工程项目，从每次8分钟实践开始，逐步延长到20-25分钟。可搭配结构搭建任务+迭代优化机制。'
    },
    expertTip: '工程实践型的孩子天生擅长把想法变成实物。家长可以多提供动手项目机会，如机器人搭建、桥梁结构设计、产品原型制作等，既能满足实践欲，又能自然培养系统思维。记得给予充分的试错与迭代空间——每一次调整，都是他们工程能力的提升。',
    coreAbilityData: [
      { id: 'core-2-1', subject: '抗压能力', myScore: 82, average: 70, fullMark: 100 },
      { id: 'core-2-2', subject: '挑战精神', myScore: 87, average: 68, fullMark: 100 },
      { id: 'core-2-3', subject: '学习热情', myScore: 85, average: 75, fullMark: 100 },
      { id: 'core-2-4', subject: '创造力', myScore: 92, average: 65, fullMark: 100 },
      { id: 'core-2-5', subject: '逻辑思维', myScore: 90, average: 72, fullMark: 100 },
      { id: 'core-2-6', subject: '耐心专注', myScore: 88, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-2-1', dimension: '探索倾向', average: 70, myScore: 83, fullMark: 100 },
      { id: 'potential-2-2', dimension: '逻辑推演', average: 68, myScore: 90, fullMark: 100 },
      { id: 'potential-2-3', dimension: '文化共情', average: 65, myScore: 74, fullMark: 100 },
      { id: 'potential-2-4', dimension: '持久专注', average: 72, myScore: 88, fullMark: 100 },
      { id: 'potential-2-5', dimension: '科学观察', average: 60, myScore: 85, fullMark: 100 },
      { id: 'potential-2-6', dimension: '信息提取', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-2-7', dimension: '创造力', average: 66, myScore: 92, fullMark: 100 },
      { id: 'potential-2-8', dimension: '协作意识', average: 68, myScore: 86, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-2-1', name: '逻辑推理', value: 28, color: '#FF7A00' },
      { id: 'pie-2-2', name: '创意思维', value: 22, color: '#FFA940' },
      { id: 'pie-2-3', name: '问题解决', value: 25, color: '#FFD591' },
      { id: 'pie-2-4', name: '团队协作', value: 18, color: '#87d9d4' },
      { id: 'pie-2-5', name: '情绪管理', value: 7, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-2-1', emoji: '🛠️', name: '小小工程师', metric: '创造力高分', score: 92 },
      { id: 'badge-2-2', emoji: '🔧', name: '实践达人', metric: '逻辑推演高分', score: 90 },
      { id: 'badge-2-3', emoji: '⏳', name: '专注建造者', metric: '持久专注高分', score: 88 },
      { id: 'badge-2-4', emoji: '📐', name: '系统设计者', metric: '信息提取高分', score: 89 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的工程实践型特质：创造力（92分）和逻辑推演能力（90分）极为突出，在四幕决策题中能够快速将想法转化为可行方案，并注重实用性与迭代优化。同时在持久专注（88分）和信息提取（89分）方面也表现优异。虽然在文化共情维度还有提升空间（74分），但其出色的动手实践能力和系统设计思维预示了极佳的工程领域潜力。建议在后续学习中，通过更多真实工程项目和动手实验，逐步提升文化共情与协作意识，让孩子在机器人、结构设计等领域持续领先。'
  },

  '基础培养型': {
    id: '基础培养型',
    name: '基础培养型',
    englishName: 'Foundation Building Type',
    order: 3,
    description: '您的孩子在 STEM-A 各维度得分处于中等水平，尚未形成明显的优势领域，但展现出良好的学习潜力和成长空间。建议采用多元化的启蒙方式，通过游戏化学习、动手实践等方式激发兴趣，逐步发现孩子的天赋倾向。重点关注学习过程中的积极反馈，建立自信心，避免过早定向培养，为未来发展打下坚实基础。',
    stemScore: 76,
    level: '良好水平',
    tasksCompleted: 18,
    growthDays: 6,
    strengths: [
      { name: '学习热情', score: 82 },
      { name: '探索倾向', score: 80 },
      { name: '协作意识', score: 78 }
    ],
    growthAdvice: {
      weakness: '各维度目前处于均衡发展阶段，暂无明显短板，但整体得分仍有提升空间',
      suggestion: '建议采用多元化的游戏化启蒙方式，从每次10分钟趣味探索开始，逐步扩展到不同领域活动，重点给予积极反馈以建立学习自信心。'
    },
    expertTip: '基础培养型的孩子正处于潜力萌芽阶段，各方面都展现出良好的成长空间。家长可以多采用多元化的启蒙方式，如游戏化学习、动手实践、故事探索等，逐步发现孩子的兴趣点。记得在学习过程中给予充分的积极反馈和鼓励，避免过早定向培养，让孩子在宽松愉快的环境中自然打下坚实基础。',
    coreAbilityData: [
      { id: 'core-3-1', subject: '抗压能力', myScore: 72, average: 70, fullMark: 100 },
      { id: 'core-3-2', subject: '挑战精神', myScore: 75, average: 68, fullMark: 100 },
      { id: 'core-3-3', subject: '学习热情', myScore: 82, average: 75, fullMark: 100 },
      { id: 'core-3-4', subject: '创造力', myScore: 76, average: 65, fullMark: 100 },
      { id: 'core-3-5', subject: '逻辑思维', myScore: 74, average: 72, fullMark: 100 },
      { id: 'core-3-6', subject: '耐心专注', myScore: 73, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-3-1', dimension: '探索倾向', average: 70, myScore: 80, fullMark: 100 },
      { id: 'potential-3-2', dimension: '逻辑推演', average: 68, myScore: 75, fullMark: 100 },
      { id: 'potential-3-3', dimension: '文化共情', average: 65, myScore: 77, fullMark: 100 },
      { id: 'potential-3-4', dimension: '持久专注', average: 72, myScore: 73, fullMark: 100 },
      { id: 'potential-3-5', dimension: '科学观察', average: 60, myScore: 76, fullMark: 100 },
      { id: 'potential-3-6', dimension: '信息提取', average: 70, myScore: 74, fullMark: 100 },
      { id: 'potential-3-7', dimension: '创造力', average: 66, myScore: 78, fullMark: 100 },
      { id: 'potential-3-8', dimension: '协作意识', average: 68, myScore: 79, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-3-1', name: '逻辑推理', value: 22, color: '#FF7A00' },
      { id: 'pie-3-2', name: '创意思维', value: 20, color: '#FFA940' },
      { id: 'pie-3-3', name: '问题解决', value: 18, color: '#FFD591' },
      { id: 'pie-3-4', name: '团队协作', value: 25, color: '#87d9d4' },
      { id: 'pie-3-5', name: '情绪管理', value: 15, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-3-1', emoji: '🌱', name: '潜力探索者', metric: '探索倾向高分', score: 80 },
      { id: 'badge-3-2', emoji: '📚', name: '基础筑造者', metric: '学习热情高分', score: 82 },
      { id: 'badge-3-3', emoji: '🤝', name: '协作小能手', metric: '协作意识高分', score: 79 },
      { id: 'badge-3-4', emoji: '🧩', name: '均衡发展者', metric: '创造力高分', score: 78 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的基础培养型特质：各STEM-A维度得分均衡，学习热情（82分）和探索倾向（80分）相对突出，在四幕决策题中能够积极参与并保持良好的学习心态。同时在协作意识（79分）和创造力（78分）方面也表现稳定。虽然目前尚未形成明显优势领域，但其均衡的发展态势和良好的成长空间预示了极佳的学习潜力。建议在后续学习中，通过多元化的游戏化互动和动手实践，持续给予积极反馈，逐步发现并培养孩子的兴趣点，为未来全面发展打下坚实基础。'
  },

  '技术应用型': {
    id: '技术应用型',
    name: '技术应用型',
    englishName: 'Technology Application Type',
    order: 4,
    description: '您的孩子在 Technology 维度表现优异，对技术工具和数字化应用展现出浓厚兴趣和快速学习能力。善于运用技术手段解决实际问题，对新技术接受度高。建议引导孩子深入学习编程、数据分析等技术技能，参与科技创新项目，同时培养技术伦理意识和批判性思维，避免过度依赖技术而忽视其他能力的发展。',
    stemScore: 87,
    level: '领先水平',
    tasksCompleted: 21,
    growthDays: 9,
    strengths: [
      { name: '信息提取', score: 91 },
      { name: '逻辑推演', score: 89 },
      { name: '创造力', score: 88 }
    ],
    growthAdvice: {
      weakness: '文化共情（72分）方面还有提升空间',
      suggestion: '建议通过游戏化的方式，引导孩子深入学习编程与数据分析技能，从每次6分钟技术实践开始，逐步延长到18-22分钟，并结合科技创新小项目培养技术伦理意识。'
    },
    expertTip: '技术应用型的孩子对新技术充满热情，善于用技术工具解决实际问题。家长可以多引导他们学习编程、数据分析等技能，参与创客项目或科技创新竞赛。同时注意培养批判性思维和技术伦理意识，避免过度依赖技术，保持与其他能力的平衡发展。',
    coreAbilityData: [
      { id: 'core-4-1', subject: '抗压能力', myScore: 80, average: 70, fullMark: 100 },
      { id: 'core-4-2', subject: '挑战精神', myScore: 85, average: 68, fullMark: 100 },
      { id: 'core-4-3', subject: '学习热情', myScore: 86, average: 75, fullMark: 100 },
      { id: 'core-4-4', subject: '创造力', myScore: 88, average: 65, fullMark: 100 },
      { id: 'core-4-5', subject: '逻辑思维', myScore: 89, average: 72, fullMark: 100 },
      { id: 'core-4-6', subject: '耐心专注', myScore: 84, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-4-1', dimension: '探索倾向', average: 70, myScore: 86, fullMark: 100 },
      { id: 'potential-4-2', dimension: '逻辑推演', average: 68, myScore: 89, fullMark: 100 },
      { id: 'potential-4-3', dimension: '文化共情', average: 65, myScore: 72, fullMark: 100 },
      { id: 'potential-4-4', dimension: '持久专注', average: 72, myScore: 84, fullMark: 100 },
      { id: 'potential-4-5', dimension: '科学观察', average: 60, myScore: 87, fullMark: 100 },
      { id: 'potential-4-6', dimension: '信息提取', average: 70, myScore: 91, fullMark: 100 },
      { id: 'potential-4-7', dimension: '创造力', average: 66, myScore: 88, fullMark: 100 },
      { id: 'potential-4-8', dimension: '协作意识', average: 68, myScore: 81, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-4-1', name: '逻辑推理', value: 32, color: '#FF7A00' },
      { id: 'pie-4-2', name: '创意思维', value: 26, color: '#FFA940' },
      { id: 'pie-4-3', name: '问题解决', value: 23, color: '#FFD591' },
      { id: 'pie-4-4', name: '团队协作', value: 12, color: '#87d9d4' },
      { id: 'pie-4-5', name: '情绪管理', value: 7, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-4-1', emoji: '💻', name: '数字应用达人', metric: '信息提取高分', score: 91 },
      { id: 'badge-4-2', emoji: '⚙️', name: '技术创新者', metric: '逻辑推演高分', score: 89 },
      { id: 'badge-4-3', emoji: '🔍', name: '快速学习者', metric: '创造力高分', score: 88 },
      { id: 'badge-4-4', emoji: '📱', name: '科技实践家', metric: '科学观察高分', score: 87 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的技术应用型特质：信息提取能力（91分）和逻辑推演能力（89分）极为突出，在四幕决策题中能够快速掌握技术工具并运用其解决实际问题。同时在创造力（88分）和科学观察（87分）方面也表现优异。虽然在文化共情维度还有提升空间（72分），但其对新技术的接受度和实践能力预示了极佳的技术应用潜力。建议在后续学习中，通过编程、数据分析等技能训练和科技创新项目，同步培养技术伦理意识与批判性思维，让孩子在科技领域持续领先并实现全面发展。'
  },

  '科学艺术融合型': {
    id: '科学艺术融合型',
    name: '科学艺术融合型',
    englishName: 'Science-Arts Integration Type',
    order: 5,
    description: '您的孩子在 Science 和 Arts 两个维度均表现优异，显示出罕见的理性思维与感性表达的平衡能力。既能进行科学探究，又具备艺术创造力，善于将科学概念通过艺术形式呈现。建议提供跨学科融合项目，如科学可视化、生物艺术、数字媒体创作等，充分发挥其独特优势，培养创新型复合人才所需的综合素养。',
    stemScore: 89,
    level: '领先水平',
    tasksCompleted: 23,
    growthDays: 11,
    strengths: [
      { name: '科学观察', score: 93 },
      { name: '创造力', score: 92 },
      { name: '文化共情', score: 91 }
    ],
    growthAdvice: {
      weakness: '协作意识（76分）方面还有提升空间',
      suggestion: '建议通过跨学科融合项目，从每次7分钟科学艺术实践开始，逐步延长到20-25分钟，参与科学可视化、生物艺术或数字媒体创作等活动。'
    },
    expertTip: '科学艺术融合型的孩子拥有罕见的理性与感性平衡能力，善于将科学概念转化为艺术表达。家长可以多提供跨学科融合项目，如科学可视化、生物艺术、数字媒体创作等，既能激发创造力，又能深化科学理解。记得鼓励他们大胆融合不同领域，充分发挥独特优势，成长为创新型复合人才。',
    coreAbilityData: [
      { id: 'core-5-1', subject: '抗压能力', myScore: 81, average: 70, fullMark: 100 },
      { id: 'core-5-2', subject: '挑战精神', myScore: 86, average: 68, fullMark: 100 },
      { id: 'core-5-3', subject: '学习热情', myScore: 89, average: 75, fullMark: 100 },
      { id: 'core-5-4', subject: '创造力', myScore: 92, average: 65, fullMark: 100 },
      { id: 'core-5-5', subject: '逻辑思维', myScore: 88, average: 72, fullMark: 100 },
      { id: 'core-5-6', subject: '耐心专注', myScore: 85, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-5-1', dimension: '探索倾向', average: 70, myScore: 88, fullMark: 100 },
      { id: 'potential-5-2', dimension: '逻辑推演', average: 68, myScore: 87, fullMark: 100 },
      { id: 'potential-5-3', dimension: '文化共情', average: 65, myScore: 91, fullMark: 100 },
      { id: 'potential-5-4', dimension: '持久专注', average: 72, myScore: 85, fullMark: 100 },
      { id: 'potential-5-5', dimension: '科学观察', average: 60, myScore: 93, fullMark: 100 },
      { id: 'potential-5-6', dimension: '信息提取', average: 70, myScore: 86, fullMark: 100 },
      { id: 'potential-5-7', dimension: '创造力', average: 66, myScore: 92, fullMark: 100 },
      { id: 'potential-5-8', dimension: '协作意识', average: 68, myScore: 76, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-5-1', name: '逻辑推理', value: 25, color: '#FF7A00' },
      { id: 'pie-5-2', name: '创意思维', value: 32, color: '#FFA940' },
      { id: 'pie-5-3', name: '问题解决', value: 18, color: '#FFD591' },
      { id: 'pie-5-4', name: '团队协作', value: 14, color: '#87d9d4' },
      { id: 'pie-5-5', name: '情绪管理', value: 11, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-5-1', emoji: '🎨', name: '科学艺术家', metric: '创造力高分', score: 92 },
      { id: 'badge-5-2', emoji: '🔬', name: '艺术探索者', metric: '科学观察高分', score: 93 },
      { id: 'badge-5-3', emoji: '🌈', name: '融合表达者', metric: '文化共情高分', score: 91 },
      { id: 'badge-5-4', emoji: '🖼️', name: '可视化达人', metric: '探索倾向高分', score: 88 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的科学艺术融合型特质：科学观察能力（93分）和创造力（92分）极为突出，在四幕决策题中能够将科学概念通过艺术形式生动呈现，展现出理性思维与感性表达的罕见平衡。同时在文化共情（91分）和探索倾向（88分）方面也表现优异。虽然在协作意识维度还有提升空间（76分），但其独特的跨学科融合能力预示了极佳的创新潜力。建议在后续学习中，通过科学可视化、生物艺术、数字媒体创作等跨学科项目，充分发挥优势，培养成为创新型复合人才。'
  },

  '逻辑思维型': {
    id: '逻辑思维型',
    name: '逻辑思维型',
    englishName: 'Logical Thinking Type',
    order: 6,
    description: '您的孩子在 Mathematics 和 Technology 维度表现突出，显示出强大的逻辑推理能力和系统性思维。善于运用逻辑分析解决问题，对规律和模式具有敏锐的洞察力。在任务中展现出较强的结构化思考能力和算法思维。建议深化逻辑类学习内容，如编程、算法、逻辑游戏等，同时引导将逻辑思维应用到科学探究和工程实践中，培养全面的问题解决能力。',
    stemScore: 86,
    level: '领先水平',
    tasksCompleted: 21,
    growthDays: 9,
    strengths: [
      { name: '逻辑推演', score: 93 },
      { name: '信息提取', score: 91 },
      { name: '逻辑思维', score: 92 }
    ],
    growthAdvice: {
      weakness: '文化共情（73分）方面还有提升空间',
      suggestion: '建议通过游戏化的方式，深化编程、算法和逻辑游戏训练，从每次6分钟结构���思考开始，逐步延长到18-22分钟，并引导将逻辑思维应用到科学探究和工程实践中。'
    },
    expertTip: '逻辑思维型的孩子对规律和模式具有敏锐洞察力，擅长用系统性思维解决问题。家长可以多提供编程、算法、逻辑游戏等学习内容，同时引导他们把逻辑分析应用到科学实验和工程设计中。记得鼓励结构化思考，培养全面的问题解决能力，让孩子的逻辑优势转化为实际创新成果。',
    coreAbilityData: [
      { id: 'core-6-1', subject: '抗压能力', myScore: 79, average: 70, fullMark: 100 },
      { id: 'core-6-2', subject: '挑战精神', myScore: 84, average: 68, fullMark: 100 },
      { id: 'core-6-3', subject: '学习热情', myScore: 85, average: 75, fullMark: 100 },
      { id: 'core-6-4', subject: '创造力', myScore: 83, average: 65, fullMark: 100 },
      { id: 'core-6-5', subject: '逻辑思维', myScore: 92, average: 72, fullMark: 100 },
      { id: 'core-6-6', subject: '耐心专注', myScore: 86, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-6-1', dimension: '探索倾向', average: 70, myScore: 84, fullMark: 100 },
      { id: 'potential-6-2', dimension: '逻辑推演', average: 68, myScore: 93, fullMark: 100 },
      { id: 'potential-6-3', dimension: '文化共情', average: 65, myScore: 73, fullMark: 100 },
      { id: 'potential-6-4', dimension: '持久专注', average: 72, myScore: 86, fullMark: 100 },
      { id: 'potential-6-5', dimension: '科学观察', average: 60, myScore: 88, fullMark: 100 },
      { id: 'potential-6-6', dimension: '信息提取', average: 70, myScore: 91, fullMark: 100 },
      { id: 'potential-6-7', dimension: '创造力', average: 66, myScore: 82, fullMark: 100 },
      { id: 'potential-6-8', dimension: '协作意识', average: 68, myScore: 80, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-6-1', name: '逻辑推理', value: 35, color: '#FF7A00' },
      { id: 'pie-6-2', name: '创意思维', value: 18, color: '#FFA940' },
      { id: 'pie-6-3', name: '问题解决', value: 27, color: '#FFD591' },
      { id: 'pie-6-4', name: '团队协作', value: 12, color: '#87d9d4' },
      { id: 'pie-6-5', name: '情绪管理', value: 8, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-6-1', emoji: '🧠', name: '逻辑小达人', metric: '逻辑推演高分', score: 93 },
      { id: 'badge-6-2', emoji: '🔍', name: '模式洞察者', metric: '信息提取高分', score: 91 },
      { id: 'badge-6-3', emoji: '📐', name: '系统思考家', metric: '逻辑思维高分', score: 92 },
      { id: 'badge-6-4', emoji: '⚙️', name: '算法实践者', metric: '持久专注高分', score: 86 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的逻辑思维型特质：逻辑推演能力（93分）和信息提取能力（91分）极为突出，在四幕决策题中能够快速识别规律、运用结构化思维分析问题并提出高效解决方案。同时在逻辑思维（92分）和科学观察（88分）方面也表现优异。虽然在文化共情维度还有提升空间（73分），但其强大的系统性思维和算法思维预示了极佳的问题解决潜力。建议在后续学习中，通过编程、算法、逻辑游戏等训练，并引导将逻辑思维应用到科学探究和工程实践中，培养全面且高效的问题解决能力。'
  },

  '潜力发展型': {
    id: '潜力发展型',
    name: '潜力发展型',
    englishName: 'Potential Development Type',
    order: 7,
    description: '您的孩子在 STEM-A 各维度得分较为均衡，但整体水平尚有提升空间，显示出良好的发展潜力。在学习过程中表现出积极的参与态度和较强的适应能力。建议通过系统化的能力培养计划，针对性地提升各维度表现，同时关注孩子的兴趣点，逐步发现并强化优势领域，为未来的专业化发展奠定基础。',
    stemScore: 79,
    level: '良好水平',
    tasksCompleted: 19,
    growthDays: 7,
    strengths: [
      { name: '学习热情', score: 84 },
      { name: '适应能力', score: 82 },
      { name: '探索倾向', score: 81 }
    ],
    growthAdvice: {
      weakness: '各维度目前较为均衡，但整体水平仍有提升空间',
      suggestion: '建议通过系统化的能力培养计划，从每次8分钟针对性练习开始，逐步扩展到不同领域活动，同时关注孩子的兴趣点并强化优势领域。'
    },
    expertTip: '潜力发展型的孩子各维度发展均衡，展现出良好的成长潜力和积极的参与态度。家长可以采用系统化的能力培养计划，针对性地提升各维度表现，同时密切关注孩子的兴趣点，逐步发现并强化优势领域。给予充分的鼓励和正面反馈，让孩子在宽松的环境中自然打下坚实基础，为未来的专业化发展做好准备。',
    coreAbilityData: [
      { id: 'core-7-1', subject: '抗压能力', myScore: 76, average: 70, fullMark: 100 },
      { id: 'core-7-2', subject: '挑战精神', myScore: 78, average: 68, fullMark: 100 },
      { id: 'core-7-3', subject: '学习热情', myScore: 84, average: 75, fullMark: 100 },
      { id: 'core-7-4', subject: '创造力', myScore: 77, average: 65, fullMark: 100 },
      { id: 'core-7-5', subject: '逻辑思维', myScore: 75, average: 72, fullMark: 100 },
      { id: 'core-7-6', subject: '耐心专注', myScore: 79, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-7-1', dimension: '探索倾向', average: 70, myScore: 81, fullMark: 100 },
      { id: 'potential-7-2', dimension: '逻辑推演', average: 68, myScore: 76, fullMark: 100 },
      { id: 'potential-7-3', dimension: '文化共情', average: 65, myScore: 78, fullMark: 100 },
      { id: 'potential-7-4', dimension: '持久专注', average: 72, myScore: 79, fullMark: 100 },
      { id: 'potential-7-5', dimension: '科学观察', average: 60, myScore: 77, fullMark: 100 },
      { id: 'potential-7-6', dimension: '信息提取', average: 70, myScore: 75, fullMark: 100 },
      { id: 'potential-7-7', dimension: '创造力', average: 66, myScore: 80, fullMark: 100 },
      { id: 'potential-7-8', dimension: '协作意识', average: 68, myScore: 82, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-7-1', name: '逻辑推理', value: 20, color: '#FF7A00' },
      { id: 'pie-7-2', name: '创意思维', value: 21, color: '#FFA940' },
      { id: 'pie-7-3', name: '问题解决', value: 19, color: '#FFD591' },
      { id: 'pie-7-4', name: '团队协作', value: 22, color: '#87d9d4' },
      { id: 'pie-7-5', name: '情绪管理', value: 18, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-7-1', emoji: '🌟', name: '潜力先锋', metric: '探索倾向高分', score: 81 },
      { id: 'badge-7-2', emoji: '📈', name: '均衡发展者', metric: '学习热情高分', score: 84 },
      { id: 'badge-7-3', emoji: '🤝', name: '适应小能手', metric: '协作意识高分', score: 82 },
      { id: 'badge-7-4', emoji: '🛠️', name: '成长筑基者', metric: '持久专注高分', score: 79 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的潜力发展型特质：各STEM-A维度得分较为均衡，学习热情（84分）和探索倾向（81分）相对突出，在四幕决策题中能够积极参与并展现出较强的适应能力。同时在协作意识（82分）和创造力（80分）方面也表现稳定。虽然整体水平尚有提升空间，但其良好的发展潜力和积极参与态度预示了极佳的成长前景。建议在后续学习中，通过系统化的能力培养计划，针对性地提升各维度表现，同时关注兴趣点并逐步强化优势领域，为未来的专业化发展奠定坚实基础。'
  },

  '全面发展型': {
    id: '全面发展��',
    name: '全面发展型',
    englishName: 'Well-Rounded Development Type',
    order: 8,
    description: '您的孩子在 STEM-A 五个维度均表现优异，各科得分均衡且都处于较高水平，标准差较小。这表明孩子具备全面的认知能力和学习适应性，既能进行逻辑推理，又具备创造性思维。建议提供多元化的学习机会，鼓励跨学科项目探索，如 STEAM 综合课程、创客活动等，充分发挥其综合优势，培养未来领导力和创新能力。',
    stemScore: 91,
    level: '卓越水平',
    tasksCompleted: 24,
    growthDays: 12,
    strengths: [
      { name: '学习热情', score: 92 },
      { name: '创造力', score: 91 },
      { name: '逻辑思维', score: 90 }
    ],
    growthAdvice: {
      weakness: '各维度已非常均衡，无明显短板，但仍可通过多元跨学科项目进一步拓展',
      suggestion: '建议参与 STEAM 综合课程和创客活动，从每次10分钟跨领域探索开始，逐步扩展到团队协作项目，充分发挥综合优势。'
    },
    expertTip: '全面发展型的孩子在 STEM-A 各维度均表现优异，得分高度均衡，展现出极强的认知能力和学习适应性。家长可以多提供多元化的学习机会，如 STEAM 综合课程、创客活动、跨学科项目等，鼓励孩子在不同领域自由探索，充分发挥其综合优势，培养未来的领导力和创新能力。',
    coreAbilityData: [
      { id: 'core-8-1', subject: '抗压能力', myScore: 88, average: 70, fullMark: 100 },
      { id: 'core-8-2', subject: '挑战精神', myScore: 89, average: 68, fullMark: 100 },
      { id: 'core-8-3', subject: '学习热情', myScore: 92, average: 75, fullMark: 100 },
      { id: 'core-8-4', subject: '创造力', myScore: 91, average: 65, fullMark: 100 },
      { id: 'core-8-5', subject: '逻辑思维', myScore: 90, average: 72, fullMark: 100 },
      { id: 'core-8-6', subject: '耐心专注', myScore: 87, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-8-1', dimension: '探索倾向', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-8-2', dimension: '逻辑推演', average: 68, myScore: 90, fullMark: 100 },
      { id: 'potential-8-3', dimension: '文化共情', average: 65, myScore: 88, fullMark: 100 },
      { id: 'potential-8-4', dimension: '持久专注', average: 72, myScore: 87, fullMark: 100 },
      { id: 'potential-8-5', dimension: '科学观察', average: 60, myScore: 91, fullMark: 100 },
      { id: 'potential-8-6', dimension: '信息提取', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-8-7', dimension: '创造力', average: 66, myScore: 92, fullMark: 100 },
      { id: 'potential-8-8', dimension: '协作意识', average: 68, myScore: 90, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-8-1', name: '逻辑推理', value: 24, color: '#FF7A00' },
      { id: 'pie-8-2', name: '创意思维', value: 23, color: '#FFA940' },
      { id: 'pie-8-3', name: '问题解决', value: 21, color: '#FFD591' },
      { id: 'pie-8-4', name: '团队协作', value: 19, color: '#87d9d4' },
      { id: 'pie-8-5', name: '情绪管理', value: 13, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-8-1', emoji: '🌐', name: '全面发展者', metric: '学习热情���分', score: 92 },
      { id: 'badge-8-2', emoji: '⚖️', name: '均衡先锋', metric: '创造力高分', score: 92 },
      { id: 'badge-8-3', emoji: '🧠', name: '综合思考家', metric: '逻辑推演高分', score: 90 },
      { id: 'badge-8-4', emoji: '🤝', name: '跨界领导者', metric: '协作意识高分', score: 90 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的全面发展型特质：STEM-A 五个维度得分均处于优异水平，且高度均衡，学习热情（92分）和创造力（92分）尤为突出，在四幕决策题中能够灵活运用逻辑推理与创造性思维完成任务。同时在科学观察（91分）、逻辑推演（90分）和协作意识（90分）方面也表现优秀。各维度标准差极小，显示出强大的综合认知能力和学习适应性。建议在后续学习中，通过 STEAM 综合课程、创客活动等多元跨学科项目，充分发挥其综合优势，培养未来领导力和创新能力。'
  },

  '人文艺术型': {
    id: '人文艺术型',
    name: '人文艺术型',
    englishName: 'Humanities & Arts Type',
    order: 9,
    description: '您的孩子在 Arts 维度表现突出，得分明显高于其他维度，显示出强烈的艺术感知力和创造性表达能力。在互动中展现出丰富的情感表达和审美意识，对色彩、形式、叙事等艺术元素敏感。STEM 维度得分相对较低，建议通过跨学科项目（如科学绘画、音乐编程）将艺术兴趣与科学探索结合，培养更全面的思维方式。',
    stemScore: 83,
    level: '领先水平',
    tasksCompleted: 20,
    growthDays: 8,
    strengths: [
      { name: '创造力', score: 94 },
      { name: '文化共情', score: 93 },
      { name: '探索倾向', score: 89 }
    ],
    growthAdvice: {
      weakness: 'STEM 维度（尤其是逻辑推演 71分）相对较低',
      suggestion: '建议通过跨学科项目（如科学绘画、音乐编程），从每次7分钟艺术融合实践开始，逐步延长到18-22分钟，将艺术优势与科学探索自然结合。'
    },
    expertTip: '人文艺术型的孩子拥有强烈的艺术感知力和丰富的情感表达能力，对色彩、形式、叙事等元素极为敏感。家长可以多提供科学绘画、音乐编程等跨学科项目，让艺术兴趣与科学探索相互滋养。鼓励孩子大胆表达审美意识，同时逐步提升STEM相关能力，培养更全面的思维方式。',
    coreAbilityData: [
      { id: 'core-9-1', subject: '抗压能力', myScore: 78, average: 70, fullMark: 100 },
      { id: 'core-9-2', subject: '挑战精神', myScore: 80, average: 68, fullMark: 100 },
      { id: 'core-9-3', subject: '学习热情', myScore: 85, average: 75, fullMark: 100 },
      { id: 'core-9-4', subject: '创造力', myScore: 94, average: 65, fullMark: 100 },
      { id: 'core-9-5', subject: '逻辑思维', myScore: 76, average: 72, fullMark: 100 },
      { id: 'core-9-6', subject: '耐心专注', myScore: 82, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-9-1', dimension: '探索倾向', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-9-2', dimension: '逻辑推演', average: 68, myScore: 71, fullMark: 100 },
      { id: 'potential-9-3', dimension: '文化共情', average: 65, myScore: 93, fullMark: 100 },
      { id: 'potential-9-4', dimension: '持久专注', average: 72, myScore: 81, fullMark: 100 },
      { id: 'potential-9-5', dimension: '科学观察', average: 60, myScore: 79, fullMark: 100 },
      { id: 'potential-9-6', dimension: '信息提取', average: 70, myScore: 74, fullMark: 100 },
      { id: 'potential-9-7', dimension: '创造力', average: 66, myScore: 94, fullMark: 100 },
      { id: 'potential-9-8', dimension: '协作意识', average: 68, myScore: 85, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-9-1', name: '逻辑推理', value: 16, color: '#FF7A00' },
      { id: 'pie-9-2', name: '创意思维', value: 34, color: '#FFA940' },
      { id: 'pie-9-3', name: '问题解决', value: 19, color: '#FFD591' },
      { id: 'pie-9-4', name: '团队协作', value: 17, color: '#87d9d4' },
      { id: 'pie-9-5', name: '情绪管理', value: 14, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-9-1', emoji: '🎨', name: '艺术表达者', metric: '创造力高分', score: 94 },
      { id: 'badge-9-2', emoji: '🌈', name: '情感共情者', metric: '文化共情高分', score: 93 },
      { id: 'badge-9-3', emoji: '🖼️', name: '美学探索者', metric: '探索倾向高分', score: 89 },
      { id: 'badge-9-4', emoji: '🎭', name: '叙事创作者', metric: '持久专注高分', score: 81 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型人文艺术型特质：创造力（94分）和文化共情（93分）极为突出，在四幕决策题中能够以丰富的情感表达和审美意识完成任务，对艺术元素展现出高度敏感。同时在探索倾向（89分）和协作意识（85分）方面也表现优异。虽然STEM维度（尤其是逻辑推演71分）相对较低，但其强烈的艺术感知力和创造���表达能力预示了极佳的跨学科潜力。建议在后续学习中，通过科学绘画、音乐编程等跨学科项目，将艺术优势与科学探索深度融合，培养更全面的创新思维方式。'
  },

  '数学专才型': {
    id: '数学专才型',
    name: '数学专才型',
    englishName: 'Mathematics Specialist Type',
    order: 10,
    description: '您的孩子在 Mathematics 维度表现卓越，得分远超其他维度，显示出强大的数学思维能力和抽象推理能力。在问题解决中善于运用数学模型和逻辑分析，对数字和模式具有敏锐的洞察力。建议提供更具挑战性的数学学习内容，如奥数、数学建模等，同时引导将数学能力应用到科学、工程等领域，培养跨学科应用能力。',
    stemScore: 90,
    level: '卓越水平',
    tasksCompleted: 23,
    growthDays: 11,
    strengths: [
      { name: '逻辑推演', score: 94 },
      { name: '逻辑思维', score: 93 },
      { name: '信息提取', score: 91 }
    ],
    growthAdvice: {
      weakness: '文化共情（68分）和创造力（79分）相对较低',
      suggestion: '建议提供更具挑战性的数学学习内容（如奥数、数学建模），从每次8分钟高难度逻辑训练开始，逐步延长到20-25分钟，并引导将数学能力应用到科学实验和工程实践中。'
    },
    expertTip: '数学专才型的孩子拥有强大的数学思维和抽象推理能力，对数字和模式具有极强的洞察力。家长可以多提供奥数、数学建模等挑战性内容，同时引导他们把数学模型应用到科学探究和工程设计中。鼓励跨学科实践，让数学优势转化为更广泛的问题解决能力。',
    coreAbilityData: [
      { id: 'core-10-1', subject: '抗压能力', myScore: 83, average: 70, fullMark: 100 },
      { id: 'core-10-2', subject: '挑战精神', myScore: 88, average: 68, fullMark: 100 },
      { id: 'core-10-3', subject: '学习热情', myScore: 89, average: 75, fullMark: 100 },
      { id: 'core-10-4', subject: '创造力', myScore: 79, average: 65, fullMark: 100 },
      { id: 'core-10-5', subject: '逻辑思维', myScore: 93, average: 72, fullMark: 100 },
      { id: 'core-10-6', subject: '耐心专注', myScore: 87, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-10-1', dimension: '探索倾向', average: 70, myScore: 85, fullMark: 100 },
      { id: 'potential-10-2', dimension: '逻辑推演', average: 68, myScore: 94, fullMark: 100 },
      { id: 'potential-10-3', dimension: '文化共情', average: 65, myScore: 68, fullMark: 100 },
      { id: 'potential-10-4', dimension: '持久专注', average: 72, myScore: 87, fullMark: 100 },
      { id: 'potential-10-5', dimension: '科学观察', average: 60, myScore: 86, fullMark: 100 },
      { id: 'potential-10-6', dimension: '信息提取', average: 70, myScore: 91, fullMark: 100 },
      { id: 'potential-10-7', dimension: '创造力', average: 66, myScore: 82, fullMark: 100 },
      { id: 'potential-10-8', dimension: '协作意识', average: 68, myScore: 80, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-10-1', name: '逻辑推理', value: 38, color: '#FF7A00' },
      { id: 'pie-10-2', name: '创意思维', value: 17, color: '#FFA940' },
      { id: 'pie-10-3', name: '问题解决', value: 26, color: '#FFD591' },
      { id: 'pie-10-4', name: '团队协作', value: 11, color: '#87d9d4' },
      { id: 'pie-10-5', name: '情绪管理', value: 8, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-10-1', emoji: '🧮', name: '数学天才', metric: '逻辑推演高分', score: 94 },
      { id: 'badge-10-2', emoji: '📐', name: '模式大师', metric: '信息提取高分', score: 91 },
      { id: 'badge-10-3', emoji: '🔢', name: '抽象推理者', metric: '逻辑思维高分', score: 93 },
      { id: 'badge-10-4', emoji: '📊', name: '建模专家', metric: '持久专注高分', score: 87 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的数学专才型特质：逻辑推演能力（94分）和逻辑思维能力（93分）极为突出，在四幕决策题中能够熟练运用数学模型和逻辑分析解决问题，对数字和模式展现出敏锐洞察。同时在信息提取（91分）和科学观察（86分）方面也表现优异。虽然在文化共情维度还有提升空间（68分），但其强大的数学思维和抽象推理能力预示了极佳的专才潜力。建议在后续学习中，通过奥数、数学建模等挑战性内容，并引导将数学能力应用到科学、工程等领域，培养跨学科应用能力。'
  },

  '艺术创意型': {
    id: '艺术创意型',
    name: '艺术创意型',
    englishName: 'Arts & Creativity Type',
    order: 11,
    description: '您的孩子在 Arts 维度表现优异，同时在其他维度也展现出一定的创造性应用能力。善于将艺术思维融入问题解决过程，展现出独特的创意视角和表达方式。建议提供创意导向的跨学科项目，如设计思维、创意编程、多媒体创作等，鼓励将艺术创造力应用到科技、工程等领域，培养创新型思维和综合实践能力。',
    stemScore: 88,
    level: '领先水平',
    tasksCompleted: 22,
    growthDays: 10,
    strengths: [
      { name: '创造力', score: 93 },
      { name: '探索倾向', score: 90 },
      { name: '文化共情', score: 88 }
    ],
    growthAdvice: {
      weakness: '逻辑推演（76分）方面还有提升空间',
      suggestion: '建议通过创意导向的跨学科项目（如设计思维、创意编程、多媒体创作），从每次7分钟艺术创意实践开始，逐步延长到18-23分钟，并鼓励将艺术创造力应用到科技和工程领域。'
    },
    expertTip: '艺术创意型的孩子擅长将艺术思维融入问题解决，展现出独特的创意视角和表达方式。家长可以多提供设计思维、创意编程、多媒体创作等跨学科项目，让艺术优势自然延伸到科技与工程领域。鼓励孩子大胆尝试不同表达形式，培养创新型思维和综合实践能力。',
    coreAbilityData: [
      { id: 'core-11-1', subject: '抗压能力', myScore: 80, average: 70, fullMark: 100 },
      { id: 'core-11-2', subject: '挑战精神', myScore: 85, average: 68, fullMark: 100 },
      { id: 'core-11-3', subject: '学习热情', myScore: 87, average: 75, fullMark: 100 },
      { id: 'core-11-4', subject: '创造力', myScore: 93, average: 65, fullMark: 100 },
      { id: 'core-11-5', subject: '逻辑思维', myScore: 79, average: 72, fullMark: 100 },
      { id: 'core-11-6', subject: '耐心专注', myScore: 84, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-11-1', dimension: '探索倾向', average: 70, myScore: 90, fullMark: 100 },
      { id: 'potential-11-2', dimension: '逻辑推演', average: 68, myScore: 76, fullMark: 100 },
      { id: 'potential-11-3', dimension: '文化共情', average: 65, myScore: 88, fullMark: 100 },
      { id: 'potential-11-4', dimension: '持久专注', average: 72, myScore: 84, fullMark: 100 },
      { id: 'potential-11-5', dimension: '科学观察', average: 60, myScore: 82, fullMark: 100 },
      { id: 'potential-11-6', dimension: '信息提取', average: 70, myScore: 80, fullMark: 100 },
      { id: 'potential-11-7', dimension: '创造力', average: 66, myScore: 93, fullMark: 100 },
      { id: 'potential-11-8', dimension: '协作意识', average: 68, myScore: 86, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-11-1', name: '逻辑推理', value: 19, color: '#FF7A00' },
      { id: 'pie-11-2', name: '创意思维', value: 33, color: '#FFA940' },
      { id: 'pie-11-3', name: '问题解决', value: 20, color: '#FFD591' },
      { id: 'pie-11-4', name: '团队协作', value: 16, color: '#87d9d4' },
      { id: 'pie-11-5', name: '情绪管理', value: 12, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-11-1', emoji: '🎨', name: '创意艺术家', metric: '创造力高分', score: 93 },
      { id: 'badge-11-2', emoji: '💡', name: '艺术思维者', metric: '探索倾向高分', score: 90 },
      { id: 'badge-11-3', emoji: '🌟', name: '跨界融合者', metric: '文化共情高分', score: 88 },
      { id: 'badge-11-4', emoji: '🖌️', name: '创意表达者', metric: '持久专注高分', score: 84 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的艺术创意型特质：创造力（93分）和探索倾向（90分）极为突出，在四幕决策题中能够将艺术思维融入问题解决过程，展现出独特的创意视角和表达方式。同时在文化共情（88分）和协作意识（86分）方面也表现优异。虽然在逻辑推演维度还有提升空间（76分），但其强大的艺术创造性应用能力预示了极佳的创新潜力。建议在后续学习中，通过设计思维、创意编程、多媒体创作等跨学科项目，将艺术��造力应用到科技、工程等领域，培养创新型思维和综合实践能力。'
  },

  '艺术专才型': {
    id: '艺术专才型',
    name: '艺术专才型',
    englishName: 'Arts Specialist Type',
    order: 12,
    description: '您的孩子在 Arts 维度表现卓越，得分远超其他维度，显示出强烈的艺术天赋和创造性表达能力。对艺术形式具有敏锐的感知力和独特的审美视角，善于通过艺术媒介表达情感和想法。建议提供专业化的艺术培养，如绘画、音乐、舞蹈等，同时适当引入 STEM 元素（如数字艺术、音乐编程），培养跨学科的创新能力。',
    stemScore: 89,
    level: '卓越水平',
    tasksCompleted: 22,
    growthDays: 10,
    strengths: [
      { name: '创造力', score: 95 },
      { name: '文化共情', score: 92 },
      { name: '探索倾向', score: 90 }
    ],
    growthAdvice: {
      weakness: '逻辑推演（72分）和信息提取（75分）相对较低',
      suggestion: '建议提供专业化的艺术培养（如绘画、音乐、舞蹈），从每次7分钟专业艺术练习开始，逐步延长到20-25分钟，同时引入数字艺术、音乐编程等 STEM 元素，实现跨学科融合。'
    },
    expertTip: '艺术专才型的孩子拥有强烈的艺术天赋和独特的审美视角，善于通过艺术媒介表达情感和想法。家长可以提供绘画、音乐、舞蹈等专业化艺术培养，同时适当引入数字艺术、音乐编程等 STEM 元素，让艺术优势与科学、工程自然融合，培养跨学科的创新能力。',
    coreAbilityData: [
      { id: 'core-12-1', subject: '抗压能力', myScore: 79, average: 70, fullMark: 100 },
      { id: 'core-12-2', subject: '挑战精神', myScore: 83, average: 68, fullMark: 100 },
      { id: 'core-12-3', subject: '学习热情', myScore: 88, average: 75, fullMark: 100 },
      { id: 'core-12-4', subject: '创造力', myScore: 95, average: 65, fullMark: 100 },
      { id: 'core-12-5', subject: '逻辑思维', myScore: 74, average: 72, fullMark: 100 },
      { id: 'core-12-6', subject: '耐心专注', myScore: 85, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-12-1', dimension: '探索倾向', average: 70, myScore: 90, fullMark: 100 },
      { id: 'potential-12-2', dimension: '逻辑推演', average: 68, myScore: 72, fullMark: 100 },
      { id: 'potential-12-3', dimension: '文化共情', average: 65, myScore: 92, fullMark: 100 },
      { id: 'potential-12-4', dimension: '持久专注', average: 72, myScore: 85, fullMark: 100 },
      { id: 'potential-12-5', dimension: '科学观察', average: 60, myScore: 80, fullMark: 100 },
      { id: 'potential-12-6', dimension: '信息提取', average: 70, myScore: 75, fullMark: 100 },
      { id: 'potential-12-7', dimension: '创造力', average: 66, myScore: 95, fullMark: 100 },
      { id: 'potential-12-8', dimension: '协作意识', average: 68, myScore: 84, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-12-1', name: '逻辑推理', value: 15, color: '#FF7A00' },
      { id: 'pie-12-2', name: '创意思维', value: 36, color: '#FFA940' },
      { id: 'pie-12-3', name: '问题解决', value: 18, color: '#FFD591' },
      { id: 'pie-12-4', name: '团队协作', value: 17, color: '#87d9d4' },
      { id: 'pie-12-5', name: '情绪管理', value: 14, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-12-1', emoji: '🎨', name: '艺术天才', metric: '创造���高分', score: 95 },
      { id: 'badge-12-2', emoji: '🌟', name: '审美大师', metric: '文化共情高分', score: 92 },
      { id: 'badge-12-3', emoji: '🖼️', name: '创意表达者', metric: '探索倾向高分', score: 90 },
      { id: 'badge-12-4', emoji: '🎵', name: '艺术融合者', metric: '持久专注高分', score: 85 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的艺术专才型特质：创造力（95分）和文化共情（92分）极为突出，在四幕决策题中能够以敏锐的艺术感知力和独特的审美视角完成任务，善于通过艺术媒介表达情感和想法。同时在探索倾向（90分）和持久专注（85分）方面也表现优异。虽然在逻辑推演维度还有提升空间（72分），但其强烈的艺术天赋和创造性表达能力预示了极佳的专才潜力。建议在后续学习中，通过绘画、音乐、舞蹈等专业化艺术培养，同时适当引入数字艺术、音乐编程等 STEM 元素，培养跨学科的创新能力。'
  },

  '综合均衡型': {
    id: '综合均衡型',
    name: '综合均衡型',
    englishName: 'Comprehensive Balanced Type',
    order: 13,
    description: '您的孩子在 STEM-A 五个维度得分均衡，各科表现稳定且处于中上水平，标准差较小。这表明孩子具备良好的综合素养和学习适应性，能够在不同领域间灵活切换。建议提供多样化的学习体验，鼓励探索不同领域的深度学习，逐步发现并培养核心优势，同时保持各维度的均衡发展，为未来的多元化发展奠定基础。',
    stemScore: 86,
    level: '领先水平',
    tasksCompleted: 21,
    growthDays: 9,
    strengths: [
      { name: '学习热情', score: 88 },
      { name: '协作意识', score: 87 },
      { name: '探索倾向', score: 86 }
    ],
    growthAdvice: {
      weakness: '各维度已较为均衡，但仍可通过多样化体验进一步提升深度',
      suggestion: '建议提供多样化的学习体验，从每次8分钟跨领域探索开始，逐步扩展到不同领域深度学习，同时保持各维度的均衡发展。'
    },
    expertTip: '综合均衡型的孩子在 STEM-A 五个维度得分稳定且均衡，展现出良好的综合素养和学习适应性，能够灵活切换不同领域。家长可以提供多样化的学习体验，鼓励孩子探索不同领域的深度学习，逐步发现并培养核心优势，同时保持各维度的均衡发展，为未来的多元化发展奠定坚实基础。',
    coreAbilityData: [
      { id: 'core-13-1', subject: '抗压能力', myScore: 84, average: 70, fullMark: 100 },
      { id: 'core-13-2', subject: '挑战精神', myScore: 85, average: 68, fullMark: 100 },
      { id: 'core-13-3', subject: '学习热情', myScore: 88, average: 75, fullMark: 100 },
      { id: 'core-13-4', subject: '创造力', myScore: 83, average: 65, fullMark: 100 },
      { id: 'core-13-5', subject: '逻辑思维', myScore: 82, average: 72, fullMark: 100 },
      { id: 'core-13-6', subject: '耐心专注', myScore: 85, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-13-1', dimension: '探索倾向', average: 70, myScore: 86, fullMark: 100 },
      { id: 'potential-13-2', dimension: '逻辑推演', average: 68, myScore: 83, fullMark: 100 },
      { id: 'potential-13-3', dimension: '文化共情', average: 65, myScore: 84, fullMark: 100 },
      { id: 'potential-13-4', dimension: '持久专注', average: 72, myScore: 85, fullMark: 100 },
      { id: 'potential-13-5', dimension: '科学观察', average: 60, myScore: 84, fullMark: 100 },
      { id: 'potential-13-6', dimension: '信息提取', average: 70, myScore: 83, fullMark: 100 },
      { id: 'potential-13-7', dimension: '创造力', average: 66, myScore: 85, fullMark: 100 },
      { id: 'potential-13-8', dimension: '协作意识', average: 68, myScore: 87, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-13-1', name: '逻辑推理', value: 21, color: '#FF7A00' },
      { id: 'pie-13-2', name: '创意思维', value: 20, color: '#FFA940' },
      { id: 'pie-13-3', name: '问题解决', value: 22, color: '#FFD591' },
      { id: 'pie-13-4', name: '团队协作', value: 21, color: '#87d9d4' },
      { id: 'pie-13-5', name: '情绪管理', value: 16, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-13-1', emoji: '⚖️', name: '均衡发展者', metric: '学习热情高分', score: 88 },
      { id: 'badge-13-2', emoji: '🌐', name: '综合适应者', metric: '协作意识高分', score: 87 },
      { id: 'badge-13-3', emoji: '🔄', name: '灵活切换者', metric: '探索倾向高分', score: 86 },
      { id: 'badge-13-4', emoji: '📊', name: '稳定成长者', metric: '持久专注高分', score: 85 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的综合均衡型特质：STEM-A 五个维度得分均衡且均处于中上水平，学习热情（88分）和协作意识（87分）相对突出，在四幕决策题中能够灵活切换不同领域并保持稳定的学习适应性。同时在探索倾向（86分）和持久专注（85分）方面也表现良好。各维度标准差较小，显示出极佳的综合素养。建议在后续学习中，通过多样化的学习体验和跨领域深度探索，逐步发现并培养核心优势，同时保持各维度的均衡发展，为未来的多元化发展奠定坚实基础。'
  },

  'STEM精英型': {
    id: 'STEM精英型',
    name: 'STEM精英型',
    englishName: 'STEM Elite Type',
    order: 14,
    description: '您的孩子在 Science、Technology、Engineering 和 Mathematics 四个维度均表现出色，得分显著高于同龄平均水平。STEM 总分占比超过 75%，显示出强烈的理工科思维倾向。在问题解决过程中，逻辑推理能力突出，善于运用科学方法分析复杂情境。建议继续深化 STEM 领域的探索，参与科学竞赛、编程项目或工程挑战，同时适当补充艺术类活动以促进全面发展。',
    stemScore: 92,
    level: '卓越水平',
    tasksCompleted: 24,
    growthDays: 13,
    strengths: [
      { name: '逻辑推演', score: 94 },
      { name: '科学观察', score: 93 },
      { name: '信息提取', score: 92 }
    ],
    growthAdvice: {
      weakness: '文化共情（74分）方面相对较低',
      suggestion: '建议继续深化 STEM 领域的探索，参与科学竞赛、编程项目或工程挑战，从每次9分钟高强度 STEM 实践开始，逐步延长到25分钟，同时适当补充艺术类活动以促进全面发展。'
    },
    expertTip: 'STEM精英型的孩子在 Science、Technology、Engineering、Mathematics 四个维度表现出色，STEM 总分占比极高，展现出强烈的理工科思维倾向和科学方法应用能力。家长可以鼓励孩子参与科学竞赛、编程项目或工程挑战，同时适当补充艺术类活动，让 STEM 优势与创造力相互促进，实现更全面的发展。',
    coreAbilityData: [
      { id: 'core-14-1', subject: '抗压能力', myScore: 87, average: 70, fullMark: 100 },
      { id: 'core-14-2', subject: '挑战精神', myScore: 91, average: 68, fullMark: 100 },
      { id: 'core-14-3', subject: '学习热情', myScore: 90, average: 75, fullMark: 100 },
      { id: 'core-14-4', subject: '创造力', myScore: 82, average: 65, fullMark: 100 },
      { id: 'core-14-5', subject: '逻辑思维', myScore: 93, average: 72, fullMark: 100 },
      { id: 'core-14-6', subject: '耐心专注', myScore: 88, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-14-1', dimension: '探索倾向', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-14-2', dimension: '逻辑推演', average: 68, myScore: 94, fullMark: 100 },
      { id: 'potential-14-3', dimension: '文化共情', average: 65, myScore: 74, fullMark: 100 },
      { id: 'potential-14-4', dimension: '持久专注', average: 72, myScore: 88, fullMark: 100 },
      { id: 'potential-14-5', dimension: '科学观察', average: 60, myScore: 93, fullMark: 100 },
      { id: 'potential-14-6', dimension: '信息提取', average: 70, myScore: 92, fullMark: 100 },
      { id: 'potential-14-7', dimension: '创造力', average: 66, myScore: 85, fullMark: 100 },
      { id: 'potential-14-8', dimension: '协作意识', average: 68, myScore: 86, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-14-1', name: '逻辑推理', value: 34, color: '#FF7A00' },
      { id: 'pie-14-2', name: '创意思维', value: 19, color: '#FFA940' },
      { id: 'pie-14-3', name: '问题解决', value: 28, color: '#FFD591' },
      { id: 'pie-14-4', name: '团队协作', value: 13, color: '#87d9d4' },
      { id: 'pie-14-5', name: '情绪管理', value: 6, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-14-1', emoji: '🔬', name: 'STEM精英', metric: '科学观察高分', score: 93 },
      { id: 'badge-14-2', emoji: '🧠', name: '逻辑大师', metric: '逻辑推演高分', score: 94 },
      { id: 'badge-14-3', emoji: '⚙️', name: '工程达人', metric: '信息提取高分', score: 92 },
      { id: 'badge-14-4', emoji: '📐', name: '数学思维者', metric: '逻辑思维高分', score: 93 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的STEM精英型特质：逻辑推演能力（94分）、科学观察能力（93分）和信息提取能力（92分）极为突出，在四幕决策题中能够运用科学方法和逻辑推理分析复杂情境，STEM 总分占比显著高于平均水平。同时在学习热情（90分）和挑战精神（91分）方面也表现优异。虽然在文化共情维度还有提升空间（74分），但其强烈的理工科思维倾向和问题解决能力预示了极佳的 STEM 领域潜力。建议在后续学习中，继续深化科学竞赛、编程项目或工程挑战，同时适当补充艺术类活动，促进全面发展。'
  },

  '科学专才型': {
    id: '科学专才型',
    name: '科学专才型',
    englishName: 'Science Specialist Type',
    order: 15,
    description: '您的孩子在 Science 维度表现突出，得分显著高于其他维度，显示出强烈的科学探究精神和观察能力。对自然现象充满好奇，善于提出问题并通过实验验证假设。建议提供更多科学探索机会，如科学实验、自然观察、科学阅读等，同时引导将科学思维应用到其他学科，培养跨学科的问题解决能力和创新思维。',
    stemScore: 91,
    level: '卓越水平',
    tasksCompleted: 23,
    growthDays: 12,
    strengths: [
      { name: '科学观察', score: 94 },
      { name: '探索倾向', score: 93 },
      { name: '逻辑推演', score: 90 }
    ],
    growthAdvice: {
      weakness: '文化共情（71分）和协作意识（76分）相对较低',
      suggestion: '建议提供更多科学探索机会（如科学实验、自然观察、科学阅读），从每次8分钟实验验证训练开始，逐步延长到22-25分钟，同时引导将科学思维应用到其他学科。'
    },
    expertTip: '科学专才型的孩子对自然现象充满好奇，拥有强烈的科学探究精神和敏锐的观察能力，善于提出问题并通过实验验证假设。家长可以多提供科学实验、自然观察、科学阅读等探索机会，同时引导孩子把科学思维应用到其他学科，培养跨学科的问题解决能力和创新思维。',
    coreAbilityData: [
      { id: 'core-15-1', subject: '抗压能力', myScore: 85, average: 70, fullMark: 100 },
      { id: 'core-15-2', subject: '挑战精神', myScore: 89, average: 68, fullMark: 100 },
      { id: 'core-15-3', subject: '学习热情', myScore: 90, average: 75, fullMark: 100 },
      { id: 'core-15-4', subject: '创造力', myScore: 81, average: 65, fullMark: 100 },
      { id: 'core-15-5', subject: '逻辑思维', myScore: 88, average: 72, fullMark: 100 },
      { id: 'core-15-6', subject: '耐心专注', myScore: 86, average: 60, fullMark: 100 }
    ],
    potentialRadarData: [
      { id: 'potential-15-1', dimension: '探索倾向', average: 70, myScore: 93, fullMark: 100 },
      { id: 'potential-15-2', dimension: '逻辑推演', average: 68, myScore: 90, fullMark: 100 },
      { id: 'potential-15-3', dimension: '文化共情', average: 65, myScore: 71, fullMark: 100 },
      { id: 'potential-15-4', dimension: '持久专注', average: 72, myScore: 86, fullMark: 100 },
      { id: 'potential-15-5', dimension: '科学观察', average: 60, myScore: 94, fullMark: 100 },
      { id: 'potential-15-6', dimension: '信息提取', average: 70, myScore: 89, fullMark: 100 },
      { id: 'potential-15-7', dimension: '创造力', average: 66, myScore: 83, fullMark: 100 },
      { id: 'potential-15-8', dimension: '协作意识', average: 68, myScore: 76, fullMark: 100 }
    ],
    pieData: [
      { id: 'pie-15-1', name: '逻辑推理', value: 29, color: '#FF7A00' },
      { id: 'pie-15-2', name: '创意思维', value: 21, color: '#FFA940' },
      { id: 'pie-15-3', name: '问题解决', value: 27, color: '#FFD591' },
      { id: 'pie-15-4', name: '团队协作', value: 14, color: '#87d9d4' },
      { id: 'pie-15-5', name: '情绪管理', value: 9, color: '#d8cdf0' }
    ],
    badges: [
      { id: 'badge-15-1', emoji: '🔬', name: '科学探索者', metric: '科学观察高分', score: 94 },
      { emoji: '🌍', name: '自然观察家', metric: '探索倾向高分', score: 93 },
      { emoji: '🧪', name: '实验达人', metric: '逻辑推演高分', score: 90 },
      { emoji: '📖', name: '科学思考者', metric: '持久专注高分', score: 86 }
    ],
    potentialSummary: '孩子在《橘小橘》游戏中展现出了典型的科学专才型特质：科学观察能力（94分）和探索倾向（93分）极为突出，在四幕决策题中能够对自然现象提出问题并通过实验验证假设，展现出强烈的科学探究精神。同时在逻辑推演（90分）和学习热情（90分）方面也表现优异。虽然在文化共情维度还有提升空间（71分），但其敏锐的观察能力和实验验证能力预示了极佳的科学专才潜力。建议在后续学习中，通过科学实验、自然观察、科学阅读等探索机会，并引导将科学思维应用到其他学科，培养跨学科的问题解决能力和创新思维。'
  }
};

// 辅助函数：根据人格类型名称获取数据
export function getPersonalityTypeData(typeName: string): PersonalityTypeData | null {
  return personalityTypesData[typeName] || null;
}

// 导出所有人格类型名称列表
export const personalityTypeNames = Object.keys(personalityTypesData);
