
function dogwalk(){
    return new promise((resolve,reject) => {
        setTimeout(() => {
            resolve("you walked the dog")
        }, 1500);
    })
}
function cleankitchen(){
    return new promise((resolve,reject) => {
        setTimeout(() => {
            resolve("you cleaned the kitchen")
        }, 2500);
    })
}

dogwalk().then(value => {console.log(value); return cleankitchen()})