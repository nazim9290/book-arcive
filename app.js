const url = "http://openlibrary.org/search.json?q=${searchText}"
const inputSearch = document.getElementById("search");
const books = document.getElementById("books")


const displayBook = () => {
    const searchText = inputSearch.value;
    spiner('block')
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const qtyBooks = document.getElementById("qtyBooks");
            qtyBooks.innerText = `${data.numFound} Books Found`;
            const resultBook = data.docs.slice(0, 10);
            console.log(resultBook.slice(0, 10));
            if (resultBook.length == 0) {
                notFound('block', searchText)
            } else {
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
            spiner('none')

        })
}


const spiner = (displayValue) => {
    let loading = document.getElementById("spiner");
    loading.style.display = displayValue;
}

const notFound = (value, searctext) => {
    const displayNotfound = document.getElementById("not-found");
    const div = document.createElement('div');
    div.classList.add("card-body");
    div.innerHTML = `
      <h5 class="card-title"><i>"${searctext}"</i> name hase not matching</h5>
      
            <a href="#" class="btn btn-primary">Search Item</a>
    `
    displayNotfound.appendChild(div)
    displayNotfound.style.display = value;
}