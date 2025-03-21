function runMyLibrary() {
    const myLibrary = [];
    
    function Book(title, author, year, status, description) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.description = description;
    }

    Book.prototype.changeStatus = function() {
        this.status = this.status === "Not Read" ? "Read" : "Not Read";
    }

    function addBookToLibrary(title, author, year, status, description) {
        const book = new Book(title, author, year, status, description);
        myLibrary.push(book);
    }

    const addBookButton = document.querySelector(".add-book-button");
    const formDialog = document.querySelector(".dialog");
    const submitButton = document.querySelector('[type="submit"]');
    const cancelButton = document.querySelector('[type="button"]');
    const form = document.querySelector("form");

    addBookButton.addEventListener("click", function () {
        formDialog.showModal();
    })

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        
        addBookToLibrary(formData.get("title"),
        formData.get("author"),
        formData.get("year"),
        formData.get("status"),
        formData.get("description"));

        formDialog.close();
        form.reset();
    });

    cancelButton.addEventListener("click", () => {
        formDialog.close();
    });

}

runMyLibrary();