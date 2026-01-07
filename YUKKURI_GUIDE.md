# ゆっくり動画制作ガイド

このプロジェクトでは、Remotionを使用してゆっくり霊夢・魔理沙の動画を作成できます。

## 📝 基本的な使い方

### 1. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` が開き、Remotionスタジオが起動します。

### 2. 動画設定ファイルの編集

`src/config/sampleVideo.ts` を編集して、セリフや設定をカスタマイズできます：

```typescript
export const SampleVideoConfig: VideoConfig = {
  sections: [
    {
      title: 'イントロダクション',
      talks: [
        {
          text: 'ねえねえ魔理沙',
          speaker: 'reimu',
          id: '59f8c2cd81334be5ab5cdc7899fad286',
          audioDurationFrames: 60, // 約2秒（30fps）
        },
        // ... 他のセリフ
      ],
    },
  ],
};
```

### 3. コンポーネントの構造

```
src/
├── types/
│   └── video.ts           # 型定義
├── Yukkuri/
│   ├── YukkuriFace.tsx    # キャラクターの顔コンポーネント
│   ├── Subtitle.tsx       # 字幕コンポーネント
│   ├── TalkSequence.tsx   # トークシーケンス
│   └── YukkuriVideo.tsx   # メインの動画コンポーネント
├── config/
│   └── sampleVideo.ts     # 動画設定ファイル
└── utils/
    └── generateAudio.ts   # 音声関連ユーティリティ
```

## 🎤 音声の追加方法

AquesTalk10は商用ライブラリのため、以下の方法で音声を用意してください：

### 推奨方法1: VOICEVOX（無料）

1. [VOICEVOX](https://voicevox.hiroshiba.jp/) をダウンロード
2. テキストを入力して音声を生成
3. WAV形式でエクスポート
4. `public/audio/reimu/` または `public/audio/marisa/` に保存
5. 設定ファイルで音声ファイルを指定：

```typescript
{
  text: 'ねえねえ魔理沙',
  speaker: 'reimu',
  id: 'unique-id-001',
  audioDurationFrames: 60,
  audioSrc: 'audio/reimu/unique-id-001.wav', // 追加
}
```

### 推奨方法2: CoeFont

1. [CoeFont](https://coefont.cloud/) にアクセス
2. ゆっくり風の音声を選択
3. 音声を生成してダウンロード
4. 同様に `public/audio/` に配置

### 推奨方法3: その他のTTSサービス

- [Google Text-to-Speech](https://cloud.google.com/text-to-speech)
- [Amazon Polly](https://aws.amazon.com/polly/)
- その他のオンラインTTSサービス

## 🎨 キャラクターのカスタマイズ

`src/Yukkuri/YukkuriFace.tsx` でキャラクターの見た目を変更できます：

```typescript
const colors = {
  reimu: {
    face: '#FFE4B5',  // 肌の色
    bow: '#FF0000',   // リボンの色
    hair: '#000000',  // 髪の色
  },
  marisa: {
    face: '#FFE4B5',  // 肌の色
    hat: '#000000',   // 帽子の色
    ribbon: '#FFFFFF', // リボンの色
  },
};
```

## 🎬 動画のレンダリング

### プレビュー

Remotionスタジオで「YukkuriVideo」を選択すると、リアルタイムでプレビューできます。

### 動画の出力

```bash
npx remotion render YukkuriVideo out/yukkuri.mp4
```

オプション：
```bash
# 高品質でレンダリング
npx remotion render YukkuriVideo out/yukkuri.mp4 --quality=100

# 特定のフレーム範囲をレンダリング
npx remotion render YukkuriVideo out/yukkuri.mp4 --frames=0-300
```

## 📐 設定のカスタマイズ

### フレーム数の調整

音声の長さに合わせて `audioDurationFrames` を調整します：
- 30fps の場合、1秒 = 30フレーム
- 2秒の音声 = 60フレーム

### BGMの追加

```typescript
{
  title: 'イントロダクション',
  bgmSrc: 'audio/bgm/honobono-wartz.wav', // public/audio/bgm/に配置
  talks: [...]
}
```

### 背景動画の追加

```typescript
{
  title: 'イントロダクション',
  backgroundVideo: 'video/cyber-bg.mp4', // public/video/に配置
  talks: [...]
}
```

## 🎭 キャラクターの仕様

### 霊夢 (reimu)
- 赤いリボン
- 黒髪
- 左側に表示

### 魔理沙 (marisa)
- 黒い帽子
- 白いリボン
- 右側に表示

### 口パクアニメーション

キャラクターは自動的に口パクします。`isSpeaking` プロパティで制御されています。

## 💡 Tips

1. **音声の長さを測定**: 
   - 音声編集ソフト（Audacityなど）で正確な長さを確認
   - 秒数 × 30（fps）でフレーム数を計算

2. **字幕のタイミング**:
   - 音声に合わせて自動的に表示されます
   - `audioDurationFrames` で表示時間を調整

3. **複数のセクション**:
   - `sections` 配列に複数のセクションを追加可能
   - 各セクションは独立したタイトルとトークを持てます

4. **パフォーマンス**:
   - 長い動画の場合、セクションごとに分割してレンダリング
   - 後で動画編集ソフトで結合

## 🔧 トラブルシューティング

### 音声が再生されない
- `public/audio/` に音声ファイルが配置されているか確認
- ファイルパスが正しいか確認（相対パス）
- ファイル形式がWAVまたはMP3か確認

### キャラクターが表示されない
- ブラウザのコンソールでエラーを確認
- `npm run lint` でTypeScriptエラーをチェック

### 動画が長すぎる/短すぎる
- `calculateTotalFrames()` で総フレーム数を確認
- 各 `audioDurationFrames` の値を調整

## 📚 参考リンク

- [Remotion公式ドキュメント](https://www.remotion.dev/)
- [参考記事：Reactで作るゆっくり解説](https://zenn.dev/seya/articles/47c2c9ee354b60)
- [VOICEVOX](https://voicevox.hiroshiba.jp/)
- [CoeFont](https://coefont.cloud/)

## 🎉 次のステップ

1. 音声ファイルを用意して配置
2. `sampleVideo.ts` をカスタマイズ
3. Remotionスタジオでプレビュー
4. レンダリングして動画を出力

ゆっくりしていってね！

