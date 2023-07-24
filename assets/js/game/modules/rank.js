function start_rank() {
    var rankTimer = setInterval(function() {
        if (!$('.app').hasClass('finish')) {
            getRank();
            
        } else {
            clearInterval(rankTimer);
            getRank();
            $('.player.first').addClass('winner').children('span').text('P 3M');
            $('.player.second').addClass('winner').children('span').text('P 2M');
            $('.player.third').addClass('winner').children('span').text('P 1M');
        }

        console.log('');
    },1000);

    rankTimer;
}


function getRank() {
    var playerScores = JSON.parse(localStorage.getItem('players'));
    var ranks = [];
    playerScores.filter((player,key) =>  { if (parseInt(player.score) > 0) ranks.push(JSON.stringify({'key':key, 'player': player})); });
    ranks.sort((a,b) => JSON.parse(b).player.score - JSON.parse(a).player.score);
    ranks.splice(3,ranks.length-1);
    
    $(`.players .player`).removeClass('first').removeClass('second').removeClass('third');
    $(ranks).each(function(key,rank) {
        var pos;

        if (key == 0) {
            pos = 'first';
        } else if (key == 1) {
            pos = 'second';
        } else {
            pos = 'third';
        }

        $(`.players .player_${JSON.parse(rank).key}`).addClass(pos);
    });
}