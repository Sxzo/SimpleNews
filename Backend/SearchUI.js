// -------- Search Settings ------------

// ----Display Settings:

displayCounterData = document.getElementById("counter-data")
displayAdd = document.querySelector(".plus-display-button");
displaySubtract = document.querySelector(".minus-display-button");
displayCounter = document.querySelector(".display-counter");

var display_count = 5; 
var card_count = 0;
var display_count_max = 50;

displayCounterData.innerHTML = display_count; 

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

// ----Language Settings:

enButton = document.querySelector(".en-button");
esButton = document.querySelector(".es-button");
zhButton = document.querySelector(".zh-button");

var language = "en"; 

enButton.classList.add("press"); // <--- Sets default language

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

// ----Recency Settings:

recencyData = document.getElementById("recency-data");
recencyAdd = document.querySelector(".recency-plus");
recencySubtract = document.querySelector(".recency-minus");

var today = new Date();
today.setDate(today.getDate() - 7);
var date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
var week_distance = 1;

if (week_distance == 1) {
    recencyData.innerHTML = week_distance + " Week";
} else {
    recencyData.innerHTML = week_distance + " Weeks";
} 

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

// -------------------------------------



// -------- Search Function & Filter ------------

input = document.querySelector(".type-input");
var api_key = "2729f7e2011b43d7be77e7b60bc97701";

card = document.querySelector(".card"); 
container = document.querySelector(".card-container");
cardTemplate = document.querySelector(".card-template");
noResultsFound = document.querySelector(".no-results-found");
linkIcon = document.querySelector(".exit-icon");

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);
    return `${month} ${day}${suffix}, ${year}`;
  }
  
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
}

let articles = []

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
        fetch(link).then(res => res.json()).then(data => {
          data.articles.forEach(article => {
            
            // Search result limiter
            if (card_count == display_count) {
              return; 
            }

            const newcard = cardTemplate.content.cloneNode(true);
            const company = newcard.querySelector(".data-company"); 
            const title = newcard.querySelector(".title");
            const date = newcard.querySelector(".data-date");
            const linkIcon = newcard.querySelector(".exit-icon");
            const card = newcard.querySelector(".card");
            const subheader = newcard.querySelector(".cardSubheader");
            const reliabilitymeter = newcard.querySelector(".reliability-meter");
            const biasmeter = newcard.querySelector(".bias-meter");
 
            title.textContent = article.title;
            date.textContent = formatDate(article.publishedAt.substring(0, 10));
            company.textContent = article.source.name;
 
            linkIcon.addEventListener('click', () => {
              window.open(article.url);
            });
 
            titleLength = article.title.length;
 
            if (titleLength >= 94) {
             card.style.height = 165 + "px";
             title.style.transform = "translateY(-130px)";
             subheader.style.transform = "translateY(-120px)";
             reliabilitymeter.style.transform = "translateY(23px)";
             biasmeter.style.transform = "translateY(23px)";
             // card.addEventListener('mouseover', () => {
             //   card.style.height = 155 + "px";
             // });
             
             // card.addEventListener('mouseout', () => {
             //   card.style.height = 120 + "px";
             // });
            }
            if (titleLength >= 135) {
              card.style.height = 190 + "px";
              title.style.height = 120 + "px";
              title.style.transform = "translateY(-125px)";
              subheader.style.transform = "translateY(-110px)";
              reliabilitymeter.style.transform = "translateY(60px)";
              biasmeter.style.transform = "translateY(60px)";
            }

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