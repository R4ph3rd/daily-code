export default Vue.component('gameForm', {
    template: `
    <div :key="'gameform-' + key">
        <!-- STEP CHOOSE GAME MODE -->
        <div v-if="!gameModeIsChoosen" id="step-choose-game-mode" class="">
            <h3>Choisissez votre mode de jeu</h3>
            <a class="btn" data-mode="vs" @click="selectGameMode(true)">
                <span class="btn-inner">Joueur vs Joueur</span>
            </a>
            <div class="clear"></div>
            <a class="btn" data-mode="ai" @click="selectGameMode(false)">
                <span class="btn-inner">Joueur vs IA</span>
            </a>
        </div>
        <!-- / STEP CHOOSE GAME MODE -->

        <div v-else>
            <h3>{{titlePlayers}}</h3>
            
            <div class="input input-player-1">
                <input type="text" name="player-1" placeholder="Joueur 1" />
            </div>

            <div class="input input-player-2" v-if="gameModeIsVS">
                <input type="text" name="player-2" placeholder="Joueur 2" />
            </div>
            
            <button name="submit" class="btn" @click="setPlayers">
                    <span class="btn-inner">Jouer</span>
            </button>
        </div>
        <!-- / STEP FORM PLAYER VS AI -->
    </div>
    `,
    data(){
        return {
            key : 0,
        }
    },
    computed: {
        gameModeIsVS(){
            return this.getGameMode
        },
        gameModeIsChoosen(){
            return this.getGameMode != (null || undefined);
        },
        titlePlayers(){
            if (this.gameMode){
                return 'Prénoms des joueurs'
            } else {
                return 'Votre prénom'
            }
        },
        getGameMode(){
            return this.$parent.gameMode;
        }
    },
    methods: {
        selectGameMode(mode){
            this.$emit('setGameMode', mode) ;
            // this.key ++;
        },
        setPlayers(e){
            const player1 = this.$el.children[0].children[1].children[0].value
            const player2 = this.$el.children[0].children[2].children[0].value

            if (player1.length > 3 || (player2 && player2.length > 3)){
                this.$parent.setPlayers(player1, player2);
            } else {
                alert('Champs manquants');
            }

            this.$emit('gameStarts')

            e.preventDefault();
            return false;
        }
    },
})