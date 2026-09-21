import { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff, Sparkles, Rocket, Star, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';

interface LoginProps {
  onLogin: (username: string, avatar: string) => void;
  onSkip?: () => void;
}

type LoginMode = 'login' | 'register';
type LoginType = 'phone' | 'email';

export function Login({ onLogin, onSkip }: LoginProps) {
  const { t } = useLanguage();
  const { play } = useAudio();
  const [mode, setMode] = useState<LoginMode>('login');
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    const account = loginType === 'phone' ? phone : email;
    if (account) {
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      console.log('发送验证码到:', account);
    }
  };

  const validateForm = () => {
    if (loginType === 'phone') {
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert(t('login.error_phone'));
        return false;
      }
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert(t('login.error_email'));
        return false;
      }
    }

    if (mode === 'register') {
      if (password.length < 6) {
        alert(t('login.error_password_length'));
        return false;
      }
      if (password !== confirmPassword) {
        alert(t('login.error_password_mismatch'));
        return false;
      }
    }

    if (!password) {
      alert(t('login.error_password_empty'));
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      const account = loginType === 'phone' ? phone : email;
      const username = account.split('@')[0];
      onLogin(username, '🍊');
    }, 800);
  };

  const handleSkip = () => {
    play(); // 播放音乐
    onSkip?.(); // 调用原有的跳过功能
  };

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-300">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 animate-pulse">🍊</div>
        <div className="absolute top-20 right-20 text-3xl md:text-5xl opacity-20 animate-pulse delay-300">⭐</div>
        <div className="absolute bottom-20 left-20 text-5xl md:text-7xl opacity-20 animate-pulse delay-500">🌈</div>
        <div className="absolute bottom-10 right-10 text-4xl md:text-6xl opacity-20 animate-pulse delay-700">🎨</div>
      </div>

      {/* 主要登录区域 */}
      <div className="relative size-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* 左侧：欢迎区域（仅Web端显示） */}
          <div className="hidden lg:flex flex-col justify-center items-center p-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="text-9xl animate-bounce">🍊</div>
                <h1 className="text-6xl xl:text-7xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {t('login.game_title')}
                </h1>
                <p className="text-2xl xl:text-3xl text-amber-800">
                  {t('login.game_subtitle')}
                </p>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3 text-amber-900 text-lg xl:text-xl">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Rocket className="size-6" />
                  </div>
                  <span>{t('login.feature_1')}</span>
                </div>
                <div className="flex items-center gap-3 text-amber-900 text-lg xl:text-xl">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Star className="size-6" />
                  </div>
                  <span>{t('login.feature_2')}</span>
                </div>
                <div className="flex items-center gap-3 text-amber-900 text-lg xl:text-xl">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Heart className="size-6" />
                  </div>
                  <span>{t('login.feature_3')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：登录表单区域 */}
          <div className="flex items-center justify-center">
            <div 
              className={`
                w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl 
                shadow-2xl border-4 border-amber-900 p-6 md:p-8 lg:p-10
                transition-all duration-800
                ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100 animate-in zoom-in fade-in duration-700'}
              `}
            >
              {/* 木质纹理背景 */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0id29vZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwTDQwIDQwTTQwIDBMMCA0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuMiIgb3BhY2l0eT0iMC4wOCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3b29kKSIvPjwvc3ZnPg==')] opacity-30 rounded-3xl pointer-events-none" />
              
              <div className="relative">
                {/* 标题区域 */}
                <div className="text-center mb-6">
                  <div className="text-6xl lg:text-7xl mb-3 animate-bounce">🍊</div>
                  
                  {/* 手机端显示完整标题 */}
                  <div className="lg:hidden mb-3">
                    <h1 className="text-4xl mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      {t('login.game_title')}
                    </h1>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl text-amber-900 mb-2">
                    {mode === 'login' ? t('login.welcome_back') : t('login.create_account')}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <Sparkles className="size-4" />
                    <p className="text-sm">
                      {mode === 'login' ? t('login.continue_adventure') : t('login.start_journey')}
                    </p>
                    <Sparkles className="size-4" />
                  </div>
                </div>

                {/* 登录/注册模式切换 */}
                <div className="flex gap-2 mb-6 bg-amber-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`
                      flex-1 py-2 rounded-lg text-sm md:text-base transition-all duration-300
                      ${mode === 'login'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md'
                        : 'text-amber-700 hover:text-amber-900'
                      }
                    `}
                  >
                    {t('login.login_tab')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className={`
                      flex-1 py-2 rounded-lg text-sm md:text-base transition-all duration-300
                      ${mode === 'register'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md'
                        : 'text-amber-700 hover:text-amber-900'
                      }
                    `}
                  >
                    {t('login.register_tab')}
                  </button>
                </div>

                {/* 登录类型切换 */}
                <div className="flex gap-2 mb-5 bg-amber-50 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLoginType('phone')}
                    className={`
                      flex-1 py-2 rounded-md text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1
                      ${loginType === 'phone'
                        ? 'bg-white text-amber-900 shadow-sm'
                        : 'text-amber-600 hover:text-amber-800'
                      }
                    `}
                  >
                    <Phone className="size-3 md:size-4" />
                    {t('login.phone')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('email')}
                    className={`
                      flex-1 py-2 rounded-md text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1
                      ${loginType === 'email'
                        ? 'bg-white text-amber-900 shadow-sm'
                        : 'text-amber-600 hover:text-amber-800'
                      }
                    `}
                  >
                    <Mail className="size-3 md:size-4" />
                    {t('login.email')}
                  </button>
                </div>

                {/* 登录表单 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* 手机号/邮箱输入 */}
                  <div>
                    <label className="block text-amber-900 mb-2 text-sm md:text-base">
                      {loginType === 'phone' ? t('login.phone') : t('login.email')}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-amber-600">
                        {loginType === 'phone' ? <Phone className="size-4 md:size-5" /> : <Mail className="size-4 md:size-5" />}
                      </div>
                      <input
                        type={loginType === 'phone' ? 'tel' : 'email'}
                        value={loginType === 'phone' ? phone : email}
                        onChange={(e) => loginType === 'phone' ? setPhone(e.target.value) : setEmail(e.target.value)}
                        placeholder={loginType === 'phone' ? t('login.phone_placeholder') : t('login.email_placeholder')}
                        className="
                          w-full pl-10 md:pl-12 pr-4 py-3 rounded-xl
                          border-2 border-amber-300 
                          focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                          text-sm md:text-base text-amber-900 placeholder:text-amber-400
                          bg-white/80 backdrop-blur-sm
                          transition-all duration-300
                          outline-none
                        "
                      />
                    </div>
                  </div>

                  {/* 密码输入 */}
                  <div>
                    <label className="block text-amber-900 mb-2 text-sm md:text-base">
                      {t('login.password')}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-amber-600">
                        <Lock className="size-4 md:size-5" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === 'register' ? t('login.set_password_placeholder') : t('login.password_placeholder')}
                        className="
                          w-full pl-10 md:pl-12 pr-12 py-3 rounded-xl
                          border-2 border-amber-300 
                          focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                          text-sm md:text-base text-amber-900 placeholder:text-amber-400
                          bg-white/80 backdrop-blur-sm
                          transition-all duration-300
                          outline-none
                        "
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800"
                      >
                        {showPassword ? <EyeOff className="size-4 md:size-5" /> : <Eye className="size-4 md:size-5" />}
                      </button>
                    </div>
                  </div>

                  {/* 注册模式：确认密码 */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-amber-900 mb-2 text-sm md:text-base">
                        {t('login.confirm_password')}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-amber-600">
                          <Lock className="size-4 md:size-5" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={t('login.confirm_password_placeholder')}
                          className="
                            w-full pl-10 md:pl-12 pr-12 py-3 rounded-xl
                            border-2 border-amber-300 
                            focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                            text-sm md:text-base text-amber-900 placeholder:text-amber-400
                            bg-white/80 backdrop-blur-sm
                            transition-all duration-300
                            outline-none
                          "
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800"
                        >
                          {showConfirmPassword ? <EyeOff className="size-4 md:size-5" /> : <Eye className="size-4 md:size-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 登录按钮 */}
                  <button
                    type="submit"
                    className="
                      w-full py-3 md:py-4 rounded-xl text-base md:text-lg text-white
                      bg-gradient-to-br from-amber-500 to-orange-600 
                      hover:from-amber-400 hover:to-orange-500 
                      hover:scale-105 hover:shadow-xl active:scale-95
                      transition-all duration-300
                      border-3 border-amber-900
                    "
                    style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
                  >
                    {mode === 'login' ? t('login.login_button') : t('login.register_button')}
                  </button>
                </form>

                {/* 底部提示 */}
                <div className="mt-4 text-center text-xs md:text-sm text-amber-600">
                  <p>
                    {mode === 'login' ? t('login.no_account') : t('login.have_account')}
                    <button
                      type="button"
                      onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                      className="text-amber-700 hover:text-amber-900 underline ml-1"
                    >
                      {mode === 'login' ? t('login.go_register') : t('login.go_login')}
                    </button>
                  </p>
                </div>

                {/* 跳过按钮 */}
                {onSkip && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="
                        text-sm md:text-base text-amber-600 hover:text-amber-800
                        underline underline-offset-4 decoration-dashed
                        transition-all duration-300
                        px-4 py-2 rounded-lg
                        hover:bg-amber-50/50
                      "
                    >
                      {t('login.skip')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}