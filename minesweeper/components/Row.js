import Case from './Case.js'

export default Vue.component('Row', {
    template: `<div class="row" :id="'row-' + idRow">
        <v-case v-for="i in 10" :key="'Case-' + (i * idRow)" :idCase="(10 * (idRow -1)) + i" @resetGame="resetGame()" @flagClick="$emit('flagClick')" @endGame="$emit('endGame')"></v-case>
    </div>`,
    components:{
        'v-case': Case
    },
    props: {
        idRow:{
            required: false,
            type: Number,
            default: 0
        }
    },
    methods: {
        resetGame(){
            this.$emit('resetGame');
        }
    }
})