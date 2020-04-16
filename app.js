/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;



init();

function init (){  
gamePlaying = true;
    
scores = [0,0];
roundScore = 0;
activePlayer = 0;
    
document.querySelector('.final-score').value = '';
    
document.querySelector('.dice1').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.getElementById('name-0').textContent = 'Player 1'; 
document.getElementById('name-1').textContent = 'Player 2';
    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
    
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
    
document.querySelector('.player-0-panel').classList.add('active');
    
}


document.querySelector('.btn-roll').addEventListener('click', btnRoll);


function btnRoll(){
    
    
    if(gamePlaying){
    
    document.getElementById('dice-event').style.display = 'none';
    
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
        
    if(dice1 === 6 && dice2 === 6){
        scores[activePlayer] = 0; 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
        
        document.getElementById('dice-event').style.display = 'block';
        document.getElementById('dice-event-paragraph').textContent = 'DOUBLE SIX';
    
        setTimeout(function(){ document.getElementById('dice-event').style.display = 'none'; }, 2000);
        
        return;
    }
        
    
    
    //2. Display the result
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png'; 
     var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    
    
    //3. Update the round score IF the rolled number was NOT a 1
    if(dice1 !== 1 && dice2 !== 1){
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        //Next player
        document.getElementById('dice-event').style.display = 'block';
        document.getElementById('dice-event-paragraph').textContent = 'diced 1: next Player!';
    
        setTimeout(function(){ document.getElementById('dice-event').style.display = 'none'; }, 2000);
        nextPlayer();
    } 
        
   
    
    
    }
}



document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
    //add currentscore to globalscore
    scores[activePlayer] += roundScore;
    
    //update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
    var input = document.querySelector('.final-score').value;
    var winningScore;
    
    //Undefined, 0, null or '' are COERCED to false 
    //Anything else is COERCED to true
        
    if(input){
        winningScore = input;
    }else {
        winningScore = 100;
    }
    
    if(isNaN(input)){
    winningScore = 100; 
    alert('must input number')
    document.querySelector('.final-score').value = '';
    };
    
    
    //Check if player won the game
    if(scores[activePlayer] >= winningScore){ 
    document.querySelector('#name-' + activePlayer).textContent = 'Winner' 
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        
    gamePlaying = false;
    
    
    }else{
    //Next player
    nextPlayer();    
    }
    }
    
  
    
});


function nextPlayer(){
    
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);





//changer = ändern von html elementen
//document.querySelector('#current-' + activePlayer).textContent = roundScore;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//getter = 'lesen' von html elementen
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
//ändern vonn css properties


//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');

// A player looses his ENTIRE score, when he rolls two 6 in a row. After that its net players turn. (hint save previous dice roll in var)


