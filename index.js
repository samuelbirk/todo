function createNewTask(event) {
  let newTask = document.createElement('li');
  let newItemTextValue = document.getElementById("new_item_text").value
  newTask.innerHTML = '<span class="editable">' + newItemTextValue + "</span><input type='checkbox' class='remove-button'>" 
  //newTask.addEventListener('click', remove)
  document.getElementById("list").appendChild(newTask);
  document.getElementById("new_item_text").value = ''
}

function createNewBookTask(book) {

  let newTask = document.createElement('li');
  newTask.innerHTML = '<span class="editable">' + book.name + "</span><input type='checkbox' class='remove-button'>" 
  //newTask.addEventListener('click', remove)
  document.getElementById("list").appendChild(newTask);

}

function onEnter(event) {
  if(event.code === 'Enter') {
    createNewTask(event)
  }
}

function remove(event) {
  event.srcElement.parentElement.style.textDecoration = 'line-through'
}

function edit(event) {
  text = event.srcElement.innerText

  event.srcElement.innerHTML = '<input type="text" class="editable_text" value="'+ text +'" />'

}

function finishEditing(event) {
  console.log('finished editing')
  if(event.code === 'Enter') {
    value = event.srcElement.value

    event.srcElement.parentElement.innerText = value
    post('trello.com', {list_item_id: 1, value: value})

  }
}

function addBooksToMyList(books) {
  for(book of books) {
      createNewBookTask(book)
  }
}

fetch('https://anapioficeandfire.com/api/books')
  .then(resp => resp.json())
  .then(json => addBooksToMyList(json));

document.getElementById("new_item_text").addEventListener('keydown', onEnter)
document.getElementById("create_new_task_button").addEventListener("click", createNewTask);
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'remove-button') {
    remove(event)
    // do your action on your 'li' or whatever it is you're listening for
  }
});
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'editable') {
    edit(event)
    // do your action on your 'li' or whatever it is you're listening for
  }
});

document.querySelector('body').addEventListener('keydown', function(event) {
  if (event.target.className === 'editable_text') {
    finishEditing(event)
    // do your action on your 'li' or whatever it is you're listening for
  }
});
