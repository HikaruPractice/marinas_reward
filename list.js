const list=[
    [167,8],
    [148,7],
    [130,6],
    [111,5],
    [92,4],
    [73,3],
    [53,2],
    [31,1],
    [0,0]
]

function vlookup(imp){
    let max=list.length
    for (let i = 0;i<max;i++){
        if (imp >= list[i][0])
            return list[i][1]
    }
}