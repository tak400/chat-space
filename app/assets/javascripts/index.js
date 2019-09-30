$(function() {

function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
              
  return html;
}

function deleteUser(name, id){
  var html =`<div class='chat-group-user'>
               <input name='group[user_ids][]' type='hidden' value='${id}'>
               <p class='chat-group-user__name'>${name}</p>
               <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
             </div>`
             return html;
}

  $(".chat-group-form__name").on("keyup", function() {
    var input = $(".chat-group-form__name").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $(".chat-group-user.clearfix").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          html = appendUser(user)
          $('#user-search-result').append(html)
        });
      }
      else{
        alert("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove();
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    html = deleteUser(name, id)
    $('#user-search-member').append(html)
  });

  $('#user-search-member').on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });

  $('.chat-group-user__btn--remove').on('click', function(){
    $(this).parent().remove();
  });
});