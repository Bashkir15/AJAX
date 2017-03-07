$(document).ready(function(){
  //when login button is pressed prevent the link from moving to another page
  $('#log-in').on('click', function(e){
    e.preventDefault();
    //capture the url
    var $url = $(this).attr('href');
    //show the loging overlay div
    $('#login-overlay').show();
    $('#login-overlay').on('click', function(e){
      if($(e.target).is('div')){
        $(this).hide();
      }
    }) //when light box is clicked hide the overlay

    //append this data to lightbox
    $('#login-overlay').load($url + ' .fetch');
  }) // end overlay-login


  $('.updates a').on('click', function(e){
    e.preventDefault();
    //capture the url
    var $url = $(this).attr('href');
    //show the loging overlay div
    $('#login-overlay').show();
    $('#login-overlay').on('click', function(e){
      if($(e.target).is('div')){
        $(this).hide();
      }
    }) //when light box is clicked hide the overlay

    //append this data to lightbox
    $('#login-overlay').load($url + ' .fetch');
  })



$('#login-overlay').on('submit', '.fetch', function(e){
  //prevent the form from submitting
  e.preventDefault();
  //capture the username and password
  var $username = $('#username').val();
  var $pass = $('#password').val();
  //get json file and send the user information along with the request

  $.getJSON('json/confirmation.json', {
    username: $username,
    password: $pass
  }, function(data){
    var confmsg = '<div class="confirmation"><p>' + data.logged + '</p></div>';
    $('#login-overlay').html(confmsg);
  })


})

}) // when dom is loaded
