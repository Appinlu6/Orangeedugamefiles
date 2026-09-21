import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, SkipForward, ChevronRight, ChevronLeft } from 'lucide-react';
import sceneBackground1 from 'figma:asset/8e4684e7034b1052c17096a0d8da1eced0f79ff9.png';
import sceneBackground2 from 'figma:asset/602193544ef1194ae189cb97b651ee295bc3d3e9.png';
import sceneBackground3 from 'figma:asset/61b97ee8c28f099740ec361e5ababf767f42fb23.png';
import dialogueBoxImage from 'figma:asset/a956339727fde6e88d3f3d0d904635ee631f87c5.png';
import yanziCharacter from 'figma:asset/4fd065322d03ff76bf5c36afc64c45459c31e239.png';
import yanziSeriousCharacter from 'figma:asset/0e202082b56d0cee810495679449488bf1055fe1.png';
import yanziHappyCharacter from 'figma:asset/881da8772f733fa447cf049024b40ba8c9b3d590.png';
import kingCharacter from 'figma:asset/67253aefe21fb1b12e655f7e22b5b873cba1b1dc.png';
import kingConfusedCharacter from 'figma:asset/a74bd6ec53d26c4184c2335b8ee496af04085e44.png';
import chuRenCharacter from 'figma:asset/848ba107dcc690acc0c4bf16104d130986688cdc.png';
import prisonerCharacter from 'figma:asset/8e49795633e48536244f6e6fdf525a64b38c5029.png';
import prisonerFreeCharacter from 'figma:asset/8df773d4b5c404b2867cc373f2f6431a30101740.png';
import officialCharacter from 'figma:asset/b007cb8efb9fbd2b81dedf4743165f7948abb00a.png';
import { ActQuiz } from './ActQuiz';
import { updateStoryProgress } from '@/utils/gameProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { AudioButton } from './AudioButton';

// 配音音频文件
const narrativeAudios: { [key: string]: string } = {
  'yanzishichu.scene1.narrative1': 'https://www.dropbox.com/scl/fi/ppgz3lw3krl0e1stwanf7/1-nar1.mp3?rlkey=czt3yp0xq0cptxhim0ov5qugx&st=95wbu9xh&dl=1&raw=1',
  'yanzishichu.scene1.narrative2': 'https://www.dropbox.com/scl/fi/mw98ni0e61gztvesatlii/1-nar2.mp3?rlkey=wov4eqnav8asietypw3jqq8ql&st=p4vb7718&dl=1&raw=1',
  'yanzishichu.scene1.narrative3': 'https://www.dropbox.com/scl/fi/l2jsbgmenwndz557g5szs/1-nar3.mp3?rlkey=0sx6kssmmutuyehc2tap7r6s3&st=150a7mvl&dl=1&raw=1',
  'yanzishichu.scene2.narrative0': 'https://www.dropbox.com/scl/fi/6gqlumbk57826l92t8he5/2-nar0.mp3?rlkey=s9nj6hsxfrbh8dogkm7lt1jrc&st=ifzjuuyy&dl=1&raw=1',
  'yanzishichu.scene2.narrative1': 'https://www.dropbox.com/scl/fi/a9c9pctewo56a0owc6i12/2-nar1.mp3?rlkey=o6fh11pkcjshonw7tqhdld8hi&st=8h6rgnuc&dl=1&raw=1',
  'yanzishichu.scene2.narrative2': 'https://www.dropbox.com/scl/fi/8mlndkafsnyom5w4j9ocj/2-nar2.mp3?rlkey=9voble0xrckmbrolzie3ojty2&st=6txlnj9z&dl=1&raw=1',
};

