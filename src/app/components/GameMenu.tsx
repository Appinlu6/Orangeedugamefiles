import { ArrowLeft, Lock, Star } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import chunqiuIcon from 'figma:asset/041cf12436a49f864af088bf5b098577ce5667a5.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { getStoryProgress, calculateProgress } from '@/utils/gameProgress';

interface GameMenuProps {
  onBack: () => void;
  onSelectLevel: (level: string) => void;
  onNavigate?: (page: string) => void;
}

export function GameMenu({ onBack, onSelectLevel, onNavigate }: GameMenuProps) {
  const { t } = useLanguage();
  
  // 获取春秋战国故事的实际进度
  const [chunqiuProgress, setChunqiuProgress] = useState(0);
  
  useEffect(() => {
    // 初始加载进度
    const updateProgress = () => {
      const progress = getStoryProgress('chunqiu-quanyuan');
      const percentage = calculateProgress(progress.completedActs, progress.totalActs);
      setChunqiuProgress(percentage);
    };
    
    updateProgress();
    
    // 添加一个轮询机制，每秒检查一次进度更新
    const interval = setInterval(updateProgress, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const dynasties = [
    { id: 'chunqiu', name: t('game.spring_autumn'), emoji: '📜', description: t('chapter.nanjubeizhi'), locked: false, trial: true, progress: chunqiuProgress, image: chunqiuIcon },
    { id: 'han', name: '漢朝', emoji: '🎋', description: '絲綢之路，文化鼎盛', locked: true, trial: false, progress: 0 },
    { id: 'tang', name: t('game.tang_dynasty'), emoji: '🏮', description: '盛世王朝，萬國來朝', locked: true, trial: false, progress: 0 },
    { id: 'song', name: t('game.song_dynasty'), emoji: '📜', description: '經濟繁榮，科技發達', locked: true, trial: false, progress: 0 },
    { id: 'ming', name: t('game.ming_dynasty'), emoji: '🏯', description: '鄭和下西洋，紫禁城', locked: true, trial: false, progress: 0 },
    { id: 'qing', name: '清朝', emoji: '👑', description: '康乾盛世，最後王朝', locked: true, trial: false, progress: 0 },
  ];

  const handleDynastyClick = (dynastyId: string) => {
    if (dynastyId === 'chunqiu') {
      onNavigate?.('c1_nanjubeizhi');
    } else {
      onSelectLevel(dynastyId);
    }
  };

  return (
    <div className="size-full relative overflow-hidden flex flex-col">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${exampleImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-transparent to-amber-900/50" />
      </div>

      {/* 顶部导航栏 */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 md:p-8 pb-2 sm:pb-3 md:pb-4 animate-in fade-in slide-in-from-top duration-500">
        <button
          onClick={onBack}
          className="flex items-center gap-1 sm:gap-2 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 border-amber-900 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="size-4 sm:size-5 md:size-6" />
          <span className="text-sm sm:text-base md:text-xl">{t('common.back')}</span>
        </button>

        <div className="bg-gradient-to-b from-amber-700 to-amber-900 rounded-xl sm:rounded-2xl shadow-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 sm:border-3 md:border-4 border-amber-950">
          <h2 className="text-xl sm:text-2xl md:text-4xl text-amber-50" style={{ textShadow: '2px 2px 0 #78350f' }}>
            {t('game.select_dynasty')}
          </h2>
          <p className="text-xs sm:text-sm md:text-xl text-amber-100 text-center mt-0.5 sm:mt-1">Choose Dynasty</p>
        </div>

        <div className="w-12 sm:w-20 md:w-32" />
      </div>

      {/* 朝代选择区 */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
        {/* 桌面端：网格布局 */}
        <div className="hidden sm:flex sm:justify-center w-full py-4 sm:py-6 md:py-8 animate-in fade-in zoom-in duration-700">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">
            {dynasties.map((dynasty) => (
              <DynastyCard
                key={dynasty.id}
                {...dynasty}
                onClick={() => handleDynastyClick(dynasty.id)}
              />
            ))}
          </div>
        </div>

        {/* 手机端：横向滚动 */}
        <div className="sm:hidden w-full h-full flex items-center overflow-x-auto overflow-y-hidden px-4 scrollbar-hide">
          <div className="flex gap-4 pb-4">
            <div className="flex-shrink-0 w-2" />
            {dynasties.map((dynasty) => (
              <DynastyCard
                key={dynasty.id}
                {...dynasty}
                onClick={() => handleDynastyClick(dynasty.id)}
              />
            ))}
            <div className="flex-shrink-0 w-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DynastyCardProps {
  id: string;
  name: string;
  emoji: string;
  description: string;
  locked: boolean;
  trial: boolean;
  progress: number;
  onClick: () => void;
  image?: string;
}

function DynastyCard({ id, name, emoji, description, locked, trial, progress, onClick, image }: DynastyCardProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className={`
        relative group
        ${locked 
          ? 'bg-gradient-to-br from-gray-300/95 to-gray-400/95 opacity-60 cursor-not-allowed' 
          : 'bg-gradient-to-br from-amber-50/95 to-orange-100/95 hover:scale-105 hover:-translate-y-2 cursor-pointer'
        }
        backdrop-blur
        rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl
        border-2 sm:border-3 md:border-4 ${locked ? 'border-gray-600' : 'border-amber-800'}
        p-5 sm:p-7 md:p-10
        transition-all duration-300
        min-w-[320px] sm:min-w-0 w-full
        snap-center
      `}
    >
      {/* 装饰性木纹背景 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0id29vZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwTDQwIDQwTTQwIDBMMCA0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuMiIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3b29kKSIvPjwvc3ZnPg==')] opacity-50 rounded-2xl sm:rounded-3xl" />
      
      <div className="relative">
        {/* 试玩标签 */}
        {trial && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1 animate-pulse z-10">
            <Star className="size-3 sm:size-4 fill-white" />
            <span>試玩</span>
          </div>
        )}

        {/* 锁定遮罩 */}
        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <Lock className="size-12 sm:size-14 md:size-16 text-gray-600 mb-2" />
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 shadow-lg">
              <span>💰</span>
              <span>付費解鎖</span>
            </div>
          </div>
        )}

        {/* 朝代图标或图片 */}
        <div className="flex justify-center items-center mb-3 sm:mb-4 md:mb-6">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
            />
          ) : (
            <div className={`text-5xl sm:text-6xl md:text-7xl ${locked ? 'grayscale' : ''}`}>
              {emoji}
            </div>
          )}
        </div>

        {/* 朝代名称 */}
        <h3 className={`text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 ${locked ? 'text-gray-700' : 'text-amber-900'}`}>
          {name}
        </h3>

        {/* 描述 */}
        <p className={`text-xs sm:text-sm md:text-base mb-3 sm:mb-4 ${locked ? 'text-gray-600' : 'text-amber-700'}`}>
          {description}
        </p>

        {/* 进度条（未锁定时显示） */}
        {!locked && progress > 0 && (
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-amber-800">
              <span>學習進度</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 sm:h-3 bg-amber-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 开始按钮（未锁定且无进度时显示） */}
        {!locked && progress === 0 && (
          <div className="mt-3 sm:mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold shadow-lg">
            {t('home.start_game')}
          </div>
        )}

        {/* 开始按钮（未锁定且有进度时显示） */}
        {!locked && progress > 0 && (
          <div className="mt-3 sm:mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold shadow-lg">
            {t('common.continue')}
          </div>
        )}
      </div>
    </button>
  );
}