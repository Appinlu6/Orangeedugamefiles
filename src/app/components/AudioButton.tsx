import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

interface AudioButtonProps {
  variant?: 'default' | 'game';
}

export function AudioButton({ variant = 'default' }: AudioButtonProps) {
  const { isMuted, toggleMute } = useAudio();

  if (variant === 'game') {
    // 游戏进程页面样式 - 与角标对齐
    return (
      <button
        onClick={toggleMute}
        className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full border-3 border-amber-400 transition-all hover:scale-105 active:scale-95"
        aria-label={isMuted ? '取消静音' : '静音'}
      >
        {isMuted ? (
          <VolumeX className="size-5 text-[#603913]" />
        ) : (
          <Volume2 className="size-5 text-[#603913]" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-amber-100/90 hover:bg-amber-200/90 border-3 border-[#603913] shadow-lg transition-all hover:scale-110 active:scale-95"
      aria-label={isMuted ? '取消静音' : '静音'}
    >
      {isMuted ? (
        <VolumeX className="size-6 text-[#603913]" />
      ) : (
        <Volume2 className="size-6 text-[#603913]" />
      )}
    </button>
  );
}