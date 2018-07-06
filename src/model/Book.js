function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
};

Book.instances = {}; //Book.instances represent the collection of all Book instances managed by the application in the form of a map.

//Converting each row of bookTable (representing an untyped record object) 
//into a corresponding object of type Book stored as an element of the map Book.instances, 
//with the help of the procedure convertRow2Obj defined as a "static" (class-level) method in the Book class:
Book.convertRow2Obj = function (bookRow) {
    var book = new Book(bookRow);
    return book;
};

Book.loadAll = function () { //for loading all managed Book instances from the persistent data store.
    var i = 0,
        key = "",
        keys = [],
        bookTableString = "",
        bookTable = {};
    try {
        if (localStorage["bookTable"]) {
            console.log(localStorage["bookTable"]); //key value 
            bookTableString = localStorage["bookTable"];
            console.log(bookTableString);
            //Retrieving the book table that has been stored as a large string with the key "bookTable" from Local Storage 
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (bookTableString) {
        //Converting the book table string into a corresponding map bookTable with book rows as elements
        console.log(bookTableString)
        bookTable = JSON.parse(bookTableString); //deserialization
        console.log(bookTable); //string to object 
        keys = Object.keys(bookTable); //object.keys returns an array :Object.keys(object) ;gives only keys
        console.log(keys.length + " books loaded.");
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            console.log(key)
            console.log(bookTable[key])
            Book.instances[key] = Book.convertRow2Obj(bookTable[key]);
            console.log(Book.instances[key]);
        }
    }
};

Book.saveAll = function () { // for saving all managed Book instances to the persistent data store.



    var bookTableString = "",
        error = false,
        nmrOfBooks = Object.keys(Book.instances).length; //cos same book instance is used everywhere and no need to repeat the code by parsing ,etc
    try {
        bookTableString = JSON.stringify(Book.instances); //converting object to string 
        //Converting the map Book.instances into a string with the help of the predefined JavaScript function JSON.stringify ;called as serialisation
        localStorage["bookTable"] = bookTableString; //putting inside localstorage
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfBooks + " books saved.");
};

Book.add = function (slots) { //for creating and storing a new Book record
    //Creating a new Book instance
    console.log("inside add function");
    var book = new Book(slots);
    Book.instances[slots.isbn] = book;
    console.log("Book " + slots.isbn + " created!");
};

Book.update = function (slots) { //for updating an existing Book record.
    //we first retrieve it from Book.instances, and then re-assign those attributes the value of which has changed:
    console.log("inisde update function")
    var book = Book.instances[slots.isbn];
    var year = parseInt(slots.year);
    if (book.title !== slots.title) { // if previous value different from new value  add new value(update it )
        book.title = slots.title;
    }
    if (book.year !== year) {
        book.year = year;
    }
    console.log("Book " + slots.isbn + " modified!");
    //Notice that in the case of a numeric attribute (such as year), we have to make sure that the value of the corresponding input parameter (y), which is typically obtained from user input via an HTML form, 
    //is converted from String to Number with one of the two type conversion functions parseInt and parseFloat.
};

Book.destroy = function (isbn) { //for deleting a Book instance.
    //A Book instance is deleted from the Book.instances collection by first testing if the map has an element with the given key
    if (Book.instances[isbn]) {
        console.log("Book " + isbn + " deleted");
        delete Book.instances[isbn];
    } else {
        console.log("There is no book with ISBN " + isbn + " in the database!");
    }
};

Book.createTestData = function () { //for creating a few example book records to be used as test data.
    Book.instances["006251587X"] = new Book({
        isbn: "006251587X",
        title: "Weaving the Web",
        year: 2000
    });
    Book.instances["0465026567"] = new Book({
        isbn: "0465026567",
        title: "Gödel, Escher, Bach",
        year: 1999
    });
    Book.instances["0465030793"] = new Book({
        isbn: "0465030793",
        title: "I Am A Strange Loop",
        year: 2008
    });
    Book.saveAll();
};

Book.clearData = function () { //for clearing the book datastore.
    if (confirm("Do you really want to delete all book data?")) {
        localStorage["bookTable"] = "{}";
    }
};