inputBox = document.querySelector(".input-box");
searchIcon = document.querySelector(".icon");
closeIcon = document.querySelector(".close-icon");
title = document.querySelector(".header")
postTitle = document.querySelector(".post-header")
gearIcon = document.querySelector(".gear-icon");
settingBox = document.querySelector(".setting-box");

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
})

gearIcon.addEventListener("click", ()=> {
    gearIcon.classList.toggle("rotate");
    settingBox.classList.toggle("open");
})
  
