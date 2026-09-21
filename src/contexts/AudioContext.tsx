import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface AudioContextType {
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
  switchToGameMusic: () => void;
  switchToBackgroundMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Dropbox 直接下载链接
const BACKGROUND_MUSIC_URL = 'https://www.dropbox.com/scl/fi/dko9d0t0yz0v8jj6b8exf/background_music_loop.wav?rlkey=zm31517wsdcdrf68kcr3lkmvp&st=v0mm3uan&dl=1&raw=1';
const GAME_MUSIC_URL = 'https://www.dropbox.com/scl/fi/bsvvc1c4ko7p1bgas0hzp/BecomeStardust_Game-Background-Engaging-Uplifting_Main.wav?rlkey=t0jlahyaafueomc7fth52e3o7&st=b7cc4pui&dl=1';

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentMusicType, setCurrentMusicType] = useState<'background' | 'game'>('background');
  const [isPlaying, setIsPlaying] = useState(false);
  const hasUserInteractedRef = useRef(false); // 追踪用户是否有过交互
  const preloadedAudioRef = useRef<{ background?: HTMLAudioElement; game?: HTMLAudioElement }>({});
  
  // 从 localStorage 读取保存的音量设置，默认 40%
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('app-volume');
    return saved ? parseFloat(saved) : 0.4;
  });
  
  // 从 localStorage 读取静音状态，默认不静音
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('app-muted');
    return saved === 'true';
  });

  // 预加载所有音频文件
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log('🔄 预加载背景音乐...');
    
    try {
      // 预加载背景音乐
      const bgAudio = new Audio(BACKGROUND_MUSIC_URL);
      bgAudio.loop = true;
      bgAudio.preload = 'auto';
      bgAudio.volume = isMuted ? 0 : volume;
      preloadedAudioRef.current.background = bgAudio;

      // ❌ 不再预加载游戏音乐，只在需要时（进入游戏第一幕）才加载

      bgAudio.addEventListener('canplaythrough', () => {
        console.log('✅ 背景音乐预加载完成');
      });

      bgAudio.addEventListener('error', (e) => {
        console.error('❌ 背景音乐加载失败:', e);
      });

      return () => {
        bgAudio.pause();
        bgAudio.src = '';
      };
    } catch (error) {
      console.error('❌ 音频预加载失败:', error);
    }
  }, []);

  // 初始化音频元素 - 只在音乐类型切换时重新创建
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const wasPlaying = audioRef.current && !audioRef.current.paused;
    
    // 如果有旧的音频，先暂停
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // 使用预加载的音频或创建新的
    const audio = preloadedAudioRef.current[currentMusicType] || new Audio(currentMusicType === 'background' ? BACKGROUND_MUSIC_URL : GAME_MUSIC_URL);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    // 监听播放状态
    const handlePlay = () => {
      console.log('🎵 音乐开始播放，类型:', currentMusicType);
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('⏸️ 音乐已暂停');
      setIsPlaying(false);
    };
    const handleError = (e: Event) => {
      console.error('❌ 音频加载失败:', e);
      console.error('音频URL:', currentMusicType === 'background' ? BACKGROUND_MUSIC_URL : GAME_MUSIC_URL);
    };
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    console.log('🎵 初始化音频系统 - 音量:', volume, '静音:', isMuted, '音乐类型:', currentMusicType, '之前播放状态:', wasPlaying, '用户交互:', hasUserInteractedRef.current);

    // 如果之前正在播放 或者 切换到游戏音乐且用户已交互，立即播放
    if (wasPlaying || (hasUserInteractedRef.current && currentMusicType === 'game')) {
      console.log('🎵 立即播放音乐...');
      audio.play().catch(err => console.error('Auto-play failed:', err));
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      // 不要清空audio.src，保持预加载的音频可用
    };
  }, [currentMusicType]); // 只依赖音乐类型

  // 更新音频音量 - 独立的effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      console.log('🔊 更新音量:', isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  // 保存音量设置到 localStorage
  useEffect(() => {
    localStorage.setItem('app-volume', volume.toString());
  }, [volume]);

  // 保存静音状态到 localStorage
  useEffect(() => {
    localStorage.setItem('app-muted', isMuted.toString());
  }, [isMuted]);

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    // 如果调整音量，自动取消静音
    if (isMuted && clampedVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const play = async () => {
    if (audioRef.current) {
      try {
        console.log('▶️ 开始播放音乐，当前类型:', currentMusicType);
        hasUserInteractedRef.current = true; // 标记用户已交互
        await audioRef.current.play();
      } catch (error) {
        console.error('❌ Audio play failed:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      console.log('⏸️ 暂停音乐');
      audioRef.current.pause();
    }
  };

  const switchToGameMusic = async () => {
    console.log('🎮 切换到游戏音乐');
    hasUserInteractedRef.current = true; // 标记用户已交互
    setCurrentMusicType('game');
  };

  const switchToBackgroundMusic = () => {
    console.log('🏠 切换到背景音乐');
    setCurrentMusicType('background');
  };

  return (
    <AudioContext.Provider
      value={{
        volume,
        isMuted,
        isPlaying,
        setVolume,
        toggleMute,
        play,
        pause,
        switchToGameMusic,
        switchToBackgroundMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    // 返回默认值，使组件在Figma预览环境中也能工作
    return {
      volume: 0.4,
      isMuted: false,
      isPlaying: false,
      setVolume: () => {},
      toggleMute: () => {},
      play: async () => {},
      pause: () => {},
      switchToGameMusic: async () => {},
      switchToBackgroundMusic: () => {},
    };
  }
  return context;
}