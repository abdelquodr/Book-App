//create Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//create UI constructor
function UI(){} 


// create UI prototype
//
// add book to list prototype
UI.prototype.addBookToList = function(book){
  // get booklist ui variable
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');

 row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X<a></td>  
 `;

 list.append(row);
}

//clear field prototype
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//showAlert prototype
UI.prototype.showAlert = function(message, className){
    // get variables
    let container = document.querySelector('.container');
    let form = document.getElementById('book-form');

    //crete alert element
    const alert = document.createElement('div');
    alert.className = `alert ${className}`;
    alert.appendChild(document.createTextNode(message));

    //insert alert before form
    container.insertBefore(alert, form);

    // alert show in 5s
    setTimeout(function(){
        alert.remove();
    }, 1000);

}
    //deletebook prototype
    UI.prototype.deleteBook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }





    // add eventlistener to add book
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
          

   //instantiate Book
   const book = new Book(title, author, isbn);
   
  //instantiate ui
  const ui = new UI();

  // show alert
  if(title === '' || author === '' || isbn === ''){
    //show error alert 
    ui.showAlert('fill the field', 'error');
  }else{
    ui.addBookToList(book);
    //show success Alert 
    ui.showAlert('Your book is added', 'success');
    //clear fields
    ui.clearField(); 
  }

   e.preventDefault();
});


// event listener to delete
document.getElementById('book-list').addEventListener('click', function(e){
    // instantiate ui
    let ui = new UI()

    ui.deleteBook(e.target);

    ui.showAlert('book remove', 'delete');

    e.preventDefault();
})