import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 如果是音频相关错误，不需要显示错误UI，只记录日志
    if (error.message.includes('audio') || error.message.includes('Audio') || 
        error.message.includes('supported sources') || error.message.includes('play')) {
      console.warn('🔇 音频播放错误已被捕获，应用继续运行');
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError && this.state.error && 
        !this.state.error.message.includes('audio') && 
        !this.state.error.message.includes('Audio') &&
        !this.state.error.message.includes('supported sources')) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className="flex items-center justify-center size-full bg-gradient-to-br from-orange-100 to-amber-100">
          <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md">
            <div className="text-6xl mb-4">😅</div>
            <h1 className="text-2xl font-bold text-[#603913] mb-2">哎呀，出了点小问题</h1>
            <p className="text-gray-600 mb-4">橘小橘遇到了一个小麻烦，但别担心！</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#F26522] text-white px-6 py-3 rounded-full font-bold hover:bg-[#D55A1F] transition-colors"
            >
              重新开始 🔄
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