// 对话配音音频文件
const dialogueAudios: { [key: string]: string } = {
  'yanzishichu.scene1.dialogue1': 'https://www.dropbox.com/scl/fi/0ot4vjhlw0z0rjcytiqf7/1-dia1.mp3?rlkey=e34gnop58i6anriz36ckzjjex&st=94hli1s7&dl=1&raw=1',
  'yanzishichu.scene1.dialogue2': 'https://www.dropbox.com/scl/fi/10vmclx39z2fwj2et7xnh/1-dia2.mp3?rlkey=8j210kcbrt0ep6nixj3rle9yn&st=d7hjj2no&dl=1&raw=1',
  'yanzishichu.scene1.dialogue3': 'https://www.dropbox.com/scl/fi/mbh5fq6jhzofubim4e6uk/1-dia3.mp3?rlkey=ijr03akgn7gx768iyxs261ji6&st=fwi6fzr0&dl=1&raw=1',
  'yanzishichu.scene1.dialogue4': 'https://www.dropbox.com/scl/fi/i09xp3qtcscc1daz91bse/1-dia4.mp3?rlkey=6l6zrpr5mpdjh41mx7g9bm2yy&st=k9nc2cze&dl=1&raw=1',
  'yanzishichu.scene2.dialogue1': 'https://www.dropbox.com/scl/fi/asi14tujg9ftzqycu41x3/2-dia1.mp3?rlkey=jvamc2hc03xc4lw65lniwnhab&st=fwkhzsjj&dl=1&raw=1',
  'yanzishichu.scene2.dialogue2': 'https://www.dropbox.com/scl/fi/29bnovcre0yl7jnwt7l59/2-dia2.mp3?rlkey=xsakihshxjbowj7dybpyts5o8&st=46pig8l8&dl=1&raw=1',
  'yanzishichu.scene2.dialogue3': 'https://www.dropbox.com/scl/fi/0o15idr34sc74tccbkjld/2-dia3.mp3?rlkey=h3wnkalu72kmegigxesgvo5eu&st=dlfbt1wa&dl=1&raw=1',
  'yanzishichu.scene2.dialogue4': 'https://www.dropbox.com/scl/fi/ymztoxzu2btrzn17s8w47/2-dia4.mp3?rlkey=ol9xwlmpdvr1ud0k0ahmjz1al&st=x6mfyim0&dl=1&raw=1',
  'yanzishichu.scene3.narrative0': 'https://www.dropbox.com/scl/fi/m0m8wqc3jfi68i2ct0dkh/3-nar0.mp3?rlkey=cx7k07y61fkk48h4oduwc7whk&st=l8kr31h0&dl=1&raw=1',
  'yanzishichu.scene3.dialogue1': 'https://www.dropbox.com/scl/fi/nb2wsv7d788f31c29506y/3-dia1.mp3?rlkey=0p76bj8ah9ntklgktp5u5cfi3&st=y53w6iak&dl=1&raw=1',
  'yanzishichu.scene3.dialogue2': 'https://www.dropbox.com/scl/fi/6hy2nj9d2mtyvllxc05j6/3-dia2.mp3?rlkey=amovcy1kc9862215cwfuvaiwe&st=rp308ff3&dl=1&raw=1',
  'yanzishichu.scene3.dialogue3': 'https://www.dropbox.com/scl/fi/lyqjeiolsfjo4x24wiytn/3-dia3.mp3?rlkey=l3xjgjwrwsypnzmfcmd65s83u&st=9nayk7m1&dl=1&raw=1',
  'yanzishichu.scene3.dialogue4': 'https://www.dropbox.com/scl/fi/67yzd9i9joa757gr8vk85/3-dia4.mp3?rlkey=nntrgxgpj2oyagzgx5gynad2l&st=4p782x0h&dl=1&raw=1',
  'yanzishichu.scene3.narrative1': 'https://www.dropbox.com/scl/fi/1dxx3ucsj1vjqwt25mek4/3-nar1.mp3?rlkey=koeybwp2ezi0iazgv6ald0jfo&st=rswiymi2&dl=1&raw=1',
  'yanzishichu.scene3.dialogue5': 'https://www.dropbox.com/scl/fi/pf80r6fgs9nbgd512oq1k/3-dia-5.mp3?rlkey=81ev8olg9rao2w1pb59uhdeg8&st=dqgiy4qd&dl=1&raw=1',
  'yanzishichu.scene3.dialogue6': 'https://www.dropbox.com/scl/fi/fzyol17yfhiy53md82ytc/3-dia6.mp3?rlkey=alp92k2vbw9bwe5kkbpb6d7t8&st=d79ps5fb&dl=1&raw=1',
  'yanzishichu.scene3.narrative2': 'https://www.dropbox.com/scl/fi/ntxr7vufbmsensj79dvwc/3-nar2.mp3?rlkey=phnsqgbmryzn12nao47ll3sra&st=wfrt40c6&dl=1&raw=1',
  'yanzishichu.scene3.dialogue7': 'https://www.dropbox.com/scl/fi/77tap07i27z11xylov97e/3-dia7.mp3?rlkey=cuhgwvb6yjymy0njdgawndqfe&st=cbu9sknl&dl=1&raw=1',
  'yanzishichu.scene3.dialogue8': 'https://www.dropbox.com/scl/fi/etwszvs9pwyl1pin4qn1o/3-dia8.mp3?rlkey=8pfgllcqtmisum7qlo8i0h2di&st=m3idhjhs&dl=1&raw=1',
  'yanzishichu.scene3.narrative3': 'https://www.dropbox.com/scl/fi/gu4ebwnp6tq7y74qf5r4d/3-nar3.mp3?rlkey=2i0535yr36dk5aeqn6rh0m8h7&st=a9l60o7l&dl=1&raw=1',
  'yanzishichu.scene4.narrative0': 'https://www.dropbox.com/scl/fi/6gqlumbk57826l92t8he5/4-nar0.mp3?rlkey=s9nj6hsxfrbh8dogkm7lt1jrc&st=ifzjuuyy&dl=1&raw=1',
  'yanzishichu.scene4.narrative1': 'https://www.dropbox.com/scl/fi/a9c9pctewo56a0owc6i12/4-nar1.mp3?rlkey=o6fh11pkcjshonw7tqhdld8hi&st=8h6rgnuc&dl=1&raw=1',
  'yanzishichu.scene4.dialogue1': 'https://www.dropbox.com/scl/fi/29bnovcre0yl7jnwt7l59/4-dia1.mp3?rlkey=xsakihshxjbowj7dybpyts5o8&st=46pig8l8&dl=1&raw=1',
  'yanzishichu.scene4.narrative2': 'https://www.dropbox.com/scl/fi/8mlndkafsnyom5w4j9ocj/4-nar2.mp3?rlkey=9voble0xrckmbrolzie3ojty2&st=6txlnj9z&dl=1&raw=1',
};

