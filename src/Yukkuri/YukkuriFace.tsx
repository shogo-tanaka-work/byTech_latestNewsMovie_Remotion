import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Speaker } from '../types/video';

interface YukkuriFaceProps {
  speaker: Speaker;
  isSpeaking: boolean;
}

export const YukkuriFace: React.FC<YukkuriFaceProps> = ({ speaker, isSpeaking }) => {
  const frame = useCurrentFrame();

  // 話しているときの口パクアニメーション
  const mouthOpen = isSpeaking
    ? interpolate(frame % 10, [0, 5, 10], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // キャラクターの色設定
  const reimuColors = {
    face: '#FFE4B5',
    bow: '#FF0000',
    hair: '#000000',
  };

  const marisaColors = {
    face: '#FFE4B5',
    hat: '#000000',
    ribbon: '#FFFFFF',
  };

  const faceColor = speaker === 'reimu' ? reimuColors.face : marisaColors.face;

  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 顔 */}
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          backgroundColor: faceColor,
          border: '3px solid #000',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 目 */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '20px',
          }}
        >
          {/* 左目 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#000',
            }}
          />
          {/* 右目 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#000',
            }}
          />
        </div>

        {/* 口 */}
        <div
          style={{
            width: `${40 + mouthOpen * 20}px`,
            height: `${20 + mouthOpen * 15}px`,
            borderRadius: '50%',
            backgroundColor: '#000',
            transition: 'all 0.1s',
          }}
        />

        {/* キャラクター別の装飾 */}
        {speaker === 'reimu' && (
          <>
            {/* 霊夢のリボン */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '30px',
                backgroundColor: reimuColors.bow,
                border: '2px solid #000',
                borderRadius: '5px',
              }}
            />
            {/* 髪飾り */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '10px',
                width: '30px',
                height: '80px',
                backgroundColor: reimuColors.hair,
                border: '2px solid #000',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '10px',
                width: '30px',
                height: '80px',
                backgroundColor: reimuColors.hair,
                border: '2px solid #000',
              }}
            />
          </>
        )}

        {speaker === 'marisa' && (
          <>
            {/* 魔理沙の帽子 */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '80px solid transparent',
                borderRight: '80px solid transparent',
                borderBottom: `80px solid ${marisaColors.hat}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '180px',
                height: '20px',
                backgroundColor: marisaColors.hat,
                border: '2px solid #000',
                borderRadius: '10px',
              }}
            />
            {/* リボン */}
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '15px',
                backgroundColor: marisaColors.ribbon,
                border: '2px solid #000',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

