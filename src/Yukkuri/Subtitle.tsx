import React from 'react';
import { Speaker } from '../types/video';

interface SubtitleProps {
  text: string;
  speaker: Speaker;
}

export const YukkuriSubtitle: React.FC<SubtitleProps> = ({ text, speaker }) => {
  const speakerName = speaker === 'reimu' ? '霊夢' : '魔理沙';
  const speakerColor = speaker === 'reimu' ? '#FF0000' : '#000000';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '4px solid #000',
        borderRadius: '10px',
        padding: '30px 40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* <div
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: speakerColor,
          marginBottom: '10px',
        }}
      >
        {speakerName}
      </div> */}
      <div
        style={{
          fontSize: '48px',
          color: '#000',
          lineHeight: '1.5',
          fontWeight: 'bold',
          textShadow: '2px 2px 0px #fff',
        }}
      >
        {text}
      </div>
    </div>
  );
};

