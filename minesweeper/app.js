import Board from './components/Board.js';
import Timer from './components/Timer.js';
import Score from './components/Score.js';
// const store = import('./store/index.js');

const app = new Vue({
    el: "#app",
    components: {
        'v-board': Board,
        'v-timer': Timer,
        'v-score': Score
    },
    template: `
    <div :key="gameKey">
        <div v-if="!scoreWindow">
            <aside class="score-indicator">
            <v-timer></v-timer>
            <div class="flags" :key="flagKey">
            <img src="img/flag.png">
            {{flagsCount}}
            </div>
        </aside>
        
        <v-board @resetGame="resetGame()" @flagClick="toggleFlag()" @endGame="seeScores()"></v-board>
        </div>
        <v-score v-else></v-score>
  </div>
  `,
    data(){
        return {
            gameKey : 0,
            flagKey: 0,
            flagsCount: state.minedCases.length - state.flags,
            scoreWindow: false,
        }
    },
    methods: {
        resetGame(){
            console.log('reset')
            this.scoreWindow = false;
            mutations.reset();
            this.gameKey ++;
        },
        seeScores(){
            mutations.toggleStart(false);
            setTimeout(() => {
                let username = prompt('Votre username');
                // console.log(state.highestScores)

                if (this.$children[0].time < state.highestScores[2].time){
                    mutations.addScore({
                        username,
                        time: this.$children[0].time
                    })
                }

                

                this.scoreWindow = true;

            }, 200)
            
        },
        toggleFlag(){
            this.flagsCount = state.minedCases.length - state.flags;
        }
    },
    created(){
        // store initalization
        if (localStorage.getItem('state')){
            mutations.setState(JSON.parse(localStorage.getItem('state')));

            console.log('Stored state detected', state);
        } else {
            mutations.setState();
        }

        this.flagsCount = state.minedCases.length - state.flags
        this.flagKey ++;

        window.onbeforeunload = function (e) {
            actions.storeState();
        };

        // window.addEventListener('keypress', function(e){
        //     if (e.code == 'Enter'){
        //         localStorage.removeItem('state');
        //         mutations.setState();

        //         console.log('Localstorage cleared')

        //         document.location.reload();
        //     }
        // })
    }
});

// Vue.use(Vuex);