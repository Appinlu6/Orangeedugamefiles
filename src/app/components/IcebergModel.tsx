import { ArrowLeft, Info, Sparkles, Zap } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface IcebergModelProps {
  onBack: () => void;
}

export function IcebergModel({ onBack }: IcebergModelProps) {
  const { t } = useLanguage();

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* 主要内容 */}
      <div className="relative size-full flex flex-col overflow-y-auto">
        {/* 顶部导航栏 */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b-2 border-orange-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center gap-2 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl border-3 border-orange-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="size-4 sm:size-5" />
                <span className="text-sm sm:text-base">返回</span>
              </button>
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
          
          {/* 主卡片容器 */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#b8b89a]">
            
            {/* 顶部标题区域 */}
            <div className="relative bg-gradient-to-r from-[#b8b89a] to-[#a8a888] px-6 sm:px-8 md:px-12 py-6 sm:py-8">
              {/* 认知力标签 */}
              <div className="absolute left-4 sm:left-6 top-4 sm:top-6 bg-white rounded-tr-2xl rounded-br-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-md">
                <span className="text-[#6b6b5a] text-sm sm:text-base font-medium">认知力</span>
              </div>
              
              {/* 主标题 */}
              <div className="text-center pt-8 sm:pt-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2">
                  冰山胜任力模型
                </h1>
                <p className="text-[#e8e8d8] text-sm sm:text-base">
                  深入认识自己、他人，挖掘隐藏在冰山之下的潜力、素质
                </p>
              </div>
            </div>

            {/* 冰山图示和文字说明区域 */}
            <div className="p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="relative max-w-6xl mx-auto">
                {/* 冰山图和标注的容器 - 使用grid布局 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* 左侧：冰山图示 */}
                  <div className="relative h-[700px] sm:h-[800px] flex items-center justify-center">
                    
                    {/* 显性/隐性大括号标记 */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-16">
                      {/* 显性指标 */}
                      <div className="flex items-center gap-2">
                        <svg width="30" height="180" className="text-gray-600">
                          <path d="M 5 10 Q 15 10 15 30 L 15 150 Q 15 170 5 170" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                fill="none"/>
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-700">显性</span>
                          <span className="text-xs text-gray-600 mt-1">30%</span>
                        </div>
                      </div>
                      
                      {/* 隐性指标 */}
                      <div className="flex items-center gap-2 pb-12">
                        <svg width="30" height="420" className="text-gray-600">
                          <path d="M 5 10 Q 15 10 15 50 L 15 370 Q 15 410 5 410" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                fill="none"/>
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-700">隐性</span>
                          <span className="text-xs text-gray-600 mt-1">70%</span>
                        </div>
                      </div>
                    </div>

                    {/* 冰山SVG */}
                    <div className="relative w-full max-w-[360px] h-full ml-12 sm:ml-16">
                      <svg viewBox="0 0 360 800" className="w-full h-full">
                        {/* 水面波浪线 */}
                        <line x1="0" y1="260" x2="360" y2="260" 
                              stroke="#87CEEB" 
                              strokeWidth="2.5" 
                              strokeDasharray="6,3" 
                              opacity="0.8" />
                        
                        {/* 冰山 - 水上部分 (30%) */}
                        <path
                          d="M 180 60 L 250 260 L 110 260 Z"
                          fill="url(#gradient-above-water)"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity="0.95"
                        />
                        
                        {/* 冰山 - 水下部分 (70%) */}
                        <path
                          d="M 110 260 L 250 260 L 290 420 L 280 550 L 250 670 L 180 750 L 110 670 L 80 550 L 70 420 Z"
                          fill="url(#gradient-below-water)"
                          stroke="#1e40af"
                          strokeWidth="2"
                          opacity="0.95"
                        />

                        {/* 渐变定义 */}
                        <defs>
                          {/* 水上部分：浅蓝色渐变 */}
                          <linearGradient id="gradient-above-water" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#93c5fd" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                          
                          {/* 水下部分：深蓝色渐变 */}
                          <linearGradient id="gradient-below-water" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="20%" stopColor="#3b82f6" />
                            <stop offset="40%" stopColor="#2563eb" />
                            <stop offset="60%" stopColor="#1d4ed8" />
                            <stop offset="80%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#1e3a8a" />
                          </linearGradient>
                        </defs>

                        {/* 文字标签 - 水上：后天可习得 */}
                        <text x="180" y="150" textAnchor="middle" fill="#1e40af" fontSize="15" fontWeight="600">
                          后天可习得
                        </text>
                        
                        {/* 水下分隔线 */}
                        <line x1="110" y1="390" x2="250" y2="390" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,2" />
                        <line x1="110" y1="520" x2="250" y2="520" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,2" />
                        <line x1="110" y1="640" x2="250" y2="640" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,2" />
                        
                        {/* 文字标签 - 可迁移 */}
                        <text x="180" y="345" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" opacity="0.9">
                          可迁移
                        </text>
                        
                        {/* 文字标签 - 难以改变 */}
                        <text x="180" y="570" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.85">
                          难
                        </text>
                        <text x="180" y="590" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.85">
                          以
                        </text>
                        <text x="180" y="610" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.85">
                          改
                        </text>
                        <text x="180" y="630" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" opacity="0.85">
                          变
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* 右侧：文字说明 - 与冰山高度对齐 */}
                  <div className="relative h-[700px] sm:h-[800px] flex flex-col justify-start pt-12">
                    <div className="flex-1 flex flex-col justify-between py-4">
                      
                      {/* 知识与技能 - 对应水上 (显性 30%) */}
                      <div className="space-y-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          知识与技能 
                          <span className="text-sm font-normal text-gray-600"> (S.T.E.A.M. & Culture)</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          植物生长周期、历史典故认知、基础词汇、2D 游戏操作
                        </p>
                        <p className="text-xs sm:text-sm text-blue-600">
                          📊 数据采集：正确率、通关时长、知识点解锁数
                        </p>
                      </div>

                      {/* 通用能力 - 对应水面附近 (可迁移) */}
                      <div className="space-y-2 bg-blue-50/50 rounded-lg p-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          通用能力 
                          <span className="text-sm font-normal text-gray-600"> (Soft Skills)</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                          逻辑推理（拼图）、空间感知（拖拽）、信息提取（听故事）
                        </p>
                        <p className="text-xs sm:text-sm text-blue-700">
                          📊 数据采集：提示使用率、错误路径尝试、任务完成路径
                        </p>
                      </div>

                      {/* 性格特征 - 对应水下 (隐性 70%) */}
                      <div className="space-y-2 bg-blue-100/50 rounded-lg p-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          性格特征 
                          <span className="text-sm font-normal text-gray-600"> (Behavioral Traits)</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                          坚持性（重试次数）、好奇心（互动点点击率）、创造力
                        </p>
                        <p className="text-xs sm:text-sm text-blue-800">
                          📊 数据采集：失败后的反馈行为、非任务区的探索行为
                        </p>
                      </div>

                      {/* 内在动机 - 对应水下深层 */}
                      <div className="space-y-2 bg-blue-200/50 rounded-lg p-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          内在动机 
                          <span className="text-sm font-normal text-gray-600"> (Intrinsic Drive)</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                          对自然科学的偏好 vs. 对人文故事的偏好
                        </p>
                        <p className="text-xs sm:text-sm text-blue-800">
                          📊 数据采集：自主选择的故事分支、停留时长分布
                        </p>
                      </div>

                      {/* 价值观 - 对应水下最深层 */}
                      <div className="space-y-2 bg-blue-300/50 rounded-lg p-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          价值观 
                          <span className="text-sm font-normal text-gray-600"> (Core Values)</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-900 leading-relaxed">
                          屈原精神引发的共情、对自然环境的保护意识
                        </p>
                        <p className="text-xs sm:text-sm text-blue-900">
                          📊 数据采集：故事关键节点的道德/情感决策选择
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部辅助说明 */}
            <div className="bg-gradient-to-br from-[#e8e6dc] to-[#d8d6cc] px-6 sm:px-8 md:px-12 py-6 sm:py-8">
              {/* 辅助说明标签 */}
              <div className="inline-block bg-[#b8b89a] text-white px-4 sm:px-6 py-2 rounded-tl-xl rounded-br-xl mb-6">
                <span className="text-sm sm:text-base font-medium">辅助说明</span>
              </div>

              {/* 表格 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-[#f5f3ed] border-b-2 border-[#d4c4a0]">
                        <th className="px-4 py-3 text-left text-sm sm:text-base text-gray-800 font-medium w-1/4">
                          动机（内因驱动）
                        </th>
                        <th className="px-4 py-3 text-left text-sm sm:text-base text-gray-800 font-medium w-1/4">
                          知识+技能
                        </th>
                        <th className="px-4 py-3 text-left text-sm sm:text-base text-gray-800 font-medium w-1/4">
                          通用能力
                        </th>
                        <th className="px-4 py-3 text-left text-sm sm:text-base text-gray-800 font-medium w-1/4">
                          个性特征+价值观
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 text-xs sm:text-sm text-gray-700 align-top">
                          <p className="leading-relaxed">
                            我想要做什么事？获得什么样的成就？
                          </p>
                        </td>
                        <td className="px-4 py-4 text-xs sm:text-sm text-gray-700 align-top">
                          <p className="leading-relaxed">
                            完成这件事需要具备什么样的知识和专业技能？
                          </p>
                        </td>
                        <td className="px-4 py-4 text-xs sm:text-sm text-gray-700 align-top">
                          <p className="leading-relaxed">
                            如果想更好地发展还需要具备哪些能力？
                          </p>
                        </td>
                        <td className="px-4 py-4 text-xs sm:text-sm text-gray-700 align-top">
                          <p className="leading-relaxed">
                            我的性格适合做这个工作吗？如何才能发挥自己的性格优势？
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 底部空间 */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}