interface GameProcessProps {
  onBack: () => void;
  startSceneIndex?: number;
  userGrade?: 'lower' | 'upper';
  onNavigate?: (page: string) => void; // 添加导航函数
}

// 对话数据接口
interface Dialogue {
  characterKey: string;
  textKey: string;
  characterPosition?: 'left' | 'right' | 'center';
  isNarrative?: boolean; // 新增：标记是否为旁白
}

// 场景接口
interface Scene {
  background: string;
  narrativeKeys: string[];
  dialogues: Dialogue[];
}

// 场景数据 - 使用翻译键
const SCENES: Scene[] = [
  // 镜头1
  {
    background: sceneBackground1,
    narrativeKeys: [
      'yanzishichu.scene1.narrative1',
      'yanzishichu.scene1.narrative2',
      'yanzishichu.scene1.narrative3'
    ],
    dialogues: [
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene1.dialogue1', characterPosition: 'left' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene1.dialogue2', characterPosition: 'left' },
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene1.dialogue3', characterPosition: 'right' },
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene1.dialogue4', characterPosition: 'right' },
    ]
  },
  // 镜头2
  {
    background: sceneBackground3,
    narrativeKeys: [
      'yanzishichu.scene2.narrative0',
      'yanzishichu.scene2.narrative1',
      'yanzishichu.scene2.narrative2'
    ],
    dialogues: [
      { characterKey: 'yanzishichu.official', textKey: 'yanzishichu.scene2.dialogue1', characterPosition: 'center' },
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene2.dialogue2', characterPosition: 'right' },
      { characterKey: 'yanzishichu.official', textKey: 'yanzishichu.scene2.dialogue3', characterPosition: 'center' },
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene2.dialogue4', characterPosition: 'right' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene2.dialogue5', characterPosition: 'left' },
    ]
  },
  // 镜头3 - 旁白和对话穿插
  {
    background: sceneBackground2,
    narrativeKeys: [], // 第三幕不使用独立的旁白阶段
    dialogues: [
      // 旁白0
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene3.narrative0', isNarrative: true },
      // 晏子对话1-4
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue1', characterPosition: 'left' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue2', characterPosition: 'left' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue3', characterPosition: 'left' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue4', characterPosition: 'left' },
      // 旁白1
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene3.narrative1', isNarrative: true },
      // 楚王对话
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene3.dialogue5', characterPosition: 'right' },
      // 晏子对话5
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue6', characterPosition: 'left' },
      // 旁白2
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene3.narrative2', isNarrative: true },
      // 晏子对话6-7
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue7', characterPosition: 'left' },
      { characterKey: 'yanzishichu.yanzi', textKey: 'yanzishichu.scene3.dialogue8', characterPosition: 'left' },
      // 旁白3
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene3.narrative3', isNarrative: true },
    ]
  },
  // 镜头4 - 第四幕
  {
    background: sceneBackground2,
    narrativeKeys: [], // 第四幕不使用独立的旁白阶段
    dialogues: [
      // 旁白第一句
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene4.narrative0', isNarrative: true },
      // 旁白第二句
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene4.narrative1', isNarrative: true },
      // 楚王对话
      { characterKey: 'yanzishichu.king', textKey: 'yanzishichu.scene4.dialogue1', characterPosition: 'right' },
      // 旁白第三句
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene4.narrative2', isNarrative: true },
      // 旁白第四句 - 故事总结
      { characterKey: 'yanzishichu.narrator', textKey: 'yanzishichu.scene4.narrative3', isNarrative: true },
    ]
  }
];

