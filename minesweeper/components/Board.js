import Row from './Row.js'

export default {
    name:'Board',
    template: `<main class="board">  
        <div class="grid">
        <v-row v-for="i in 10" :key="'row-' + i" :id="i" :idRow="i" @resetGame="resetGame()" @flagClick="$emit('flagClick')" @endGame="$emit('endGame')"></v-row>
        </div>
    </main>`,
    methods:{
        resetGame(){
            this.$emit('resetGame')
        }
    },
    components: {
        'v-row': Row
    }
}