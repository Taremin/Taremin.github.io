---
id: QmxvZy84
path: "/@taremin/8"
author: "@taremin"
contributors:
- "@taremin"
coediting: false
folder: 
groups:
- Home
published_at: '2019-01-30 17:10:55 +0900'
updated_at: '2019-01-30 17:10:55 +0900'
archived_at: 
comments: []
---

# VRChat 向け Blender 2.7系 から 2.8 への移行と EEVEE/Cycles の使い方

## Blender 2.8 への移行

### 移行の準備  (Blender2.8用のファイルの作成)

まずは移行前の Blender で「コピーを保存」で新しいファイルに Blender 2.8 用のファイルを書き出します。
このファイルは一時的なものなので適当な名前で良いです。
また、Blender 2.8 に移行すると以前のバージョンに戻すのが難しくなるので、今までのファイルはどこかに取っておくと良いです。

### 移行開始

Blender2.8で以前のバージョンの.blendファイルをそのまま使うことも出来ますが、ワークスペースなどおかしい状態のまま読み込まれていることもあるので、オブジェクトなど必要なものだけ2.8で作成した新しいファイルにコピーするのが変にハマったりすることが少ないのでおすすめです。

具体的な手順は以下のようになります。

#### 以前のバージョンで作成した .blend ファイルを Blender 2.8 で開く

これをそのまま保存します。
これで以前のレイヤーなどがコレクションとして保存されます。

#### 新規ファイルを作り Append

新規ファイルを作り、Scene Collection にある Collection を右クリックから「Delete Hierarchy」して全部消しましょう。

<img title='2019-01-29_13h42_15.png' src='/images/attachments/227.png' width="445" data-meta='{"width":445,"height":399}'>

そして先程保存した一時ファイルから Append します。

<img title='2019-01-29_13h38_23.png' src='/images/attachments/225.png' width="433" data-meta='{"width":433,"height":410}'>

このとき .blend ファイルの下に色々あると思いますが、 Collection 以下にはいってるコレクションを A ですべて選択してAppendすればよいと思います。
これでAppend元のファイルはもう使いません。

#### テクスチャの設定

Appendしたあと、モデルが読み込めていると思いますが、すべてテクスチャが貼られていない状態になってると思います。
その原因ですがレンダリングエンジンの変更が影響しています。
Blender 2.8 から「EEVEE」というレンダリングエンジンになったというのはどこかで聞いたことのある人も多いかも知れません。
このEEVEEというのは(Cyclesのような)ノードベースのエンジンなので、今までの Blender 内部レンダラーのようにマテリアルに直接割り当てられるテクスチャというのが存在しないようなのです。
VRChatなどで使うモデルは以前のバージョンのBlenderでは「陰影なし」で作業している人が多いと思います。
そこで以下のような手順でUnlitのようなノードを組めば今までと同じような画面で作業することができます。

#### 表示をLookDevにする

デフォルトだと「ソリッド」表示になってるはずなので、3Dビュー上で「Z」を押して「LookDev」を選択します。
<img title='2019-01-29_14h21_55.png' src='/images/attachments/230.png' width="548" data-meta='{"width":548,"height":400}'>

##### エリア分割

まずはノードの結果を見やすくするためにエリアを分割しましょう。
Blender 2.8 はすごく目立たなくなっていますが、画面の四隅で従来のバージョンのようにエリアの分割・統合ができます。
（マウスカーソルが下記のように✛になったら引っ張れます）

<img title='blender2.8のエリア分割' src='/images/attachments/228.png' width="573" data-meta='{"width":573,"height":135}'>

分割した方のエリアは「Shader Editor」にします。

#####  マテリアルでノードを使用する 

マテリアルから「ノードを使用」を有効にします。

<img title='2019-01-29_14h16_04.png' src='/images/attachments/229.png' width="403" data-meta='{"width":403,"height":446}'>

「Shader Editor」で「マテリアル出力」以外のノードをすべて消します。
「追加」から「テクスチャ」「画像テクスチャ」を選びます。

<img title='2019-01-29_14h17_44.png' src='/images/attachments/231.png' width="616" data-meta='{"width":616,"height":415}'>

