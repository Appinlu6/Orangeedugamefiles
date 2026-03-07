import { ArrowLeft, Award, Lock, Star, Palette, Trophy, Sparkles, Zap } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface AchievementsProps {
  onBack: () => void;
}

export function Achievements({ onBack }: AchievementsProps) {
  const { t } = useLanguage();

  // 成就/碎片数据
  const achievements = [
    { id: 1, name: '橘子启蒙', emoji: '🍊', description: '完成首个故事', unlocked: true, rarity: 'common' },
    { id: 2, name: '勇敢冒险', emoji: '⚔️', description: '做出第一个勇敢选择', unlocked: true, rarity: 'common' },
    { id: 3, name: '智慧之光', emoji: '💡', description: '正确回答10道题', unlocked: true, rarity: 'rare' },
    { id: 4, name: '橘园守护者', emoji: '🛡️', description: '连续7天学习', unlocked: true, rarity: 'rare' },
    { id: 5, name: '创意大师', emoji: '🎨', description: '解锁创意故事线', unlocked: true, rarity: 'epic' },
    { id: 6, name: '时光旅人', emoji: '⏰', description: '游历三个朝代', unlocked: false, rarity: 'epic' },
    { id: 7, name: '橘小橘之友', emoji: '🤝', description: '探索所有支线', unlocked: false, rarity: 'legendary' },
    { id: 8, name: '传奇收集家', emoji: '👑', description: '收集所有碎片', unlocked: false, rarity: 'legendary' },
  ];

  // 能力徽章数据（行为型徽章）
  const abilityBadges = [
    { 
      id: 1, 
      name: '坚持者', 
      emoji: '🌱', 
      description: '多次失败仍完成任务', 
      progress: 4, // 已收集的碎片数（0-6）
      total: 6 
    },
    { 
      id: 2, 
      name: '思考者', 
      emoji: '🧠', 
      description: '少用提示完成关卡', 
      progress: 3, 
      total: 6 
    },
    { 
      id: 3, 
      name: '探索者', 
      emoji: '🔍', 
      description: '主动走非主线剧情', 
      progress: 5, 
      total: 6 
    },
    { 
      id: 4, 
      name: '利他者', 
      emoji: '🤝', 
      description: '多次做出合作型选择', 
      progress: 2, 
      total: 6 
    },
  ];

  // 精神试炼排行榜数据
  const leaderboardData = [
    { 
      id: 1, 
      rank: 1, 
      name: '小明', 
      avatar: '🍊', 
      points: 2850, 
      badge: '探险家',
      badgeColor: 'from-purple-400 to-purple-600'
    },
    { 
      id: 2, 
      rank: 2, 
      name: '小红', 
      avatar: '🍊', 
      points: 2640, 
      badge: '坚持之星',
      badgeColor: 'from-pink-400 to-pink-600'
    },
    { 
      id: 3, 
      rank: 3, 
      name: '小华', 
      avatar: '🍊', 
      points: 2420, 
      badge: '小小思考者',
      badgeColor: 'from-blue-400 to-blue-600'
    },
    { 
      id: 4, 
      rank: 4, 
      name: '小芳', 
      avatar: '🍊', 
      points: 2180, 
      badge: '创意大师',
      badgeColor: 'from-yellow-400 to-yellow-600'
    },
    { 
      id: 5, 
      rank: 5, 
      name: '小刚', 
      avatar: '🍊', 
      points: 1950, 
      badge: '勇敢者',
      badgeColor: 'from-green-400 to-green-600'
    },
    { 
      id: 6, 
      rank: 6, 
      name: '小丽', 
      avatar: '🍊', 
      points: 1820, 
      badge: '智慧之光',
      badgeColor: 'from-indigo-400 to-indigo-600'
    },
    { 
      id: 7, 
      rank: 7, 
      name: '小杰', 
      avatar: '🍊', 
      points: 1650, 
      badge: '探险家',
      badgeColor: 'from-purple-400 to-purple-600'
    },
    { 
      id: 8, 
      rank: 8, 
      name: '小美', 
      avatar: '🍊', 
      points: 1480, 
      badge: '小小思考者',
      badgeColor: 'from-blue-400 to-blue-600'
    },
  ];

  // 当前用户数据
  const currentUser = {
    rank: 15,
    name: '橘小橘',
    avatar: '🍊',
    points: 980,
    badge: '新手冒险者',
    badgeColor: 'from-amber-400 to-amber-600'
  };

  // 橘子园装饰品
  const decorations = [
    { id: 1, name: '小木屋', emoji: '🏠', unlocked: true, placed: true, x: 20, y: 60 },
    { id: 2, name: '秋千', emoji: '🎪', unlocked: true, placed: true, x: 70, y: 65 },
    { id: 3, name: '喷泉', emoji: '⛲', unlocked: true, placed: false, x: 0, y: 0 },
    { id: 4, name: '彩虹门', emoji: '🌈', unlocked: false, placed: false, x: 0, y: 0 },
    { id: 5, name: '许愿树', emoji: '🌳', unlocked: false, placed: false, x: 0, y: 0 },
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
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-transparent to-green-900/60" />
      </div>

      {/* 主要内容 */}
      <div className="relative size-full flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 animate-in fade-in slide-in-from-top duration-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 border-amber-900 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="size-4 sm:size-5 md:size-6" />
            <span className="text-sm sm:text-base md:text-xl">返回</span>
          </button>

          <div className="bg-gradient-to-b from-amber-700 to-amber-900 rounded-xl sm:rounded-2xl shadow-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 sm:border-3 md:border-4 border-amber-950">
            <h2 className="text-xl sm:text-2xl md:text-4xl text-amber-50 flex items-center gap-2" style={{ textShadow: '2px 2px 0 #78350f' }}>
              <Award className="size-5 sm:size-6 md:size-8" />
              成就榜
            </h2>
            <p className="text-xs sm:text-sm md:text-xl text-amber-100 text-center mt-0.5 sm:mt-1">Achievements</p>
          </div>

          <div className="w-12 sm:w-20 md:w-32" />
        </div>

        {/* 内容区 */}
        <div className="flex-1 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 pb-6">
          {/* 统计信息 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-3 sm:p-4 text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1">5</div>
              <div className="text-xs sm:text-sm">已解锁成就</div>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-3 sm:p-4 text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1">3</div>
              <div className="text-xs sm:text-sm">橘园装饰</div>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-3 sm:p-4 text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1">12</div>
              <div className="text-xs sm:text-sm">收集碎片</div>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-3 sm:p-4 text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1">68%</div>
              <div className="text-xs sm:text-sm">完成度</div>
            </div>
          </div>

          {/* 橘子园场景 */}
          <div className="bg-gradient-to-b from-amber-200 via-orange-200 to-amber-300 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-700 p-4 sm:p-6 md:p-8 animate-in fade-in zoom-in duration-700 delay-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl text-amber-900 flex items-center gap-2">
                <Palette className="size-5 sm:size-6" />
                我的橘子园
              </h3>
              <button className="bg-white/80 hover:bg-white text-amber-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all hover:scale-105">
                编辑布局
              </button>
            </div>

            {/* 互动场景区域 */}
            <div className="relative bg-gradient-to-b from-green-200 to-green-400 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-700 h-48 sm:h-64 md:h-80 overflow-hidden">
              {/* 天空和云朵 */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300 to-blue-200">
                <div className="absolute top-4 left-8 text-2xl sm:text-4xl animate-bounce">☁️</div>
                <div className="absolute top-8 right-16 text-3xl sm:text-5xl opacity-80">☁️</div>
                <div className="absolute top-12 left-1/2 text-2xl sm:text-3xl">☀️</div>
              </div>

              {/* 草地 */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-green-300 to-green-500">
                {/* 橘子树 */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl md:text-8xl animate-pulse">
                  🌳
                </div>

                {/* 已放置的装饰品 */}
                {decorations.filter(d => d.placed).map(decoration => (
                  <div 
                    key={decoration.id}
                    className="absolute text-3xl sm:text-4xl md:text-5xl cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${decoration.x}%`, bottom: `${decoration.y}%` }}
                    title={decoration.name}
                  >
                    {decoration.emoji}
                  </div>
                ))}

                {/* 橘小橘角色 */}
                <div className="absolute bottom-4 left-1/4 text-4xl sm:text-5xl animate-bounce">
                  🍊
                </div>
              </div>

              {/* 提示文字 */}
              <div className="absolute top-2 left-2 bg-white/80 backdrop-blur rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm text-green-800">
                💡 收集成就碎片解锁更多装饰
              </div>
            </div>

            {/* 装仓库 - 横向滑动 */}
            <div className="mt-4">
              <h4 className="text-sm sm:text-base md:text-lg text-amber-900 mb-2 flex items-center gap-2">
                <Palette className="size-4 sm:size-5" />
                装饰仓库
              </h4>
              <div className="relative -mx-2 px-2">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {decorations.map(decoration => (
                    <div 
                      key={decoration.id}
                      className={`relative bg-gradient-to-br ${decoration.unlocked ? 'from-amber-50 to-orange-100' : 'from-gray-200 to-gray-300'} rounded-xl border-2 ${decoration.unlocked ? 'border-amber-600' : 'border-gray-400'} p-3 sm:p-4 text-center transition-all hover:scale-105 cursor-pointer ${decoration.unlocked ? '' : 'opacity-60'} flex-shrink-0 w-20 sm:w-24`}
                    >
                      {decoration.placed && (
                        <div className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full size-4 sm:size-5 flex items-center justify-center">
                          ✓
                        </div>
                      )}
                      {!decoration.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                          <Lock className="size-5 sm:size-6 text-gray-600" />
                        </div>
                      )}
                      <div className={`text-3xl sm:text-4xl mb-1 ${decoration.unlocked ? '' : 'grayscale'}`}>
                        {decoration.emoji}
                      </div>
                      <div className={`text-xs ${decoration.unlocked ? 'text-amber-900' : 'text-gray-600'}`}>
                        {decoration.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 我的故事选择图谱 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-gray-400 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200 opacity-60">
            <h3 className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 flex items-center gap-2">
              <svg className="size-5 sm:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              我的故事选择图谱
            </h3>
            
            {/* 图谱可视化区域 */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border-2 border-gray-300 p-6 sm:p-8 min-h-[280px] sm:min-h-[350px]">
              {/* 故事线路图 - 从左到右的流程 */}
              <div className="relative h-full grayscale">
                <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }}>
                  {/* 主路径 - 从起点到各个分支 */}
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6b7280" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {/* 起点到第一层 */}
                  <path d="M 10% 50% Q 20% 30%, 30% 25%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 10% 50% Q 20% 45%, 30% 40%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 10% 50% Q 20% 55%, 30% 60%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 10% 50% Q 20% 70%, 30% 75%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  
                  {/* 第一层到第二层 */}
                  <path d="M 30% 25% L 50% 30%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 3" />
                  <path d="M 30% 40% L 50% 45%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 3" />
                  <path d="M 30% 60% L 50% 55%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 3" />
                  <path d="M 30% 75% L 50% 70%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 3" />
                  
                  {/* 第二层到终点 */}
                  <path d="M 50% 30% Q 65% 35%, 75% 40%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 50% 45% Q 65% 45%, 75% 45%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 50% 55% Q 65% 55%, 75% 55%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 50% 70% Q 65% 60%, 75% 60%" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  
                  {/* 终点汇聚 */}
                  <path d="M 75% 40% L 90% 50%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 75% 45% L 90% 50%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 75% 55% L 90% 50%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 75% 60% L 90% 50%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {/* 等待开启遮罩 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                <div className="text-5xl sm:text-6xl md:text-7xl mb-4 grayscale opacity-50">
                  🔒
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 mb-2">
                  等待开启
                </div>
                <div className="text-sm sm:text-base text-gray-500">
                  完成更多故事后解锁
                </div>
              </div>

              {/* 统计信息 */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 opacity-40">
                <div className="bg-white/90 rounded-lg p-2 sm:p-3 text-center border border-gray-300 shadow-sm">
                  <div className="text-lg sm:text-2xl font-bold text-gray-500">--</div>
                  <div className="text-xs sm:text-sm text-gray-500">选择节点</div>
                </div>
                <div className="bg-white/90 rounded-lg p-2 sm:p-3 text-center border border-gray-300 shadow-sm">
                  <div className="text-lg sm:text-2xl font-bold text-gray-500">--</div>
                  <div className="text-xs sm:text-sm text-gray-500">已完成</div>
                </div>
                <div className="bg-white/90 rounded-lg p-2 sm:p-3 text-center border border-gray-300 shadow-sm">
                  <div className="text-lg sm:text-2xl font-bold text-gray-500">--</div>
                  <div className="text-xs sm:text-sm text-gray-500">主线路径</div>
                </div>
                <div className="bg-white/90 rounded-lg p-2 sm:p-3 text-center border border-gray-300 shadow-sm">
                  <div className="text-lg sm:text-2xl font-bold text-gray-500">--</div>
                  <div className="text-xs sm:text-sm text-gray-500">隐藏剧情</div>
                </div>
              </div>
            </div>
          </div>

          {/* 能力徽章 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-green-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <h3 className="text-lg sm:text-xl md:text-2xl text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Palette className="size-5 sm:size-6" />
              能力徽章
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {abilityBadges.map(badge => (
                <AbilityBadgeCard key={badge.id} {...badge} />
              ))}
            </div>
          </div>

          {/* 成就收集 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <h3 className="text-lg sm:text-xl md:text-2xl text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Star className="size-5 sm:size-6 fill-amber-500 text-amber-500" />
              成就收集
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {achievements.map(achievement => (
                <AchievementCard key={achievement.id} {...achievement} />
              ))}
            </div>
          </div>

          {/* 精神试炼排行榜 */}
          <div 
            className="relative bg-white/90 backdrop-blur-lg p-6 sm:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-500"
            style={{
              borderRadius: '32px',
              backgroundColor: '#FFF5E6',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), 0 0 20px 0 rgba(242, 101, 34, 0.15)'
            }}
          >
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                {/* 发光效果 */}
                <div className="absolute inset-0 blur-xl opacity-60" style={{ backgroundColor: '#F26522' }}></div>
                <div className="relative text-4xl sm:text-5xl">🌱</div>
              </div>
              <h3 
                className="text-2xl sm:text-3xl font-bold" 
                style={{ color: '#603913', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                精神试炼排行榜
              </h3>
            </div>

            {/* 橘子装饰 */}
            <div className="absolute top-4 right-4 text-3xl opacity-30 animate-bounce">🍊</div>
            <div className="absolute top-20 left-6 text-2xl opacity-20">🍊</div>

            {/* 排行榜列表 - 可滚动 */}
            <div className="max-h-[500px] overflow-y-auto space-y-3 mb-6 pr-2" style={{ scrollbarWidth: 'thin' }}>
              {leaderboardData.map((user) => (
                <div
                  key={user.id}
                  className="relative bg-white/60 backdrop-blur-sm p-4 transition-all hover:scale-[1.02] hover:bg-white/80 cursor-pointer"
                  style={{
                    borderRadius: '24px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* 排名图标 */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl sm:text-3xl">
                      {user.rank === 1 && <span style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}>🥇</span>}
                      {user.rank === 2 && <span style={{ filter: 'drop-shadow(0 0 8px rgba(192, 192, 192, 0.6))' }}>🥈</span>}
                      {user.rank === 3 && <span style={{ filter: 'drop-shadow(0 0 8px rgba(205, 127, 50, 0.6))' }}>🥉</span>}
                      {user.rank > 3 && (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: '#603913' }}
                        >
                          {user.rank}
                        </div>
                      )}
                    </div>

                    {/* 头像 */}
                    <div 
                      className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                      style={{
                        background: 'linear-gradient(135deg, #FFE5CC 0%, #FFD4A3 100%)',
                        border: '3px solid #F26522',
                        boxShadow: '0 4px 12px rgba(242, 101, 34, 0.3)'
                      }}
                    >
                      {user.avatar}
                    </div>

                    {/* 用户信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="text-lg sm:text-xl font-bold truncate"
                          style={{ color: '#603913' }}
                        >
                          {user.name}
                        </div>
                        <div 
                          className="px-2 py-0.5 text-xs font-medium text-white rounded-full whitespace-nowrap"
                          style={{
                            background: `linear-gradient(135deg, ${user.badgeColor.replace('from-', '').split(' ')[0]}, ${user.badgeColor.split('to-')[1]})`
                          }}
                        >
                          {user.badge}
                        </div>
                      </div>
                      
                      {/* 精神能量 */}
                      <div className="flex items-center gap-2">
                        <Zap className="size-4 sm:size-5" style={{ color: '#F26522' }} />
                        <span 
                          className="text-base sm:text-lg font-bold"
                          style={{
                            color: '#F26522',
                            textShadow: '0 0 10px rgba(242, 101, 34, 0.4), 0 0 20px rgba(242, 101, 34, 0.2)'
                          }}
                        >
                          {user.points}
                        </span>
                        <span className="text-sm text-gray-600">精神能量</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 我的状态 - 固定在底部 */}
            <div 
              className="relative p-5"
              style={{
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #F26522 0%, #FF8A3D 100%)',
                boxShadow: '0 8px 24px rgba(242, 101, 34, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="flex items-center gap-4">
                {/* 排名 */}
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    backgroundColor: '#603913',
                    color: '#FFF5E6',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {currentUser.rank}
                </div>

                {/* 头像 */}
                <div 
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, #FFF5E6 0%, #FFEAC2 100%)',
                    border: '3px solid white',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {currentUser.avatar}
                </div>

                {/* 用户信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-xl font-bold text-white truncate">
                      {currentUser.name}
                    </div>
                    <div 
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: '#603913',
                        color: '#FFF5E6'
                      }}
                    >
                      {currentUser.badge}
                    </div>
                  </div>
                  
                  {/* 精神能量 */}
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-yellow-300" />
                    <span 
                      className="text-lg font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {currentUser.points}
                    </span>
                    <span className="text-sm text-white/90">精神能量</span>
                  </div>
                </div>

                {/* 向上箭头图标 */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Trophy className="size-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* 底部提示文字 */}
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 通过完成故事挑战获得更多精神能量
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AchievementCardProps {
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  rarity: string;
}

function AchievementCard({ name, emoji, description, unlocked, rarity }: AchievementCardProps) {
  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityLabels = {
    common: '普通',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
  };

  return (
    <div className={`relative bg-gradient-to-br ${unlocked ? 'from-amber-50 to-orange-100' : 'from-gray-200 to-gray-300'} rounded-lg sm:rounded-xl border-2 ${unlocked ? 'border-amber-600' : 'border-gray-400'} p-2 sm:p-3 transition-all hover:scale-105 ${unlocked ? '' : 'opacity-60'} flex items-center gap-2 sm:gap-3`}>
      {/* 稀有度标签 */}
      <div className={`absolute -top-1.5 -right-1.5 bg-gradient-to-r ${rarityColors[rarity as keyof typeof rarityColors]} text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg`}>
        {rarityLabels[rarity as keyof typeof rarityLabels]}
      </div>

      {/* 锁定状态 */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg sm:rounded-xl">
          <Lock className="size-6 sm:size-8 text-gray-600" />
        </div>
      )}

      {/* Icon部分 - 左侧 */}
      <div className={`text-3xl sm:text-4xl flex-shrink-0 ${unlocked ? '' : 'grayscale'}`}>
        {emoji}
      </div>
      
      {/* 文案部分 - 右侧 */}
      <div className="flex-1 text-left min-w-0">
        <div className={`text-sm sm:text-base font-medium ${unlocked ? 'text-amber-900' : 'text-gray-600'} truncate`}>
          {name}
        </div>
        <div className={`text-xs ${unlocked ? 'text-amber-700' : 'text-gray-500'} mt-0.5 line-clamp-2`}>
          {description}
        </div>
      </div>
    </div>
  );
}

interface AbilityBadgeCardProps {
  name: string;
  emoji: string;
  description: string;
  progress: number;
  total: number;
}

function AbilityBadgeCard({ name, emoji, description, progress, total }: AbilityBadgeCardProps) {
  const isComplete = progress === total;
  
  // 生成6块碎片的布局（圆形切割成6块）
  const renderPieces = () => {
    const pieces = [];
    for (let i = 0; i < total; i++) {
      const isCollected = i < progress;
      pieces.push(
        <div 
          key={i} 
          className={`${isCollected ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gray-300'} transition-all duration-300`}
          style={{
            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((i * 60 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((i * 60 - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos(((i + 1) * 60 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin(((i + 1) * 60 - 90) * Math.PI / 180)}%)`,
          }}
        />
      );
    }
    return pieces;
  };

  return (
    <div className={`relative bg-gradient-to-br ${isComplete ? 'from-yellow-50 to-green-100' : 'from-gray-50 to-gray-100'} rounded-xl sm:rounded-2xl border-2 sm:border-3 ${isComplete ? 'border-green-600 shadow-xl shadow-green-200' : 'border-gray-400'} p-4 sm:p-5 text-center transition-all hover:scale-105`}>
      {/* 完成标记 */}
      {isComplete && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse z-10">
          <Star className="size-3 fill-white" />
          <span>已完成</span>
        </div>
      )}

      {/* 徽章图标和碎片环 */}
      <div className="relative mb-3">
        {/* 碎片圆环 */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2">
          {/* 碎片背景层 */}
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-1">
            {renderPieces()}
          </div>
          {/* 中心圆形遮罩 */}
          <div className="absolute inset-2 bg-white rounded-full shadow-inner" />
          {/* 徽章emoji */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl">
            {emoji}
          </div>
        </div>

        {/* 碎片可视化 - 6个小方块 */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`size-3 sm:size-4 rounded-sm transition-all duration-300 ${
                i < progress 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-md' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 徽章名称 */}
      <div className={`text-base sm:text-lg font-bold ${isComplete ? 'text-green-900' : 'text-gray-900'}`}>
        {name}
      </div>
      
      {/* 描述 */}
      <div className={`text-xs sm:text-sm ${isComplete ? 'text-green-700' : 'text-gray-600'} mt-1`}>
        {description}
      </div>
      
      {/* 进度数字 */}
      <div className={`text-xs sm:text-sm font-bold mt-2 ${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
        {progress}/{total} 碎片
      </div>

      {/* 进度条 */}
      <div className="mt-2 w-full bg-gray-300 rounded-full h-1.5 sm:h-2 overflow-hidden shadow-inner">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600' : 'bg-gradient-to-r from-green-400 to-green-500'}`}
          style={{ width: `${(progress / total) * 100}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface LeaderboardCardProps {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badge: string;
  badgeColor: string;
}

function LeaderboardCard({ rank, name, avatar, points, badge, badgeColor }: LeaderboardCardProps) {
  return (
    <div className={`relative bg-gradient-to-br ${badgeColor} rounded-lg sm:rounded-xl border-2 ${badgeColor} p-2 sm:p-3 transition-all hover:scale-105 flex items-center gap-2 sm:gap-3`}>
      {/* 排名 */}
      <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg">
        {rank}
      </div>

      {/* Icon部分 - 左侧 */}
      <div className="text-3xl sm:text-4xl flex-shrink-0">
        {avatar}
      </div>
      
      {/* 文案部分 - 右侧 */}
      <div className="flex-1 text-left min-w-0">
        <div className="text-base sm:text-lg font-bold text-gray-900">
          {name}
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mt-1">
          积分: {points}
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mt-1">
          徽章: {badge}
        </div>
      </div>
    </div>
  );
}