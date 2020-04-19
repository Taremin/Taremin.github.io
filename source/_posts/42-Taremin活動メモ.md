---
id: QmxvZy80Mg
path: "/@taremin/42"
author: "@taremin"
contributors:
- "@taremin"
coediting: false
folder: 
groups:
- Home
published_at: '2019-05-21 14:37:44 +0900'
updated_at: '2019-05-21 15:02:46 +0900'
archived_at: 
comments: []
---

# Taremin活動メモ

いろいろ手を広げすぎてて私自身でも何やったか忘れがちなので！

## 自作ソフトウェア

### Unity

#### [CopyComponentsByRegex](https://github.com/Taremin/CopyComponentsByRegex)

正規表現シリーズ第一弾。
正規表現でマッチするコンポーネントをコピーできるUnityエディタ拡張です。
オブジェクトを参照している場合にコピー先のオブジェクトの参照へ自動で付けかえるのが個人的には便利ポイントです。
Unity標準のコンポーネントのコピーだとうまくコピーできないClothにも対応しています。

#### [SelectObjectsByRegex](https://github.com/Taremin/SelectObjectsByRegex)

正規表現シリーズ第二弾。
ヒエラルキーから正規表現でマッチするコンポーネントのついたオブジェクトを選択するUnityエディタ拡張です。
主にDynamicBoneの設定を一括で変更したいときに使ってます。

#### [RemoveComponentsByRegex](https://github.com/Taremin/RemoveComponentsByRegex)

正規表現シリーズ第三弾。
ヒエラルキーから正規表現でマッチするコンポーネントを削除します。
主に VRChat で Excellent アバターにするときに使っています。
（ Oculusu Quest でアバターランク関係ないことが分かってしまったのですこし存在意義が…）

#### [ReplaceOnAssetsUpdate](https://github.com/Taremin/ReplaceOnAssetsUpdate)

ShaderForgeで作ったシェーダーに後から手を入れたいけど、毎回コード編集するのぜったいに嫌なので作ったUnityエディタ拡張です。
アセットアップデート(アセットに変化のあったとき)で自動的にテキスト置換を行います。

#### [CombineSubmesh](https://github.com/Taremin/CombineSubmesh)

Blender2.8でFBX出力したらマテリアル一杯になってしまったのでUnity側で解決しようとしたUnityエディタ拡張です。
同じマテリアルを参照しているサブメッシュをまとめて１つのサブメッシュにしてくれます。

#### [TareminShader](https://gitlab.com/taremin/TareminShader)

VRChat想定のアバター用シェーダーです。(ShaderForge製)
SharderForge製ですけど、ReplaceOnAssetsUpdate を使って自作のUIになっています。（ShaderForge用のカスタムエディタ [TareminShaderGUI](https://gitlab.com/taremin/TareminShader/tree/master/Editor) というのを同梱しています。）

### Blenderアドオン

#### [Taremin Blender Plugin](https://gitlab.com/taremin/taremin-blender-plugin)

BlenderからUnityに持っていくときに一つのメッシュにしたりモディファイアを適用したりする作業を自動化したアドオンです。

#### [image_mirror](https://github.com/Taremin/image_mirror)

Blender2.8だとなぜかミラーモディファイアでUV反転させてても片方にしかベイクされないので作ったアドオンです。
左右対称のUVにしてベイク後の画像を反転させてコピーします。（ノーマルマップにも対応した…つもり）

#### [vhds-selected-bones](https://github.com/Taremin/vhds-selected-bones)

Voxel Heat Diffuse Skinning という有償アドオンがあるのですが、そのアドオンでウェイトを自動で処理するときに選択したボーンからしか影響を受けなくしたかったので作った補助アドオンです。
（もちろんこのアドオンを使うには別途 Voxel Heat Diffuse Skinning が必要です）
2.8対応もしたのですけど、最近使ってなくてどこまで対応したのか覚えてなかったりします…。（不具合あったら教えてください！）

### Web

#### [自作モデルをブラウザで見れるサイト](http://taremin-3d.netlify.com)

後述の three-vrm を使って自作モデルの表示やVMDでのアニメーションをさせるページです。
ほとんどが three-vrm の機能なので自作というのはすこし烏滸がましいのですけど…。
(ワイヤーフレーム表示や一部UIは自作)

#### [VRChatのフレンド一覧を表示するサイト](https://taremin-vr.netlify.com/)

VRChat API を使ってフレンドの一覧を表示するサイトです。 **自分用につくったので他の人の利用は推奨してません。**
使わなくなったタブレットにずっとこのページを表示させてます。（便利）


## 他作者さまのOSSの修正やPullReqなど

### Blender アドオン

Blender2.8対応が主です。

#### [AnimeHairSupporter](https://github.com/Taremin/Blender-AnimeHairSupporter)

カーブからアニメのような髪をつくるアドオン。
Blender2.8対応といくつかのバグ修正。

#### [ApplyModifier](https://github.com/Taremin/ApplyModifier)

Blenderはシェイプキーのあるメッシュはモディファイアを適用できないのですが、それを解決するアドオンです。
Blender2.8対応が主です。

#### [io_scene_fbx](https://github.com/Taremin/io_scene_fbx)

Blenderに標準で付属しているFBXインポーター/エクスポーターの改変バージョンです。
主にFBXへの画像埋め込み周りの修正です。

### Web

#### [three-vrm](https://github.com/Taremin/three-vrm)

ブラウザでVRMモデルを表示するライブラリ。
MToonに対応してたり、VMD(MMDのモーションデータ)にも対応してたりとすごい実装です。
私が行ったのはMToonシェーダーの一部バグ修正です。(PullReqマージ済み)