追加された「画像テクスチャ」ノードでそのマテリアルに割り当てるテクスチャを選択し、「カラー」出力と「マテリアル出力」ノードのサーフェスをドラッグアンドドロップでつなぎます。

<img title='2019-01-29_14h28_06.png' src='/images/attachments/233.png' width="418" data-meta='{"width":418,"height":258}'>

これをマテリアルの数だけ繰り返していきます。

## テクスチャのベイク

### ベイク準備
せっかくノードベースのレンダリングエンジンになったので、テクスチャのカゲ塗りなどをベイクしたりして手間を省きたいと思います。（お絵描き下手なのでテクスチャがつらい）

まず、これは知らないと困るのですけど、EEVEEではベイク出来ません。ベイクするときはCyclesにします。
ほとんど共通のノードになっているので、大体EEVEEのノードのままで同じ結果をベイクすることができます。
一部EEVEEではサポートされていないノードは下記で見ることができます。

- https://docs.blender.org/manual/en/dev/render/eevee/materials/nodes_support.html
    - 特に注意するのは「Shader to RGB」と「Specular BSDF」がEEVEE専用というところ

EEVEEとCyclesの切り替えはここで行うことができます。(「反復」がCycles)

<img title='2019-01-30_14h12_22.png' src='/images/attachments/234.png' width="401" data-meta='{"width":401,"height":289}'>

普段はCyclesにしておいてビューポートの表示をLookDevにしておくと、CyclesのLookDevモードではEEVEEを使用するらしいのでほとんどベイクするときのイメージのまま作業できるので良いと思います。
(LookDevがEEVEE、レンダーがCyclesになる)

カゲのベイクでAO（環境遮光）を使うときは、エンジンをEEVEEにしてから「アンビエントオクルージョン(AO)」にチェックをいれましょう。

<img title='2019-01-30_14h35_45.png' src='/images/attachments/236.png' width="404" data-meta='{"width":404,"height":314}'>

アンビエントオクルージョンって何かというと、周囲の光がどれくらい遮られているのかを表すものです。奥まった場所は周囲から光が当たらないので暗くなるというかんじです。
これはCyclesでは自動的に使用できるのですが、LookDevのときとベイク時（レンダー）で見た目が違うと混乱すると思います。

また、LookDevのときのScene Lightも有効にしておくと良いと思います。
（Scene Light がオフだと LookDev のときに彩度が落ちてくすんだような感じになることがあります。）

<img title='2019-01-30_14h31_03.png' src='/images/attachments/235.png' width="394" data-meta='{"width":394,"height":189}'>
 
### ノードを組む

Blenderの記事を見てると大体がPBR(物理ベースレンダリング：写真みたいなCG)をターゲットにしてるので、VRChatなどのアニメ的なキャラクターの情報があまり見つからなかったりします。
(大体プリンシプルBSDFにつないで～みたいな話で、実際にやってみるとUnityのStandardシェーダーみたいでギャーってなる)

今回ベイクで使うのは「放射」ノードです。放射ってなに…？って思ったんですけど「Emission」のことです。
(Unityでシェーダーの設定したことあるひとはEmissionのほうが通じると思います。)
要はUnlitです。
「Shader Editor」で「追加」から放射ノードを追加して繋いでみましょう。

<img title='2019-01-30_14h56_59.png' src='/images/attachments/237.png' width="609" data-meta='{"width":609,"height":242}'>

<img title='2019-01-30_14h59_54.png' src='/images/attachments/238.png' width="581" data-meta='{"width":581,"height":276}'>

Cyclesではテクスチャーをベイクした結果のテクスチャは「画像テクスチャ」ノードになります。（すごく分かりにくい）
「追加」から画像テクスチャノードを追加して「新規」に画像を作りましょう。
（ここでは仮に「Baked」という名前で作成します）

<img title='2019-01-30_15h01_55.png' src='/images/attachments/239.png' width="544" data-meta='{"width":544,"height":551}'>

これでとりあえずベイクする準備が整いました。

### ベイクの実行

