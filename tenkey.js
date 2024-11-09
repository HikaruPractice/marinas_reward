let target;
let tr_element_buttons;
let td_element_buttons;
let button;
let Symbols = [
    ['1', '2', '3'],
    ['4', '5', '6',],
    ['7', '8', '9'],
    ['', '0', 'C'],
]
let SymbolNames = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['Empty', '0', 'C'],
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
            td_element_buttons.id = name+'_td_' + SymbolNames[i][j];
            button = document.createElement('button');
            button.onclick = event => pushButton(name,Symbols[i][j]);
            button.id = 'button_' + SymbolNames[i][j];
            button.textContent = Symbols[i][j];
            td_element_buttons.appendChild(button);
            tr_element_buttons.appendChild(td_element_buttons);
        }
        target.appendChild(tr_element_buttons);
    }
}