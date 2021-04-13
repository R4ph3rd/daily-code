export default Vue.component('Scores', {
    template: `<section class="highscores">
    <h1>Top 3</h1>
    <ul>
      <li v-for="(score,i) in highestScores" :key="score + i">{{i}}. {{score.username}} <span class="time">{{translatedScore(score.time)}}</span></li>
    </ul>
    <a href="index.html" class="btn" @click="$emit('resetGame')">Play again?</a>
  </section>` ,
    data(){
        return {
            highestScores : state.highestScores
        }
    },
    methods: {
        updateHighestScores(){
            this.highestScores = state.highestScores;
        },
        translatedScore(time){
            let m = Math.floor(time / 60);
            let s = time - (m * 60);
            
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            return m + 'mn ' + s + 'sec'
        }
    },
    created() {
        this.updateHighestScores();
    }
})