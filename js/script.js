// Array messaggi casuali
var messaggiRandom = ['Ok', 'Ciao', 'La penso proprio come te', 'Sei grande'];

$( document ).ready(function() {
  // Click messaggio
  $('#send').click(function() {
    aggiungi();
  });
  // Richiamo funzione cambio icona messaggio
  $('#message').focus(changeIcon);
  $('#message').focusout(changeIcon);
  // Invio tastiera messaggio
  $('#message').keydown(keyboard);
  // Chat attiva su Click
  $('.contact-preview').click(function(){
    var selectContact = $(this);
    selectChat(selectContact);
    details();
  });
  search()
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
      $('.main-chat.active').append(chat);
      // scroll messaggio
      $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);
      // Messaggio in attesa della risposta
      $('.main-cnt-details p').text('sta scrivendo...');
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
    $('.main-chat.active').append(answer);
    $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);
    // Cambio ora e testo al contatto
    $('.main-cnt-details p').text('Ultimo accesso alle ' + ora());
    $('.contact-preview.active .contact-time p').text(ora());
    $('.contact-preview.active .contact-text p').text(rispostaRandom);
  }, 1000);
}

// Funzione per selezione contatto e chat attiva
function selectChat(x) {
  var activeContact = $('.aside-contacts .contact-preview.active');
  var activeChat = $('.main-chat-ctr .main-chat.active');
  var position = x.index();
  activeContact.removeClass('active');
  activeChat.removeClass('active');
  $(x).addClass('active');
  $('.main-chat-ctr .main-chat').eq(position).addClass('active');
}

// Funzione per cambio nome e immagine profilo chat
function details() {
  var name = $('.contact-preview.active .contact-text h4').text();
  $('.main-cnt-details h4').text(name);
  var image = $('.contact-preview.active .avatar').attr('src');
  $('.main-cnt-access a img').attr('src', image);
}
// Funzione Cambio icona
function changeIcon() {
  $('#send,#mic').toggle(300);
}

// funzione barra di ricerca
function search() {
  $('#search').keyup(function(){
  var searchText = $('#search').val().toLowerCase();
    $('.contact-preview').each(function(){
      var name = $(this).find('.contact-text h4').text().toLowerCase();
      if (check(name, searchText)) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });
}
// funzione controllo
function check(array, element){
    for (var i = 0; i < array.length; i++) {
        if (array.indexOf(element) != -1){
            return true;
        }
    }
    return false;
}
