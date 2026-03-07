import image_04754c822c37932dba8026ccd3edeefd8739cf38 from 'figma:asset/04754c822c37932dba8026ccd3edeefd8739cf38.png'
import image_09d066075ba68fdf09464ded11d921393e82c245 from 'figma:asset/09d066075ba68fdf09464ded11d921393e82c245.png'
import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Check, Circle, Trash2, Pencil, GripVertical } from 'lucide-react';
import exampleImage from 'figma:asset/474a103e0663e3f8f52b55c750fc705dea46e78e.png';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '@/contexts/LanguageContext';
import { resetStoryProgress } from '@/utils/gameProgress';

interface C1_NanJuBeiZhiProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

type Answer = {
  q1?: string;
  q2?: string[];
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string[];
  q7?: string;
  statement?: string;
};

// 拖拽项组件
interface DraggableItemProps {
  id: string;
  index: number;
  text: string;
  emoji: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem = ({ id, index, text, emoji, moveItem }: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ITEM',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`flex items-center gap-3 bg-white border-3 border-[#603913] rounded-2xl p-4 mb-3 cursor-move transition-all hover:shadow-lg ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#FFF5E6' }}
    >
      <GripVertical className="size-5 text-[#603913]" />
      <span className="text-2xl">{emoji}</span>
      <span className="text-lg font-bold text-[#603913]">{text}</span>
      <span className="ml-auto bg-[#F26522] text-white px-3 py-1 rounded-full text-sm font-bold">
        #{index + 1}
      </span>
    </div>
  );
};

