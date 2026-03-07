// 游戏进度管理工具

export interface StoryProgress {
  storyId: string;
  completedActs: number; // 已完成的幕数
  totalActs: number; // 总幕数
}

const PROGRESS_KEY = 'game_story_progress';

// 获取所有故事进度
export function getAllProgress(): Record<string, StoryProgress> {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

// 获取单个故事进度
export function getStoryProgress(storyId: string): StoryProgress {
  const allProgress = getAllProgress();
  return allProgress[storyId] || {
    storyId,
    completedActs: 0,
    totalActs: 5, // 默认5幕
  };
}

// 更新故事进度
export function updateStoryProgress(storyId: string, completedActs: number, totalActs: number = 5): void {
  const allProgress = getAllProgress();
  allProgress[storyId] = {
    storyId,
    completedActs: Math.min(completedActs, totalActs), // 不能超过总幕数
    totalActs,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

// 计算进度百分比
export function calculateProgress(completedActs: number, totalActs: number): number {
  if (totalActs === 0) return 0;
  return Math.round((completedActs / totalActs) * 100);
}

// 重置故事进度
export function resetStoryProgress(storyId: string): void {
  const allProgress = getAllProgress();
  delete allProgress[storyId];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

// 清空所有进度
export function clearAllProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
}
