// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-cards-container]")
let inputBox = document.querySelector(".input-box"),
searchIcon = document.querySelector(".icon"),
closeIcon = document.querySelector(".close-icon");
title = document.querySelector(".header")
postTitle = document.querySelector(".post-header")
gearIcon = document.querySelector(".gear-icon");
downIcon = document.querySelector(".down-icon");
exitIcon = document.querySelector(".exit-icon");

input = document.querySelector(".type-input")
var api_key = "2729f7e2011b43d7be77e7b60bc97701";

card = document.querySelector(".card"); 
container = document.querySelector(".card-container")
cardTemplate = document.querySelector(".card-template")

displayCounterData = document.getElementById("counter-data")
displayAdd = document.querySelector(".plus-display-button");
displaySubtract = document.querySelector(".minus-display-button");
displayCounter = document.querySelector(".display-counter");
noResultsFound = document.querySelector(".no-results-found");


var search_state = false; 
var display_count = 5; 
var card_count = 0;
var display_count_max = 50;

displayCounterData.innerHTML = display_count; 

searchIcon.addEventListener("click", () => {
    inputBox.classList.add("open");
    title.classList.add("hide");
    postTitle.classList.add("open");
    input.focus();
    search_state = true;   
    
    gearIcon.classList.add("open");
    downIcon.classList.add("open");
    displayCounter.classList.add("open");
    
    
})

closeIcon.addEventListener("click", () => {
    inputBox.classList.remove("open");
    title.classList.remove("hide");
    postTitle.classList.remove("open");

    displayCounter.classList.remove("open");
    search_state = false;
    while (container.firstChild) {
      container.removeChild(container.firstChild); 
    }
    card_count = 0;
    input.value = ""
    noResultsFound.classList.remove("open");
    gearIcon.classList.remove("open");
    downIcon.classList.remove("open");
    // displayCounter.style.display = "none";
    // gearIcon.classList.remove("rotate");
    
})

displayAdd.addEventListener("click", () => {
  if (display_count == display_count_max) return;
  display_count += 5;
  displayCounterData.innerHTML = display_count; 
})

displaySubtract.addEventListener("click", () => {
  if (display_count == 5) return;
  display_count -= 5;
  displayCounterData.innerHTML = display_count; 
})


gearIcon.addEventListener("click", ()=> {
  gearIcon.classList.toggle("rotate");
})

// exitIcon.addEventListener("click", ()=> {
//   exitIcon.link(exitIcon.href);
// })

downIcon.addEventListener("click", () => {
  displayCounter.classList.toggle("open");
  downIcon.classList.toggle("rotate");
})




// const searchInput = document.querySelector(".type-input")

let articles = []

//When user searches, generates cards from api:
  input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if (input.value == "") {
          while (container.firstChild) {
            container.removeChild(container.firstChild); 
          }
          noResultsFound.classList.add("open");
          return;
        }
        while (container.firstChild) {
          container.removeChild(container.firstChild); 
        }
        noResultsFound.classList.remove("open");
        const topic = input.value
        var link = 'https://newsapi.org/v2/everything?'+
            'q=' + topic + '&'+
            'sortBy=relevancy&'+
            'apiKey='+ api_key;
        fetch(link).then(res => res.json()).then(data => {
          data.articles.forEach(article => {
            
            // Search result limiter
            if (card_count == display_count) {
              return; 
            }

            const newcard = cardTemplate.content.cloneNode(true);
            
           // Consider saving the UI by replacing overly long subheaders to "Unknown"
           const title = newcard.querySelector(".title");
           const author = newcard.querySelector(".data-author");
           const date = newcard.querySelector(".data-date");
           const company = newcard.querySelector(".data-company");
           const exitIcon = newcard.querySelector(".exit-icon");

           author.textContent = article.author;
           title.textContent = article.title;
           date.textContent = article.publishedAt.substring(0, 10);
           company.textContent = article.source.name;
           exitIcon.addEventListener('click', () => {
             window.open(article.url);
           });

            container.append(newcard);

            card_count++;

          })
          
          if (card_count == 0) { // If no results found
            noResultsFound.classList.add("open");
          }

          card_count = 0;
          
           
        });
    }
  })
