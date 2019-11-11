$(function(){
  function buildPost(message){
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html =  `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="lower-message">
                    <div class="lower-message__content">
                    ${message.content}
                    </div>
                    <div class="lower-message__image">
                    ${img}
                    </div>
                  </p>
                </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildPost(post);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(post) {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').attr('disabled', false);
    })
  })
  var reloadMessages = function(){
      var href = 'api/messages'
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildPost(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
   setInterval(reloadMessages, 5000);
  }
});

