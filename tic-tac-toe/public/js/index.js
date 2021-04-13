console.log( 'ready' , )

document.getElementById('intro').classList.toggle('hidden');

let gameStarted = false;    
let gameMode = null;
let names = [];
let turn = true;
let countdown = 0;

Array.from($('#step-choose-game-mode')[0].children).filter(child => child.localName == 'a').forEach( link => {
    // console.log(link)
    link.addEventListener('click', function (e){
        console.log(e)
        $('#step-choose-game-mode')[0].classList.toggle('hidden');

        gameMode = e.target.innerText == 'Joueur vs Joueur';
        
        if (gameMode){
            $('#step-type-game-vs')[0].classList.remove('hidden');
        } else {
            $('#step-type-game-ai')[0].classList.remove('hidden');
        }
    })
})

// console.log($('button[type="submit"]'))

Array.from($('button[type="submit"]')).forEach(submit => {
    submit.addEventListener('click', startGame)
})

Array.from($('.symbols')[0].children).forEach( gridCase => {
    gridCase.addEventListener('click', function(e){
        if (gameMode){
            if (turn){
                addSymbol(gridCase, 'cross');
            } else {
                addSymbol(gridCase, 'circle')
            }
        } else {
            addSymbol(gridCase, 'cross');
        }
    })
})

$('#btn-replay')[0].addEventListener('click', restart)
$('#btn-restart')[0].addEventListener('click', restart)

function startGame(e){
    if (gameMode){
        names[0] = $('.input-player-1')[0].children[0].value;
        names[1] = $('.input-player-2')[0].children[0].value;   
    } else {
        names[0] = $('.input-player-1')[1].children[0].value;
    }

    console.log(e, gameMode, names)
    if ((!gameMode && names[0].length > 3) || (gameMode && names[0].length > 3 && names[1].length > 3)){
        $('#step-type-game-ai')[0].classList.add('hidden');
        $('#step-type-game-vs')[0].classList.add('hidden');
        $('#game')[0].classList.toggle('hidden');
        $('#intro')[0].classList.toggle('hidden');

        $('#player-firstname')[0].innerText = names[0];
        window.moveTo($('#game')[0].getBoundingClientRect().x, $('#game')[0].getBoundingClientRect().y)
    } else {
        alert('Champs manquants')
    }

    e.preventDefault();
}



function addSymbol(gridCase, symbol){

    if (gridCase.children[0]){
        alert('Case déjà prise. Veuillez réessayer');
    } else {
        let cross = document.createElement('div')
        cross.classList.add('symbol-' + symbol);
        gridCase.appendChild(cross);

        if (gameMode){
            $('#player-firstname')[0].innerText = !turn ? names[0] : names[1];
        } else {
            $('#title-turn-label')[0].innerHTML = `A ${!turn ? 'ton' : 'mon'} tour${!turn ? `, <b id="player-firstname">${names[0]}</b>` : ''}`;

            if (turn){
                setTimeout(() => {
                    IAturn()
                }, 1000);
            }
        }

        checkGame(gridCase);

        
        turn = !turn;
        console.log('turn is to ', turn)
    }

    if (!gameStarted) {
        gameStarted = !gameStarted;
        startCountDown();
    }    
}

function checkGame(gridCase){
    console.log('check if game is won by ', turn)
    let idCase = parseInt(gridCase.getAttribute('data-id'));
    let a = [0,3,6].includes(idCase) ? 2 : -1;
    let b = [2,5,8].includes(idCase) ? -2 : 1;
    let c = [0,1,2].includes(idCase) ? 6 : -3;
    let d = [6,7,8].includes(idCase) ? -6 : 3;
    let targetCasesID = [idCase + a, idCase + b, idCase + c, idCase + d]
    
    let targetCases = Array.from($('.symbols')[0].children).filter( kase => targetCasesID.includes(parseInt(kase.getAttribute('data-id'))))

    if ((checkOwner(targetCases[0]) == turn && checkOwner(targetCases[1]) == turn) || 
        (checkOwner(targetCases[2]) == turn && checkOwner(targetCases[3]) == turn)){
        // alert('Bravo !vous avez gagné, ', turn ? names[0] : names[1]);

        if (gameMode){
            $('#text-end-game')[0].innerText = 'Bravo !vous avez gagné, ' + (turn ? names[0] : names[1]);
        } else {
            $('#text-end-game')[0].innerText = turn ? 'Bravo !vous avez gagné, ' + names[0] : 'Pas de chance, j’ai encore gagné';
        }
        $('#end-game')[0].classList.toggle('hidden');

        // restart();
    }

}

function checkOwner(caseToCheck){
    if(caseToCheck.children[0]){
        return Array.from(caseToCheck.children[0].classList).includes('symbol-cross') ;
    }
}

function startCountDown(){
    setInterval(() => {
        countdown ++;

        let min = Math.floor(countdown/60) < 10 ? '0' + Math.floor(countdown/60) : Math.floor(countdown/60);
        let sec = countdown - (min * 60) ;
        sec = sec < 10 ? '0' + sec : sec;

        let value = min + ' : ' + sec;
        $('#time-elapsed')[0].children[0].innerText = value;
    }, 1000);


}

function restart(){
    gameStarted = false;    
    gameMode = null;
    names = [];
    turn = true;
    countdown = 0;

    Array.from($('.symbols')[0].children).forEach( gridCase => {
        if (gridCase.children[0]){
            gridCase.removeChild(gridCase.children[0]);
            console.log(gridCase)
        }
    })

    $('#title-turn-label')[0].innerHTML = `A ton tour, <b id="player-firstname">Michel</b>`;
    $('#game')[0].classList.toggle('hidden');
    $('#intro')[0].classList.toggle('hidden');
    $('#end-game')[0].classList.add('hidden');
    $('#step-choose-game-mode')[0].classList.toggle('hidden');
    window.moveTo($('#intro')[0].getBoundingClientRect().x, $('#intro')[0].getBoundingClientRect().y);

    return false;
}

function IAturn(){
    let cases = Array.from($('.symbols')[0].children).filter(kase => Array.from(kase.children).length == 0);

    if (cases.length > 0){
        let targetCase = cases[Math.floor(Math.random() * cases.length)];
    
        console.log(cases, targetCase, Math.floor(Math.random() * cases.length))
        addSymbol(targetCase, 'circle')
    } else {
        $('#text-end-game')[0].innerText = 'Pas de chance, c’est encore égalité';
        $('#end-game')[0].classList.toggle('hidden');
    }
}