import { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActQuizProps {
  actNumber: number; // 第几幕
  onClose: () => void;
  onComplete: (score: number) => void;
}

// 拖拽项类型
interface DragItem {
  id: string;
  name: string;
}

// 目标区域组件
interface DropZoneProps {
  targetId: string;
  label: string;
  acceptedId: string;
  droppedItem: string | null;
  onDrop: (item: DragItem) => void;
}

const DropZone = ({ targetId, label, acceptedId, droppedItem, onDrop }: DropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'person',
    drop: (item: DragItem) => {
      if (item.id === acceptedId) {
        onDrop(item);
      }
    },
    canDrop: (item: DragItem) => item.id === acceptedId && !droppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative h-32 rounded-2xl border-4 border-dashed flex items-center justify-center transition-all ${
        droppedItem
          ? 'bg-green-100 border-green-400'
          : isOver && canDrop
          ? 'bg-amber-100 border-amber-400 scale-105'
          : 'bg-white border-amber-300'
      }`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{targetId === 'qi' ? '🏛️' : '🏰'}</div>
        <div className="text-lg font-bold text-[#603913]">{label}</div>
        {droppedItem && (
          <div className="mt-2 text-2xl">{droppedItem === 'yanzi' ? '👨‍💼' : '👑'}</div>
        )}
      </div>
    </div>
  );
};

// 可拖拽人物组件
interface DraggablePersonProps {
  id: string;
  name: string;
  emoji: string;
  isPlaced: boolean;
}

const DraggablePerson = ({ id, name, emoji, isPlaced }: DraggablePersonProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'person',
    item: { id, name },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isPlaced) return null;

  return (
    <div
      ref={drag}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-3 border-[#603913] bg-[#FFF5E6] cursor-move transition-all hover:scale-110 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-lg font-bold text-[#603913]">{name}</span>
    </div>
  );
};

// 第一幕的题目数据
const ACT1_QUESTIONS = [
  {
    type: 'single',
    question: '晏子生活在哪个时期？',
    options: [
      { label: 'A. 唐朝', value: 'tang', isCorrect: false },
      { label: 'B. 春秋时期', value: 'chunqiu', isCorrect: true },
      { label: 'C. 明朝', value: 'ming', isCorrect: false },
    ],
  },
  {
    type: 'drag',
    question: '把人物送回自己的国家：',
  },
  {
    type: 'single',
    question: '晏子的工作更像？',
    options: [
      { label: 'A. 农夫', value: 'farmer', isCorrect: false },
      { label: 'B. 外交官', value: 'diplomat', isCorrect: true },
      { label: 'C. 士兵', value: 'soldier', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '为什么齐王派晏子出使？',
    options: [
      { label: 'A. 因为他强壮', value: 'strong', isCorrect: false },
      { label: 'B. 因为他聪明善辩', value: 'smart', isCorrect: true },
      { label: 'C. 因为他跑得快', value: 'fast', isCorrect: false },
    ],
  },
  {
    type: 'multiple',
    question: '出使别国最重要的是？',
    options: [
      { label: '有礼貌', value: 'polite', isCorrect: false },
      { label: '有智慧', value: 'wisdom', isCorrect: false },
      { label: '会沟通', value: 'communicate', isCorrect: true },
    ],
  },
];

// 第二幕的题目数据
const ACT2_QUESTIONS = [
  {
    type: 'single',
    question: '楚王这样说，是为了？',
    options: [
      { label: 'A. 了解事实', value: 'fact', isCorrect: false },
      { label: 'B. 嘲笑齐国', value: 'mock', isCorrect: true },
      { label: 'C. 帮助犯人', value: 'help', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '一个人的错误能代表整个国家吗？',
    options: [
      { label: '可以', value: 'yes', isCorrect: false },
      { label: '不可以', value: 'no', isCorrect: true },
    ],
  },
  {
    type: 'single',
    question: '如果别人误会你的朋友，你会？',
    options: [
      { label: '帮他解释', value: 'explain', isCorrect: true },
      { label: '不说话', value: 'silent', isCorrect: false },
      { label: '一起嘲笑', value: 'mock', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '晏子此时可能感到？',
    options: [
      { label: '生气', value: 'angry', isCorrect: false },
      { label: '紧张', value: 'nervous', isCorrect: false },
      { label: '冷静思考', value: 'calm', isCorrect: true },
    ],
  },
  {
    type: 'single',
    question: '晏子应该？',
    options: [
      { label: 'A. 发怒', value: 'angry', isCorrect: false },
      { label: 'B. 离开', value: 'leave', isCorrect: false },
      { label: 'C. 用智慧回答', value: 'wisdom', isCorrect: true },
    ],
  },
  {
    type: 'single',
    question: '晏子站起来行礼说明：',
    options: [
      { label: 'A. 害怕', value: 'afraid', isCorrect: false },
      { label: 'B. 尊重君王', value: 'respect', isCorrect: true },
      { label: 'C. 想离开', value: 'leave', isCorrect: false },
    ],
  },
  {
    type: 'single',
    question: '聪明的人解决问题通常靠？',
    options: [
      { label: '力气', value: 'strength', isCorrect: false },
      { label: '智慧', value: 'wisdom', isCorrect: true },
    ],
  },
];

export function ActQuiz({ actNumber, onClose, onComplete }: ActQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });

  // 拖拽题状态
  const [dragDrops, setDragDrops] = useState<{ qi: string | null; chu: string | null }>({
    qi: null,
    chu: null,
  });

  const questionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // 根据幕数选择题目集
  const questions = actNumber === 1 ? ACT1_QUESTIONS : ACT2_QUESTIONS;
  
  // 获取翻译后的题目数据
  const getTranslatedQuestion = (qIndex: number) => {
    const q = questions[qIndex];
    const questionKey = `quiz.act${actNumber}.q${qIndex + 1}.question`;
    
    return {
      ...q,
      question: t(questionKey),
      options: q.options?.map((opt, optIndex) => ({
        ...opt,
        label: t(`quiz.act${actNumber}.q${qIndex + 1}.option${String.fromCharCode(65 + optIndex)}`),
      })),
    };
  };
  
  const currentQ = getTranslatedQuestion(currentQuestion);

  // 处理单选答案
  const handleSingleChoice = (value: string) => {
    if (showResult) return;
    setSelectedAnswer(value);
  };

  // 处理多选答案
  const handleMultipleChoice = (value: string) => {
    if (showResult) return;
    setSelectedMultiple((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 处理拖拽放置
  const handleDrop = (targetId: 'qi' | 'chu', item: DragItem) => {
    setDragDrops((prev) => ({
      ...prev,
      [targetId]: item.id,
    }));
  };

  // 提交答案
  const handleSubmit = () => {
    const question = questions[currentQuestion];
    let correct = false;

    // 第5题（索引4）无论选什么都算正确
    if (currentQuestion === 4) {
      correct = true;
    } else if (question.type === 'single') {
      const correctOption = question.options?.find((opt) => opt.isCorrect);
      correct = selectedAnswer === correctOption?.value;
    } else if (question.type === 'multiple') {
      const correctOptions = question.options?.filter((opt) => opt.isCorrect).map((opt) => opt.value) || [];
      correct = correctOptions.length === selectedMultiple.length && 
                correctOptions.every((val) => selectedMultiple.includes(val));
    } else if (question.type === 'drag') {
      correct = dragDrops.qi === 'yanzi' && dragDrops.chu === 'chuwang';
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // 触发星星动画
      if (questionRef.current) {
        const rect = questionRef.current.getBoundingClientRect();
        setStarPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
      setShowStarAnimation(true);
      
      // 延迟增加分数，让动画先播放
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setShowStarAnimation(false);
      }, 800);
    }
  };

  // 下一题
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setSelectedMultiple([]);
      setDragDrops({ qi: null, chu: null });
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // 完成所有题目
      onComplete(score + (isCorrect ? 1 : 0));
    }
  };

  const canSubmit = 
    (currentQ.type === 'single' && selectedAnswer) ||
    (currentQ.type === 'multiple' && selectedMultiple.length > 0) ||
    (currentQ.type === 'drag' && dragDrops.qi && dragDrops.chu);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* 弹窗内容 */}
        <div 
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border-4 border-[#603913] shadow-2xl"
          style={{ backgroundColor: 'rgba(255, 245, 230, 0.98)' }}
        >
          {/* 头部 */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b-4 border-[#603913]"
            style={{ backgroundColor: 'rgba(255, 245, 230, 0.98)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <h2 className="text-2xl font-bold text-[#603913]">
                第{[t('quiz.act_one'), t('quiz.act_two'), t('quiz.act_three'), t('quiz.act_four'), t('quiz.act_five')][actNumber - 1]}幕{t('quiz.single_choice').includes('单选') ? '测试' : '測試'}
              </h2>
            </div>
            
            {/* 星星计数器 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border-3 border-amber-400">
                <span className="text-2xl">🌟</span>
                <span className="text-xl font-bold text-[#F26522]">{score}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-100 rounded-full transition-colors"
              >
                <X className="size-6 text-[#603913]" />
              </button>
            </div>
          </div>

          {/* 题目内容 */}
          <div ref={questionRef} className="p-8 space-y-6">
            {/* 题目标题 */}
            <div className="space-y-2">
              <div className="text-xl font-bold text-[#F26522]">
                {currentQuestion + 1}️⃣ {
                  currentQ.type === 'single' ? t('quiz.single_choice') : 
                  currentQ.type === 'drag' ? t('quiz.drag_drop') : 
                  t('quiz.multiple_choice')
                }
              </div>
              <div className="text-2xl font-bold text-[#603913]">
                {currentQ.question}
              </div>
            </div>

            {/* 题目选项 */}
            <div className="space-y-4">
              {currentQ.type === 'single' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice(option.value)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all ${
                        selectedAnswer === option.value
                          ? 'bg-amber-200 border-[#F26522] scale-105'
                          : 'bg-white border-[#603913] hover:bg-amber-50'
                      } ${
                        showResult && option.isCorrect
                          ? 'bg-green-100 border-green-500'
                          : showResult && selectedAnswer === option.value && !option.isCorrect
                          ? 'bg-red-100 border-red-500'
                          : ''
                      }`}
                    >
                      <span className="text-lg font-bold text-[#603913]">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === 'multiple' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleMultipleChoice(option.value)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all ${
                        selectedMultiple.includes(option.value)
                          ? 'bg-amber-200 border-[#F26522] scale-105'
                          : 'bg-white border-[#603913] hover:bg-amber-50'
                      } ${
                        showResult && option.isCorrect
                          ? 'bg-green-100 border-green-500'
                          : showResult && selectedMultiple.includes(option.value) && !option.isCorrect
                          ? 'bg-red-100 border-red-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selectedMultiple.includes(option.value)
                            ? 'bg-[#F26522] border-[#F26522]'
                            : 'bg-white border-[#603913]'
                        }`}>
                          {selectedMultiple.includes(option.value) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-[#603913]">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === 'drag' && (
                <div className="space-y-6">
                  {/* 拖拽源 */}
                  <div className="flex items-center justify-center gap-4 p-6 bg-amber-50 rounded-2xl border-3 border-[#603913]">
                    <DraggablePerson
                      id="yanzi"
                      name={t('quiz.character.yanzi')}
                      emoji="👨‍💼"
                      isPlaced={dragDrops.qi === 'yanzi' || dragDrops.chu === 'yanzi'}
                    />
                    <DraggablePerson
                      id="chuwang"
                      name={t('quiz.character.king')}
                      emoji="👑"
                      isPlaced={dragDrops.qi === 'chuwang' || dragDrops.chu === 'chuwang'}
                    />
                  </div>

                  {/* 放置目标 */}
                  <div className="grid grid-cols-2 gap-4">
                    <DropZone
                      targetId="qi"
                      label={t('quiz.location.qi')}
                      acceptedId="yanzi"
                      droppedItem={dragDrops.qi}
                      onDrop={(item) => handleDrop('qi', item)}
                    />
                    <DropZone
                      targetId="chu"
                      label={t('quiz.location.chu')}
                      acceptedId="chuwang"
                      droppedItem={dragDrops.chu}
                      onDrop={(item) => handleDrop('chu', item)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 结果反馈 */}
            {showResult && (
              <div className={`p-4 rounded-2xl border-3 ${
                isCorrect
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                  <span className="text-lg font-bold" style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}>
                    {isCorrect ? t('quiz.correct_answer') : t('quiz.wrong_answer')}
                  </span>
                </div>
              </div>
            )}

            {/* 底部按钮 */}
            <div className="relative flex justify-center gap-4 pt-4">
              {!showResult ? (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`px-8 py-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                      canSubmit
                        ? 'bg-[#F26522] border-[#603913] text-white hover:scale-105 active:scale-95'
                        : 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {t('quiz.submit_answer')}
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 bottom-0 text-xs text-gray-400 hover:text-gray-500 transition-colors underline"
                  >
                    {t('quiz.skip_question')}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 rounded-2xl border-3 bg-[#F26522] border-[#603913] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {currentQuestion < questions.length - 1 ? t('quiz.next_question') : t('quiz.complete_test')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 星星飞入动画 */}
        <AnimatePresence>
          {showStarAnimation && (
            <motion.div
              initial={{ 
                x: starPosition.x, 
                y: starPosition.y, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: window.innerWidth - 100, 
                y: 80, 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 1] 
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed pointer-events-none z-[100]"
              style={{ fontSize: '48px' }}
            >
              🌟
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}