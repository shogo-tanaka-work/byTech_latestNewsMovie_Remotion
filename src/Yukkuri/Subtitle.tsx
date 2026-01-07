import React from 'react';
import { Speaker } from '../types/video';

interface SubtitleProps {
  text: string;
  speaker: Speaker;
}

export const YukkuriSubtitle: React.FC<SubtitleProps> = ({ text, speaker }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '55%',
        maxWidth: '1000px',
        zIndex: 15,
      }}
    >
      {/* 字幕テキストエリア */}
      <div
        style={{
          // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '16px 28px',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontSize: '36px',
            color: speaker === 'reimu' ? '#FF6B6B' : '#FFFFFF',
            lineHeight: '1.4',
            fontWeight: 'bold',
            letterSpacing: '1px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
