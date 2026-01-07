import { VideoConfig } from '../src/types/video';

// サンプル動画の設定
export const SampleVideoConfig: VideoConfig = {
  sections: [
    {
      title: 'Difyワークフローの作成',
      bgmSrc: 'audio/bgm/わくわくクッキングタイム的なBGM.mp3',
      backgroundVideo: 'video/dify_trigger.mov',
      talks: [
        {
          text: 'Difyのスタジオ画面から「最初から作成」をクリックします。',
          speaker: 'reimu',
          id: '001',
          audioDurationFrames: 150, // 約5秒（30fps）
          audioSrc: 'audio/001_春日部つむぎ（ノーマル）_Difyのスタジオ….wav',
          backgroundVideo: 'video/dify_trigger.mov',
        },
        {
          text: 'アプリのタイプで「ワークフロー」を選択し、任意のアプリ名（例：トリガ）を入力して「作成する」をクリックします。',
          speaker: 'reimu',
          id: '002',
          audioDurationFrames: 150, // 約3秒
          audioSrc: 'audio/002_春日部つむぎ（ノーマル）_アプリのタイプで「….wav',
          backgroundVideo: 'video/HelloWorld.mp4',
        },
        {
          text: 'ワークフローの編集画面（キャンバス）が立ち上がります。',
          speaker: 'reimu',
          id: '003',
          audioDurationFrames: 120, // 約4秒
          audioSrc: 'audio/003_春日部つむぎ（ノーマル）_ワークフローの編集….wav',
        },
        {
          text: '「開始」ノードをクリックし、トリガーを追加するためのメニューを開きます。',
          speaker: 'reimu',
          id: '004',
          audioDurationFrames: 180, // 約6秒
          audioSrc: 'audio/004_春日部つむぎ（ノーマル）_「開始」ノードをク….wav',
        },
        {
          text: '利用可能なツールやトリガーの一覧（マーケットプレイス）が表示されます。',
          speaker: 'reimu',
          id: '005',
          audioDurationFrames: 90, // 約3秒
          audioSrc: 'audio/005_春日部つむぎ（ノーマル）_利用可能なツールや….wav',
        },
        {
          text: 'リストから「Google Drive」を探し、「インストール」ボタンをクリックして追加します。',
          speaker: 'reimu',
          id: '006',
          audioDurationFrames: 180, // 約6秒
          audioSrc: 'audio/006_春日部つむぎ（ノーマル）_リストから「Goo….wav',
        },
        {
          text: '続いて「Gmail Trigger」を選択し、「インストール」をクリックして追加します。',
          speaker: 'reimu',
          id: '007',
          audioDurationFrames: 120, // 約4秒
          audioSrc: 'audio/007_春日部つむぎ（ノーマル）_続いて「Gmail….wav',
        },
        {
          text: '他のツール（GitHub等）も確認します。',
          speaker: 'reimu',
          id: '008',
          audioDurationFrames: 180, // 約6秒
          audioSrc: 'audio/008_春日部つむぎ（ノーマル）_他のツール（Git….wav',
        },
        {
          text: 'ブラウザからクリップボード等の許可を求められた場合は「許可」を選択します。',
          speaker: 'reimu',
          id: '009',
          audioDurationFrames: 180, // 約6秒
          audioSrc: 'audio/009_春日部つむぎ（ノーマル）_ブラウザからクリッ….wav',
        },
        {
          text: '再度メニューを確認し、インストールしたプラグインが「Installed」になっているか、または更新が必要かを確認します。',
          speaker: 'reimu',
          id: '010',
          audioDurationFrames: 420, // 約14秒
          audioSrc: 'audio/010_春日部つむぎ（ノーマル）_再度メニューを確認….wav',
        },
        {
          text: 'これでGoogle DriveやGmailをトリガーとしたワークフローを作る準備が整いました。',
          speaker: 'reimu',
          id: '011',
          audioDurationFrames: 360, // 約12秒
          audioSrc: 'audio/011_春日部つむぎ（ノーマル）_これでGoogle….wav',
        },
      ],
    },
  ],
};

// 総フレーム数を計算する関数
export function calculateTotalFrames(config: VideoConfig): number {
  return config.sections.reduce((total, section) => {
    const sectionFrames = section.talks.reduce(
      (sum, talk) => sum + talk.audioDurationFrames,
      0
    );
    return total + sectionFrames;
  }, 0);
}

