import { ArrowLeft, TrendingUp, Award, Brain, Star, Target, Zap } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface GrowthReportProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function GrowthReport({ onBack, onNavigate }: GrowthReportProps) {
  const { t } = useLanguage();

  // STEM+A 雷达图数据（基于儿童心理学维度）
  const radarData = [
    { subject: '抗压能力', A: 85, fullMark: 100 },
    { subject: '挑战精神', A: 72, fullMark: 100 },
    { subject: '学习热情', A: 90, fullMark: 100 },
    { subject: '创造力', A: 78, fullMark: 100 },
    { subject: '逻辑思维', A: 88, fullMark: 100 },
    { subject: '耐心专注', A: 65, fullMark: 100 },
  ];

  // 成长趋势折线图数据
  const trendData = [
    { week: '第1周', score: 65 },
    { week: '第2周', score: 70 },
    { week: '第3周', score: 75 },
    { week: '第4周', score: 78 },
    { week: '第5周', score: 82 },
    { week: '第6周', score: 85 },
  ];

  // 学习类型分布饼图数据
  const pieData = [
    { name: '逻辑推理', value: 30, color: '#f59e9e' },
    { name: '创意思维', value: 25, color: '#87d9d4' },
    { name: '问题解决', value: 20, color: '#fff2a0' },
    { name: '团队协作', value: 15, color: '#b8ede3' },
    { name: '情绪管理', value: 10, color: '#d8cdf0' },
  ];

  // 8维潜能雷达图数据 - 双色重叠
  const potentialRadarData = [
    { dimension: '探索倾向', average: 70, myScore: 85, fullMark: 100 },
    { dimension: '逻辑推演', average: 68, myScore: 88, fullMark: 100 },
    { dimension: '文化共情', average: 65, myScore: 82, fullMark: 100 },
    { dimension: '持久专注', average: 72, myScore: 65, fullMark: 100 },
    { dimension: '科学观察', average: 60, myScore: 90, fullMark: 100 },
    { dimension: '信息提取', average: 70, myScore: 78, fullMark: 100 },
    { dimension: '创造力', average: 66, myScore: 75, fullMark: 100 },
    { dimension: '协作意识', average: 68, myScore: 70, fullMark: 100 },
  ];

  // 成长时间轴数据
  const timelineData = [
    {
      stage: '第一次尝试',
      date: '2025-01-15',
      task: '屈原事件决策',
      emotion: '😟 紧张',
      behavior: '犹豫不决',
      result: '失败',
      description: '面对复杂选择时表现出明显的不安，需要多次提示'
    },
    {
      stage: '多次尝试',
      date: '2025-01-18',
      task: '屈原事件决策',
      emotion: '🤔 思考',
      behavior: '主动分析',
      result: '进步中',
      description: '开始尝试自己分析问题，减少了对提示的依赖'
    },
    {
      stage: '成功完成',
      date: '2025-01-22',
      task: '屈原事件决策',
      emotion: '😊 自信',
      behavior: '独立决策',
      result: '成功',
      description: '能够独立分析利弊，做出合理决策，展现出良好的判断力'
    },
  ];

  return (
    <div className="size-full relative overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${exampleImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-purple-900/60" />
      </div>

      {/* 主要内容 */}
      <div className="relative size-full flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 animate-in fade-in slide-in-from-top duration-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 border-purple-900 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="size-4 sm:size-5 md:size-6" />
            <span className="text-sm sm:text-base md:text-xl">返回</span>
          </button>

          <div className="bg-gradient-to-b from-purple-700 to-purple-900 rounded-xl sm:rounded-2xl shadow-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 sm:border-3 md:border-4 border-purple-950">
            <h2 className="text-xl sm:text-2xl md:text-4xl text-purple-50 flex items-center gap-2" style={{ textShadow: '2px 2px 0 #581c87' }}>
              <Brain className="size-5 sm:size-6 md:size-8" />
              成长报告
            </h2>
            <p className="text-xs sm:text-sm md:text-xl text-purple-100 text-center mt-0.5 sm:mt-1">Growth Report - STEM+A</p>
          </div>

          <div className="w-12 sm:w-20 md:w-32" />
        </div>

        {/* 报告内容区 */}
        <div className="flex-1 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 pb-6">
          {/* 顶部统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom duration-700">
            <StatCard 
              icon={<TrendingUp className="size-6 sm:size-8" />}
              label="综合得分"
              value="85"
              unit="分"
              color="from-green-500 to-emerald-600"
            />
            <StatCard 
              icon={<Target className="size-6 sm:size-8" />}
              label="完成任务"
              value="24"
              unit="个"
              color="from-blue-500 to-cyan-600"
            />
            <StatCard 
              icon={<Zap className="size-6 sm:size-8" />}
              label="成长天数"
              value="42"
              unit="天"
              color="from-purple-400 to-pink-400"
            />
          </div>

          {/* AI 分析总结和建议 - 移到最上面 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 sm:p-3 rounded-xl">
                <Zap className="size-5 sm:size-6 md:size-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-amber-900">AI 专家分析与建议</h3>
                <p className="text-xs sm:text-sm text-amber-700">基于儿童发展心理学理论</p>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/70 rounded-xl p-3 sm:p-4">
                <h4 className="text-base sm:text-lg text-amber-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <span>优势领域</span>
                </h4>
                <p className="text-sm sm:text-base text-amber-800">
                  孩子在<strong>学习热情</strong>和<strong>逻辑思维</strong>方面表现优异，展现出强烈的求知欲和良好的分析能力。建议继续保持这种积极的学习态度。
                </p>
              </div>

              <div className="bg-white/70 rounded-xl p-3 sm:p-4">
                <h4 className="text-base sm:text-lg text-amber-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span>成长建议</span>
                </h4>
                <p className="text-sm sm:text-base text-amber-800">
                  在<strong>耐心专注</strong>方面还有提升空间。建议通过游化的方式，逐步增加专注时间，比如从5分钟开始，逐渐延长到15-20分钟。
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-3 sm:p-4 text-white">
                <h4 className="text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <span>解锁完整报告</span>
                </h4>
                <p className="text-sm sm:text-base mb-3">
                  获取完整的个性化成长计划、专家视频讲解、每月进度跟踪报告
                </p>
                <button 
                  onClick={() => onNavigate?.('iceberg-model')}
                  className="bg-white text-purple-700 px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  了解更多 →
                </button>
              </div>
            </div>
          </div>

          {/* 成长时间轴 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-indigo-600 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <h3 className="text-lg sm:text-xl md:text-2xl text-indigo-900 mb-4 sm:mb-6 flex items-center gap-2">
              <div className="size-2 sm:size-3 bg-indigo-600 rounded-full animate-pulse" />
              成长时间轴
              <span className="text-sm sm:text-base text-indigo-600 ml-2">(情绪与行为演进)</span>
            </h3>
            
            <div className="relative">
              {/* 纵向时间线 */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500" />
              
              <div className="space-y-6 sm:space-y-8">
                {timelineData.map((item, index) => (
                  <div key={index} className="relative pl-14 sm:pl-20">
                    {/* 时间轴节点 */}
                    <div className={`absolute left-3 sm:left-5 top-0 size-6 sm:size-8 rounded-full flex items-center justify-center shadow-lg ${
                      item.result === '成功' 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-4 ring-green-200' 
                        : item.result === '进步中'
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-500 ring-4 ring-blue-200'
                        : 'bg-gradient-to-br from-gray-300 to-gray-400 ring-4 ring-gray-200'
                    }`}>
                      {item.result === '成功' && <span className="text-white text-xs sm:text-sm">✓</span>}
                      {item.result === '进步中' && <span className="text-white text-xs sm:text-sm">↗</span>}
                      {item.result === '失败' && <span className="text-white text-xs sm:text-sm">×</span>}
                    </div>
                    
                    {/* 时间轴内容卡片 */}
                    <div className={`bg-gradient-to-br rounded-xl p-3 sm:p-4 transition-all hover:scale-[1.02] ${
                      item.result === '成功'
                        ? 'from-green-50 to-emerald-50 border-2 border-green-300'
                        : item.result === '进步中'
                        ? 'from-blue-50 to-cyan-50 border-2 border-blue-300'
                        : 'from-gray-50 to-gray-100 border-2 border-gray-300'
                    }`}>
                      {/* 阶段标题 */}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-base sm:text-lg font-bold ${
                          item.result === '成功' ? 'text-green-800' :
                          item.result === '进步中' ? 'text-blue-800' : 'text-gray-800'
                        }`}>
                          {item.stage}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-600">{item.date}</span>
                      </div>
                      
                      {/* 任务名称 */}
                      <div className="text-sm sm:text-base font-medium text-gray-700 mb-3">
                        📚 {item.task}
                      </div>
                      
                      {/* 情绪与行为变化 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        <div className="bg-white/70 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">情绪状态</div>
                          <div className="text-sm sm:text-base font-medium">{item.emotion}</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">行为表现</div>
                          <div className="text-sm sm:text-base font-medium">{item.behavior}</div>
                        </div>
                      </div>
                      
                      {/* 描述 */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* 结果标签 */}
                      <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        item.result === '成功' 
                          ? 'bg-green-500 text-white' 
                          : item.result === '进步中'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}>
                        {item.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 雷达图 - 能力维度 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-purple-600 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-left duration-700 delay-300">
            <h3 className="text-lg sm:text-xl md:text-2xl text-purple-900 mb-3 sm:mb-4 flex items-center gap-2">
              <div className="size-2 sm:size-3 bg-purple-600 rounded-full animate-pulse" />
              六维能力雷达图
              <span className="text-sm sm:text-base text-purple-600 ml-2">(基于专家心理学评估)</span>
            </h3>
            <div className="h-64 sm:h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#9333ea" strokeWidth={1} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#581c87', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#7c3aed' }} />
                  <Radar name="能力指数" dataKey="A" stroke="#9333ea" fill="#c084fc" fillOpacity={0.6} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 8维潜能雷达图 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-blue-600 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-left duration-700 delay-400">
            <h3 className="text-lg sm:text-xl md:text-2xl text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
              <div className="size-2 sm:size-3 bg-blue-600 rounded-full animate-pulse" />
              8维潜能雷达图
              <span className="text-sm sm:text-base text-blue-600 ml-2">(双色重叠)</span>
            </h3>
            <div className="h-64 sm:h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={potentialRadarData}>
                  <PolarGrid stroke="#9333ea" strokeWidth={1} />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#581c87', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#7c3aed' }} />
                  <Radar name="平均值" dataKey="average" stroke="#9333ea" fill="#c084fc" fillOpacity={0.6} strokeWidth={2} />
                  <Radar name="我的得分" dataKey="myScore" stroke="#2563eb" fill="#93c5fd" fillOpacity={0.6} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 双图表布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 成长趋势折线图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-blue-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <h3 className="text-lg sm:text-xl md:text-2xl text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="size-2 sm:size-3 bg-blue-600 rounded-full animate-pulse" />
                成长趋势
              </h3>
              <div className="h-56 sm:h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="week" tick={{ fill: '#1e3a8a', fontSize: 11 }} />
                    <YAxis domain={[60, 100]} tick={{ fill: '#1e3a8a', fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} name="综合分数" dot={{ fill: '#2563eb', r: 5 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 学习类型分布饼图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-orange-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <h3 className="text-lg sm:text-xl md:text-2xl text-orange-900 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="size-2 sm:size-3 bg-orange-600 rounded-full animate-pulse" />
                学习类型分布
              </h3>
              <div className="h-56 sm:h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props) => {
                        const { cx, cy, midAngle, outerRadius, name, percent } = props;
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 25;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const text = `${name} ${(percent * 100).toFixed(0)}%`;
                        
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            textAnchor={x > cx ? 'start' : 'end'} 
                            dominantBaseline="central"
                            fontSize="13"
                            fontWeight="600"
                          >
                            {/* 白色描边 */}
                            <tspan 
                              stroke="#ffffff" 
                              strokeWidth="3" 
                              fill="none"
                            >{text}</tspan>
                            {/* 深色文字 */}
                            <tspan 
                              x={x}
                              fill="#1f2937"
                            >{text}</tspan>
                          </text>
                        );
                      }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 成长潜能全景报告 - 新增模块 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-green-700 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            {/* 顶部标题栏 - 绿色背景 */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2">
                <div className="size-2 sm:size-3 bg-white rounded-full animate-pulse" />
                STE(A)M 综合素养评估
                <span className="text-sm sm:text-base text-green-100 ml-2">(Behavior-based Evaluation)</span>
              </h3>
            </div>

            {/* 内容区域 */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* 我的潜能模型 - 8维雷达图 */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span>我的潜能模型</span>
                </h4>
                <div className="h-80 sm:h-96 md:h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={potentialRadarData}>
                      <PolarGrid stroke="#d1d5db" strokeWidth={1} />
                      <PolarAngleAxis 
                        dataKey="dimension" 
                        tick={{ fill: '#374151', fontSize: 13, fontWeight: 500 }} 
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: '#6b7280', fontSize: 11 }} 
                      />
                      {/* 平均水平 - 橙色 */}
                      <Radar 
                        name="平均水平" 
                        dataKey="average" 
                        stroke="#f97316" 
                        fill="#fb923c" 
                        fillOpacity={0.4} 
                        strokeWidth={2.5} 
                      />
                      {/* 我的得分 - 绿色 */}
                      <Radar 
                        name="我的得分" 
                        dataKey="myScore" 
                        stroke="#10b981" 
                        fill="#34d399" 
                        fillOpacity={0.5} 
                        strokeWidth={3} 
                      />
                      <Legend 
                        wrapperStyle={{ 
                          fontSize: '14px', 
                          fontWeight: 600 
                        }} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 我的潜能标签 */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>我的潜能标签</span>
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {/* 小小博物学家 - 绿色 */}
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg border-3 border-green-700">
                    <div className="text-lg sm:text-xl mb-1">🔬</div>
                    <div className="text-sm sm:text-base font-bold">小小博物学家</div>
                    <div className="text-xs opacity-90 mt-1">科学观察高分 (90分)</div>
                  </div>
                  
                  {/* 逻辑小达人 - 蓝色 */}
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg border-3 border-blue-700">
                    <div className="text-lg sm:text-xl mb-1">🧩</div>
                    <div className="text-sm sm:text-base font-bold">逻辑小达人</div>
                    <div className="text-xs opacity-90 mt-1">逻辑推演高分 (88分)</div>
                  </div>
                  
                  {/* 文化守护者 - 橙色 */}
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg border-3 border-orange-700">
                    <div className="text-lg sm:text-xl mb-1">🏮</div>
                    <div className="text-sm sm:text-base font-bold">文化守护者</div>
                    <div className="text-xs opacity-90 mt-1">文化共情高分 (82分)</div>
                  </div>
                </div>
              </div>

              {/* 潜能概述 */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <span>潜能概述</span>
                </h4>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                  孩子在<strong className="text-green-700">「屈原与橘树」</strong>的故事中表现出了极高的<strong className="text-orange-600">文化共情</strong>，
                  并能通过严谨的<strong className="text-green-600">科学观察</strong>完成植物生长实验。
                  在<strong className="text-blue-600">逻辑推演</strong>和<strong className="text-purple-600">探索倾向</strong>方面也展现出色的潜力。
                  虽然在<strong className="text-gray-600">持久专注</strong>维度还有提升空间（65分），
                  但其出色的<strong className="text-emerald-600">探索倾向（85分）</strong>和<strong className="text-teal-600">科学观察（90分）</strong>预示了极佳的学习潜力。
                  建议在后续学习中，通过有趣的游戏化互动，逐步提升专注力和协作意识。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}

function StatCard({ icon, label, value, unit, color }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-3 border-white/30 p-4 sm:p-6 text-white`}>
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        {icon}
        <span className="text-sm sm:text-base opacity-90">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>{value}</span>
        <span className="text-base sm:text-lg opacity-80">{unit}</span>
      </div>
    </div>
  );
}