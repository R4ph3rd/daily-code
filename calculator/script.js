let buttons = document.querySelectorAll('ul > li');
let calculs = document.getElementById('calculs');
let value = document.getElementById('value')

let currentValue = 0;
let calcul = []
let lastSign = '+'
let floatValue = false;


Array.from(buttons).forEach(btn => {
    btn.addEventListener('click', function(e){
        switch (btn.innerText){
            case '=': 
                calculate();
                break;
            case 'AC': 
                unknow();
                break;
            case '+/-': 
                unknow();
                break;
            case '%': 
                unknow();
                break;
            case '/': 
                changeSign(btn.innerText);
                break;
            case '+': 
                changeSign(btn.innerText);
                break;
            case '-': 
                changeSign(btn.innerText);
                break;
            case 'x': 
                changeSign('*');
                break;
            case '.': 
                floatValue = !floatValue;
                addFloatValue('.')
                break;
            default: 
                if(floatValue){
                    addFloatValue(btn.innerText)
                } else {
                    addValue(btn.innerText)
                }
                break;
        }

    })
})

function changeSign(val){
    if (floatValue) floatValue = !floatValue;
    
    if (parseInt(calcul[calcul.length - 1])){
        calcul.push(val);
        lastSign = val;
        update();
    } else {
        console.log('You can"t add another sign')
    }
}

function addFloatValue(val){
    calcul[calcul.length - 1] = typeof calcul[calcul.length - 1] != 'string' ? 
                                calcul[calcul.length - 1].toString() + '.' :
                                calcul[calcul.length - 1] + val;

    currentValue = calcul[calcul.length - 1];
    update();
}

function addValue(val){
    if (parseInt(calcul[calcul.length - 1])){
        calcul.push(lastSign);
    }

    calcul.push(val);
    currentValue = val;
    update();
}

function unknow(){
    alert("Sorry, it is just a fake feature.")
}

function update(){
    console.log('current', currentValue, calcul)
    value.innerText = currentValue;

    calculs.innerText = calcul.reduce((acc, cur) => acc += cur + ' ' , '');
}

function calculate(){
    let result = eval(calcul.join(''))
    console.log(calcul, calcul.join(''))
    calcul = [result]
    calculs.innerText = '= ' + result;

    if (result.toString().length > 8){
        result = result.toString().slice(0, 8) + '...'
        console.log('result', result)
    }
    value.innerText = result;
}