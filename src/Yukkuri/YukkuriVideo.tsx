import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, Video } from 'remotion';
import { VideoConfig } from '../types/video';
import { TalkSequence } from './TalkSequence';

interface YukkuriVideoProps {
  config: VideoConfig;
}

export const YukkuriVideo: React.FC<YukkuriVideoProps> = ({ config }) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#87CEEB' }}>
      {config.sections.map((section, sectionIndex) => {
        const sectionStart = currentFrame;
        
        // セクションの総フレーム数を計算
        const sectionDuration = section.talks.reduce(
          (sum, talk) => sum + talk.audioDurationFrames,
          0
        );

        currentFrame += sectionDuration;

        return (
          <Sequence
            key={`section-${sectionIndex}`}
            from={sectionStart}
            durationInFrames={sectionDuration}
          >
            <AbsoluteFill>
              {/* 背景動画 */}
              {section.backgroundVideo && (
                <Video
                  src={staticFile(section.backgroundVideo)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}

              {/* BGM */}
              {section.bgmSrc && (
                <Audio src={staticFile(section.bgmSrc)} volume={0.3} />
              )}

              {/* セクションタイトル（最初の30フレームのみ表示） */}
              <Sequence from={0} durationInFrames={30}>
                <AbsoluteFill
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  <h1
                    style={{
                      fontSize: '72px',
                      color: '#FFF',
                      fontWeight: 'bold',
                      textShadow: '4px 4px 0px #000',
                    }}
                  >
                    {section.title}
                  </h1>
                </AbsoluteFill>
              </Sequence>

              {/* トーク */}
              <TalkSequence talks={section.talks} startFrame={30} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

