import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, Video } from 'remotion';
import { Talk } from '../types/video';
import { YukkuriFace } from './YukkuriFace';
import { YukkuriSubtitle } from './Subtitle';

interface TalkSequenceProps {
  talks: Talk[];
  startFrame?: number;
  defaultBackgroundVideo?: string; // セクションのデフォルト背景動画
}

export const TalkSequence: React.FC<TalkSequenceProps> = ({ 
  talks, 
  startFrame = 0,
  defaultBackgroundVideo 
}) => {
  let currentFrame = startFrame;

  return (
    <>
      {talks.map((talk) => {
        const sequenceStart = currentFrame;
        currentFrame += talk.audioDurationFrames;

        // 個別の背景動画があればそれを使用、なければデフォルト
        const videoSrc = talk.backgroundVideo || defaultBackgroundVideo;

        return (
          <Sequence key={talk.id} from={sequenceStart} durationInFrames={talk.audioDurationFrames}>
            <AbsoluteFill>
              {/* 動画 - 全画面表示 */}
              {videoSrc && (
                <Video
                  src={staticFile(videoSrc)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}

              {/* 下部の半透明オーバーレイエリア */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '280px',
                  // background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)',
                }}
              />

              {/* 魔理沙 - 画面左下
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '30px',
                  zIndex: 10,
                  opacity: talk.speaker === 'marisa' ? 1 : 0.5,
                }}
              >
                <YukkuriFace speaker="marisa" isSpeaking={talk.speaker === 'marisa'} scale={0.6} />
              </div> */}

              {/* 霊夢 - 画面右下 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '30px',
                  zIndex: 10,
                  opacity: talk.speaker === 'reimu' ? 1 : 0.5,
                }}
              >
                <YukkuriFace speaker="reimu" isSpeaking={talk.speaker === 'reimu'} scale={0.6} />
              </div>

              {/* 字幕エリア - キャラクターの間 */}
              <YukkuriSubtitle text={talk.text} speaker={talk.speaker} />

              {/* 音声ファイルがある場合は再生 */}
              {talk.audioSrc && (
                <Audio src={staticFile(talk.audioSrc)} />
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </>
  );
};
