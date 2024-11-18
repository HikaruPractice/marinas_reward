const _click = (window.ontouchstart === undefined)? 'click' : 'touchend';
const MAX_COUNT=180
const MAX_COUNT2=10
let count=-1;
let count2=-1;
let recommend;

window.addEventListener('DOMContentLoaded', function() {
    //タップできるデバイスの時はonclickをonfocusendに書き換えます。
    if (window.ontouchstart !== undefined){
        let buttons=document.querySelectorAll('[onclick]');
        let length=buttons.length;
        for (let i=0;i<length;i++){
            if (buttons[i].onclick !== undefined){
                buttons[i].ontouchend =buttons[i].onclick;
                buttons[i].onclick=null;
            }
        }
    }

    //操作パネルのどこかがクリックされると実行
    //クリックされた場所によって場合分けして処理
    document.addEventListener(_click, (e) => {
        if (e.target.closest('.with-tenkey')){
            //テンキーが必要な入力欄をクリックした場合
            //テンキーの表示/非表示切替、他方のテンキーは隠す
            ////テンキーリスト取得
            tenkeys = document.getElementsByClassName('tenkey');
            len=tenkeys.length;
            ////テンキー操作対象のnameを取得
            input_name = e.target.closest('.with-tenkey').getElementsByTagName('input')[0].name;
            ////テンキー表示切替実行
            for (let i=0;i<len;i++){
                if (tenkeys[i].classList.contains(`tenkey_${input_name}`)){
                //操作対象なら切替
                    tenkeys[i].classList.toggle('tenkey-hidden');
                }else{
                //操作対象以外は隠す
                    tenkeys[i].classList.add('tenkey-hidden');
                }
            }
            ////テンキー状態を出力
            console.log(document.getElementsByClassName(`tenkey_${input_name}`)[0].classList.contains('tenkey-hidden') ? 
            'テンキーを隠しました。' :
            'テンキーを表示しました。');
        }else if(e.target.closest('.tenkey')){
            //テンキー内部をクリックした場合
            //何もしない
            console.log('テンキー内はクリックイベントによる状態変更はありません。');
        }else{
            //関係ないところをクリックした場合
            //テンキーを隠す
            tenkeys = document.getElementsByClassName('tenkey');
            len=tenkeys.length;
            for (let i=0;i<len;i++){
                tenkeys[i].classList.add('tenkey-hidden');
            }
            console.log('すべてのテンキーを隠しました。')
        }
    })


})

function update(){
    let elem_count=document.getElementsByName('count')[0];
    let elem_count2=document.getElementsByName('count2')[0];
    let elem_recommend=document.getElementsByName('recommend')[0];
    if (count<0){
        elem_count.value='エラー'
    }else{
        elem_count.value=count
    }
    if (count2<0){
        elem_count2.value='エラー'
    }else{
        elem_count2.value=count2
    }
    if(count<0 || count2<0){
        elem_recommend.value='エラー'
    }else{
        let border = vlookup(count);    
        if(count2<=border){
            recommend='次の箱に進む'
        }else{
            recommend='残り' + border + '個まで引く'
        }
        elem_recommend.value=recommend;
    }

}

function tab_swich(){
    document.getElementsByClassName('allchange')[0].classList.toggle('tab-off');
    document.getElementsByClassName('result')[0].classList.toggle('tab-off');
}

function calc(){
    tab_swich();
    let temp=document.getElementsByName('change')[0].value;
    temp=Number(temp);
    if (Number.isInteger(temp)){
        count=MAX_COUNT-temp;
    }else{
        count=-1;
    }
    temp=document.getElementsByName('got')[0].value;
    temp=Number(temp);
    if (Number.isInteger(temp)){
        count2=MAX_COUNT2-temp;
    }else{
        count2=-1;
    }
    update();
}
function draw(n){
    if (count>=0){
        count=count - Math.min(n,count)
    }
    update()
}
function get(n){
    if (count2>=0){
        count2=count2 - Math.min(n,count2)
    }
    update()
}

function reset(){
    tab_swich();
    let input = document.getElementsByTagName('input')
    let cnt = input.length;
    for (i=0;i<cnt;i++){
        if (input[i].type='text')
            input[i].value=""
    }
    count=-1
    count2=-1
}
function pushButton(name,Symbol){
    //引数のnameと一致するname属性を持つinputを編集
    let target=document.getElementsByName(name)[0]
    switch (Symbol){
        case 'C':
            target.value='';
            break;
        case 'return':
            switch(name){
                case 'change':
                    document.getElementsByClassName('tenkey_change')[0].classList.add('tenkey-hidden');
                    document.getElementsByClassName('tenkey_got')[0].classList.remove('tenkey-hidden');
                    document.getElementsByName('got')[0].focus();
                    break;
                case 'got':
                    document.getElementsByClassName('tenkey_change')[0].classList.add('tenkey-hidden');
                    document.getElementsByClassName('tenkey_got')[0].classList.add('tenkey-hidden');
                    document.getElementsByName('got')[0].blur();
                    calc();
            }
            break;
        default:
            target.value=target.value+Symbol;
    }
    //桁あふれ調整
    switch (name){
        case 'change':
            target.value=target.value.slice(-3);
            break;
        case 'got':
            target.value=target.value.slice(-1);
    }
}