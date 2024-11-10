let _click = (window.ontouchstart === undefined)? 'onclick' : 'ontouchend';
let target;
let tr_element_buttons;
let td_element_buttons;
let button;
let Symbols = [
    ['1', '2', '3'],
    ['4', '5', '6',],
    ['7', '8', '9'],
    ['C', '0', '⏎'],
]
let SymbolNames = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', 'return'],
]

window.addEventListener('DOMContentLoaded', function() {
    //交換した数を入力するためのテンキー
    createTenkey('change');
    createTenkey('got');
})
function createTenkey(name){
    target=document.getElementsByClassName('tenkey_'+name)[0].getElementsByTagName('tbody')[0]
    for (let i = 0; i < Symbols.length; i++) {
        tr_element_buttons = document.createElement('tr');
        for (let j = 0; j < Symbols[0].length; j++) {
            td_element_buttons = document.createElement('td');
            td_element_buttons.id = name + '_td_' + SymbolNames[i][j];
            td_element_buttons.className ='td_' + SymbolNames[i][j];
            td_element_buttons.setAttribute(_click,
                `pushButton('${name}','${SymbolNames[i][j]}')`
            );
            td_element_buttons.textContent = Symbols[i][j];
            tr_element_buttons.appendChild(td_element_buttons);
        }
        target.appendChild(tr_element_buttons);
    }
}