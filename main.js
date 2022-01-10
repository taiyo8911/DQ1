'use strict';

// モンスター
const monsterName = 'スライム';
let monsterHP = 10;
const monsterAP = 8;

// キャラクター
const myName = 'ゆうしゃ';
let myHP = 30;
const myMP = 30;
const myLV = 10;
const myAP = 5; // 攻撃力
const myGira = 8; // ギラの攻撃力


// キャラクターのつよさを表示
document.getElementById("myName").textContent = myName;
document.getElementById("myHP").textContent = myHP;
document.getElementById("myMP").textContent = myMP;
document.getElementById("myLV").textContent = myLV;


// 起動時コマンド画面とメッセージ画面は非表示
document.getElementById("command-box").style.visibility = "hidden";
document.getElementById("message-box").style.visibility = "hidden";


// コマンド画面を表示する
function DisplayCommand() {
    // メッセージ画面を非表示
    HiddenMessage();

    // visibleで表示
    const element = document.getElementById("command-box");
    element.style.visibility = "visible";
}

// コマンド画面を非表示にする
function HiddenCommand() {
    const element = document.getElementById("command-box");
    // hiddenで非表示
    element.style.visibility = "hidden";
}


// メッセージ画面を表示する
function DisplayMessage() {
    // コマンド画面を非表示
    HiddenCommand();

    // メッセージをすべて消去
    RemoveMessage();

    // visibleで表示
    const element = document.getElementById("message-box");
    element.style.visibility = "visible";
}

// メッセージ画面を非表示にする
function HiddenMessage() {
    const element = document.getElementById("message-box");
    // hiddenで非表示
    element.style.visibility = "hidden";
}


// メッセージの消去
function RemoveMessage() {
    let removeObj = document.getElementById('message-box');
    while (removeObj.firstChild) {
        removeObj.removeChild(removeObj.firstChild);
    }
}


// モンスターの出現
function AppearMonster(monsterName) {
    DisplayMessage();
    const e = document.getElementById('message-box');
    e.appendChild(document.createTextNode(monsterName + 'があらわれた!'));
}


// 攻撃メッセージ
function AttackMessage() {
    // メッセージ画面を表示
    DisplayMessage();

    // 攻撃メッセージの表示
    let e = document.getElementById('message-box');

    // 1行目と改行
    e.appendChild(document.createTextNode(myName + 'のこうげき!'));
    e.appendChild(document.createElement('br'));

    // 1秒後に2行目を表示
    setTimeout(() => {
        e.appendChild(document.createTextNode(monsterName + 'に' + myAP + 'ダメージあたえた!'));
    }, 1000);

}

// じゅもんメッセージ
function MagicMessage() {
    // メッセージ画面を表示
    DisplayMessage();

    // 攻撃メッセージの表示
    let e = document.getElementById('message-box');

    // 1行目と改行
    e.appendChild(document.createTextNode(myName + 'は' + 'ギラ' + 'をとなえた!'));
    e.appendChild(document.createElement('br'));

    // 1秒後に2行目を表示
    setTimeout(() => {
        e.appendChild(document.createTextNode(monsterName + 'に' + myGira + 'ダメージあたえた!'));
    }, 1000);

}


// 討伐メッセージ
function EndMessage() {

    let e = document.getElementById('message-box');

    setTimeout(() => {

        RemoveMessage();

        e.appendChild(document.createTextNode(monsterName + 'をたおした!'));

    }, 2500);


}


// 世界の平和
function WorldPeace() {
    // メッセージ画面を表示
    DisplayMessage();

    let e = document.getElementById('message-box');
    e.appendChild(document.createTextNode('世界に 平和が もどったのだ!'));

}


// 敵の攻撃
function monsterAttack() {

    // HPの更新
    myHP = myHP - monsterAP;

    // メッセージ画面を表示
    DisplayMessage();

    // 攻撃メッセージの表示
    let e = document.getElementById('message-box');

    // 1行目と改行
    e.appendChild(document.createTextNode(monsterName + 'のこうげき!'));
    e.appendChild(document.createElement('br'));

    // 1秒後に2行目を表示
    setTimeout(() => {
        e.appendChild(document.createTextNode(myName + 'に' + monsterAP + 'ダメージあたえた!'));
    }, 1000);
}


// 読み込みの1秒後に出現メッセージを表示
window.addEventListener('DOMContentLoaded', function () {

    setTimeout(() => {


        AppearMonster(monsterName);


    }, 1000);

    // 画面の消去
    setTimeout(() => {

        DisplayCommand();

    }, 2000);

});






// こうげき
function Attack() {
    // HPの更新
    monsterHP = monsterHP - myAP;
    console.log(monsterHP);

    // 倒した時の処理
    if (monsterHP <= 0) {

        // 攻撃メッセージ
        AttackMessage();

        // 討伐メッセージ
        EndMessage();

        // 世界の平和
        setTimeout(() => {
            WorldPeace();

        }, 5000);

    }

    else {

        // 攻撃メッセージ
        AttackMessage();

        // 敵のターン
        setTimeout(() => {

            monsterAttack();

        }, 3000);

        // コマンド画面を表示
        setTimeout(() => {

            DisplayCommand();

        }, 5000);

    }

};


// じゅもん
function Magic() {

    // HPの更新
    monsterHP = monsterHP - myGira;
    console.log(monsterHP);

    // 倒した時の処理
    if (monsterHP <= 0) {

        // 攻撃メッセージ
        MagicMessage();

        // 討伐メッセージ
        EndMessage();

        // 世界の平和
        setTimeout(() => {
            WorldPeace();

        }, 5000);

    }

    else {

        // じゅもんメッセージ
        MagicMessage();


        // コマンド画面を表示
        setTimeout(() => {

            DisplayCommand();

        }, 2000);

    }
}

// どうぐ
function Tool() {

    myHP = myHP + 10;
    console.log(myHP);

    DisplayMessage();

    // 1行目の表示と改行
    let e = document.getElementById('message-box');
    e.appendChild(document.createTextNode('やくそうをつかった!'));
    e.appendChild(document.createElement('br'));

    // 2行目の表示
    setTimeout(() => {

        e.appendChild(document.createTextNode(myName + 'の体力は' + '10' + 'ポイント回復した!'));

    }, 1000);


    // 画面の消去
    setTimeout(() => {

        DisplayCommand();

    }, 2500);


}


// にげる
function Run() {

    DisplayMessage();

    // 1行目の表示と改行
    let e = document.getElementById('message-box');
    e.appendChild(document.createTextNode(myName + 'は逃げ出した!'));
    e.appendChild(document.createElement('br'));

    // 2行目の表示
    setTimeout(() => {

        e.appendChild(document.createTextNode('にげられない!'));

    }, 1000);


    // 画面の消去
    setTimeout(() => {

        DisplayCommand();

    }, 2500);
}