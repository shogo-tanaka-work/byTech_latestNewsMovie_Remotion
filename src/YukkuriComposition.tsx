import React from 'react';
import { YukkuriVideo } from './Yukkuri/YukkuriVideo';
import { SampleVideoConfig } from '../public/configVideo';

// ゆっくり動画のコンポジション
export const YukkuriComposition: React.FC = () => {
  return <YukkuriVideo config={SampleVideoConfig} />;
};

