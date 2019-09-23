$(function(){
  function buildHTML(message){
    var image_data = (message.image) ? ` <img class="main__body--message__image" src="${message.image}" >`: ""
    
    var html = `<div class="main__body--user">
                  ${message.user_name}
                </div>
                <div class="main__body--time">
                  ${message.created_at}
                </div>
                <div class="main__body--message">
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
});