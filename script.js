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
    const errorBox = document.querySelector(".error-box");

    addBookButton.addEventListener("click", function () {
        formDialog.showModal();
    })

    function checkValidation(title, author, year, description) {
        let errors = [];
        
        if (title==="" || author==="" || year==="") {
            errors.push("Title, Author, Year shouldn't be empty");
        }

        if (description.length > 60) {
            errors.push("Description should be less than 60 characters");
        }

        return errors;
    }

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);

        const title = formData.get("title").trim();
        const author = formData.get("author").trim();
        const year = formData.get("year").trim();
        const status = formData.get("status").trim();
        const description = formData.get("description").trim();

        let errors = checkValidation(title, author, year, description);

        if (errors.length > 0) {
            errorBox.innerHTML = errors.join("<br>");
            errorBox.hidden = false;
        }
        else {
            addBookToLibrary(title, author, year, status, description);

            formDialog.close();
            errorBox.hidden = true;
            form.reset();
        }
        
    });

    cancelButton.addEventListener("click", () => {
        formDialog.close();
    });

}

runMyLibrary();