export function GameProcess({ onBack, startSceneIndex, userGrade, onNavigate }: GameProcessProps) {
  const { t } = useLanguage();
  const { isMuted, toggleMute, switchToBackgroundMusic, switchToGameMusic } = useAudio();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(startSceneIndex || 0);
  const [currentNode, setCurrentNode] = useState((startSceneIndex || 0) + 1);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  
  const [showBackground, setShowBackground] = useState(true);
  const [showLeftCharacter, setShowLeftCharacter] = useState(false);
  const [showRightCharacter, setShowRightCharacter] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(true);
  
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [showingNarrative, setShowingNarrative] = useState(true);
  const [sceneComplete, setSceneComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showCenterCharacter, setShowCenterCharacter] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  // 测试题弹窗状态
  const [showActQuiz, setShowActQuiz] = useState(false);
  const [actQuizNumber, setActQuizNumber] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  // 配音音频引用
  const narrativeAudioRef = useRef<HTMLAudioElement | null>(null);
  const dialogueAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentScene = SCENES[currentSceneIndex];
  const currentDialogue = currentScene?.dialogues?.[currentDialogueIndex];

  // 初始化场景状态 - 如果场景没有旁白，直接进入对话阶段
  useEffect(() => {
    if (!currentScene) return; // 添加安全检查
    
    if (currentScene.narrativeKeys.length === 0) {
      setShowingNarrative(false);
      setNarrativeIndex(0);
    } else {
      setShowingNarrative(true);
      setNarrativeIndex(0);
      
      // 立即播放第一句旁白的配音（如果有）
      const firstNarrativeKey = currentScene.narrativeKeys[0];
      const audioUrl = narrativeAudios[firstNarrativeKey];
      if (audioUrl && !isMuted && narrativeIndex === 0) {
        if (narrativeAudioRef.current) {
          narrativeAudioRef.current.pause();
          narrativeAudioRef.current = null;
        }
        const audio = new Audio(audioUrl);
        narrativeAudioRef.current = audio;
        audio.play().catch(err => console.log('音频播放失败:', err));
      }
    }
  }, [currentSceneIndex, currentScene?.narrativeKeys?.length]);

  // 进入游戏进程时切换到游戏音乐
  useEffect(() => {
    console.log('🎮 进入游戏进程，切换到游戏音乐');
    switchToGameMusic();

    // 组件卸载时切换回背景音乐并停止所有配音
    return () => {
      console.log('🏠 离开游戏进程，切换回背景音乐');
      switchToBackgroundMusic();
      
      // 停止所有配音
      if (narrativeAudioRef.current) {
        narrativeAudioRef.current.pause();
        narrativeAudioRef.current = null;
      }
      if (dialogueAudioRef.current) {
        dialogueAudioRef.current.pause();
        dialogueAudioRef.current = null;
      }
    };
  }, [switchToGameMusic, switchToBackgroundMusic]);

  // 黑屏安全机制 - 防止黑屏卡住超过3秒
  useEffect(() => {
    if (showBlackScreen) {
      const timer = setTimeout(() => {
        console.log('⚠️ 黑屏超时，强制关闭');
        setShowBlackScreen(false);
        setIsTransitioning(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showBlackScreen]);

  useEffect(() => {
    if (!showingNarrative && currentDialogue) {
      const characterName = t(currentDialogue.characterKey);
      if (currentDialogue.characterPosition === 'center') {
        setShowCenterCharacter(true);
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 600);
      } else {
        setShowCenterCharacter(false);
      }
    }
  }, [currentDialogueIndex, showingNarrative, t, currentDialogue]);

  // 在第二段旁白时显示晏子立绘（仅第一幕）
  useEffect(() => {
    if (showingNarrative && currentSceneIndex === 0 && narrativeIndex === 1) {
      setShowLeftCharacter(true);
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

  // 在第三段旁白时显示楚王立绘（仅第一幕）
  useEffect(() => {
    if (showingNarrative && currentSceneIndex === 0 && narrativeIndex === 2) {
      setShowRightCharacter(true);
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

  // 在第二幕第一段旁白时显示楚王立绘
  useEffect(() => {
    if (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 0) {
      // 延迟800ms，让对话框先出现，然后在旁白文字开始打字时楚王出现
      const timer = setTimeout(() => {
        setShowRightCharacter(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

  // 在第二幕进入对话阶段时显示楚王立绘（延迟显示）
  useEffect(() => {
    if (!showingNarrative && currentSceneIndex === 1 && currentDialogueIndex === 0) {
      // 对话框出现后800ms再显示楚王立绘
      const timer = setTimeout(() => {
        setShowRightCharacter(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showingNarrative, currentSceneIndex, currentDialogueIndex]);

  // 在第二幕第二段旁白时，楚王消失、晏子出现
  useEffect(() => {
    if (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 1) {
      setShowRightCharacter(false); // 楚王消失
      setShowLeftCharacter(true);   // 晏子出现
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

  // 在第二幕第三段旁白时，显示官吏立绘（右侧）
  useEffect(() => {
    if (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 2) {
      setShowRightCharacter(true); // 官吏出现
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

  // 第三幕立绘控制 - 基于对话索引
  useEffect(() => {
    if (currentSceneIndex === 2 && !showingNarrative) {
      // 对话索引0是旁白0，不示人物
      // 对话索引1-4是晏子对话，显示晏子（左侧）
      if (currentDialogueIndex >= 1 && currentDialogueIndex <= 4) {
        setShowLeftCharacter(true);
        setShowRightCharacter(false);
      }
      // 对话索引5是旁白1，保持晏子显示
      else if (currentDialogueIndex === 5) {
        setShowLeftCharacter(true);
        setShowRightCharacter(false);
      }
      // 对话索引6是楚王对话，显示晏子和楚王
      else if (currentDialogueIndex === 6) {
        setShowLeftCharacter(true);
        setShowRightCharacter(true);
      }
      // 对话索引7-10是晏子对话和旁白，显示晏子和楚王
      else if (currentDialogueIndex >= 7 && currentDialogueIndex <= 10) {
        setShowLeftCharacter(true);
        setShowRightCharacter(true);
      }
    }
  }, [currentSceneIndex, currentDialogueIndex, showingNarrative]);

  // 第四幕立绘控制 - 基于对话索引
  useEffect(() => {
    if (currentSceneIndex === 3 && !showingNarrative) {
      // 对话索引0-2：显示晏子和楚王
      if (currentDialogueIndex <= 2) {
        setShowLeftCharacter(true);
        setShowRightCharacter(true);
        setShowCenterCharacter(false);
      }
      // 对话索引3（narrative2 - 楚王释放犯人）：显示犯人（中间）
      else if (currentDialogueIndex === 3) {
        setShowLeftCharacter(false);
        setShowRightCharacter(false);
        setShowCenterCharacter(true);
      }
      // 对话索引4（narrative3 - 故事总结）：显示晏子和楚王初始立绘
      else if (currentDialogueIndex === 4) {
        setShowLeftCharacter(true);
        setShowRightCharacter(true);
        setShowCenterCharacter(false);
      }
    }
  }, [currentSceneIndex, currentDialogueIndex, showingNarrative]);

  useEffect(() => {
    if (showingNarrative && currentScene && narrativeIndex < currentScene.narrativeKeys.length) {
      const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
      const currentNarrative = t(currentNarrativeKey);
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;

      // 检查是否有配音
      const audioUrl = narrativeAudios[currentNarrativeKey];
      if (audioUrl && !isMuted) {
        // 如果有配音，播放音频并使用慢速打字
        // 注意：第一句旁白已在场景初始化时播放，这里只针对第二句及之后的旁白
        if (narrativeIndex > 0) {
          // 停止之前的音频
          if (narrativeAudioRef.current) {
            narrativeAudioRef.current.pause();
            narrativeAudioRef.current = null;
          }
          // 立即播放配音
          const audio = new Audio(audioUrl);
          narrativeAudioRef.current = audio;
          audio.play().catch(err => console.log('音频播放失败:', err));
        }
        
        // 使用慢速打字以匹配音频
        const typingSpeed = 200;
        const timer = setInterval(() => {
          if (index < currentNarrative.length) {
            setDisplayedText(currentNarrative.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(timer);
          }
        }, typingSpeed);

        return () => {
          clearInterval(timer);
        };
      } else {
        // 没有配音，使用默认速度
        const timer = setInterval(() => {
          if (index < currentNarrative.length) {
            setDisplayedText(currentNarrative.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(timer);
          }
        }, 40);

        return () => clearInterval(timer);
      }
    } else if (!showingNarrative && currentDialogue && !showFullText) {
      const dialogueText = t(currentDialogue.textKey);
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;

      // 检查是否有对话配音
      const audioUrl = dialogueAudios[currentDialogue.textKey];
      if (audioUrl && !isMuted) {
        // 如果有对话配音，播放音频并使用慢速打字
        // 停止之前的音频
        if (dialogueAudioRef.current) {
          dialogueAudioRef.current.pause();
          dialogueAudioRef.current = null;
        }
        // 立即播放配音
        const audio = new Audio(audioUrl);
        dialogueAudioRef.current = audio;
        audio.play().catch(err => console.log('音频播放失败:', err));
        
        // 使用慢速打字以匹配音频
        const typingSpeed = 200;
        const timer = setInterval(() => {
          if (index < dialogueText.length) {
            setDisplayedText(dialogueText.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(timer);
          }
        }, typingSpeed);

        return () => {
          clearInterval(timer);
        };
      } else {
        // 没有对话配音，使用默认速度
        const timer = setInterval(() => {
          if (index < dialogueText.length) {
            setDisplayedText(dialogueText.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(timer);
          }
        }, 50);

        return () => clearInterval(timer);
      }
    }
  }, [narrativeIndex, currentDialogueIndex, showingNarrative, showFullText, currentSceneIndex, currentScene, currentDialogue, t, isMuted]);

  const handleNext = () => {
    // 停止当前正在播放的所有配音
    if (narrativeAudioRef.current) {
      narrativeAudioRef.current.pause();
      narrativeAudioRef.current = null;
    }
    if (dialogueAudioRef.current) {
      dialogueAudioRef.current.pause();
      dialogueAudioRef.current = null;
    }

    // 如果正在打字，直接跳过动画并进入下一段
    if (isTyping) {
      if (showingNarrative) {
        const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
        setDisplayedText(t(currentNarrativeKey));
      } else {
        setDisplayedText(t(currentDialogue.textKey));
      }
      setIsTyping(false);
      
      // 立即执行下一段的逻辑
      setTimeout(() => {
        if (showingNarrative) {
          if (narrativeIndex < currentScene.narrativeKeys.length - 1) {
            setNarrativeIndex(narrativeIndex + 1);
          } else {
            setShowingNarrative(false);
            setShowLeftCharacter(true);
            setTimeout(() => setShowRightCharacter(true), 400);
          }
        } else {
          if (currentDialogueIndex < currentScene.dialogues.length - 1) {
            setCurrentDialogueIndex(currentDialogueIndex + 1);
            setShowFullText(false);
          } else {
            setSceneComplete(true);
          }
        }
      }, 50); // 短暂延迟确保状态更新完成
    } else if (showingNarrative) {
      if (narrativeIndex < currentScene.narrativeKeys.length - 1) {
        setNarrativeIndex(narrativeIndex + 1);
      } else {
        setShowingNarrative(false);
        setShowLeftCharacter(true);
        setTimeout(() => setShowRightCharacter(true), 400);
      }
    } else {
      if (currentDialogueIndex < currentScene.dialogues.length - 1) {
        setCurrentDialogueIndex(currentDialogueIndex + 1);
        setShowFullText(false);
      } else {
        setSceneComplete(true);
      }
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      setActQuizNumber(currentNode);
      setShowActQuiz(true);
    } else {
      setActQuizNumber(currentNode);
      setShowActQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    setShowActQuiz(false);
    
    const newTotalScore = totalScore + score;
    setTotalScore(newTotalScore);
    console.log(`第${actQuizNumber}幕测试完成，得分：${score}/5，累计得分：${newTotalScore}`);
    
    const storyId = 'chunqiu-quanyuan';
    const totalActs = 4;
    const completedActs = currentNode;
    updateStoryProgress(storyId, completedActs, totalActs);
    console.log(`更新进度：${storyId} - 完成 ${completedActs}/${totalActs} 幕`);
    
    if (currentSceneIndex < SCENES.length - 1) {
      setIsTransitioning(true);
      setShowDialogue(false);
      setShowLeftCharacter(false);
      setShowRightCharacter(false);
      
      setTimeout(() => setShowBackground(false), 1000);
      setTimeout(() => setShowBlackScreen(true), 2500);
      
      setTimeout(() => {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setCurrentNode(currentNode + 1);
        setCurrentDialogueIndex(0);
        setNarrativeIndex(0);
        setShowingNarrative(true);
        setSceneComplete(false);
        setIsTyping(false);
        setShowFullText(false);
        setDisplayedText('');
        setAnimationComplete(false);
      }, 3500);
      
      setTimeout(() => {
        setShowBlackScreen(false);
        setTimeout(() => setShowBackground(true), 100);
        setTimeout(() => setShowDialogue(true), 1500);
        setTimeout(() => {
          setAnimationComplete(true);
          setIsTransitioning(false);
        }, 2500);
      }, 4000);
    } else {
      alert(t('yanzishichu.complete_all').replace('{score}', totalScore.toString()));
      onBack();
    }
  };

  const handlePrevious = () => {
    // 停止当前正在播放的所有配音
    if (narrativeAudioRef.current) {
      narrativeAudioRef.current.pause();
      narrativeAudioRef.current = null;
    }
    if (dialogueAudioRef.current) {
      dialogueAudioRef.current.pause();
      dialogueAudioRef.current = null;
    }

    // 如果正在打字，直接跳过动画并进入上一段
    if (isTyping) {
      if (showingNarrative) {
        const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
        setDisplayedText(t(currentNarrativeKey));
      } else {
        setDisplayedText(t(currentDialogue.textKey));
      }
      setIsTyping(false);
      
      // 立即执行上一段的逻辑
      setTimeout(() => {
        if (showingNarrative) {
          if (narrativeIndex > 0) {
            setNarrativeIndex(narrativeIndex - 1);
          }
        } else {
          if (currentDialogueIndex > 0) {
            setCurrentDialogueIndex(currentDialogueIndex - 1);
            setShowFullText(false);
          } else {
            setShowingNarrative(true);
            setNarrativeIndex(currentScene.narrativeKeys.length - 1);
            setShowLeftCharacter(false);
            setShowRightCharacter(false);
          }
        }
      }, 50); // 短暂延迟确保状态更新完成
      return;
    }

    if (showingNarrative) {
      if (narrativeIndex > 0) {
        setNarrativeIndex(narrativeIndex - 1);
      }
    } else {
      if (currentDialogueIndex > 0) {
        setCurrentDialogueIndex(currentDialogueIndex - 1);
        setShowFullText(false);
      } else {
        setShowingNarrative(true);
        setNarrativeIndex(currentScene.narrativeKeys.length - 1);
        setShowLeftCharacter(false);
        setShowRightCharacter(false);
      }
    }
  };

  // 获取当前角色名称（用于判断图片）
  const getCurrentCharacterName = () => {
    if (showingNarrative || !currentDialogue) return '';
    return t(currentDialogue.characterKey);
  };

  // 处理返回
  const handleBack = () => {
    onBack();
  };

  return (
    <div className="size-full relative overflow-hidden bg-black">
      {showBlackScreen && (
        <div className="absolute inset-0 bg-black z-50 transition-opacity duration-[1500ms] opacity-100" />
      )}

      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ${
        showBackground ? 'opacity-100' : 'opacity-0'
      }`} style={{ backgroundImage: `url(${currentScene.background})` }} />

      {/* 人物立绘容器 - 与对话框使用相同的应式结构 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto relative">
            {/* 晏子 - 左侧 */}
            <div className={`absolute left-0 bottom-[110px] sm:bottom-[150px] md:bottom-[190px] transition-all duration-[800ms] ${
              showLeftCharacter ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            } ${
              !showingNarrative && currentDialogue.characterPosition === 'center' 
                ? 'brightness-[0.3]'
                : ''
            } ${
              // 如果是旁白（showingNarrative 或 isNarrative），立绘高亮
              showingNarrative || currentDialogue?.isNarrative
                ? 'brightness-100' 
                : (!showingNarrative && currentDialogue.characterPosition === 'left' ? 'brightness-100' : 'brightness-50')
            }`}>
              <img 
                src={
                  // 第三幕从dialogue2开始使用微笑的晏子
                  currentSceneIndex === 2 && !showingNarrative && currentDialogueIndex >= 2
                    ? yanziHappyCharacter
                    : // 当晏子说"稍作沉思，缓缓起身"时显示认真表情的晏子
                      !showingNarrative && currentDialogue?.textKey === 'yanzishichu.scene2.dialogue5'
                    ? yanziSeriousCharacter
                    : yanziCharacter
                }
                alt="晏子" 
                className="w-48 sm:w-[268px] md:w-[346px] h-auto object-contain drop-shadow-2xl" 
              />
            </div>

            {/* 楚王/官吏 - 右侧 */}
            <div className={`absolute right-[-20px] bottom-[110px] sm:bottom-[150px] md:bottom-[190px] transition-all duration-[800ms] ${
              showRightCharacter ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
              !showingNarrative && currentDialogue.characterPosition === 'center' 
                ? 'brightness-[0.3]'
                : ''
            } ${
              // 如果是旁白（showingNarrative 或 isNarrative），立绘高亮
              showingNarrative || currentDialogue?.isNarrative
                ? 'brightness-100' 
                : (!showingNarrative && currentDialogue.characterPosition === 'right' ? 'brightness-100' : 'brightness-50')
            }`}>
              <img 
                src={
                  // 在第二幕第三段旁白或官吏对话时显示新的官吏立绘
                  (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 2) || getCurrentCharacterName() === t('yanzishichu.official')
                    ? officialCharacter
                    : // 第四幕楚王说话时（对话索引2）使用疑惑表情
                      currentSceneIndex === 3 && !showingNarrative && currentDialogueIndex === 2
                    ? kingConfusedCharacter
                    : // 第三幕从对话索引5(narrative1)开始，楚王换成疑惑表情
                      currentSceneIndex === 2 && !showingNarrative && currentDialogueIndex >= 5
                    ? kingConfusedCharacter
                    : kingCharacter
                } 
                alt={
                  (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 2) || getCurrentCharacterName() === t('yanzishichu.official')
                    ? '官吏'
                    : '楚王'
                } 
                className={`h-auto object-contain drop-shadow-2xl ${
                  // 在第二幕第三段旁白或对话中的官吏时使用标准尺寸
                  (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 2) || getCurrentCharacterName() === t('yanzishichu.official')
                    ? 'w-48 sm:w-[268px] md:w-[346px]'
                    : 'w-[360px] sm:w-[515px] md:w-[665px]'
                }`}
              />
            </div>

            {/* 犯人 - 央 */}
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-[110px] sm:bottom-[150px] md:bottom-[190px] transition-all duration-[800ms] ${
              showCenterCharacter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              <div className={`relative ${screenShake ? 'animate-shake' : ''}`}>
                <img 
                  src={
                    // 第四幕最后一段旁白使用获得自由的犯人立绘
                    currentSceneIndex === 3 && currentDialogueIndex === 3
                      ? prisonerFreeCharacter
                      : prisonerCharacter
                  } 
                  alt="犯人" 
                  className="w-48 sm:w-[268px] md:w-[346px] h-auto object-contain drop-shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <button onClick={handleBack} className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-4 py-2.5 rounded-xl border-3 border-[#603913] shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
            <ArrowLeft className="size-5" />
            <span className="text-sm font-bold">{t('common.back')}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-[#603913]/80 text-white px-4 py-2 rounded-xl border-2 border-amber-200">
              <span className="text-sm font-bold">
                {t('yanzishichu.act_label').replace('{act}', (currentSceneIndex + 1).toString())} | {t('yanzishichu.dialogue_count').replace('{current}', (showingNarrative ? narrativeIndex + 1 : currentScene.narrativeKeys.length + currentDialogueIndex + 1).toString()).replace('{total}', (currentScene.narrativeKeys.length + currentScene.dialogues.length).toString())}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full border-3 border-amber-400">
              <span className="text-xl">🌟</span>
              <span className="text-lg font-bold text-[#F26522]">{totalScore}</span>
            </div>
            <AudioButton variant="game" />
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-[1000ms] ${
        showDialogue ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto relative">
            <div className="relative">
              <img src={dialogueBoxImage} alt="对话框" className="w-full h-auto object-contain" />
              
              <div className="absolute inset-0 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                {showingNarrative ? (
                  <>
                    <div className="mb-4">
                      <div className="inline-block bg-amber-700 text-white px-6 py-2 rounded-full font-bold text-lg sm:text-xl border-3 border-[#603913] shadow-lg">
                        {t('yanzishichu.narrator')}
                      </div>
                    </div>
                    <div className="min-h-[80px] sm:min-h-[120px] mb-4 mt-[20px] px-[30px]">
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed mt-[20px] line-clamp-3" style={{ color: '#603913' }}>
                        {displayedText}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      {narrativeIndex > 0 ? (
                        <button onClick={handlePrevious} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-3 border-[#603913] shadow-lg transition-all hover:scale-105 active:scale-95">
                          <ChevronLeft className="size-5 sm:size-6" />
                          <span className="text-base sm:text-lg font-bold">{t('yanzishichu.prev_paragraph')}</span>
                        </button>
                      ) : <div></div>}
                      <button onClick={handleNext} className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-3 border-[#603913] shadow-lg transition-all hover:scale-105 active:scale-95">
                        <span className="text-base sm:text-lg font-bold">
                          {t('yanzishichu.next_paragraph')}
                        </span>
                        <ChevronRight className="size-5 sm:size-6" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg sm:text-xl border-3 shadow-lg ${
                        // 如果是旁白（isNarrative为true），使用旁白样式
                        currentDialogue?.isNarrative
                          ? 'bg-amber-700 text-white border-[#603913]'
                          : getCurrentCharacterName() === t('yanzishichu.official')
                          ? 'bg-red-600 text-white border-red-900 animate-dialogue-shake'
                          : 'bg-[#F26522] text-white border-[#603913]'
                      }`}>
                        {t(currentDialogue.characterKey)}
                      </div>
                    </div>
                    <div className="min-h-[80px] sm:min-h-[100px] mb-4 mt-[25px] px-[30px]">
                      <p className={`leading-relaxed ${ 
                        // 旁白使用较小字体
                        currentDialogue?.isNarrative
                          ? 'text-base sm:text-lg md:text-xl'
                          : getCurrentCharacterName() === t('yanzishichu.official') 
                          ? 'text-lg sm:text-xl md:text-2xl font-black' 
                          : 'text-lg sm:text-xl md:text-2xl'
                      }`} style={{ 
                        color: getCurrentCharacterName() === t('yanzishichu.official') ? '#DC2626' : '#603913'
                      }}>
                        {displayedText.split('\\n').map((line, index, array) => (
                          <span key={index}>
                            {line}
                            {index < array.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                    {sceneComplete ? (
                      <div className="flex justify-center">
                        <button onClick={handleNextScene} className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl border-4 border-[#603913] shadow-2xl transition-all hover:scale-110 active:scale-95 animate-pulse">
                          <span className="text-xl sm:text-2xl font-black">{t('yanzishichu.next_act')}</span>
                          <ChevronRight className="size-7 sm:size-8" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <button onClick={handlePrevious} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-3 border-[#603913] shadow-lg transition-all hover:scale-105 active:scale-95">
                          <ChevronLeft className="size-5 sm:size-6" />
                          <span className="text-base sm:text-lg font-bold">{t('yanzishichu.prev_paragraph')}</span>
                        </button>
                        <button onClick={handleNext} className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-3 border-[#603913] shadow-lg transition-all hover:scale-105 active:scale-95">
                          <span className="text-base sm:text-lg font-bold">
                            {currentDialogueIndex < currentScene.dialogues.length - 1 ? t('yanzishichu.next_paragraph') : t('yanzishichu.continue')}
                          </span>
                          <ChevronRight className="size-5 sm:size-6" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 测试题弹窗 */}
      {showActQuiz && (
        <ActQuiz
          actNumber={actQuizNumber}
          userGrade={userGrade || 'lower'}
          onClose={() => setShowActQuiz(false)}
          onComplete={handleQuizComplete}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}