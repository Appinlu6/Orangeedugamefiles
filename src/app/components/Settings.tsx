import { ArrowLeft, User, Shield, Bell, Info, ChevronRight, Volume2, Moon, Smartphone, Mail, Globe } from 'lucide-react';
import exampleImage from 'figma:asset/828acffda0945611b0b6dc32d4fafc4658f5cfbf.png';
import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { language, setLanguage, t } = useLanguage();
  const { volume, setVolume, isMuted } = useAudio();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguageConfirm, setShowLanguageConfirm] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setPendingLanguage(lang);
      setShowLanguageConfirm(true);
    }
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      setLanguage(pendingLanguage);
      setShowLanguageConfirm(false);
      setPendingLanguage(null);
    }
  };

  const cancelLanguageChange = () => {
    setShowLanguageConfirm(false);
    setPendingLanguage(null);
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${exampleImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60" />
      </div>

      {/* 语言确认对话框 */}
      {showLanguageConfirm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-md w-full mx-4 border-4 border-indigo-500 animate-in zoom-in duration-300">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              {language === 'zh-CN' ? '确认更改语言' : '確認更改語言'}
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 text-center">
              {language === 'zh-CN' 
                ? `您确定要将语言更改为 ${pendingLanguage === 'zh-CN' ? '简体中文' : '繁体中文'} 吗？` 
                : `您確定要將語言更改為 ${pendingLanguage === 'zh-CN' ? '簡體中文' : '繁體中文'} 嗎？`}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={cancelLanguageChange}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl border-3 border-gray-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-base sm:text-lg font-bold"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmLanguageChange}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl border-3 border-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-base sm:text-lg font-bold"
              >
                {t('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <div className="relative size-full flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 animate-in fade-in slide-in-from-top duration-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-b from-slate-600 to-slate-800 hover:from-slate-500 hover:to-slate-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 border-slate-900 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="size-4 sm:size-5 md:size-6" />
            <span className="text-sm sm:text-base md:text-xl">{t('common.back')}</span>
          </button>

          <div className="bg-gradient-to-b from-slate-700 to-slate-900 rounded-xl sm:rounded-2xl shadow-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 sm:border-3 md:border-4 border-slate-950">
            <h2 className="text-xl sm:text-2xl md:text-4xl text-slate-50 flex items-center gap-2" style={{ textShadow: '2px 2px 0 #0f172a' }}>
              ⚙️ {t('settings.title')}
            </h2>
            <p className="text-xs sm:text-sm md:text-xl text-slate-100 text-center mt-0.5 sm:mt-1">{t('settings.subtitle')}</p>
          </div>

          <div className="w-12 sm:w-20 md:w-32" />
        </div>

        {/* 设置内容区 */}
        <div className="flex-1 max-w-4xl mx-auto w-full space-y-4 sm:space-y-6 pb-6">
          {/* 个人资料卡片 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-orange-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full size-16 sm:size-20 md:size-24 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl shadow-xl">
                🍊
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl text-orange-900">橘小橘</h3>
                <p className="text-sm sm:text-base text-orange-700">{t('settings.age').replace('{age}', '7')} · {t('settings.study_days').replace('{days}', '42')}</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-orange-100 text-orange-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">{t('settings.level').replace('{level}', '8')}</span>
                  <span className="bg-purple-100 text-purple-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">{t('settings.achievements_count').replace('{count}', '5')}</span>
                </div>
              </div>
              <button className="text-orange-600 hover:text-orange-800 transition-colors">
                <ChevronRight className="size-6 sm:size-8" />
              </button>
            </div>
          </div>

          {/* 账户设置 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-blue-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <h3 className="text-lg sm:text-xl md:text-2xl text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
              <User className="size-5 sm:size-6" />
              {t('settings.account')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <SettingItem 
                icon={<User className="size-5 sm:size-6" />}
                label={t('settings.personal_info')}
                value={t('settings.edit_profile')}
                onClick={() => {}}
              />
              <SettingItem 
                icon={<Mail className="size-5 sm:size-6" />}
                label={t('settings.bind_email')}
                value="parent@example.com"
                onClick={() => {}}
              />
              <SettingItem 
                icon={<Smartphone className="size-5 sm:size-6" />}
                label={t('settings.device_management')}
                value={t('settings.devices').replace('{count}', '2')}
                onClick={() => {}}
              />
            </div>
          </div>

          {/* 家长模式 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-purple-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <h3 className="text-lg sm:text-xl md:text-2xl text-purple-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Shield className="size-5 sm:size-6" />
              {t('settings.parent_mode')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <SettingItem 
                icon={<Shield className="size-5 sm:size-6 text-purple-600" />}
                label={t('settings.parent_control')}
                value={t('settings.enter_parent_mode')}
                onClick={() => {}}
                highlight
              />
              <div className="bg-purple-50 rounded-xl p-3 sm:p-4 text-sm sm:text-base text-purple-800">
                <p className="mb-2">{t('settings.parent_features')}</p>
                <ul className="space-y-1 text-xs sm:text-sm ml-4">
                  <li>{t('settings.parent_feature_1')}</li>
                  <li>{t('settings.parent_feature_2')}</li>
                  <li>{t('settings.parent_feature_3')}</li>
                  <li>{t('settings.parent_feature_4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 通知与音效 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-green-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <h3 className="text-lg sm:text-xl md:text-2xl text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Bell className="size-5 sm:size-6" />
              {t('settings.notifications')}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <ToggleSetting 
                icon={<Bell className="size-5 sm:size-6" />}
                label={t('settings.push_notifications')}
                description={t('settings.push_desc')}
                enabled={notificationsEnabled}
                onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <ToggleSetting 
                icon={<Volume2 className="size-5 sm:size-6" />}
                label={t('settings.sound')}
                description={t('settings.sound_desc')}
                enabled={soundEnabled}
                onToggle={() => setSoundEnabled(!soundEnabled)}
              />
              
              {/* 音量控制滑块 */}
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <div className="text-green-600">
                    <Volume2 className="size-5 sm:size-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm sm:text-base text-gray-900">{language === 'zh-CN' ? '音量控制' : '音量控制'}</div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {language === 'zh-CN' ? '调整背景音乐音量' : '調整背景音樂音量'}
                    </div>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-green-600">
                    {Math.round(volume * 100)}%
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs sm:text-sm">🔇</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(Number(e.target.value) / 100)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    style={{
                      background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <span className="text-green-600 text-xs sm:text-sm">🔊</span>
                </div>
                {isMuted && (
                  <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>{language === 'zh-CN' ? '音频已静音，请在右上角取消静音' : '音頻已靜音，請在右上角取消靜音'}</span>
                  </div>
                )}
              </div>
              
              <ToggleSetting 
                icon={<Moon className="size-5 sm:size-6" />}
                label={t('settings.dark_mode')}
                description={t('settings.dark_mode_desc')}
                enabled={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>

          {/* 语言设置 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-indigo-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-350">
            <h3 className="text-lg sm:text-xl md:text-2xl text-indigo-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Globe className="size-5 sm:size-6" />
              {t('settings.language')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <p className="text-sm sm:text-base text-gray-900 mb-3">{t('settings.language_select')}</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleLanguageChange('zh-CN')}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      language === 'zh-CN'
                        ? 'bg-indigo-100 border-indigo-500 shadow-lg scale-105'
                        : 'bg-white border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">🇨🇳</span>
                    <span className={`text-sm sm:text-base font-medium ${
                      language === 'zh-CN' ? 'text-indigo-900' : 'text-gray-700'
                    }`}>
                      {t('settings.simplified_chinese')}
                    </span>
                    {language === 'zh-CN' && (
                      <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">✓ {language === 'zh-CN' ? '已选择' : '已選擇'}</span>
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('zh-TW')}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      language === 'zh-TW'
                        ? 'bg-indigo-100 border-indigo-500 shadow-lg scale-105'
                        : 'bg-white border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">🇭🇰🇲🇴</span>
                    <span className={`text-sm sm:text-base font-medium ${
                      language === 'zh-TW' ? 'text-indigo-900' : 'text-gray-700'
                    }`}>
                      {t('settings.traditional_chinese')}
                    </span>
                    {language === 'zh-TW' && (
                      <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">✓ {language === 'zh-CN' ? '已选择' : '已選擇'}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 关于游戏 */}
          <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <h3 className="text-lg sm:text-xl md:text-2xl text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Info className="size-5 sm:size-6" />
              {t('settings.about')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <SettingItem 
                icon={<Info className="size-5 sm:size-6" />}
                label={t('settings.version')}
                value="v1.0.0"
                onClick={() => {}}
              />
              <SettingItem 
                icon={<Info className="size-5 sm:size-6" />}
                label={t('settings.privacy')}
                value=""
                onClick={() => {}}
              />
              <SettingItem 
                icon={<Info className="size-5 sm:size-6" />}
                label={t('settings.terms')}
                value=""
                onClick={() => {}}
              />
              <SettingItem 
                icon={<Info className="size-5 sm:size-6" />}
                label={t('settings.contact')}
                value=""
                onClick={() => {}}
              />
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl text-center">
              <p className="text-xs sm:text-sm text-amber-800 mb-2">
                {t('settings.game_name')}
              </p>
              <p className="text-xs text-amber-700">
                {t('settings.game_desc')}
              </p>
            </div>
          </div>

          {/* 退出登录 */}
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all hover:scale-105 active:scale-95 shadow-xl">
            {t('settings.logout')}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
  highlight?: boolean;
}

function SettingItem({ icon, label, value, onClick, highlight }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${highlight ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-50 hover:bg-gray-100'} transition-colors group`}
    >
      <div className={`${highlight ? 'text-purple-600' : 'text-gray-600'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className={`text-sm sm:text-base ${highlight ? 'text-purple-900' : 'text-gray-900'}`}>
          {label}
        </div>
        {value && (
          <div className={`text-xs sm:text-sm ${highlight ? 'text-purple-600' : 'text-gray-500'}`}>
            {value}
          </div>
        )}
      </div>
      <ChevronRight className={`size-5 sm:size-6 ${highlight ? 'text-purple-600' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
    </button>
  );
}

interface ToggleSettingProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSetting({ icon, label, description, enabled, onToggle }: ToggleSettingProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
      <div className="text-green-600">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm sm:text-base text-gray-900">{label}</div>
        <div className="text-xs sm:text-sm text-gray-500">{description}</div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        <div className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 size-5 sm:size-5 bg-white rounded-full shadow-md transition-transform ${enabled ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}