まずレンダリングエンジンを「Cycles」にします。
すると下の方に「ベイク」という項目があるので、そのなかで「ベイクタイプ」を「放射」にします。
先程「放射」ノードにつなげたのは、「ベイクタイプ：放射」で「放射」ノードの結果がベイクできるからです。
「余白」はとりあえずそのまま、「Clear Image」はチェックを外しておきましょう。（Clear Image はベイクするときにその画像をクリアしてからベイクします。同じテクスチャにベイクしていく場合、前にベイクしたのが消えて困ることがたまにあります。）

これでベイクを実行します。

<img title='2019-01-30_15h14_14.png' src='/images/attachments/240.png' width="403" data-meta='{"width":403,"height":627}'>

ベイクが終わったら「UVエディター」などでベイク結果を確認してみましょう。たぶん出来てるはずです！
なお、ベイク結果は「PNGとしてパック」でblendファイル内に保存か、名前をつけて保存しておかないと保存されないのでベイクのし直しになります。

<img title='2019-01-30_16h02_27.png' src='/images/attachments/247.png' width="296" data-meta='{"width":296,"height":327}'>

また、ベイク先にベイク結果が書き込まれないという場合はベイク先の「画像テクスチャ」ノードが「生成」になってるか確認してみるといいかもしれません。


### ベイク後のテクスチャでモデルを表示したい

まだ元のテクスチャをそのままベイクしただけなので表示は変わりませんけど、カゲをベイクで塗ったりする場合はベイクが終わったらそちらのテクスチャで表示したいですよね。

マテリアルがひとつだけなら単純に放射ノードの入力を切り替えるだけでベイク後のテクスチャの表示になるので良いのですが、マテリアルが複数になると面倒です。

<img title='2019-01-30_15h23_26.png' src='/images/attachments/241.png' width="535" data-meta='{"width":535,"height":489}'>

そこで、すべてのマテリアルで共通の処理をすることができる「ノードグループ」という機能をつかいます。
    「放射ノード」のみを選択して「ノード」から「グループ作成」をします。

<img title='2019-01-30_15h30_30.png' src='/images/attachments/242.png' width="619" data-meta='{"width":619,"height":648}'>

グループの編集画面になるとおもうので、まずStrength(強さ)のグループ入力を削除します。
（名前の横のバツを押す）

<img title='2019-01-30_15h32_01.png' src='/images/attachments/244.png' width="987" data-meta='{"width":987,"height":537}'>

次にグループ入力の「カラー」の下にある○を放射ノードの「カラー」に繋げます。

<img title='2019-01-30_15h34_25.png' src='/images/attachments/243.png' width="464" data-meta='{"width":464,"height":222}'>

これで「入力にカラーを２つ受け取ってどちらかを放射ノードにつなぐ」グループが出来ました。
Tabキーを押してグループを抜けましょう。もう一度グループの内容を編集したい場合は、グループノードを選択してTabキーです。
「放射」ノードが「ノードグループ」に変わっているので、上のカラーにベイク前のテクスチャ、下のカラーにベイク後のテクスチャを繋げましょう。

<img title='2019-01-30_15h38_48.png' src='/images/attachments/245.png' width="560" data-meta='{"width":560,"height":488}'>

ここで作成したグループを他のマテリアルでも使用します。
（追加ーグループから作成したグループを選択して追加できます。）

すべてのマテリアルでこのノードグループを使えば、グループの編集でベイク前、ベイク後の入力を切り替えるだけで一括で表示を切り替えることが出来ます。

<img title='2019-01-30_15h41_00.png' src='/images/attachments/246.png' width="539" data-meta='{"width":539,"height":158}'>

## 実践編：法線のZとAOで肌とカゲ塗り

肌を「肌の色」と「カゲの色」を指定して、テクスチャにベイクしていきます。

### 色の指定

まずは「ミックスRGB」ノードと「RGB」ノードを追加してつなぎます。
ミックスは「カラー」、RGBは「入力」にあります。
ここでは色の違いがわかりやすいように仮に肌の色を赤、カゲの色を青にします。

