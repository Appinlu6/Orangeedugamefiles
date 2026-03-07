import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Check, Circle, Trash2, Pencil, GripVertical } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TestQuizProps {
  onBack: () => void;
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

export function TestQuiz({ onBack }: TestQuizProps) {
  const [answers, setAnswers] = useState<Answer>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingColor, setDrawingColor] = useState('#603913');
  const [isDrawing, setIsDrawing] = useState(false);

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
        {/* 背景 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${exampleImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-amber-900/50 to-orange-900/60" />
        </div>

        {/* 主要内容 */}
        <div className="relative size-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-20 p-4 sm:p-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              {/* 返回按钮 */}
              <button
                onClick={onBack}
                className="flex items-center gap-2 bg-[#F26522] hover:bg-[#E05512] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border-3 border-[#603913] shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="size-5" />
                <span className="text-sm sm:text-base font-bold">返回</span>
              </button>

              {/* 标题 */}
              <div className="bg-gradient-to-b from-amber-700 to-amber-900 rounded-xl sm:rounded-2xl shadow-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 sm:border-3 md:border-4 border-amber-950">
                <h2 className="text-xl sm:text-2xl md:text-4xl text-amber-50 flex items-center gap-2" style={{ textShadow: '2px 2px 0 #78350f' }}>
                  📝 测试题
                </h2>
              </div>

              <div className="w-12 sm:w-20 md:w-32" />
            </div>
          </div>

          {/* 题目列表 - 垂直滚动 */}
          <div className="flex-1 px-4 sm:px-6 pb-8">
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Q1: 橘子象征什么 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      🍊 橘子象征什么？
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: 'A', label: 'A. 坚持信念' },
                    { value: 'B', label: 'B. 名气' },
                    { value: 'C', label: 'C. 运气' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice('q1', option.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                        answers.q1 === option.value
                          ? 'border-[#F26522] shadow-lg scale-105'
                          : 'border-[#603913] hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: answers.q1 === option.value ? '#F26522' : '#FFF5E6',
                        color: answers.q1 === option.value ? '#FFF5E6' : '#603913',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-6 sm:size-7 rounded-full border-3 flex items-center justify-center ${
                          answers.q1 === option.value ? 'border-white bg-white' : 'border-[#603913]'
                        }`}>
                          {answers.q1 === option.value && <Circle className="size-4 fill-[#F26522] text-[#F26522]" />}
                        </div>
                        <span className="text-base sm:text-lg font-bold">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q2: 屈原的品质（多选） */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1" style={{ color: '#603913' }}>
                      🎭 屈原的品质有哪些？
                    </h3>
                    <p className="text-sm sm:text-base" style={{ color: '#F26522' }}>（多选）</p>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: '正直', label: '正直' },
                    { value: '爱国', label: '爱国' },
                    { value: '勇敢', label: '勇敢' },
                    { value: '自私', label: '自私' },
                  ].map(option => {
                    const isSelected = (answers.q2 || []).includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleMultipleChoice('q2', option.value)}
                        className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                          isSelected
                            ? 'border-[#F26522] shadow-lg scale-105'
                            : 'border-[#603913] hover:scale-102'
                        }`}
                        style={{
                          backgroundColor: isSelected ? '#F26522' : '#FFF5E6',
                          color: isSelected ? '#FFF5E6' : '#603913',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-6 sm:size-7 rounded border-3 flex items-center justify-center ${
                            isSelected ? 'border-white bg-white' : 'border-[#603913]'
                          }`}>
                            {isSelected && <Check className="size-4 text-[#F26522] stroke-[3]" />}
                          </div>
                          <span className="text-base sm:text-lg font-bold">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Q3: 如果国家有问题 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      🏛️ 如果国家有问题，你认为应该？
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#999' }}>
                      👉 对标：价值判断能力
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: 'A', label: 'A. 努力改善' },
                    { value: 'B', label: 'B. 不关心' },
                    { value: 'C', label: 'C. 只顾自己' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice('q3', option.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                        answers.q3 === option.value
                          ? 'border-[#F26522] shadow-lg scale-105'
                          : 'border-[#603913] hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: answers.q3 === option.value ? '#F26522' : '#FFF5E6',
                        color: answers.q3 === option.value ? '#FFF5E6' : '#603913',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-6 sm:size-7 rounded-full border-3 flex items-center justify-center ${
                          answers.q3 === option.value ? 'border-white bg-white' : 'border-[#603913]'
                        }`}>
                          {answers.q3 === option.value && <Circle className="size-4 fill-[#F26522] text-[#F26522]" />}
                        </div>
                        <span className="text-base sm:text-lg font-bold">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4: 橘子"不迁"代表什么 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      🌳 橘子"不迁"代表什么？
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: 'A', label: 'A. 固执' },
                    { value: 'B', label: 'B. 坚持原则' },
                    { value: 'C', label: 'C. 害怕改变' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice('q4', option.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                        answers.q4 === option.value
                          ? 'border-[#F26522] shadow-lg scale-105'
                          : 'border-[#603913] hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: answers.q4 === option.value ? '#F26522' : '#FFF5E6',
                        color: answers.q4 === option.value ? '#FFF5E6' : '#603913',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-6 sm:size-7 rounded-full border-3 flex items-center justify-center ${
                          answers.q4 === option.value ? 'border-white bg-white' : 'border-[#603913]'
                        }`}>
                          {answers.q4 === option.value && <Circle className="size-4 fill-[#F26522] text-[#F26522]" />}
                        </div>
                        <span className="text-base sm:text-lg font-bold">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q5: 换地方可以更成功 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      ⚖️ 如果换地方可以更成功，但会失去原本的自己，你会？
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#999' }}>
                      👉 对标：自我认同 vs 外在评价
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: 'A', label: 'A. 选择成功' },
                    { value: 'B', label: 'B. 选择真实' },
                    { value: 'C', label: 'C. 看别人怎么做' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice('q5', option.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                        answers.q5 === option.value
                          ? 'border-[#F26522] shadow-lg scale-105'
                          : 'border-[#603913] hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: answers.q5 === option.value ? '#F26522' : '#FFF5E6',
                        color: answers.q5 === option.value ? '#FFF5E6' : '#603913',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-6 sm:size-7 rounded-full border-3 flex items-center justify-center ${
                          answers.q5 === option.value ? 'border-white bg-white' : 'border-[#603913]'
                        }`}>
                          {answers.q5 === option.value && <Circle className="size-4 fill-[#F26522] text-[#F26522]" />}
                        </div>
                        <span className="text-base sm:text-lg font-bold">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q6: 价值排序 - 可拖拽 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      📊 把以下词语按重要程度排序
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#999' }}>
                      👉 对标：价值优先级排序能力
                    </p>
                    <p className="text-sm mt-2" style={{ color: '#F26522' }}>
                      💡 拖动卡片进行排序
                    </p>
                  </div>
                </div>
                
                <div className="pl-0 sm:pl-14">
                  {sortItems.map((item, index) => (
                    <DraggableItem
                      key={item.id}
                      id={item.id}
                      index={index}
                      text={item.value}
                      emoji={item.emoji}
                      moveItem={moveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Q7: 橘子坚持留在南方 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      🧠 橘子坚持留在南方，是因为：
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#999' }}>
                      👉 对标：认知理解深度
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pl-0 sm:pl-14">
                  {[
                    { value: 'A', label: 'A. 它害怕改变' },
                    { value: 'B', label: 'B. 它知道自己适合哪里' },
                    { value: 'C', label: 'C. 它没有选择' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleChoice('q7', option.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                        answers.q7 === option.value
                          ? 'border-[#F26522] shadow-lg scale-105'
                          : 'border-[#603913] hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: answers.q7 === option.value ? '#F26522' : '#FFF5E6',
                        color: answers.q7 === option.value ? '#FFF5E6' : '#603913',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-6 sm:size-7 rounded-full border-3 flex items-center justify-center ${
                          answers.q7 === option.value ? 'border-white bg-white' : 'border-[#603913]'
                        }`}>
                          {answers.q7 === option.value && <Circle className="size-4 fill-[#F26522] text-[#F26522]" />}
                        </div>
                        <span className="text-base sm:text-lg font-bold">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q8: 开放式任务 */}
              <div 
                className="rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl border-3 border-[#603913]"
                style={{ backgroundColor: 'rgba(255, 245, 230, 0.95)' }}
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="flex-shrink-0 size-10 sm:size-12 rounded-full flex items-center justify-center font-black text-lg sm:text-xl" style={{ backgroundColor: '#F26522', color: '#FFF5E6' }}>
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#603913' }}>
                      🎨 开放式小任务
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#999' }}>
                      👉 对标：自我概念形成
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 pl-0 sm:pl-14">
                  {/* 绘画区域 */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#603913' }}>
                      1. 画一棵属于你的"橘树"
                    </h4>
                    
                    {/* 颜色选择 */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: '#603913' }}>选择颜色：</span>
                      {['#603913', '#F26522', '#FF8C42', '#4A7C59', '#FFD700', '#000000'].map(color => (
                        <button
                          key={color}
                          onClick={() => setDrawingColor(color)}
                          className={`size-8 sm:size-10 rounded-full border-3 transition-all ${
                            drawingColor === color ? 'border-[#F26522] scale-110 shadow-lg' : 'border-[#603913] hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* 画布 */}
                    <div className="relative">
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        className="w-full border-4 rounded-2xl bg-white shadow-inner cursor-crosshair touch-none"
                        style={{ borderColor: '#603913' }}
                      />
                      <button
                        onClick={clearCanvas}
                        className="absolute top-3 right-3 bg-[#F26522] hover:bg-[#E05512] text-white p-2.5 rounded-xl shadow-lg transition-all hover:scale-105"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>

                  {/* 填空区域 */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#603913' }}>
                      2. 填空
                    </h4>
                    
                    <div className="rounded-2xl p-4 sm:p-6 border-3" style={{ backgroundColor: '#FFF5E6', borderColor: '#603913' }}>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Pencil className="size-5 sm:size-6" style={{ color: '#F26522' }} />
                        <span className="text-base sm:text-lg md:text-xl font-bold" style={{ color: '#603913' }}>
                          我想成为一个
                        </span>
                        <input
                          type="text"
                          value={answers.statement || ''}
                          onChange={(e) => handleTextInput('statement', e.target.value)}
                          placeholder="勇敢、诚实、有爱心..."
                          className="flex-1 min-w-[200px] px-4 py-2 sm:py-3 text-base sm:text-lg border-3 rounded-xl focus:outline-none focus:ring-4"
                          style={{ 
                            borderColor: '#F26522',
                            backgroundColor: 'white',
                            color: '#603913'
                          }}
                        />
                        <span className="text-base sm:text-lg md:text-xl font-bold" style={{ color: '#603913' }}>
                          的人。
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-center pt-4 pb-8">
                <button
                  onClick={submitAnswers}
                  className="px-8 sm:px-12 py-4 sm:py-5 rounded-[32px] border-4 shadow-2xl transition-all hover:scale-110 active:scale-95 animate-pulse"
                  style={{
                    backgroundColor: '#F26522',
                    borderColor: '#603913',
                    color: '#FFF5E6',
                  }}
                >
                  <span className="text-xl sm:text-2xl font-black">✨ 完成测试 ✨</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
