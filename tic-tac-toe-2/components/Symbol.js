export default Vue.component('VSymbol', {
    template: 
        `<li class="symbol" :data-id="symbolID" @click="setSymbol">
            <!-- example with a cross -->
            <div v-if="getSymbol != undefined" :class="'symbol-' + symbol"></div>
        </li>`,
    props: ['symbolID'],
    data(){
        return {
            symbol : undefined
        }
    },
    computed: {
        getSymbol(){
            return this.symbol;
        }
    },
    methods: {
        setSymbol(){

            if (this.symbol != undefined){
                alert('La case est déjà prise mon poulet ! veuillez réessayer')
            } else {
                this.$emit('storeSymbol', this.symbolID)
                this.symbol = this.$parent.playerTurn ? 'circle' : 'cross'
                this.$parent.toggleTurn();
            }
        }
    }
})