<img title='2019-01-30_16h29_31.png' src='/images/attachments/248.png' width="525" data-meta='{"width":525,"height":340}'>

ここで「ミックス」の係数をスライドさせてみると、青と赤の混ぜ合わせ具合が変わります。
この係数によって塗り分けを行います。

### 法線のZ

法線を取得するために「ジオメトリ」を追加します。ジオメトリは「入力」にあります。
ノーマル(法線)にはXYZ軸のそれぞれの値が `-1.0` から `1.0` で入っているので、この中からZ軸のみを取り出して `0.0` から `1.0` にします。
「XYZ分離」（コンバーター）、「数式」2個を追加します。数式は「追加」と「乗算」にして、以下のようにつなぎます。

<img title='2019-01-30_16h37_45.png' src='/images/attachments/250.png' width="818" data-meta='{"width":818,"height":530}'>

これだけでもうカゲっぽいものが塗られます。（UV球に適用したところ）

<img title='2019-01-30_16h38_28.png' src='/images/attachments/251.png' width="453" data-meta='{"width":453,"height":488}'>

### アンビエントオクルージョン

アンビエントオクルージョン（環境遮蔽）は球状だとわかりにくいので少しへこませます。

<img title='2019-01-30_16h47_30.png' src='/images/attachments/253.png' width="454" data-meta='{"width":454,"height":391}'>

「アンビエントオクルージョン（AO）」ノード（入力）を追加してミックスの係数に繋いでみましょう。

<img title='2019-01-30_16h50_45.png' src='/images/attachments/255.png' width="291" data-meta='{"width":291,"height":411}'>

結構へこんでいる場所なのに青の場所が少ない気がします。また、凹んでいるところのフチがちょっと色が汚いです。

<img title='2019-01-30_16h50_24.png' src='/images/attachments/254.png' width="481" data-meta='{"width":481,"height":442}'>

「カラーランプ」（コンバーター）を追加して繋いで、白と黒をスライドさせて調整してみましょう。

<img title='2019-01-30_16h54_15.png' src='/images/attachments/256.png' width="534" data-meta='{"width":534,"height":684}'>

なんとなく良くなった気がします。

<img title='2019-01-30_16h55_09.png' src='/images/attachments/257.png' width="390" data-meta='{"width":390,"height":343}'>

### 法線のZとAOを組み合わせる

「数式」（コンバーター）で乗算を選び、先程作った「法線のZ」と「AO」を組み合わせましょう。

<img title='2019-01-30_16h58_13.png' src='/images/attachments/258.png' width="772" data-meta='{"width":772,"height":571}'>

それっぽい表示になってきました。

<img title='2019-01-30_16h58_33.png' src='/images/attachments/259.png' width="361" data-meta='{"width":361,"height":335}'>

ここで肌の色とカゲの色を正式に決めましょう。
肌の色を「FFEEE4」、カゲの色を「FFC1BB」にします。（RGBノードの下の方にある色をクリックで16進入力できます）

<img title='2019-01-30_17h02_49.png' src='/images/attachments/260.png' width="261" data-meta='{"width":261,"height":376}'>

なんとなくそれっぽくなりました。

<img title='2019-01-30_17h04_06.png' src='/images/attachments/261.png' width="459" data-meta='{"width":459,"height":406}'>

先程のベイクの手順と同じく、ベイクモード「放射」でベイクします。

<img title='2019-01-30_17h05_33.png' src='/images/attachments/262.png' width="403" data-meta='{"width":403,"height":605}'>

テクスチャを切り替えるグループの入力をベイクしたテクスチャにして確認します。

<img title='2019-01-30_17h07_35.png' src='/images/attachments/263.png' width="1341" data-meta='{"width":1341,"height":937}'>

良さそうならベイクしたテクスチャをパックか名前をつけて保存します。
もっとトゥーン調にしたい場合はミックスに繋ぐ前に「カラーランプ」を付けて調整できるようにしてみるとか、他のマテリアルでも使えるようにグループ化してみるとか、頂点カラーでカゲを調整できるようにしたりとか、色々応用が効くので遊んでみるのも面白いと思います。

おつかれさまでした！




