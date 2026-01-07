import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { Speaker } from '../types/video';

interface YukkuriFaceProps {
  speaker: Speaker;
  isSpeaking?: boolean;
  scale?: number; // キャラクターのスケール（デフォルト: 1）
}

// 霊夢の素材パス
const reimuAssets = {
  body: 'yukkuri_reimu/体/00.png',
  face: 'yukkuri_reimu/顔/00a.png',
  eyes: 'yukkuri_reimu/目/00.png',
  // 口パク用の画像（閉じた口から開いた口へ）
  mouths: [
    'yukkuri_reimu/口/00.png',  // 閉じた口
    'yukkuri_reimu/口/03.png',  // 少し開いた口
    'yukkuri_reimu/口/04.png',  // 中くらい
    'yukkuri_reimu/口/06.png',  // 大きく開いた口
  ],
};

// 魔理沙の素材パス
const marisaAssets = {
  body: 'yukkuri_marisa/体/00.png',
  face: 'yukkuri_marisa/顔/01a.png',
  eyes: 'yukkuri_marisa/目/00.png',
  // 口パク用の画像（閉じた口から開いた口へ）
  mouths: [
    'yukkuri_marisa/口/00.png',  // 閉じた口
    'yukkuri_marisa/口/02.png',  // 少し開いた口
    'yukkuri_marisa/口/04.png',  // 中くらい
    'yukkuri_marisa/口/06.png',  // 大きく開いた口
  ],
};

export const YukkuriFace: React.FC<YukkuriFaceProps> = ({ 
  speaker, 
  isSpeaking = false,
  scale = 1 
}) => {
  const frame = useCurrentFrame();
  const assets = speaker === 'reimu' ? reimuAssets : marisaAssets;
  const baseSize = 400 * scale;

  // 口パクのアニメーション
  // 話している時は、フレームに応じて口の画像を切り替える
  const getMouthIndex = (): number => {
    if (!isSpeaking) {
      return 0; // 話していない時は閉じた口
    }
    
    // 速度調整: 4で割ることで1/4の速度になる（数値を大きくするほど遅くなる）
    const speedFactor = 4;
    const adjustedFrame = Math.floor(frame / speedFactor);
    
    // 8フレームを1サイクルとして、口を開閉させる
    // speedFactor=4なので、実際は32フレーム（約1秒@30fps）で1サイクル
    const cycleLength = 8;
    const cyclePosition = adjustedFrame % cycleLength;
    
    // 口の開閉パターン: 閉じ→開く→閉じ
    const mouthPattern = [0, 1, 2, 3, 2, 1, 0, 1];
    return mouthPattern[cyclePosition];
  };

  const mouthIndex = getMouthIndex();
  const currentMouth = assets.mouths[mouthIndex];

  return (
    <div
      style={{
        position: 'relative',
        width: `${baseSize}px`,
        height: `${baseSize}px`,
      }}
    >
      {/* 体 - 一番下のレイヤー */}
      <Img
        src={staticFile(assets.body)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* 顔 - 体の上に重ねる */}
      <Img
        src={staticFile(assets.face)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* 目 */}
      <Img
        src={staticFile(assets.eyes)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* 口 - 口パクアニメーション */}
      <Img
        src={staticFile(currentMouth)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
