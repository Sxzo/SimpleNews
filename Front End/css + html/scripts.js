let inputBox = document.querySelector(".input-box"),
searchIcon = document.querySelector(".icon"),
closeIcon = document.querySelector(".close-icon");
title = document.querySelector(".header")
postTitle = document.querySelector(".post-header")
gearIcon = document.querySelector(".gear-icon");
linkIcon = document.querySelector(".exit-icon");
// downIcon = document.querySelector(".down-icon");


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

settingBox = document.querySelector(".setting-box");

enButton = document.querySelector(".en-button");
esButton = document.querySelector(".es-button");
zhButton = document.querySelector(".zh-button");

recencyData = document.getElementById("recency-data");
recencyData.innerHTML = "1 Week";
recencyAdd = document.querySelector(".recency-plus");
recencySubtract = document.querySelector(".recency-minus");

var language = "en"; 

var search_state = false; 
var display_count = 5; 
var card_count = 0;
var display_count_max = 50;
var today = new Date();
today.setDate(today.getDate() - 7);
var date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
console.log(date);
var week_distance = 1; 


// Set Initial Values
if (week_distance == 1) {
  recencyData.innerHTML = week_distance + " Week";
} else {
  recencyData.innerHTML = week_distance + " Weeks";
}

displayCounterData.innerHTML = display_count; 

searchIcon.addEventListener("click", () => {
    inputBox.classList.add("open");
    title.classList.add("hide");
    postTitle.classList.add("open");
    input.focus();
    search_state = true;   
    
    gearIcon.classList.add("open");
    displayCounter.classList.add("open");
    
    
})

closeIcon.addEventListener("click", () => {
    settingBox.classList.remove("open");
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

// recencyData = document.getElementById("recency-data");
// recencyData.innerHTML = "1 Week";
// recencyAdd = document.querySelector(".recency-plus");
// recencySubtract = document.querySelector(".recency-minus");

recencyAdd.addEventListener("click", () => {
  if (week_distance == 4) return; 
  
  week_distance++; 
  date = increaseWeeks();
  if (week_distance == 1) {
    recencyData.innerHTML = week_distance + " Week";
  } else {
    recencyData.innerHTML = week_distance + " Weeks";
  }
})

recencySubtract.addEventListener("click", () => {
  if (week_distance == 1) return;
  week_distance--;
  date = decreaseWeeks();
  if (week_distance == 1) {
    recencyData.innerHTML = week_distance + " Week";
  } else {
    recencyData.innerHTML = week_distance + " Weeks";
  }
})


gearIcon.addEventListener("click", ()=> {
  gearIcon.classList.toggle("rotate");
  settingBox.classList.toggle("open");
})

// downIcon.addEventListener("click", () => {
//   displayCounter.classList.toggle("open");
//   downIcon.classList.toggle("rotate");
// })

enButton.classList.add("press");

enButton.addEventListener("click", ()=> { // Language = English
  language = "en";
  enButton.classList.add("press");
  esButton.classList.remove("press");
  zhButton.classList.remove("press");
})

esButton.addEventListener("click", ()=> { // Language = Spanish
  language = "es";
  esButton.classList.add("press");
  enButton.classList.remove("press");
  zhButton.classList.remove("press");
})

zhButton.addEventListener("click", ()=> { // // Language = Chinese
  language = "zh";
  zhButton.classList.add("press");
  enButton.classList.remove("press");
  esButton.classList.remove("press");
})



// FILTERS:

function authorFilter(jsonAuthor) {
  if (jsonAuthor === null) {
    return "Unknown"
  } else if (jsonAuthor.includes("http")) {
    let link = jsonAuthor;
    parts = link.split('/');
    return parts[parts.length - 1];
  } else if (jsonAuthor.includes("@")) {
    const regex = /\(([^)]+)\)/;
    const match = regex.exec(jsonAuthor);
    return match[1];
  } else { 
    var to_return;
    if (jsonAuthor.length >= 21) {
      to_return = jsonAuthor.substring(0, 21) + "..."
    } else {
      to_return = jsonAuthor.substring(0, 21)
    }
    return to_return;
  }
  
}

// const searchInput = document.querySelector(".type-input")

let articles = []


function increaseWeeks() {

  today.setDate(today.getDate() - 7);
  date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
  return date; 
}

function decreaseWeeks() {
  today.setDate(today.getDate() + 7);
  date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
  return date;
}

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
            'excludeDomains=lifehacker.com&' +
            'language=' + language + '&' +
            'from=' + date + '&' +
            'q=' + topic + '&'+
            'sortBy=relevancy&'+
            'apiKey='+ api_key;
        console.log(date);
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
           const linkIcon = newcard.querySelector(".exit-icon");

           author.textContent = authorFilter(article.author);
           title.textContent = article.title;
           date.textContent = article.publishedAt.substring(0, 10);
           company.textContent = article.source.name;
           linkIcon.addEventListener('click', () => {
             window.open(article.url);
           });

            container.append(newcard);

            card_count++;

          })
          
          if (card_count == 0) { // If no results found
            noResultsFound.classList.add("open");
            input.focus();
            input.select()
          }

          card_count = 0;
          
           
        });
    }
  })
