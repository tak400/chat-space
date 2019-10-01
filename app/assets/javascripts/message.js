$(function(){
  function buildHTML(message){
    var image_data = (message.image) ? ` <img class="main__body--message__image" src="${message.image}" >`: ""
    
    var html = `<div class="main__body--user">
                  ${message.user_name}
                </div>
                <div class="main__body--time">
                  ${message.created_at}
                </div>
                <div class="main__body--message" data-message-id="${message.id}">
                  <p class="main__body--message__body">
                    ${message.body}
                  </p>
                    ${image_data}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__body').append(html)
      $('.new_message')[0].reset();
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight});
      $('.main__footer--form--img__submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.main__footer--form--img__submit').attr('disabled', false);
    })
  });

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        last_message_id = $('.main__body--message').last().data('message-id')
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages){
          var insertHTML = '';
          messages.forEach(function(message){
              insertHTML += buildHTML(message)
              $('.main__body').append(insertHTML)
              $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight});
          })
        })
        .fail(function() {
          alert('更新に失敗しました');
        });
      }
    };
  setInterval(reloadMessages, 5000);
});