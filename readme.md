# **Menta Talk** #README
## デモンストレーション
#### 1.チーム作成 (右側のスマホ画面は関係ないです...)
![チーム作成動画](https://user-images.githubusercontent.com/63286009/105941729-6971d100-60a1-11eb-96f3-9e0ff56709d7.gif)

#### 2.チームチャット
![チームチャット動画](https://user-images.githubusercontent.com/63286009/105942376-7511c780-60a2-11eb-8462-a09ef6586e27.gif)

#### 3.コード自動保存
![コード自動保存動画](https://user-images.githubusercontent.com/63286009/105942294-47c51980-60a2-11eb-9d3a-d7e053cc83bf.gif)

#### 4.チャットボット
![チャットボット動画](https://user-images.githubusercontent.com/63286009/105942126-f9177f80-60a1-11eb-8da4-1ad851311b47.gif)
<br><br>

## 概要
一般的なチャット機能がベースとなっております。  
上記と違う点はチャットの会話でプログラミングに関する技術情報を投稿した際に、その情報をデータベースに自動保存する仕組みです。  
例えばPHPのコードを会話ですることで、PHPのコードとしてデータベースに保存できます。コードの他にもサイトのURLやコマンドも保存することができます。  
また、保存したプログラミングに関する情報は、Bot検索機能や一覧表示で探すことができます。
<br><br>

## 制作背景
プログラミングをチームで開発する際の生産性を少しでも高めるために制作しました。  
主に以下の項目を効率化出来ると考えております。
- チーム開発する上で何度も同じ質問をしてしまう
- 情報共有をしたか履歴が残る
- チーム内での共有事項を保存できる
- 教えてもらったことをわざわざ自分のメモに記述し直す
- など
<br><br>

## アプリ機能一覧
#### 1.ユーザー登録
<img src="https://user-images.githubusercontent.com/63286009/105933191-5f47d680-6091-11eb-8e0e-43d2f67ebba7.jpg" alt="ユーザー登録" width="800px"><br>

#### 2.チーム登録(チームメンバー登録機能)
<img src="https://user-images.githubusercontent.com/63286009/105933461-c8c7e500-6091-11eb-9d63-fa07230ffc2d.jpg" alt="チーム登録" width="800px"><br>

#### 3.チームチャット機能
<img src="https://user-images.githubusercontent.com/63286009/105933588-117f9e00-6092-11eb-8fe4-0111dc84d875.png" alt="チームチャット" width="800px"><br>

#### 4.会話中のcode自動保存機能 (右側のスマホ画面は関係ないです...)
<img src="https://user-images.githubusercontent.com/63286009/105933685-41c73c80-6092-11eb-8666-36552edc8309.png" alt="code自動保存" width="800px"><br>

#### 5.bot機能
<img src="https://user-images.githubusercontent.com/63286009/105933869-789d5280-6092-11eb-81cb-1a3105e5a4b1.png" alt="bot会話" width="800px"><br>

#### 6.コード一覧閲覧機能
<img src="https://user-images.githubusercontent.com/63286009/105933930-95398a80-6092-11eb-9dbc-72514ce49789.png" alt="code一覧表示" width="800px"><br><br>

## 開発環境(使用技術)
- HTML
- Sass
- jQuery
- Laravel 6
- Seeder
- Faker
- MySQL  
- GitHub
- VSCode 
- など
<br><br>

## データベース設計
<img src="https://user-images.githubusercontent.com/63286009/105934322-4fc98d00-6093-11eb-9a92-ec25f4fa468e.png" alt="DB_ER図" width="800px"><br><br>

## 課題や今後実装したい機能
- チームごとの管理者ユーザーによるチームメンバー削除・招待機能
- プログラミング情報のカテゴリ検索・コード、リンク、コマンド別検索機能
- １投稿内で画像の複数枚投稿
- Botの学習様機能
- 未完成のため、ブラッシュアップやリファクタリング、テストコード、デプロイ作業
- など
