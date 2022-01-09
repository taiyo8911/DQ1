'use strict';

// モンスター
const monsterName = 'スライム';
let monsterHP = 20;

// 大山
const myName = '大山';
let myHP = 30;
let myAP = 5;



// メッセージの消去
function removeMessage() {
    let removeObj = document.getElementById('message');
    while (removeObj.firstChild) {
        removeObj.removeChild(removeObj.firstChild);
    }
}


// 読み込み1秒後に出現メッセージを表示
window.addEventListener('DOMContentLoaded', function () {

    setTimeout(() => {

        let element = document.getElementById('message');
        let newElement = document.createElement('p');
        newElement.textContent = monsterName + 'があらわれた!';

        // 指定した要素の中の末尾に挿入
        element.appendChild(newElement);

    }, 1000);

    // 画面の消去
    setTimeout(() => {

        removeMessage();

    }, 2000);



});


// 攻撃メッセージの表示
function AttackMessage() {
    // 攻撃メッセージの表示
    let element = document.getElementById('message');

    let message1 = document.createElement('p');
    message1.textContent = myName + 'のこうげき!';
    element.appendChild(message1);

    let message2 = document.createElement('p');
    message2.textContent = monsterName + 'に' + myAP + 'ダメージあたえた!';
    element.appendChild(message2);
}


// 討伐メッセージの表示
function EndMessage() {
    let element = document.getElementById('message');
    let message = document.createElement('p');
    message.textContent = monsterName + 'をたおした!';
    element.appendChild(message);
}


// 世界が平和になるメッセージ
function WorldPeace() {
    let element = document.getElementById('message');
    let message = document.createElement('p');
    message.textContent = '世界に 平和が もどったのだ!';
    element.appendChild(message);

}





// モンスター画像のクリックで攻撃
function Attack() {
    // HPの更新
    monsterHP = monsterHP - myAP;
    console.log(monsterHP);

    // 倒した時の処理
    if (monsterHP <= 0) {

        AttackMessage();

        setTimeout(() => {

            removeMessage();

        }, 1000);

        // 討伐メッセージ
        setTimeout(() => {

            EndMessage();

        }, 1000);

        // 画面の消去
        setTimeout(() => {

            removeMessage();

        }, 2000);

        setTimeout(() => {
            // 討伐メッセージ
            WorldPeace();

        }, 3000);

    }

    else {

        // 攻撃メッセージの表示
        AttackMessage();

        // 画面の消去
        setTimeout(() => {

            removeMessage();

        }, 1000);

    }


};
