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
// get reference to the user-cards container
const userCardsContainer = document.querySelector('.user-cards');

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
        // clear previous search results
        userCardsContainer.innerHTML = '';
        fetch(link).then(res => res.json()).then(data => {
          // loop through the articles array and create a card for each article
          data.articles.forEach(article => {
            // create a card element
            const card = document.createElement('div');
            card.classList.add('card', 'reveal');
      
            // create the card header with the article title
            const header = document.createElement('div');
            header.classList.add('title');
            header.textContent = article.title;
            card.appendChild(header);
      
            // create the card subheader with the article author, date, and source name
            const subheader = document.createElement('div');
            subheader.classList.add('cardSubheader');
            subheader.innerHTML = `<i class="uil uil-edit-alt subicon"></i> &nbsp; ${article.author || 'Unknown'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <i class="uil uil-schedule subicon"></i> &nbsp; ${article.publishedAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <i class="uil uil-newspaper subicon"></i> &nbsp; ${article.source.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
            card.appendChild(subheader);
      
            // add the card to the user-cards container
            userCardsContainer.appendChild(card);
          });
        })
        .catch(error => {
          console.error(error);
        });
        //searches multiple times
    }
  })
  
})


// fetch(link)
//   .then(response => response.json())
//   .then(data => {
//     // loop through the articles array and create a card for each article
//     data.articles.forEach(article => {
//       // create a card element
//       const card = document.createElement('div');
//       card.classList.add('card');

//       // create the card header with the article title
//       const header = document.createElement('div');
//       header.classList.add('title');
//       header.textContent = article.title;
//       card.appendChild(header);

//       // create the card subheader with the article author, date, and source name
//       const subheader = document.createElement('div');
//       subheader.classList.add('cardSubheader');
//       subheader.innerHTML = `<i class="uil uil-edit-alt subicon"></i> &nbsp; ${article.author || 'Unknown'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             <i class="uil uil-schedule subicon"></i> &nbsp; ${article.publishedAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             <i class="uil uil-newspaper subicon"></i> &nbsp; ${article.source.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
//       card.appendChild(subheader);

//       // add the card to the user-cards container
//       userCardsContainer.appendChild(card);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });


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