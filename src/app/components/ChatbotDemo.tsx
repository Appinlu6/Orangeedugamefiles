import { MandarinChatbot } from './MandarinChatbot';

export function ChatbotDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            橘小橘 AI 导师演示
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            "Digital Humanistic Steam" 风格的儿童教育聊天机器人
          </p>
          <p className="text-lg text-gray-500">
            点击右下角的橘子按钮开始对话 🍊
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 设计特点 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-orange-100">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              🎨 设计特点
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>主题：</strong>数字人文蒸汽朋克 - 结合中国传统美学与现代科技</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>配色：</strong>柔和有机橙色（橘子色）+ 平静鼠尾草绿色</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>效果：</strong>32px 圆角 + 毛玻璃效果（Glassmorphism）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>动画：</strong>流畅的弹簧动画与微交互反馈</span>
              </li>
            </ul>
          </div>

          {/* 功能特点 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
              ✨ 功能特点
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>浮动按钮：</strong>可爱的橘子吉祥物 FAB，带在线状态指示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>情绪指示器：</strong>顶部发光条根据情感分析改变颜色</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>语音输入：</strong>支持麦克风语音输入功能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>快速回复：</strong>预设问题按钮，一键快速提问</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 使用场景 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-amber-100">
          <h2 className="text-2xl font-bold text-amber-600 mb-6 flex items-center gap-2">
            🎯 适用场景
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-gray-800 mb-2">古诗词学习</h3>
              <p className="text-sm text-gray-600">引导儿童学习屈原的《橘颂》等经典诗词</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-bold text-gray-800 mb-2">自然科普</h3>
              <p className="text-sm text-gray-600">讲解橘树种植、营养知识等科学内容</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-gray-800 mb-2">互动陪伴</h3>
              <p className="text-sm text-gray-600">提供共情鼓励，培养儿童表达能力</p>
            </div>
          </div>
        </div>

        {/* 技术栈说明 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>技术栈：React + TypeScript + Tailwind CSS + Motion（Framer Motion）</p>
          <p className="mt-2">目标用户：7-12岁儿童 | 移动优先设计 | 完全响应式布局</p>
        </div>
      </div>

      {/* 聊天机器人组件 */}
      <MandarinChatbot />
    </div>
  );
}
