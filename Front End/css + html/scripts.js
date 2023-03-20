// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-cards-container]")
let inputBox = document.querySelector(".input-box"),
searchIcon = document.querySelector(".icon"),
closeIcon = document.querySelector(".close-icon");
title = document.querySelector(".header")
postTitle = document.querySelector(".post-header")
card = document.querySelector(".card");
input = document.querySelector(".type-input")
var api_key = "2729f7e2011b43d7be77e7b60bc97701"; 
container = document.querySelector(".card-container")
cardTemplate = document.querySelector(".card-template")


var search_state = false; 

searchIcon.addEventListener("click", () => {
    inputBox.classList.add("open");
    title.classList.add("hide");
    postTitle.classList.add("open");
    // card.classList.add("reveal");
    input.focus();
    search_state = true;   
})
closeIcon.addEventListener("click", () => {
    inputBox.classList.remove("open");
    title.classList.remove("hide");
    postTitle.classList.remove("open");
    // card.classList.remove("reveal"); 
    search_state = false;
    while (container.firstChild) {
      container.removeChild(container.firstChild); 
    }
    input.reset()
})


// const searchInput = document.querySelector(".type-input")

let articles = []

//When user searches, generates cards from api:
input.addEventListener("input", e => {
  input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        console.clear();
        const topic = e.target.value
        console.log(e.target.value);
        var link = 'https://newsapi.org/v2/everything?'+
            'q=' + topic + '&'+
            'sortBy=popularity&'+
            'apiKey='+ api_key;
        fetch(link).then(res => res.json()).then(data => {
          data.articles.forEach(article => {
            const newcard = cardTemplate.content.cloneNode(true);

            const title = newcard.querySelector(".title");
            const author = newcard.querySelector(".data-author");
            const date = newcard.querySelector(".data-date");
            const company = newcard.querySelector(".data-company");
            // if (article.author.includes(":")) {
            //   author.textContent = "poo";
            // }
            // if (article.author.includes("@")) { //Some articles have emails in the author name, this tries to parse them and find the actual name
            //   if (article.autor.indexOf("(") !== -1 && article.autor.indexOf(")") !== -1) {
            //     var begin = article.autor.indexOf("(");
            //     var end = article.autor.indexOf(")");
            //     author.textContent = article.author.substring(begin + 1, end);
            //   }
            // } else {
            //   author.textContent = article.author;
            // }
            author.textContent = article.author;
            title.textContent = article.title;
            date.textContent = article.publishedAt.substring(0, 10);
            company.textContent = article.source.name;
            


            container.append(newcard);
          })
           
        });
        //searches multiple times
    }
  })
  
})



// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(res => res.json())
//   .then(data => {
//     users = data.map(user => {
//       const card = userCardTemplate.content.cloneNode(true).children[0]
//       const header = card.querySelector("[data-header]")
//       const body = card.querySelector("[data-body]")
//       header.textContent = user.name
//       body.textContent = user.email
//       userCardContainer.append(card)
//       return { name: user.name, email: user.email, element: card }
//     })
//   })