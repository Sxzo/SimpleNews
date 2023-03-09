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


var search_state = false; 

searchIcon.addEventListener("click", () => {
    inputBox.classList.add("open");
    title.classList.add("hide");
    postTitle.classList.add("open");
    card.classList.add("reveal");
    input.focus();
    input.select();
    search_state = true;   
})
closeIcon.addEventListener("click", () => {
    inputBox.classList.remove("open");
    title.classList.remove("hide");
    postTitle.classList.remove("open");
    card.classList.remove("reveal"); 
    search_state = false; 
})


// const searchInput = document.querySelector(".type-input")

let users = []

input.addEventListener("input", e => {
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        const topic = e.target.value
        var link = 'https://newsapi.org/v2/everything?'+
            'q=' + topic + '&'+
            'sortBy=popularity&'+
            'apiKey='+ api_key;
        fetch(link).then(res => res.json()).then(data => console.log(data));
        console.log("test");
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