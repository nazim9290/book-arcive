const url = "http://openlibrary.org/search.json?q=${searchText}"
const inputSearch = document.getElementById("search");
const books = document.getElementById("books")
const bookId = document.getElementById("book")
const displayNotfound = document.getElementById("not-found");
let qtyBooks = document.getElementById("qtyBooks");

//enter key event
inputSearch.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        displayBook()
    }
})
//randome book show
const showBooks = () => {
    const url = `https://openlibrary.org/search.json?q=web develop`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const resultBooks = data.docs.slice(0, 21);
            //console.log(resultBook.slice(0, 10));
            resultBooks?.forEach(book => {
                const div = document.createElement("div");
                div.classList.add("col")
                div.innerHTML = `
                 <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ""}-M.jpg" class="card-img-top" alt="Not found">
                    <div class="card-body">
                        <h5 class="card-title text-center">${book.title}</h5>
                        <p class="card-text text-center">${book.author_name}</p>
                        <small>publish year <i>${book.first_publish_year} ,</small>
                        <small> publisher of <i>${book.publisher} .</i></small>
                    </div>
                    <div class="card-footer bg-primary text-center">
                        <small class="text-white">Read</small>
                    </div>
                </div>
                `
                bookId.appendChild(div);
            })
        });
}
showBooks()

//search book display
const displayBook = () => {
    qtyBooks.style.display = 'none'
    spiner('block')
    books.innerHTML = "";
    displayNotfound.innerHTML = "";
    bookId.innerHTML = "";
    const searchText = inputSearch.value;
    if (searchText === "") {
        alert("Please enter a book name")
        spiner('block')
        location.reload();
    }
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let qtyBooks = document.getElementById("qtyBooks");
            qtyBooks.innerText = `${data.numFound} Books Found`;
            const resultBook = data.docs.slice(0, 10);
            console.log(resultBook.slice(0, 10));
            if (resultBook.length == 0) {
                notFound('block')
                qtyBooks.style.display = 'none'
            } else {
                qtyBooks.style.display = 'block'
                resultBook?.forEach(book => {

                    const divCol = document.createElement("div");
                    divCol.classList.add("col")
                    divCol.innerHTML = `
                 <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "no img found"}-M.jpg" class="card-img-top" alt="Not found">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author_name}</p>
                        <small>publish year <i>${book.publish_year}
                        publisher of <i>${book.publisher}.</i></small>
                    </div>
                    <div class="card-footer bg-primary">
                        <small class="text-white">Read</small>
                    </div>
                </div>
                `
                    books.appendChild(divCol)


                })
            };

            inputSearch.value = "";
            spiner('none')

        })

}


//spiner
const spiner = (displayValue) => {
    let loading = document.getElementById("spiner");
    loading.style.display = displayValue;
}

//not found
const notFound = (value) => {
    const displayNotfound = document.getElementById("not-found");
    const searchText = inputSearch.value;
    const div = document.createElement('div');
    div.innerHTML = `<div class="card-header">
            Sorry
        </div>
          <div class="card-body">
      <h5 class="card-title"><i>" ${searchText} "</i> name Book has not Found</h5>
            <a onclick="inputSearch.focus()" href="#" class="btn btn-primary">Search Item</a>
            </div>
    `
    displayNotfound.appendChild(div)
    displayNotfound.style.display = value;
}
