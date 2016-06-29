$(document).ready(function() {
  console.log('Hello, Ivar... How are you?');

  // Adds item to to-do list
  $('#toDoButton').on('click', function(e) {
    e.preventDefault();
    var newItem = $('#toDo').val();
    $('#toDoList').append('<div>' + newItem + '<button class="delete btn btn-danger" type="button">Remove</button></div>');
    $('#toDo').val('');

    // Deletes item from to-do list
    $('.delete').off('click').on('click', function(e) {
      $(e.target).parent().remove();
    });
  });

  // Strikes-through an item when it's div is clicked
  $('#toDoList').on('click', function(e) {
    $(e.target).css('text-decoration', 'line-through');
  });
});
