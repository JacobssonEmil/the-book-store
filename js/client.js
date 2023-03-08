import data from '../books.json';
console.log(data[0].author);



for (let i = 0; i < data.length; i++) {
    document.getElementById("book" + i.toString()).innerHTML = data[i].title
    document.getElementById("author" + i.toString()).innerHTML = data[i].author
    document.getElementById("price" + i.toString()).innerHTML = data[i].price
}

var numberOfBooks = data.length;
if (numberOfBooks < 4) {
    // CREATE ONE ROW
    var html = '<div class="row"><div class="col-xl-3"><h1>HEHHEE</h1></>class="col-xl-3"><h1>HEHHEE</h1></>class="col-xl-3"><h1>HEHHEE</h1></></>'
}
else if (numberOfBooks < 7) {
    // CREATE TWO ROWS
}
else if (numberOfBooks < 10) {
    //CREATE THREE ROWS
}



