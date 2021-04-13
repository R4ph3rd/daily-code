export default Vue.component('Timer', {
    template: `<div class="time" :key="min + ':' + sec">
    <img src="img/time.png">
    {{min}}:{{sec}}
  </div>`,
    data(){
        return {
            time: state.currentTime || 0,
            min: '--',
            sec: '--',
            timer : null
        }
    },
    // computed:{
    //     min(){
    //         if (!state.gameStarted){
    //             console.log('oh')
    //             return '--';
    //         } else {
    //             console.log('min')
    //             let m = Math.floor(this.time / 60);

    //             return m < 10 ? '0' + m : m;
    //         }
    //     },
    //     sec(){
    //         if (!state.gameStarted){
    //             return '--'
    //         } else {
    //             let s = (this.time - (this.min * 60));
    //             return s < 10 ? '0' + s : s;
    //         }
    //     }
    // },
    methods: {
        setTime(){
            mutations.setCurrentTime(this.time);
            let m = Math.floor(this.time / 60);
            this.min = m < 10 ? '0' + m : m;

            let s = (this.time - (this.min * 60));
            this.sec = s < 10 ? '0' + s : s;
        },
        startTimer(){
            console.log('Game starts !', this.time, JSON.parse(localStorage.getItem('state')))
            this.timer = setInterval(() => {
                this.time ++;
                this.setTime();

            }, 1000);
        },
         endTimer(){
            if (this.timer){
                this.timer.clearInterval();
            }
        }
    },
    created(){
        this.setTime();

        if (state.gameStarted){
            this.startTimer();
        }
    }
})