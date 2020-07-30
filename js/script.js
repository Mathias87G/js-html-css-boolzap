// Array messaggi casuali
var messaggiRandom = ['Ok', 'Ciao', 'La penso proprio come te', 'Sei grande'];

$( document ).ready(function() {
  // Click
  $('#send').click(function() {
    aggiungi();
  });
  // Invio tastiera
  $('#message').keydown(keyboard);
});

// Funzioni

// messaggio utente e risposta casuale
function aggiungi(){
    var messaggio = $('#message').val();
    // Condizione per messaggio non vuoto
    if (messaggio != '') {
      // clono template e appendo testo messaggio
      var chat = $('.template .chat-text-ctr').clone();
      chat.find('.chat-text').addClass('green');
      chat.find('.chat-text p').append(messaggio);
      // ora attuale
      chat.find('.chat-time small').append(ora());
      $('#message').val('');
      $('.main-chat').append(chat);
      // scroll messaggio
      $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);
      // risposta casuale
      randomAnswer();
  }
}

//  Funzione per la tastiera
function keyboard() {
  if (event.which == 13 || event.keyCode == 13) {
    aggiungi();
  }
}

// Numero casuale
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)  + min);
}

// Funzione ora
function ora() {
  var d = new Date();
  var minutes = ("0" + d.getMinutes()).substr(-2);
  var time = d.getHours() + ':' + minutes;
  return time;
}

// Funzione risposta casuale con delay
function randomAnswer() {
  setTimeout(function(){
    var rispostaRandom = messaggiRandom[random(0, (messaggiRandom.length - 1))]
    var answer = $('.template .chat-text-ctr').clone();
    answer.find('.chat-text').addClass('white');
    answer.find('.chat-text p').append(rispostaRandom);
    answer.find('.chat-time small').append(ora());
    $('.main-chat').append(answer);
    $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);
  }, 1000);
}
