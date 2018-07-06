//he procedure setupUserInterface first creates the book objects from the corresponding rows 
//retrieved from Local Storage by invoking Book.loadAll() and 
//then creates the view table in a loop over all key-value slots of the map Book.instances where 
//each value represents a book object.
pl.view.listBooks = {
    setupUserInterface: function () {
        var tableBodyEl = document.querySelector("table#books>tbody");
        var i = 0,
            keys = [],
            key = "",
            row = {};
        // load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);
        // for each book, create a table row with a cell for each attribute
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyEl.insertRow(); //a new row is created in the table body element with the help of the JavaScript DOM operation insertRow()
            row.insertCell(-1).textContent = Book.instances[key].isbn; //three cells are created in this row with the help of the DOM operation insertCell():
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
            //Both insertRow and insertCell have to be invoked with the argument -1 for making sure that new elements are appended to the list of rows and cells.
        }
    }
};