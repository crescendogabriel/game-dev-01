$('.add_player button').click(function() {
    if (!$('.player_names').val() && !localStorage.getItem('players')) {
        alert('Add players first');
    } else {
        
        let arrPlayers=[];

        getListPlayers(function(key,player){
            arrPlayers.push({"name": player, "score":0 });
        });

        localStorage.setItem('players', JSON.stringify(arrPlayers));
        localStorage.setItem('current_player',0); 
        localStorage.setItem('current_question',1);

        game_start();
    }
    
});

function scoreBoard() {
    $('.players').html('');
    getListPlayers(function(key, player) {
        $('.players').append(`<div class="player player_${key}">${player.name} <span>${player.score}</span></div>`);
    });

    disPlayer();
}

function getListPlayers(funK) {
    let players =  localStorage.getItem('players') === null ? $('.player_names').val().split('\n') : JSON.parse(localStorage.getItem('players'));
    $.each(players,function(key,player){
        funK(key,player);
    });
}

function addScore(player) {
    let players =  JSON.parse(localStorage.getItem('players'));
    players[player].score  += 1;
    localStorage.setItem('players', JSON.stringify(players));
    $(`.players > .player_${player} > span`).html(players[player].score);
}

function disPlayer() {
    let players =  JSON.parse(localStorage.getItem('players'));
    key = localStorage.getItem('current_player');
    $('.turn h2').html(`${players[key].name.toUpperCase()}'s answer is`);
    $(`.players > .player`).removeClass('current');
    $(`.players > .player_${key}`).addClass('current');
}