import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GradeSelectionProps {
  onSelectGrade: (grade: 'lower' | 'upper') => void;
}

export function GradeSelection({ onSelectGrade }: GradeSelectionProps) {
  const { t } = useLanguage();
  const [selectedGrade, setSelectedGrade] = useState<'lower' | 'upper' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelectGrade = (grade: 'lower' | 'upper') => {
    setSelectedGrade(grade);
    setIsAnimating(true);
    
    // 延迟跳转，播放动画
    setTimeout(() => {
      onSelectGrade(grade);
    }, 800);
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100" />
      
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🍊
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-7xl opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-5xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨
        </motion.div>
      </div>

      {/* 主要内容 */}
      <div className="relative size-full flex flex-col items-center justify-center p-6 sm:p-8">
        
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="size-10 sm:size-12 text-[#F26522]" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ color: '#603913' }}>
              {t('grade.select_title')}
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl font-bold" style={{ color: '#8B5A3C' }}>
            {t('grade.select_subtitle')}
          </p>
        </motion.div>

        {/* 年级选择卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          {/* 小学低年级卡片 */}
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleSelectGrade('lower')}
            disabled={isAnimating}
            className={`relative group rounded-[32px] p-6 sm:p-8 border-4 transition-all duration-300 ${
              selectedGrade === 'lower' 
                ? 'scale-105 shadow-2xl' 
                : 'hover:scale-105 hover:shadow-xl active:scale-95'
            }`}
            style={{
              backgroundColor: selectedGrade === 'lower' ? '#F26522' : '#FFF5E6',
              borderColor: '#603913',
            }}
          >
            {/* 装饰光效 */}
            {selectedGrade === 'lower' && (
              <motion.div
                className="absolute inset-0 rounded-[28px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: '0 0 40px rgba(242, 101, 34, 0.6)' }}
              />
            )}

            <div className="relative z-10">
              {/* 图标 */}
              <div className="flex justify-center mb-4">
                <div 
                  className="size-20 sm:size-24 rounded-full flex items-center justify-center border-4 transition-colors"
                  style={{
                    backgroundColor: selectedGrade === 'lower' ? '#FFF5E6' : '#F26522',
                    borderColor: '#603913',
                  }}
                >
                  <span className="text-4xl sm:text-5xl">🌱</span>
                </div>
              </div>

              {/* 标题 */}
              <h2 
                className="text-2xl sm:text-3xl font-black mb-3 transition-colors"
                style={{ color: selectedGrade === 'lower' ? '#FFF5E6' : '#603913' }}
              >
                {t('grade.lower_elementary')}
              </h2>

              {/* 年级范围 */}
              <div 
                className="text-lg sm:text-xl font-bold mb-4 transition-colors"
                style={{ color: selectedGrade === 'lower' ? '#FFF5E6' : '#8B5A3C' }}
              >
                {t('grade.grades_1_3')}
              </div>

              {/* 描述 */}
              <p 
                className="text-sm sm:text-base font-medium mb-6 transition-colors"
                style={{ color: selectedGrade === 'lower' ? '#FFF5E6' : '#8B5A3C' }}
              >
                {t('grade.lower_description')}
              </p>

              {/* 特色标签 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['趣味启蒙', '图画丰富', '互动多'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 transition-colors"
                    style={{
                      backgroundColor: selectedGrade === 'lower' ? '#603913' : '#F26522',
                      borderColor: '#603913',
                      color: '#FFF5E6',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 选中指示器 */}
              {selectedGrade === 'lower' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3"
                >
                  <div className="size-12 rounded-full flex items-center justify-center bg-[#603913] border-4 border-[#FFF5E6]">
                    <ArrowRight className="size-6 text-[#FFF5E6]" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.button>

          {/* 小学高年级卡片 */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleSelectGrade('upper')}
            disabled={isAnimating}
            className={`relative group rounded-[32px] p-6 sm:p-8 border-4 transition-all duration-300 ${
              selectedGrade === 'upper' 
                ? 'scale-105 shadow-2xl' 
                : 'hover:scale-105 hover:shadow-xl active:scale-95'
            }`}
            style={{
              backgroundColor: selectedGrade === 'upper' ? '#F26522' : '#FFF5E6',
              borderColor: '#603913',
            }}
          >
            {/* 装饰光效 */}
            {selectedGrade === 'upper' && (
              <motion.div
                className="absolute inset-0 rounded-[28px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: '0 0 40px rgba(242, 101, 34, 0.6)' }}
              />
            )}

            <div className="relative z-10">
              {/* 图标 */}
              <div className="flex justify-center mb-4">
                <div 
                  className="size-20 sm:size-24 rounded-full flex items-center justify-center border-4 transition-colors"
                  style={{
                    backgroundColor: selectedGrade === 'upper' ? '#FFF5E6' : '#F26522',
                    borderColor: '#603913',
                  }}
                >
                  <span className="text-4xl sm:text-5xl">🌳</span>
                </div>
              </div>

              {/* 标题 */}
              <h2 
                className="text-2xl sm:text-3xl font-black mb-3 transition-colors"
                style={{ color: selectedGrade === 'upper' ? '#FFF5E6' : '#603913' }}
              >
                {t('grade.upper_elementary')}
              </h2>

              {/* 年级范围 */}
              <div 
                className="text-lg sm:text-xl font-bold mb-4 transition-colors"
                style={{ color: selectedGrade === 'upper' ? '#FFF5E6' : '#8B5A3C' }}
              >
                {t('grade.grades_4_6')}
              </div>

              {/* 描述 */}
              <p 
                className="text-sm sm:text-base font-medium mb-6 transition-colors"
                style={{ color: selectedGrade === 'upper' ? '#FFF5E6' : '#8B5A3C' }}
              >
                {t('grade.upper_description')}
              </p>

              {/* 特色标签 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['深度思考', '逻辑训练', '文化探索'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 transition-colors"
                    style={{
                      backgroundColor: selectedGrade === 'upper' ? '#603913' : '#F26522',
                      borderColor: '#603913',
                      color: '#FFF5E6',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 选中指示器 */}
              {selectedGrade === 'upper' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3"
                >
                  <div className="size-12 rounded-full flex items-center justify-center bg-[#603913] border-4 border-[#FFF5E6]">
                    <ArrowRight className="size-6 text-[#FFF5E6]" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.button>
        </div>

        {/* 提示文字 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold" style={{ color: '#8B5A3C' }}>
            <Sparkles className="size-5" />
            <span>{t('grade.select_hint')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
