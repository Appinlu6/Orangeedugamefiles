import { useState, useEffect } from 'react';
import { ArrowLeft, SkipForward, ChevronRight, ChevronLeft } from 'lucide-react';
import sceneBackground1 from 'figma:asset/8e4684e7034b1052c17096a0d8da1eced0f79ff9.png';
import sceneBackground3 from 'figma:asset/61b97ee8c28f099740ec361e5ababf767f42fb23.png';
import dialogueBoxImage from 'figma:asset/a956339727fde6e88d3f3d0d904635ee631f87c5.png';
import yanziCharacter from 'figma:asset/4fd065322d03ff76bf5c36afc64c45459c31e239.png';
import yanziSeriousCharacter from 'figma:asset/0e202082b56d0cee810495679449488bf1055fe1.png';
import kingCharacter from 'figma:asset/67253aefe21fb1b12e655f7e22b5b873cba1b1dc.png';
import chuRenCharacter from 'figma:asset/848ba107dcc690acc0c4bf16104d130986688cdc.png';
import prisonerCharacter from 'figma:asset/8e49795633e48536244f6e6fdf525a64b38c5029.png';
import officialCharacter from 'figma:asset/b007cb8efb9fbd2b81dedf4743165f7948abb00a.png';
import { ActQuiz } from './ActQuiz';
import { updateStoryProgress } from '@/utils/gameProgress';
import { useLanguage } from '@/contexts/LanguageContext';

interface GameProcessProps {
  onBack: () => void;
  startSceneIndex?: number;
}

// 对话数据接口
interface Dialogue {
  characterKey: string;
  textKey: string;
  characterPosition?: 'left' | 'right' | 'center';
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
  }
];

export function GameProcess({ onBack, startSceneIndex }: GameProcessProps) {
  const { t } = useLanguage();
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

  const currentScene = SCENES[currentSceneIndex];
  const currentDialogue = currentScene.dialogues[currentDialogueIndex];

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
      setShowRightCharacter(true);
    }
  }, [narrativeIndex, showingNarrative, currentSceneIndex]);

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

  useEffect(() => {
    if (showingNarrative && narrativeIndex < currentScene.narrativeKeys.length) {
      const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
      const currentNarrative = t(currentNarrativeKey);
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;

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
    } else if (!showingNarrative && currentDialogue && !showFullText) {
      const dialogueText = t(currentDialogue.textKey);
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;

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
  }, [narrativeIndex, currentDialogueIndex, showingNarrative, showFullText, currentSceneIndex, currentScene, currentDialogue, t]);

  const handleNext = () => {
    if (isTyping) {
      if (showingNarrative) {
        const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
        setDisplayedText(t(currentNarrativeKey));
      } else {
        setDisplayedText(t(currentDialogue.textKey));
      }
      setIsTyping(false);
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
    const totalActs = 5;
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
    if (isTyping) {
      if (showingNarrative) {
        const currentNarrativeKey = currentScene.narrativeKeys[narrativeIndex];
        setDisplayedText(t(currentNarrativeKey));
      } else {
        setDisplayedText(t(currentDialogue.textKey));
      }
      setIsTyping(false);
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

  return (
    <div className="size-full relative overflow-hidden bg-black">
      {showBlackScreen && (
        <div className="absolute inset-0 bg-black z-50 transition-opacity duration-[1500ms] opacity-100" />
      )}

      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ${
        showBackground ? 'opacity-100' : 'opacity-0'
      }`} style={{ backgroundImage: `url(${currentScene.background})` }} />

      {/* 人物立绘容器 - 与对话框使用相同的响应式结构 */}
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
              showingNarrative 
                ? 'brightness-100' 
                : (!showingNarrative && currentDialogue.characterPosition === 'left' ? 'brightness-100' : 'brightness-50')
            }`}>
              <img 
                src={
                  // 当晏子说"稍作沉思，缓缓起身"时显示认真表情的晏子
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
              showingNarrative 
                ? 'brightness-100' 
                : (!showingNarrative && currentDialogue.characterPosition === 'right' ? 'brightness-100' : 'brightness-50')
            }`}>
              <img 
                src={
                  // 在第二幕第三段旁白或官吏对话时显示新的官吏立绘
                  (showingNarrative && currentSceneIndex === 1 && narrativeIndex === 2) || getCurrentCharacterName() === t('yanzishichu.official')
                    ? officialCharacter
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
                <img src={prisonerCharacter} alt="犯人" className="w-48 sm:w-[268px] md:w-[346px] h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <button onClick={onBack} className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-4 py-2.5 rounded-xl border-3 border-[#603913] shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
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
                        getCurrentCharacterName() === t('yanzishichu.official')
                          ? 'bg-red-600 text-white border-red-900 animate-dialogue-shake'
                          : 'bg-[#F26522] text-white border-[#603913]'
                      }`}>
                        {t(currentDialogue.characterKey)}
                      </div>
                    </div>
                    <div className="min-h-[80px] sm:min-h-[100px] mb-4 mt-[25px] px-[30px]">
                      <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed ${
                        getCurrentCharacterName() === t('yanzishichu.official') ? 'font-black' : ''
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
                          <span className="text-base sm:text-lg font-bold">{t('yanzishichu.prev_dialogue')}</span>
                        </button>
                        <button onClick={handleNext} className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-3 border-[#603913] shadow-lg transition-all hover:scale-105 active:scale-95">
                          <span className="text-base sm:text-lg font-bold">
                            {currentDialogueIndex < currentScene.dialogues.length - 1 ? t('yanzishichu.next_dialogue') : t('yanzishichu.continue')}
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
          onClose={() => setShowActQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}