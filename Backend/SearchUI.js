// File to declare the media bias dictionary
// Source: https://adfontesmedia.com/interactive-media-bias-chart/


// Dictionay of companies that maps to a tuple
// First entry of tuple is reliablity
// Second entry of tuple is bias. Negative bias is left-leaning, Positive is right-leaning

media_bias = {
  "ABC News":[46.70,-4.41],
  "CBS News":[44.28,-3.22],
  "CNBC":[45.15,-2.37],
  "NBC News":[45.26,-6.67],
  "PBS":[47.92,-4.92],
  "NewsNation":[44.78,0.23],
  "The Hill":[43.36,-1.21],
  "Insider":[42.50,-5.29],
  "CNN":[42.43,-7.47],
  "Forbes":[41.15,-3.72],
  "Reuters":[47.40,-1.37],
  "Wall Street Journal":[44.36,5.49],
  "Fox News":[36.91,12.07],
  "World News Group":[41.23,7.37],
  "New York Post":[34.28,10.08],
  "Daily Mail":[34.12,2.90],
  "Newsweek":[36.02,-4.35],
  "Washington Examiner":[33.12,13.18],
  "Daily Wire":[33.14,13.79],
  "Newsmax":[30.46,15.37],
  "The Blaze":[28.21,18.02],
  "The Federalist":[23.55,20.43],
  "Bill O'Reilly":[21.72,25.55],
  "InfoWars":[13.62,27.15],
  "American Libery Report":[10.81,29.13],
  "Natural News":[8.25,30.20],
  "USA Today":[41.31,-4.95],
  "NPR":[43.33,-4.68],
  "Foreign Policy":[42.67,-2.56],
  "Time Magazine":[41.67,-7.33],
  "The New York Times":[42.47,-7.75],
  "The Guardian":[42.14,-8.46],
  "Vox":[40.27,-9.85],
  "HuffPost":[39.23,-11.20],
  "Washington Post":[38.42,-8.80],
  "Rolling Stone":[39.67,-7.33],
  "Daily Beast":[35.66,-12.75],
  "The New Yorker":[40.39,-12,42],
  "MSNBC":[35.14,-14.15],
  "Vanity Fair":[32.35,-14,45],
  "AlterNet":[25.76,-17.82],
  "BuzzFeed News":[32.25,-8],
  "Google News":[50, 100]
}

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
           const reliability = newcard.getElementById("reliability-data");
           const bias = newcard.getElementById("bias-data");
           const reliabilityMeter = newcard.querySelector(".reliability-meter")
           const biasMeter = newcard.querySelector(".bias-meter")

           // First entry of tuple is reliablity
           // Second entry of tuple is bias. Negative bias is left-leaning, Positive is right-leaning
            // media_bias[article.source.name] === undefined

            // Neutral, Left, Right, Conservative, Liberal
            if (article.source.name in media_bias) { // If there's data on the article
              rel_rating = (media_bias[article.source.name][0] / 5).toFixed(1)
              reliability.innerHTML = rel_rating
              reliabilityMeter.style.background = 
              "linear-gradient(90deg, #388bff " +  (rel_rating * 10) + "%, #717171 " +  (rel_rating * 10) + "%)";
              
              

              if (media_bias[article.source.name][1] >= -5 && media_bias[article.source.name][1] <= 5) {
                bias.innerHTML = "Neutral"
                
              } else if (media_bias[article.source.name][1] > 5) {
                bias.innerHTML = "Republican"
                // biasMeter.style.backgroundColor = "#c20017"
                biasMeter.style.backgroundColor = "#fa4545"
              } else if (media_bias[article.source.name][1] < -5) {
                bias.innerHTML = "Democrat"
                // biasMeter.style.backgroundColor = "#005ab5"
                biasMeter.style.backgroundColor = "#3e2cff"
              }

            }

           title.textContent = article.title;
           date.textContent = formatDate(article.publishedAt.substring(0, 10));
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