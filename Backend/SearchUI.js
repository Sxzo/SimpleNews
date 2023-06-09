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
  "Time":[41.67,-7.33],
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
  "Vice News":[38.79,-9.98], 
  "Engadget":[44.41,-3.16],
  "Gizmodo.com":[39.34,-9.29],
  "Yahoo.com":[41.86,-6.09],
  "Boing Boing":[39.13,-7.05],
  "Wired":[36.62,-8.03],
  "BBC News":[44.56,-3.78],
  "The Economist":[43.97,-1.40],
  "Ars Technica":[46.34,-2.73],
  "CNET":[39.85,-1.77],
  "Nature.com":[46.38,-1.27],
  "The Atlantic":[38.34,-9.36],
  "Deadspin":[33.46,-12.61],
  "The Verge":[44.26,-6.09],
  "Business Insider":[44, -5.1],
  "Google News":[44, -5.1],
  "Yahoo Entertainment":[41.86,-6.09],
}

// -------- Search Settings ------------


// ----Display Settings:

displayCounterData = document.getElementById("counter-data")
displayAdd = document.querySelector(".plus-display-button");
displaySubtract = document.querySelector(".minus-display-button");
displayCounter = document.querySelector(".display-counter");

var display_count = 10; 
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



function handleEmptySearch() {
  clearCards();
  noResultsFound.classList.add("open");
}

function clearCards() {
  while (container.firstChild) {
    container.removeChild(container.firstChild); 
  }
}

function createSearchLink(topic) {
  link = 'https://newsapi.org/v2/everything?'+
      'excludeDomains=lifehacker.com&' +
      'language=' + language + '&' +
      'from=' + date + '&' +
      'q=' + topic + '&'+
      'sortBy=relevancy&'+
      'apiKey='+ api_key;
  return link
}

function createBiasMeter(newcard, article_object) {
  const biasMeter = newcard.querySelector(".bias-meter")
  const bias = newcard.getElementById("bias-data")
  biasMeter.addEventListener("mouseenter", (event) => {
    bias.style.opacity = 0;
    biasMeter.addEventListener("mouseleave", (event) => {
      bias.style.opacity = 1;
      setTimeout(function(){
        biasMeter.style.borderRadius = "50%";
        biasMeter.style.width = "20px";
        // bias.innerHTML = ""
        bias.style.opacity = 0;
      }, 100)
    })
    setTimeout(function(){
      biasMeter.style.borderRadius = "15px";
      biasMeter.style.width = "100px";
      if (article_object.bias >= -5 && article_object.bias <= 5) {
        bias.innerHTML = "Unbiased"
      } else if (article_object.bias > 5) { // Republican
        bias.innerHTML = "Conservative"
        biasMeter.style.width = "110px";
      } else if (article_object.bias < -5) { // Democrat
        bias.innerHTML = "Liberal"
      }
      bias.style.opacity = 1;
    }, 100)
  })

  if (article_object.bias >= -5 && article_object.bias <= 5) {
    biasMeter.style.background = "#4dc84f"
  } else if (article_object.bias > 5) { // Republican
    biasMeter.style.background = "#fa4545"
  } else if (article_object.bias < -5) { // Democrat
    biasMeter.style.background = "#3448fd"
  }
}

function createReliabilityMeter(newcard, article_object) {
  const reliability = newcard.getElementById("reliability-data");
  const reliabilityMeter = newcard.querySelector(".reliability-meter")
  reliability.innerHTML = article_object.reliability
  var meterColor
   
   reliabilityMeter.addEventListener("mouseenter", (event) => {
     reliability.style.opacity = 0;
     reliabilityMeter.addEventListener("mouseleave", (event) => {
      reliability.style.opacity = 0;
      setTimeout(function(){
        reliability.innerHTML = article_object.reliability;
        reliability.style.opacity = 1;
      }, 100)
      
    })
    
     setTimeout(function(){
       if (article_object.reliability > 6) {
         reliability.innerHTML = "Reliable"
       } else {
         reliability.innerHTML = "Unreliable"
       }
       reliability.style.opacity = 1;
     }, 100)
     
   })

  meterColor = "#66a6ff"
  reliabilityMeter.style.background = 
  "linear-gradient(90deg, " + meterColor + " " +  (article_object.reliability * 10) + "%, #8f8f8f " +  (article_object.reliability * 10) + "%)"; 
}

