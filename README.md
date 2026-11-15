# 层叠消融 · Layer Overlay Puzzle

把实心几何图块平移到棋盘上，拼成给定的目标。同一块区域叠偶数次会消失，叠奇数次会保留。

## 运行和操作

直接用浏览器打开 index.html。玩法、关卡和界面在同一个文件内，支持离线运行。页面右上角可切换中英文。

可将图块直接拖到棋盘上，也可选中图块后点按锚点的位置。键盘用户可聚焦棋盘，用方向键移动锚点，按回车放置。每个图块使用一次，保持原方向。拼出目标后，点击「提交答案」。

前五关的时间分别为 10、9、8、7、6 分钟。每关基础 10 分，提交正确答案时，每剩一整分钟加 1 分，每次错误提交扣 1 分，图块未放齐也算一次错误。答对且至少 6 分即可进入下一关。低于 6 分或超时可以重试。每次进入或重试都会生成新题，每关只保留最高分。

通过前五关且第五关至少 10 分后，可选择进入五分钟的隐藏关。可重玩第五关提高成绩。隐藏关也按同一规则计分，至少 6 分通过。开始作答后目标图形隐藏，每次复看会锁定棋盘 10 秒，倒计时继续。通过隐藏关可获得「消融之王」称号。

## 玩法来源

网站根据奇偶叠加规则生成原创题目。玩法参考《最强大脑》第五季与第六季的「层叠消融」。[第五季片段](https://v.jstv.com/a/20180105/1515163436538.shtml) · [第六季片段](https://v.jstv.com/a/20190329/1553873092373.shtml)

## Play in English

Open index.html in a browser and select EN. Drag the filled pieces into position, or select a piece and tap its anchor point. Regions with even coverage disappear. Regions with odd coverage remain. Choose Submit answer once your board matches the target.

The five levels have 10, 9, 8, 7, and 6 minutes, respectively. Each entry or retry generates a new puzzle. A correct submission earns 10 points plus one per full minute left, minus one per wrong or incomplete submission. A score of at least 6 advances you immediately. Each level keeps its best score.

Clear all five levels and earn at least 10 on level 5 to unlock the optional five-minute hidden level. Replay level 5 to improve your score. The hidden target disappears after the first placement. Viewing it again locks the board for ten seconds while the clock continues. A correct submission worth at least 6 points earns the Master of Overlays title.

## 管理入口 · Administrator

线上页面加 `?admin=1` 可显示管理员表单。将 `api/game-admin.mjs` 部署为同域的 Vercel Node.js 函数，并在服务端配置敏感环境变量 `GAME_OVERLAY_ADMIN_SCRYPT`。该变量的格式为 `saltHex:hashHex`。用 Node.js 的 `scrypt` 默认参数从自选密码和 16 字节随机盐生成 64 字节校验值，再将盐与校验值分别编码为十六进制。游戏可直接离线游玩。

Append `?admin=1` on the hosted HTTPS page to open the administrator form. Deploy `api/game-admin.mjs` as a same-origin Vercel Node.js function and set the sensitive server variable `GAME_OVERLAY_ADMIN_SCRYPT` to `saltHex:hashHex`. Use Node.js `scrypt` with default parameters, a random 16-byte salt, and a 64-byte output. The puzzle itself runs offline.
