export default Vue.component('Case', {
    template: `<button @contextmenu="toggleFlag($event)" :class="style" :id="'case-'+idCase" :key="key" :data-mine-count="sideMines" @click="clickOnCase()"></button>`,
    props:{
        idCase: {
            default : 0,
            type: [Number, String],
            required: true
        }
    },
    data(){
        return {
            key: this.idCase || 'coool',
            style: 'box',
            sideMines : 0,
            discovered: false
        }
    },
    methods:{
        clickOnCase(){
            if (!state.gameStarted){
                mutations.toggleStart();
                this.$parent.$parent.$parent.$children[0].startTimer();
            }
            this.discoverCase();
        },
        discoverCase(){
            if (!this.discovered){
                this.discovered = !this.discovered;

                if (state.flaggedCases.includes(this.idCase)){
                    mutations.toggleFlag(false, this.idCase)
                }
                
                mutations.addDiscoveredCases(this.idCase);
                this.key = this.idCase + '-updated'
                this.setClasses();

                if (state.minedCases.includes(this.idCase)){
                    document.getElementById('shovel').currentTime = 0;
                    document.getElementById('boom').play();

                    setTimeout(() => {
                        if(confirm('Perdu ! Voulez-vous recommencer ?')){
                            this.$emit('resetGame')
                        } else {
                            this.$emit('endGame');
                        }
                    }, 200)
                } else {
                    document.getElementById('shovel').currentTime = 0;
                    document.getElementById('shovel').play();
                    
                    this.updateSideCases();
                }

                // end game
                if (100 - state.discoveredCases.length <= state.mines){
                    if (state.gameStarted){
                        this.$emit('endGame');
                    }
                }
            }
        },
        updateSideCases(){
            for (let myCase of this.findSideCases()){
                // console.log(myCase)

                if (!state.minedCases.includes(myCase.idCase) && !myCase.discovered){
                    myCase.discoverCase();
                    myCase.updateSideCases();
                }
            }
        },
        findSideCases(){
            let rowId = Math.floor((this.idCase - 1) / 10);
                    
            let sideCases = [];
            if (this.$parent.$children[(this.idCase - (rowId * 10)) - 2]){
                sideCases.push(this.$parent.$children[(this.idCase - (rowId * 10)) - 2])
            }
            if (this.$parent.$children[(this.idCase - (rowId * 10))]){
                sideCases.push(this.$parent.$children[(this.idCase - (rowId * 10))])
            }
            if (this.$parent.$parent.$children[rowId - 1]){
                sideCases.push(Array.from(this.$parent.$parent.$children[rowId - 1].$children).find(child => child.idCase == this.idCase - 10));
            }
            if (this.$parent.$parent.$children[rowId + 1]){
                sideCases.push(Array.from(this.$parent.$parent.$children[rowId + 1].$children).find(child => child.idCase == this.idCase + 10));
            }

            return sideCases;
        },
        setClasses() {
            this.style = 'box';
            if (state.flaggedCases.includes(this.idCase)){
                this.style += ' flagged';
            }

            if (state.discoveredCases.includes(this.idCase)){
                this.style += ' uncovered';

                if (state.minedCases.includes(this.idCase)){
                    this.style += ' mined';
                } else {
                    if (this.sideMines > 0){
                        this.style += ' has-indicator';
                    }
                }
                
            }
            
            
        },
        setSideMines() {
            let rowId = Math.floor((this.idCase - 1) / 10);
            let sideIds = [
                this.idCase - (11 * (rowId > 1 ? 1 : rowId)), 
                this.idCase - (10 * (rowId > 1 ? 1 : rowId)), 
                this.idCase - (9 * (rowId > 1 ? 1 : rowId)), 
                this.idCase - 1 * ((this.idCase - 1) % 10 == 0 ? 0 : 1), 
                this.idCase + (1 * (this.idCase % 10 == 0 ? 0 : 1)), 
                this.idCase + (9 * (rowId == 9 ? 0 : 1)) , 
                this.idCase + (10 * (rowId == 9 ? 0 : 1)), 
                this.idCase + (11 * (rowId == 9 ? 0 : 1))
            ];
            this.sideMines = state.minedCases.filter(x => sideIds.includes(x)).length;
        },
        toggleFlag(e){
            if (!state.gameStarted){
                mutations.toggleStart();
                this.$parent.$parent.$parent.$children[0].startTimer();
            }
            if(!state.flaggedCases.includes(this.idCase)){
                mutations.toggleFlag(true, this.idCase);
            } else {
                mutations.toggleFlag(false, this.idCase);
            }
            this.setClasses();

            this.$emit('flagClick');

            e.preventDefault();

            return false
        }
    },
    computed: {
        // ...mapState(['minedCases', 'flaggedCases', 'discoveredCases']),
        
    },
    created(){
        this.setClasses();
        this.setSideMines();
    },
})