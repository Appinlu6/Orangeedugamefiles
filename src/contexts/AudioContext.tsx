import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface AudioContextType {
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// 方案1: 使用本地文件路径（您需要将音乐文件放到 /public 文件夹）
// 将您的 WAV 文件重命名为 background-music.wav 并放到 /public 文件夹
const BACKGROUND_MUSIC_URL = '/background-music.wav';

// 方案2: 如果使用 Dropbox，格式应该是：
// https://www.dropbox.com/s/YOUR_FILE_ID/background-music.wav?dl=1
// 注意最后的 ?dl=1 很重要！

// 方案3: 如果使用其他云存储，确保链接是直接下载链接

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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
  
  const [isPlaying, setIsPlaying] = useState(false);

  // 初始化音频元素
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const audio = new Audio(BACKGROUND_MUSIC_URL);
    audio.loop = true; // 循环播放
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    // 监听播放状态
    const handlePlay = () => {
      console.log('🎵 音乐开始播放');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('⏸️ 音乐已暂停');
      setIsPlaying(false);
    };
    const handleError = (e: Event) => {
      console.error('❌ 音频加载失败:', e);
      console.error('音频URL:', BACKGROUND_MUSIC_URL);
    };
    const handleCanPlay = () => {
      console.log('✅ 音频已准备好播放');
    };
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    console.log('🎵 初始化音频系统，音量:', volume, '静音:', isMuted);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // 更新音频音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
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
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
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
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}