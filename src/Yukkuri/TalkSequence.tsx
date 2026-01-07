import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Talk } from '../types/video';
import { YukkuriFace } from './YukkuriFace';
import { YukkuriSubtitle } from './Subtitle';

interface TalkSequenceProps {
  talks: Talk[];
  startFrame?: number;
}

export const TalkSequence: React.FC<TalkSequenceProps> = ({ talks, startFrame = 0 }) => {
  let currentFrame = startFrame;

  return (
    <>
      {talks.map((talk, index) => {
        const sequenceStart = currentFrame;
        currentFrame += talk.audioDurationFrames;

        return (
          <Sequence key={talk.id} from={sequenceStart} durationInFrames={talk.audioDurationFrames}>
            <AbsoluteFill>
              {/* キャラクター表示 - 一旦非表示 */}
              {/* <div
                style={{
                  position: 'absolute',
                  bottom: '350px',
                  left: talk.speaker === 'reimu' ? '200px' : 'auto',
                  right: talk.speaker === 'marisa' ? '200px' : 'auto',
                  zIndex: 10,
                }}
              >
                <YukkuriFace speaker={talk.speaker} isSpeaking={true} />
              </div> */}

              {/* 字幕 */}
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