export function C1_NanJuBeiZhi({ onBack, onNavigate }: C1_NanJuBeiZhiProps) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Answer>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingColor, setDrawingColor] = useState('#603913');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(1); // 当前进度节点 (1-5)

  // Q6排序状态
  const [sortItems, setSortItems] = useState([
    { id: '1', value: '名声', emoji: '🏆' },
    { id: '2', value: '家', emoji: '🏠' },
    { id: '3', value: '原则', emoji: '⚖️' },
    { id: '4', value: '金钱', emoji: '💰' },
  ]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setSortItems((prevItems) => {
      const newItems = [...prevItems];
      const dragItem = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems;
    });
  }, []);

  // 处理单选题答案
  const handleSingleChoice = (questionKey: keyof Answer, value: string) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  // 处理多选题答案
  const handleMultipleChoice = (questionKey: keyof Answer, value: string) => {
    setAnswers(prev => {
      const current = (prev[questionKey] as string[]) || [];
      const newValue = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [questionKey]: newValue };
    });
  };

  // 处理文本输入
  const handleTextInput = (questionKey: keyof Answer, value: string) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  // 清空画布
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // 绘画功能
  useState(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      lastX = clientX - rect.left;
      lastY = clientY - rect.top;
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!drawing) return;
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = drawingColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      lastX = x;
      lastY = y;
    };

    const stopDrawing = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  });

  // 提交答案
  const submitAnswers = () => {
    const finalAnswers = {
      ...answers,
      q6: sortItems.map(item => item.value),
    };
    console.log('提交答案:', finalAnswers);
    alert('🎉 太棒了！你完成了所有问题！\n\n你对屈原和橘子的故事有了更深的理解！');
    onBack();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full relative overflow-hidden">
        {/* 背景 - 模糊的橘子林 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${exampleImage})`,
            filter: 'blur(8px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-amber-900/50 to-orange-900/60" />

        {/* 主要内容 */}
        <div className="relative size-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-20 p-4 sm:p-6">
            <div className="max-w-5xl mx-auto">
              {/* 返回按钮 */}
              <button
                onClick={onBack}
                className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border-3 border-[#603913] shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="size-5" />
                <span className="text-sm sm:text-base font-bold">{t('nanjubeizhi.back')}</span>
              </button>
            </div>
          </div>

          {/* 题目列表 - 垂直滚动 */}
          <div className="flex-1 px-4 sm:px-6 pb-8">
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* 游戏进程内容区域 - 留空供后续开发 */}
              <div 
                className="rounded-[32px] p-4 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913] text-center"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="space-y-4">
                  {/* 占位图区域 - 等待上传插画 */}
                  <div className="w-full max-w-2xl mx-auto">
                    <ImageWithFallback
                      src={image_04754c822c37932dba8026ccd3edeefd8739cf38}
                      alt={t('nanjubeizhi.game_illustration')}
                      className="w-full h-auto rounded-2xl shadow-lg border-4 border-amber-300"
                    />
                  </div>
                  
                  {/* 游戏进度条 */}
                  <div className="py-4">
                    <div className="max-w-2xl mx-auto">
                      {/* 进度文字 */}
                      <div className="flex items-center justify-between mb-3 px-2">
                        <span className="text-sm sm:text-base font-bold" style={{ color: '#603913' }}>
                          {t('nanjubeizhi.game_progress')}
                        </span>
                        <span className="text-sm sm:text-base font-bold" style={{ color: '#F26522' }}>
                          {currentProgress}/5
                        </span>
                      </div>
                      
                      {/* 进度条容器 */}
                      <div className="relative pb-2">
                        {/* 背景线 */}
                        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full" style={{ backgroundColor: '#D4A574' }} />
                        
                        {/* 进度线 */}
                        <div 
                          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: '#F26522',
                            width: `${((currentProgress - 1) / 4) * 100}%`
                          }}
                        />
                        
                        {/* 节点 */}
                        <div className="relative flex items-center justify-between">
                          {[1, 2, 3, 4, 5].map((node) => (
                            <button
                              key={node}
                              onClick={() => {
                                if (onNavigate) {
                                  // 节点1对应场景0，节点2对应场景1，以此类推
                                  // 但实际只有2个场景，所以节点3-5都跳到场景1
                                  const sceneIndex = node === 1 ? 0 : 1;
                                  onNavigate(`game-process:${sceneIndex}`);
                                }
                              }}
                              className="relative z-10 transition-all duration-300 hover:scale-110"
                            >
                              {/* 节点圆圈 */}
                              <div 
                                className={`h-7 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4 rounded-full border-4 flex items-center justify-center font-black text-xs sm:text-sm transition-all whitespace-nowrap ${
                                  node <= currentProgress ? 'scale-110' : ''
                                }`}
                                style={{
                                  backgroundColor: node <= currentProgress ? '#F26522' : '#FFF5E6',
                                  borderColor: node <= currentProgress ? '#603913' : '#D4A574',
                                  color: node <= currentProgress ? '#FFF5E6' : '#999',
                                  boxShadow: node === currentProgress ? '0 0 20px rgba(242, 101, 34, 0.6)' : 'none'
                                }}
                              >
                                {node <= currentProgress ? '✓' : t(`nanjubeizhi.act_${node}`)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4">
                    <button
                      onClick={() => {
                        if (window.confirm(t('nanjubeizhi.confirm_restart'))) {
                          resetStoryProgress('chunqiu-quanyuan');
                          setCurrentProgress(1);
                        }
                      }}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-3 shadow-xl transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: '#FFF5E6',
                        borderColor: '#603913',
                        color: '#603913',
                      }}
                    >
                      <span className="text-base sm:text-lg font-bold">{t('nanjubeizhi.restart')}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('game-process');
                        }
                      }}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-3 shadow-xl transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: '#F26522',
                        borderColor: '#603913',
                        color: '#FFF5E6',
                      }}
                    >
                      <span className="text-base sm:text-lg font-bold">{t('nanjubeizhi.start_game')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 底部：开始测试按钮 */}
              <div className="flex justify-center pt-8 pb-8">
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('test-quiz');
                    }
                  }}
                  className="px-8 sm:px-12 py-4 sm:py-5 rounded-[32px] border-4 shadow-2xl transition-all hover:scale-110 active:scale-95"
                  style={{
                    backgroundColor: '#F26522',
                    borderColor: '#603913',
                    color: '#FFF5E6',
                  }}
                >
                  <span className="text-xl sm:text-2xl font-black">{t('nanjubeizhi.start_test')}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}