function handleDuplicates(articles) {
  company_list = []
  new_articles = []
  articles.forEach(article_object => {
    if (company_list.includes(article_object.company) || article_object.title.length > 90) {
    } else {
      new_articles.push(article_object);
      company_list.push(article_object.company);
    }
  })
  return new_articles;
}

function reliabilitySort(a, b) {
  // Sorts from most to least reliable
  if (a.reliability > b.reliability) return -1;
  if (a.reliability < b.reliability) return 1;
  return 0;
}

function dateSort(a, b) {
  split_date_a = a.date.split('-')
  split_date_b = b.date.split('-')
  a_date = new Date(split_date_a[0], split_date_a[1], split_date_a[2])
  b_date = new Date(split_date_b[0], split_date_b[1], split_date_b[2])

  current_date = new Date()

  a_dist = current_date - a_date
  b_dist = current_date - b_date

  if (a_dist > b_dist)  return 1;
  if (a_dist < b_dist) return -1;
  return 0; 
}

// Date Based Sort
function dateBasedReliabilitySort(articles) {
  new_articles = []
  date_list = []

  articles.forEach(article => {
    if (date_list.includes(article.date) == false) {
      date_list.push(article.date)
    }
  }) 

  date_list.forEach(date => {
    temp_list = []
    articles.forEach(article => {
      if (article.date == date) {
        temp_list.push(article)
      }
    })
    temp_list.sort(reliabilitySort)
    temp_list.forEach(article => {
      new_articles.push(article)
    })
  })
  return new_articles
}

function curateArticles(articles) {
  articles = handleDuplicates(articles);
  articles.sort(dateSort)
  articles = dateBasedReliabilitySort(articles)
  return articles;
}

function displayArticles(articles) {
  // If no articles were found: 
  if (articles.length == 0) {
      noResultsFound.classList.add("open");
      input.focus();
      input.select();
      card_count = 0;
      return;
  }


  articles.forEach(article_object => {
    console.log(card_count)
    // If display limit is reached:
    if (card_count == display_count) return; 

    const newcard = cardTemplate.content.cloneNode(true);
    const company = newcard.querySelector(".data-company"); 
    const title = newcard.querySelector(".title");
    const date = newcard.querySelector(".data-date");
    const linkIcon = newcard.querySelector(".exit-icon");

    title.textContent = article_object.title;
    date.textContent = formatDate(article_object.date);
    if (article_object.company == "Yahoo Entertainment") {
      company.textContent = "Yahoo";
    } else {
      company.textContent = article_object.company;
    }
    linkIcon.addEventListener('click', () => {
      window.open(article_object.url);
    });

    // If there's data on the article:
    if (article_object.rated == true) { 
      createReliabilityMeter(newcard, article_object); 
      createBiasMeter(newcard, article_object);
    } else {
      const biasMeter = newcard.querySelector(".bias-meter")
      biasMeter.style.display = "none"
    }

    container.append(newcard);
    card_count++;
  })
}


let articles = []

function search(input) {
  var link = createSearchLink(input)

   // Clear previous articles
  articles = []
  card_count = 0;    

  fetch(link).then(res => res.json()).then(data => {
    data.articles.forEach(article => {
      

      if (article.source.name in media_bias) {
        rated = true; 
        reliability_rating = (media_bias[article.source.name][0] / 5).toFixed(1)
        bias_rating = media_bias[article.source.name][1]
      } else {
        rated = false; 
        reliability_rating = 0;
        bias_rating = 0;
      }

      let article_object = {
        title: article.title,
        company: article.source.name,
        date: article.publishedAt.substring(0,10),
        url: article.url,
        reliability: reliability_rating,
        bias: bias_rating,
        rated: rated
      }

      articles.push(article_object)
    })
    console.log("Article count after search:", articles.length)

    new_articles = curateArticles(articles);
    displayArticles(new_articles);
     
  });
}
// Actual Search Process
input.addEventListener("keyup", function(event) { 
    if (event.key === 'Enter') {
        if (input.value == "") {
          handleEmptySearch();
          return;
        } else {
          clearCards();
          noResultsFound.classList.remove("open");
          search(input.value);
        }
    }
})