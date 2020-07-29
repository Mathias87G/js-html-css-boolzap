// Array messaggi casuali
var messaggiRandom = ['Ok', 'Ciao', 'La penso proprio come te', 'Sei grande'];

// Click
$('#send').click(function() {
  aggiungi();
});

// Invio tastiera
$('#message').keydown(keyboard);


// Funzioni

// messaggio utente e risposta casuale
function aggiungi(){
    var messaggio = $('#message').val();
    // Condizione per messaggio non vuoto
    if (messaggio != '') {
      var chat = $('.template .chat-text-ctr').clone();
      chat.find('.chat-text').addClass('green');
      chat.find('.chat-text p').append(messaggio);
      $('.main-chat').append(chat);
      // ora attuale
      var d = new Date();
      var minutes = ("0" + d.getMinutes()).substr(-2);
      var time = d.getHours() + ':' + minutes;
      chat.find('.chat-time small').append(time);
      $('#message').val('');
      // Risposta casuale dopo un secondo
      setTimeout(function(){
        var rispostaRandom = messaggiRandom[random(0, (messaggiRandom.length - 1))]
        var answer = $('.template .chat-text-ctr').clone();
        answer.find('.chat-text').addClass('white');
        answer.find('.chat-text p').append(rispostaRandom);
        $('.main-chat').append(answer);
        answer.find('.chat-time small').append(time);
      }, 1000);
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
