const state = {
    minedCases: [],
    discoveredCases: [],
    flaggedCases : [],
    gameStarted: false,
    flags : 0,
    mines:20,
    currentTime : 10000000000000000000000000000000000000000000000000000000000,
    highestScores : [
        {
            username: 'Jane Doe',
            time: '32'
        },
        {
            username: 'John Doe',
            time: '33'
        },
        {
            username: 'Mary Doe',
            time: '43'
        },
    ]
}

const mutations = {
    setCurrentTime(payload){
        state.currentTime = payload;
        console.log('store time is', state.currentTime)
    },
    addMinedCases(payload){
        if (!state.minedCases.includes(payload)){
            state.minedCases.push(payload)
        } else {
            let index = payload;
            while (state.minedCases.includes(index)){
                index = Math.floor(Math.random() * 100);
            }
            state.minedCases.push(index)
        }
    },
    addDiscoveredCases(payload){
        if (!state.discoveredCases.includes(payload)){
            state.discoveredCases.push(payload)
        } else {
            console.warn('Case already discovered')
        }
    },
    addFlaggedCases(payload){
        if (!state.flaggedCases.includes(payload)){
            state.flaggedCases.push(payload)
        } else {
            console.warn('Case already discovered')
        }
    },
    toggleStart(payload){
        if (payload != null && payload != undefined){
            state.gameStarted = payload;
            console.log('game is ', state.gameStarted)
        } else {
            state.gameStarted = !state.gameStarted;

        }
        // console.log('## Game starts ! ##')
    },
    reset(){
        state.minedCases = [];
        state.discoveredCases = [];
        state.flaggedCases = [];
        state.gameStarted = false;
        state.currentTime = 0;
        
        for (let i = 0; i < state.mines; i ++){
            mutations.addMinedCases(Math.floor(Math.random() * 100));
        }

        actions.storeState();
    },
    toggleFlag(payload, idCase){
        if (!payload){
            state.flags --;
            state.flaggedCases.splice(state.flaggedCases.findIndex(x => x == idCase), 1)
        } else {
            state.flaggedCases.push(idCase);
            state.flags ++;
        }
    },
    addScore({username, time}){
        state.highestScores[2] = {
            username, time
        };
        state.highestScores.sort((a,b) => a.time - b.time);
    },
    setState(s){
        if (s){
            for(let item in s){
                state[item] = s[item];
            }

            if (!state.gameStarted){
                if (state.discoveredCases.length > 0){
                    state.discoveredCases = [];
                }
                
                if (state.currentTime > 0){
                    state.currentTime = 0;
                }
    
                if (!state.gameStarted && (state.flags > 0 || state.flaggedCases.length > 0)){
                    state.flags = 0;
                    state.flaggedCases = [];
                }
            } 

        } else {
            state.minedCases = [],
            state.discoveredCases = [],
            state.flaggedCases = [],
            state.gameStarted = false,
            state.flags = 0,
            state.mines = 20,
            state.currentTime = 0,
            state.highestScores = [
                {
                    username: 'Jane Doe',
                    time: '32'
                },
                {
                    username: 'John Doe',
                    time: '33'
                },
                {
                    username: 'Mary Doe',
                    time: '43'
                }
            ]

            for (let i = 0; i < state.mines; i ++){
                mutations.addMinedCases(Math.floor(Math.random() * 100));
            }
        }
    }
}

const actions = {
    storeState(){
        // state.currentTime = Math.floor(state.currentTime)
        localStorage.setItem('state', JSON.stringify(state));

        console.log('Local storage updated:', state.currentTime, JSON.parse(localStorage.getItem('state')).currentTime);
    }
}