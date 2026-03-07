import { useState } from 'react';
import { HomePage } from '@/app/components/HomePage';
import { Login } from '@/app/components/Login';
import { GameMenu } from '@/app/components/GameMenu';
import { GrowthReport } from '@/app/components/GrowthReport';
import { Achievements } from '@/app/components/Achievements';
import { Settings } from '@/app/components/Settings';
import { IcebergModel } from '@/app/components/IcebergModel';
import { C1_NanJuBeiZhi } from '@/app/components/C1_NanJuBeiZhi';
import { TestQuiz } from '@/app/components/TestQuiz';
import { GameProcess } from '@/app/components/GameProcess';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AudioProvider } from '@/contexts/AudioContext';
import { AudioButton } from '@/app/components/AudioButton';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [hasPlayedAnimation, setHasPlayedAnimation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string; avatar: string } | null>(null);
  const [startSceneIndex, setStartSceneIndex] = useState<number>(0);

  const handleNavigate = (page: string) => {
    // 检查是否包含场景索引参数 (格式: "game-process:1")
    if (page.includes(':')) {
      const [pageName, sceneIndex] = page.split(':');
      setStartSceneIndex(parseInt(sceneIndex, 10));
      setCurrentPage(pageName);
    } else {
      setStartSceneIndex(0); // 默认从第一个场景开始
      setCurrentPage(page);
    }
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(`game-${level}`);
  };

  const handleAnimationComplete = () => {
    setHasPlayedAnimation(true);
    // 动画完成后跳转到登录页
    if (!isLoggedIn) {
      setCurrentPage('login');
    }
  };

  const handleLogin = (username: string, avatar: string) => {
    setUserInfo({ username, avatar });
    setIsLoggedIn(true);
    setCurrentPage('main');
  };

  const handleSkipLogin = () => {
    // 跳过登录，使用访客模式
    setUserInfo({ username: '小游客', avatar: '🍊' });
    setIsLoggedIn(true);
    setCurrentPage('main');
  };

  const renderPage = () => {
    // 如果还没播放动画，显示带动画的首页
    if (!hasPlayedAnimation) {
      return <HomePage onNavigate={handleNavigate} skipAnimation={false} onAnimationComplete={handleAnimationComplete} />;
    }

    // 如果播放过动画但还没登录,显示登录页
    if (!isLoggedIn && currentPage === 'login') {
      return <Login onLogin={handleLogin} onSkip={handleSkipLogin} />;
    }

    // 登录后的页面路由
    switch (currentPage) {
      case 'main':
        return <HomePage onNavigate={handleNavigate} skipAnimation={true} onAnimationComplete={handleAnimationComplete} />;
      case 'game-menu':
        return <GameMenu onBack={() => setCurrentPage('main')} onSelectLevel={handleSelectLevel} onNavigate={handleNavigate} />;
      case 'growth-report':
        return <GrowthReport onBack={() => setCurrentPage('main')} onNavigate={handleNavigate} />;
      case 'iceberg-model':
        return <IcebergModel onBack={() => setCurrentPage('growth-report')} />;
      case 'achievements':
        return <Achievements onBack={() => setCurrentPage('main')} />;
      case 'settings':
        return <Settings onBack={() => setCurrentPage('main')} />;
      case 'c1_nanjubeizhi':
        return <C1_NanJuBeiZhi onBack={() => setCurrentPage('game-menu')} onNavigate={handleNavigate} />;
      case 'test-quiz':
        return <TestQuiz onBack={() => setCurrentPage('c1_nanjubeizhi')} />;
      case 'game-process':
        return <GameProcess onBack={() => setCurrentPage('c1_nanjubeizhi')} startSceneIndex={startSceneIndex} />;
      default:
        return <HomePage onNavigate={handleNavigate} skipAnimation={true} onAnimationComplete={handleAnimationComplete} />;
    }
  };

  return (
    <LanguageProvider>
      <AudioProvider>
        <div className="size-full bg-gradient-to-br from-sky-300 via-orange-200 to-green-300">
          {renderPage()}
          <AudioButton />
        </div>
      </AudioProvider>
    </LanguageProvider>
  );
}