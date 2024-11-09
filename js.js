window.onload=()=>{

};
const MAX_COUNT=180
const MAX_COUNT2=10
let count=-1;
let count2=-1;
let recommend;

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

function calc(){
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
        case '':
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