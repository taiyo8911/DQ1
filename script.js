"use strict";

// キャラクターパラメータ定義（レベル20の平均パラメータ）
// strength:92, speed:88, maxHP:138, maxMP:128
let player = {
    name: "ゆうしゃ",
    LV: 20,
    strength: 92,
    speed: 88,
    maxHP: 138,
    maxMP: 128,
    SPELL_COST: 10, // じゅもんの消費MP

    // 装備定義
    weapon_power: 40, // ロトの剣
    armor_power: 28, // ロトのよろい
    shield_power: 20, // 水鏡の盾

    // 計算、表示用
    attack: "", // 攻撃力
    defence: "", // 守備力
    HP: "",
    MP: "",
    damage: "", // ダメージ計算
    heal: "", // じゅもんの回復量
}


// モンスター（りゅうおう第2形態）
// 攻撃力:140, 守備力:200, HP:130
let monster = {
    name: "りゅうおう",
    LV: "",
    strength: "",
    speed: "",
    maxHP: 130,
    maxMP: "",
    SPELL_COST: "",

    // 表示、計算用
    attack: 140, // 攻撃力
    defence: 200, // 守備力
    HP: "",
    MP: "",
    damage: "",
}

// やくそうの回復量
const yakusou = 10;


// 初期化
function init() {
    // プレイヤーステータスの初期化
    player.attack = player.strength + player.weapon_power; // 攻撃力 = ちから + 武器攻撃力
    player.defence = (player.speed / 2) + 28 + 20; // 守備力 = すばやさ/2 + 防具守備力 + 盾守備力
    player.HP = player.maxHP;
    player.MP = player.maxMP;

    // 敵のステータスの初期化（りゅうおう第2）
    monster.attack = monster.attack;
    monster.defence = monster.defence;
    monster.HP = monster.maxHP;
    monster.MP = monster.maxMP;
}

// 初期画面の描画
function initDisplay() {
    // キャラクターパラメータを描画
    document.getElementById("name-1").textContent = player.name;
    document.getElementById("HP-1").textContent = player.HP;
    document.getElementById("MP-1").textContent = player.MP;
    document.getElementById("LV-1").textContent = player.LV;

    // 起動時 コマンド画面とメッセージ画面は非表示
    document.getElementById("command-box").style.visibility = "hidden";
    document.getElementById("message-box").style.visibility = "hidden";
}

// モンスター出現の描画
function startGame() {
    // モンスター出現
    setTimeout(() => {
        let e = document.createElement('img');
        e.src = "images/monster-2.png";
        let x = document.getElementById('monster-box');
        x.appendChild(e);
    }, 2000);

    // 出現メッセージ
    setTimeout(() => {
        DisplayMessage();
        let e = document.getElementById("message-box");
        e.appendChild(document.createTextNode(monster.name + ' があらわれた!'));
    }, 3000);

    // コマンド描画
    setTimeout(() => {
        DisplayCommand();
    }, 4000);
}

// メッセージ画面要素の表示（<div id="message-box">）を表示する関数
function DisplayMessage() {
    let e = document.getElementById("message-box");
    e.style.visibility = "visible";

    // 以前のメッセージをすべて消去する
    let removeObj = document.getElementById('message-box');
    while (removeObj.firstChild) {
        removeObj.removeChild(removeObj.firstChild);
    }
}

// コマンド画面要素の表示（<div id="command-box">）
function DisplayCommand() {
    // メッセージ画面を非表示にする
    let e = document.getElementById("message-box");
    e.style.visibility = "hidden";

    let element = document.getElementById("command-box");
    element.style.visibility = "visible";
}

// メッセージ画面要素を非表示にする
function HiddenMessage() {
    let e = document.getElementById("message-box");
    e.style.visibility = "hidden";
}



//ーーーーーーーメインプログラムーーーーーーー//

// 初期化
init();

// 初期画面の描画
initDisplay();

// ゲームスタート
startGame();

