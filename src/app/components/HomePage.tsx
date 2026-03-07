import { useState, useEffect } from 'react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import logoImage from 'figma:asset/ee05f096b03d18e410d2d3c52c041fc105b6e88a.png';
import startGameButton from 'figma:asset/96027e9853df122cfac865c6f8f33511e1be5393.png';
import growthReportButton from 'figma:asset/5dbc522238c2b406a48927a3dfdaed3986eee89a.png';
import achievementsButton from 'figma:asset/55a24e8bb98bffd069a5b99d504963a7d3c1d170.png';
import settingsButton from 'figma:asset/3b45e80ca4544faacf30c1886bf8cdb74b66518c.png';
import { Play, Trophy, Settings, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  skipAnimation?: boolean;
  onAnimationComplete?: () => void;
}

export function HomePage({ onNavigate, skipAnimation = false, onAnimationComplete }: HomePageProps) {
  const { t } = useLanguage();
  const { play } = useAudio();
  const [showAnimation, setShowAnimation] = useState(!skipAnimation);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // 如果已经播放过动画，直接跳过
    if (skipAnimation) {
      setShowAnimation(false);
      return;
    }

    // 5秒后自动隐藏开场动画
    const timer = setTimeout(() => {
      setShowAnimation(false);
      onAnimationComplete?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [skipAnimation, onAnimationComplete]);

  // 点击跳过动画 + 开始播放音乐
  const skipAnimationHandler = () => {
    setShowAnimation(false);
    onAnimationComplete?.();
    // 用户点击后播放音乐
    if (!hasUserInteracted) {
      play();
      setHasUserInteracted(true);
    }
  };
  
  // 任何按钮点击都触发音乐播放
  const handleButtonClick = (page: string) => {
    if (!hasUserInteracted) {
      play();
      setHasUserInteracted(true);
    }
    onNavigate(page);
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* 背景图片 - 橘子林场景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${exampleImage})`,
        }}
      />

      {/* 开场动画 */}
      {showAnimation && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-300 to-orange-500 z-50 flex items-center justify-center animate-in fade-in duration-1000">
          <div className="text-center animate-in zoom-in slide-in-from-bottom-10 duration-1000 delay-300">
            <div className="text-8xl sm:text-9xl mb-6 animate-bounce">🍊</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>
              {t('home.orange_journey')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-orange-100 mb-8">
              {t('home.orange_journey_subtitle')}
            </p>
            <button
              onClick={skipAnimationHandler}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl border-2 border-white/50 transition-all hover:scale-105 text-lg"
            >
              {t('home.click_to_start')}
            </button>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <div className="relative size-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12">
        {/* 上方：Orange Journey 标题 - 手机端居中，大屏幕左上角 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-10 animate-in fade-in slide-in-from-left duration-700">
          <img 
            src={logoImage}
            alt="Orange Journey"
            className="w-[22.54rem] sm:w-[30.19rem] md:w-[37.67rem] lg:w-[45.08rem] h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* 左下角：橘小橘角色 - 占位，图片中已经包含 */}
        
        {/* 按钮菜单 - 手机端居中，大屏幕右下角 */}
        <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-[40px] grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 animate-in fade-in slide-in-from-right duration-700">
          {/* 开始游戏 - 右上 */}
          <button
            onClick={() => handleButtonClick('game-menu')}
            className="relative w-[9.66rem] sm:w-[12.42rem] md:w-[15.18rem] lg:w-[17.94rem] transition-all duration-300 hover:scale-105 active:scale-95 active:brightness-125"
          >
            <img 
              src={startGameButton}
              alt="开始游戏"
              className="w-full h-auto drop-shadow-xl"
            />
          </button>
          
          {/* 成长报告 - 右上右 */}
          <button
            onClick={() => handleButtonClick('growth-report')}
            className="relative w-[9.66rem] sm:w-[12.42rem] md:w-[15.18rem] lg:w-[17.94rem] transition-all duration-300 hover:scale-105 active:scale-95 active:brightness-125"
          >
            <img 
              src={growthReportButton}
              alt="成长报告"
              className="w-full h-auto drop-shadow-xl"
            />
          </button>
          
          {/* 成就榜 - 左下 */}
          <button
            onClick={() => handleButtonClick('achievements')}
            className="relative w-[9.66rem] sm:w-[12.42rem] md:w-[15.18rem] lg:w-[17.94rem] transition-all duration-300 hover:scale-105 active:scale-95 active:brightness-125"
          >
            <img 
              src={achievementsButton}
              alt="成就榜"
              className="w-full h-auto drop-shadow-xl"
            />
          </button>
          
          {/* 设置 - 右下 */}
          <button
            onClick={() => handleButtonClick('settings')}
            className="relative w-[9.66rem] sm:w-[12.42rem] md:w-[15.18rem] lg:w-[17.94rem] transition-all duration-300 hover:scale-105 active:scale-95 active:brightness-125"
          >
            <img 
              src={settingsButton}
              alt="设置"
              className="w-full h-auto drop-shadow-xl"
            />
          </button>
        </div>
      </div>
    </div>
  );
}