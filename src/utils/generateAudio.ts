/**
 * 音声生成のユーティリティ
 * 
 * 注意: AquesTalk10は商用ライブラリのため、音声ファイルは以下の方法で用意してください：
 * 
 * 1. 手動で音声合成サイトを使用する方法：
 *    - VOICEVOX: https://voicevox.hiroshiba.jp/
 *    - CoeFont: https://coefont.cloud/
 *    - その他のTTS（Text-to-Speech）サービス
 * 
 * 2. 生成した音声ファイルを public/audio/ に配置：
 *    - public/audio/reimu/001.wav
 *    - public/audio/marisa/001.wav
 * 
 * 3. VideoConfigで音声ファイルのパスを指定：
 *    audioSrc: 'audio/reimu/001.wav'
 */

import { Speaker } from '../types/video';

/**
 * 音声ファイルのパスを生成
 */
export function getAudioPath(speaker: Speaker, id: string): string {
  return `audio/${speaker}/${id}.wav`;
}

/**
 * テキストから推定の音声長を計算（フレーム数）
 * @param text テキスト
 * @param fps フレームレート（デフォルト: 30）
 * @returns フレーム数
 */
export function estimateAudioDuration(text: string, fps: number = 30): number {
  // 日本語の場合、1文字あたり約0.3秒と仮定
  const secondsPerChar = 0.3;
  const estimatedSeconds = text.length * secondsPerChar;
  return Math.ceil(estimatedSeconds * fps);
}

/**
 * 音声ファイル名生成用のID生成
 */
export function generateAudioId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

