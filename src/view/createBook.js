//setupUserInterface takes care of retrieving the collection of all objects from the persistent data store and
// setting up an event handler (handleSaveButtonClickEvent) on the save button for handling click button events by 
//saving the user input data;
pl.view.createBook = {
    setupUserInterface: function () {
        var saveButton = document.forms['Book'].commit;
        // load all book objects
        Book.loadAll();
        // Set an event handler for the save/submit button
        saveButton.addEventListener("click",
            pl.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Book.saveAll();
        });
    },
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Book'];
        var slots = {
            isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };
        Book.add(slots);
        formEl.reset();
    }
};

//handleSaveButtonClickEvent reads the user input data from the form fields and then saves this data by calling the Book.saveRow procedure.