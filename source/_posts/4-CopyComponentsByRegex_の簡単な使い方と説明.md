# CopyComponentsByRegex の簡単な使い方と説明

## 概要

正規表現でマッチするコンポーネントをまとめてコピーできる Unity エディタ拡張です。
Dynamic Bone や VRM の Spring Bone などの設定を何度も行わなくてよくなります。
VRChat や Virtual Cast でアバターを何度もアップデートする方に特に便利だと思います。

## 紹介動画

こちらのツイートに動画を載せていますので、見ていただくとどんなエディタ拡張かわかりやすいと思います。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">アバターを更新する度にDynamicBoneの設定しなおすのが嫌になったので正規表現でマッチするコンポーネントをまとめてコピーするUnityエディタ拡張作りました！ <a href="https://t.co/d7WwE7eCJD">https://t.co/d7WwE7eCJD</a> ぜひ使ってみてください～(動画は開発中時のもの) <a href="https://twitter.com/hashtag/VRChat?src=hash&amp;ref_src=twsrc%5Etfw">#VRChat</a> <a href="https://t.co/x7bzE1NwqR">pic.twitter.com/x7bzE1NwqR</a></p>&mdash; Taremin/VRChat初心者 (@Taremin_VR) <a href="https://twitter.com/Taremin_VR/status/1002379093025816576?ref_src=twsrc%5Etfw">2018年6月1日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 導入方法

-   Zip のダウンロード
    -   <https://github.com/Taremin/CopyComponentsByRegex/archive/master.zip> をダウンロード
-   Unityへの読み込み
    -   解凍したものをUnityのアセット欄にドラッグアンドドロップ

以上でプロジェクトへの導入は完了です。

## 使い方

### ウィンドウの表示

<img title='2018-08-11_17h21_09.png' src='/images/attachments/13.png' width="377" data-meta='{"width":377,"height":645}'>

コピー元アバターを右クリックして CopyComponentsByRegex のウィンドウを出します。

### コピーの行い方

<img title='2018-08-11_17h25_45.png' src='/images/attachments/14.png' width="377" data-meta='{"width":377,"height":645}'>

1.  コピーするコンポーネント名にマッチする正規表現を書きます
2.  Copy ボタンを押します
3.  コピー先のアバターを選択します
4.  Paste ボタンを押します

これでコピー先のアバターへのコンポーネントのコピーは完了です。

#### 追記(2018/08/12)

"コピー先に同じコンポーネントがあったら削除" というチェックボックスを追加しました。
これは既にDynamicBoneなどが設定してあるアバターに他のアバターから設定を上書きしたいときなどに使うのを想定しています。

Dynamic Bone コンポーネントをコピーする先のオブジェクトに既に Dynamic Bone コンポーネントがあった場合、既存の Dynamic Bone コンポーネントをすべて削除してからコピーするようになります。

#### 追記(2018/11/23)

Cloth コンポーネントのコピーに一部対応しました。
Cloth 対象のメッシュの頂点構造(数や位置、頂点インデックス)が同じ場合、コピーが正しく行われます。

## 正規表現ってなに？

正規表現(Regular Expression)とは文字列検索などでよく使われる記法で、完全一致を検索するよりも柔軟な機能を持っています。
すべての機能を説明すると長くなりすぎてしまうので、ここでは簡単に「柔軟な検索機能」と思ってもらえればよいかと思います。

具体的にどのような表記ができるのかは [正規表現言語 - クイック リファレンス | Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/standard/base-types/regular-expression-language-quick-reference) を参考にしてみてください。

正規表現がわからないという場合は、とりあえずComponent名の一部を指定すると良いかもしれません。
(Dynamic Bone の場合は `Dynamic` などと指定すると `Dynamic Bone` や `Dynamic Bone Collider` がマッチします。)

## オブジェクト参照(ObjectReference) の自動差し替え

CopyComponentsByRegex では、コピー元の木構造内で完結している参照については、コピー先でもコピー先内で完結するように差し替えます。

<img title='2018-08-11_16h52_23.png' src='/images/attachments/12.png' width="930" data-meta='{"width":930,"height":614}'>

単に機能の説明をするだけだと分かりにくいので Dynamic Bone を具体例として挙げると、Dynamic Bone コンポーネントは `Root` というプロパティで対象となるオブジェクトを参照しています。
このコンポーネントを単にコピーした場合、コピー先の `Root` プロパティはコピー元のオブジェクトを参照したままなので、そのままプロジェクト実行しても期待する動作にはなりません。

ですので、複数コンポーネントをコピーする Unity エディタ拡張などを使う場合などでも、この参照部分を一つずつ手動で差し替えないといけなかったのです。

CopyComponentsByRegexでは木構造同士のコピーを行うのでこの木構造内にあるオブジェクトだったら、たぶん差し替えた方が便利だろうというポリシーで自動的に差し替えます。（需要があるならこの差し替えは On / Off 出来てもいいかなと思ってます）

## 使い方の例

### VRChat 用のアバター設定と Dynamic Bone と自動瞬きアニメーターをまとめてコピー

まず、上記をすべて設定したコピー元アバター全体を Disable にします。（VRC_Avatar Descripterによる誤アップロード防止）
コピー元アバターに対して `VRC|Dynamic|Animator` という正規表現でコピーを行います。
コピー先アバターに対してペーストします。

他にも便利な使い方などあれば、教えて頂ければこの記事に追記させていただこうと思っています。
[@Taremin_VR](https://twitter.com/Taremin_VR) までお知らせいただけると助かります。
