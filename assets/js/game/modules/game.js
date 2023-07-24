if (localStorage.getItem('players')) {
    game_start();
}


function game_start() {
    getQuestion();
    disPlayer();
    scoreBoard();
    start_rank();

    $('.add_player').hide();
    $('.app').addClass('start_game');
}


function getQuestion() {
    $('.question').html('');

    $.getJSON( dataURL, function( data ) {
        var q = data.questions[localStorage.getItem('current_question')];
        if (q !== undefined) {
            var words = q.question.split(' ');
            var answer = words[q.blank];
            
            $.each(words, function(key, word) {
                if(key !== q.blank) {
                    $('.question').append(`<span>${word}</span>`);
                } else {
                    $('.question').append('<span class="blank"></span>');
                }
            });
        
            ansSplit        = answer.split('');
            ansLength       = ansSplit.length;
            firstLetter     = ansSplit[0];
            lastLetter      = ansSplit[ansLength - 1];
            $('.pans').attr('maxLength',ansLength);
        
            $('.clue > p').html(` <span>${ansLength}</span> letter word. Starts with the letter <span>${firstLetter}</span> and ends with the letter <span>${lastLetter}</span>`);
            localStorage.setItem('current_answer', answer);
        } else {
            //clearInterval(rankTimer);
            $('.app').addClass('finish');
            $('.right > h2').text('Congratulations!');
            $('.players').append('<div class="bwahaha">Kindly send this screenshot to Larry Paige and claim your price through <b>gcash</b>!</div>');
        }
    });
}


$('.pans').keydown(function(e) {
    if(e.keyCode < 37 || e.keyCode > 40) {
        if(($(this).val().split('').length >= localStorage.getItem('current_answer').split('').length) && e.keyCode != 8) {
            e.preventDefault();
        }
    }
}).keyup(function(e) {
    if(e.keyCode === 13) {
        if ($(this).val() === '') {
            html = `<div class="answer_container">`;
    
            $.each(localStorage.getItem('current_answer').split(''), function(key, letter) {
                html += `<span class="box-letter color-white">x</span>`;
            });
    
            html += '<div>';
        } else {
            var pAnswer = $(this).val().split('');
            var result = $(this).val().toLowerCase() == localStorage.getItem('current_answer').toLowerCase() ? 'correct' : 'wrong';
            
            
            html = `<div class="answer_container ${result}">`;
    
            $.each(pAnswer, function(key, letter) {
                html += `<span class="box-letter">${letter}</span>`;
            });
    
            html += '<div>';
            
        }

        $('.answers').append(html);
            $(this).val('');
    
            if (result === 'correct') {
                addScore(localStorage.getItem('current_player'));
                plusField('current_question');
                getQuestion();
                $('.answers').html('');
            } 

            plusField('current_player');
            disPlayer();
        
        
    }
});

function plusField(field) {
    var plus;
    if (field === 'current_player') {
        plus = parseInt(localStorage.getItem(field))+1 >= JSON.parse(localStorage.getItem('players')).length ? 0 : parseInt(localStorage.getItem(field))+1;
    } else {
        plus = parseInt(localStorage.getItem(field))+1;
    }

    localStorage.setItem(field, plus);
}