// 押されたコマンドのid名で分岐処理
function command() {
    // コマンド画面を非表示にする
    let e = document.getElementById("command-box");
    e.style.visibility = "hidden";

    // メッセージ画面要素を表示
    DisplayMessage();

    // 押されたコマンド別に分岐処理
    switch (window.event.target.id) {
        // 攻撃
        case 'Attack':
            // ダメージの計算
            player.damage = Math.round(((player.attack - monster.defence / 2) / 2) * ((Math.floor(Math.random() * 6) + 5)) * 0.1);
            monster.HP -= player.damage;

            // モンスターを倒した時の処理
            if (monster.HP <= 0) {
                // 攻撃メッセージ
                let e = document.getElementById('message-box');
                e.appendChild(document.createTextNode(player.name + ' のこうげき!'));
                e.appendChild(document.createElement('br'));
                setTimeout(() => {
                    e.appendChild(document.createTextNode(monster.name + ' に' + player.damage + 'ダメージあたえた!'));
                }, 1000);

                // 討伐メッセージ
                setTimeout(() => {
                    DisplayMessage();
                    let e = document.getElementById("message-box");
                    e.appendChild(document.createTextNode(monster.name + ' をたおした!'));
                    document.getElementById("monster-box").style.visibility = "hidden";
                }, 3000);

                /// 世界の平和
                setTimeout(() => {
                    DisplayMessage();
                    let e = document.getElementById("message-box");
                    e.appendChild(document.createTextNode('世界に 平和が もどったのだ!'));
                }, 4500);

                // 処理を終了させる
                return;
            }
            else {
                // 攻撃メッセージ
                let e = document.getElementById('message-box');
                e.appendChild(document.createTextNode(player.name + ' のこうげき!'));
                e.appendChild(document.createElement('br'));
                setTimeout(() => {
                    e.appendChild(document.createTextNode(monster.name + ' に' + player.damage + 'ダメージあたえた!'));
                }, 1000);

                setTimeout(() => {
                    HiddenMessage();
                }, 2000);
            }
            break;

        // 呪文
        case 'Magic':
            if (player.MP < player.SPELL_COST) {
                let e = document.getElementById('message-box');
                e.appendChild(document.createTextNode('MPがたりない!'));
            }
            else {
                // HPの計算
                // ベホイミ回復量 = 85 + (0~15)
                player.heal = 85 + Math.floor((Math.random() % 16));

                // HPの最大値を超えた場合は回復量を補正
                if (player.heal + player.HP > player.maxHP) {
                    player.heal = player.maxHP - player.HP;
                }
                player.HP += player.heal;
                player.MP -= 10;

                // 呪文メッセージ
                let e = document.getElementById('message-box');
                e.appendChild(document.createTextNode(player.name + ' は ベホイミのじゅもんをとなえた!'));
                e.appendChild(document.createElement('br'));
                setTimeout(() => {
                    e.appendChild(document.createTextNode(`${player.name}は ${player.heal}ポイントかいふくした!`));
                }, 1000);

                document.getElementById("HP-1").textContent = player.HP;
                document.getElementById("MP-1").textContent = player.MP;
            }
            break;

        // どうぐ
        case 'Tool':
            // メッセージ
            let e = document.getElementById('message-box');
            e.appendChild(document.createTextNode('やくそうをつかった!'));
            e.appendChild(document.createElement('br'));
            setTimeout(() => {
                e.appendChild(document.createTextNode(player.name + ' の体力が' + '10' + 'ポイント回復した!'));
            }, 1000);

            // HPの更新
            player.HP += yakusou;
            document.getElementById('HP-1').textContent = player.HP;

            break;

        // にげる
        case 'Run':
            // メッセージ
            let x = document.getElementById('message-box');
            x.appendChild(document.createTextNode(player.name + ' は逃げ出した!'));
            x.appendChild(document.createElement('br'));
            setTimeout(() => {
                x.appendChild(document.createTextNode('にげられない!!'));
            }, 1000);

            break;
    }

    // 敵のターン（1/2の確率でこうげきか炎）
    // こうげきの場合
    if (Math.floor(Math.random() * 2) === 0) {
        // ダメージの計算
        monster.damage = Math.round(((monster.attack - player.defence / 2) / 2) * ((Math.floor(Math.random() * 6) + 5)) * 0.1);
        player.HP -= monster.damage;

        setTimeout(() => {
            HiddenMessage();
        }, 2000);

        setTimeout(() => {
            DisplayMessage();
            let e = document.getElementById('message-box');
            e.appendChild(document.createTextNode(monster.name + ' のこうげき!'));
            e.appendChild(document.createElement('br'));
            setTimeout(() => {
                e.appendChild(document.createTextNode(player.name + ' は' + monster.damage + 'ダメージうけた!'));
            }, 1000);
        }, 3000);
    }

    // ほのおの場合
    else {
        // ダメージの計算
        // 炎のダメージ = 65 + (0~7) * 2/3(ロトの鎧)
        monster.damage = Math.round((65 + (Math.random() % 8)) * 2 / 3)
        player.HP -= monster.damage;

        setTimeout(() => {
            HiddenMessage();
        }, 2000);

        setTimeout(() => {
            DisplayMessage();
            let e = document.getElementById('message-box');
            e.appendChild(document.createTextNode(monster.name + ' はほのおをはいた!'));
            e.appendChild(document.createElement('br'));
            setTimeout(() => {
                e.appendChild(document.createTextNode(player.name + ' は' + monster.damage + 'ダメージをうけた!'));
            }, 1000);
        }, 3000);
    }

    // 死んだ時の処理
    if (player.HP <= 0) {
        setTimeout(() => {
            document.getElementById('HP-1').textContent = "0";
            HiddenMessage();
        }, 5000);

        setTimeout(() => {
            DisplayMessage();
            let e = document.getElementById("message-box");
            e.appendChild(document.createTextNode('あなたは、しにました。'));

        }, 7000);
    }
    else {
        setTimeout(() => {
            document.getElementById('HP-1').textContent = player.HP;
            DisplayCommand();
        }, 5000);
    }
}