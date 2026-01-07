// 動画設定の型定義
export type Speaker = 'reimu' | 'marisa';

export interface Talk {
  text: string;
  speaker: Speaker;
  id: string;
  audioDurationFrames: number;
  audioSrc?: string; // 音声ファイルのパス（オプション）
  backgroundVideo?: string; // 個別トークの背景動画（オプション）
}

export interface Section {
  title: string;
  bgmSrc?: string;
  backgroundVideo?: string;
  afterMovie?: string;
  talks: Talk[];
}

export interface VideoConfig {
  sections: Section[];
}

