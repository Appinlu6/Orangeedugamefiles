import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

export function AudioButton() {
  const { isMuted, toggleMute } = useAudio();

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
