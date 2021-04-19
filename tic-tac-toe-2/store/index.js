const store = {
    gameStarted: false,
    players: []
}

const mutations = {
    setPlayers(player1, player2){
        store.players = [];
        store.players[0] = player1;

        if (player2) store.players[1] = player2 ;

        console.log('set player(s):', store.players)
    },
    toggleStart(){
        store.gameStarted = !store.gameStarted;

        console.log(' -- Game starts ! --')
    }
}