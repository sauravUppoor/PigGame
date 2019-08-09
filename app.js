/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var round_score, score, active_player, is_active;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(is_active){
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if(dice !== 1){
            //add to round score
            round_score += dice;
            document.querySelector('#current-'+ active_player).textContent = round_score;
            
    
        } else {
            //roundscore set to zero
            round_score = 0;
            document.querySelector('#current-'+ active_player).textContent = round_score;
            diceDOM.style.display = 'none';
    
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click' , function(){
    if(is_active){
        score[active_player] += round_score;
        round_score = 0;
        //UI change
        document.getElementById('score-' + active_player).textContent = score[active_player];

        //check for winner
        if(score[active_player] >= 100){
            //declare winner
            document.querySelector('.player-' + active_player + '-panel').classList.add('winner');
            document.querySelector('#name-' + active_player).textContent = 'WINNER!';
            document.querySelector('.player-' + active_player + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            is_active = false;

            //reset to initial changes
        } else {
            //next player
            nextPlayer();
        }
    }   
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    active_player = 1 - active_player;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    score = [0,0];
    round_score = 0;
    active_player = 0;
    is_active = true;
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');





}
