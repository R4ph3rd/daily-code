// const gameForm = import('./components/gameForm.js');
import gameForm from './components/gameForm.js'
import symbol from './components/Symbol.js'

const app = new Vue({
    el: '#app',
    template: `<section v-if="!gameStarted" id="intro">
        <div class="inner">
            <v-game-form @gameStarts="toggleStart" @setGameMode="setGameMode"></v-game-form>        
        </div>
    </section>

    <section v-else-if="!gameIsDone" id="game">
			<div class="inner">

				<!-- TURN LABEL -->
				<h2 id="title-turn-label" class="" v-html="playerName"></h2>
				<!-- / TURN LABEL -->

				<!-- BOARD GAME -->
				<div id="board-game">

					<div class="board">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329 329" width="329px" height="329px">
							<path d="M0,219H329v1H0v-1Z" fill="white" fill-opacity="0.5" fill-rule="evenodd"/>
							<path d="M0,109H329v1H0v-1Z" fill="white" fill-opacity="0.5" fill-rule="evenodd"/>
							<path d="M219,0h1V329h-1V0Z" fill="white" fill-opacity="0.5" fill-rule="evenodd"/>
							<path d="M109,0h1V329h-1V0Z" fill="white" fill-opacity="0.5" fill-rule="evenodd"/>
						</svg>
					</div>

					<!-- SYMBOLS -->
					<ul class="symbols">
						<v-symbol v-for="i in 9" :key="'symbol-' + i" :symbolID="i - 1" @storeSymbol="storeSymbol" ></v-symbol>
					</ul>
					<!-- / SYMBOLS -->

				</div>
				<!-- / BOARD GAME -->

				<!-- TIME ELAPSED -->
				<div id="time-elapsed">
					<span class="time">{{timeSpent}}</span>
					<small>Temps écoulé</small>
				</div>
				<!-- / TIME ELAPSED -->

				<a class="btn" id="btn-replay">
					<span class="btn-inner" @click="quit()">Quitter la partie</span>
				</a>
				
			</div>
		</section>

        <aside v-else id="end-game">

			<!-- OVERLAY -->
			<div class="overlay"></div>
			<!-- / OVERLAY -->

			<div class="inner">

			<div class="modal-wrapper">
				<h2>Partie terminée !</h2>

				<p id="text-end-game">{{textEndGame}}</p>

				<a class="btn white" id="btn-restart" @click="quit">
					<span class="btn-inner">Recommencer une partie</span>
				</a>

			</div>

			</div>
		</aside>
    `,
    data(){
        return {
            gameStarted: false,
            playerTurn: false,
            countdown: 0,
            timer : null,
            gameMode: null,
            symbols : [],
            players: [],
            gameIsDone: false,
            equal: false
        }
    },
    components: {
        'v-game-form' : gameForm,
        'v-symbol' : symbol
    },
    computed:{
        getPlayerTurn(){
            return this.playerTurn;
        },
        timeSpent(){
            let m = Math.floor(this.countdown / 60);
            let s = this.countdown - (m * 60);

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            return m + ':' + s;
        },
        playerName(){  
            if (this.gameMode){
                return `A ton tour, <b id="player-firstname">${this.playerTurn ? this.players[1] : this.players[0]}}</b>`
            } else {
                if (!this.playerTurn){   
                    return `A ton tour, <b id="player-firstname">${this.players[0]}}</b>`
                } else {
                    return 'A mon tour !'
                }
            }
        },
        textEndGame(){
            if (!this.equal){
                if (this.gameMode){
                    return 'Bravo, vous avez gagné, ' + this.playerName + ' !';
                } else {
                    if (this.playerTurn){
                        return 'Bravo, vous avez gagné, ' + this.players[0] + ' !';
                    } else {
                        return "Pas de chance, j'ai encore gagné"
                    }
                }
            } else {
                return 'Egalité !'
            }
        }
    },
    methods: {
        setGameMode(mode){
            this.gameMode = mode;
            console.log(this.gameMode)
        },
        toggleStart(){
            this.gameStarted = !this.gameStarted;
        },
        toggleTurn(){
            this.playerTurn = !this.playerTurn;

            if (this.countdown == 0){
                this.timer = setInterval(() => {
                    this.countdown ++;
                }, 1000)
            }

            if (!this.gameMode && this.playerTurn){
                setTimeout(() => {
                    this.AI();
                }, 1000)
            }
        },
        quit(){
            this.players = [];
            this.countdown = 0;
            clearInterval(this.timer)
            this.timer = null;
            this.playerTurn= false;
            this.symbols = [];
            this.gameIsDone = false;
            this.gameStarted = false
            this.gameMode = null
            this.equal = false
        },
        setPlayers(player1, player2){
            this.players = [];
            this.players[0] = player1;
    
            if (player2) this.players[1] = player2 ;
    
            console.log('set player(s):', this.players)
        },
        storeSymbol(id){
            this.symbols[id] = this.playerTurn;

            for (let i = 0 ; i < 3 ; i ++){
                if([this.symbols[i], this.symbols[i + 3], this.symbols[i + 6]].every(x => x == this.symbols[i] && x != undefined)){
                    this.endGame();
                    console.log('Line is completed', this.symbols[i], this.playerTurn)
                    return;
                }
            }
            
            for (let i = 0 ; i < 7 ; i += 3){
                if([this.symbols[i], this.symbols[i + 1], this.symbols[i + 2]].every(x => x == this.symbols[i] && x != undefined)){
                    this.endGame();
                    console.log('Line is completed', this.symbols[i], this.playerTurn)
                    return;
                }
            }

            if([this.symbols[0], this.symbols[4], this.symbols[8]].every(x => x == this.symbols[0] && x != undefined)){
                this.endGame();
                console.log('Line is completed', this.playerTurn)
                return;
            }
            
            if([this.symbols[2], this.symbols[4], this.symbols[6]].every(x => x == this.symbols[2] && x != undefined)){
                this.endGame();
                console.log('Line is completed', this.playerTurn)
                return;
            }

            if (Array.from(this.symbols).every(x => x != undefined)){
                this.equal = true;
                this.endGame();
            }
        },
        AI(){
            let i = Math.floor(Math.random() * 9);
            console.log(this, i, this.symbols[i])
            
            while (this.symbols[i] != undefined){
                i = Math.floor(Math.random() * 9);
                console.log(i, this.symbols[i])
            }

            this.$children[i].setSymbol();


            // this.storeSymbol(i);
            // this.toggleTurn()
        },
        endGame(){
            this.gameIsDone = true;
        }
    }
})