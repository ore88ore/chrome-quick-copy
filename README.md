# Quick Copy - IDなどをサクッとコピー

各種IDやUnixtimeなどを手軽に素早くコピーする拡張機能です。

コピーできるのは、
- ULID
- UUID(v4)
- Unixtime
- Unixtime(msec) ※１
  となります。

これまでコマンドを実行して生成したり、ツールを利用して生成していた作業をショートカット※２とEnterで素早くコピーすることができるようになります。

※１：Unixtimeのミリ秒  
※２：Macの場合：Command+Shift+Y、その他OSの場合：Ctrl+Shift+Y

## 使い方

アイコンをクリックしてポップアップを表示して、コピー対象を選択肢、`copy`ボタンをクリックまたは`Enter`を入力でクリップボードにコピーされます。  
![selected](doc/screenshot2.png)

### ショートカットを利用

- `Command+Shift+Y`(または`Ctrl+Shift+Y`)でポップアップを表示
  - コピー対象を選択(`Option+↓`または`Alt+↓`)
- `Enter`でコピー