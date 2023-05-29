document.getElementById("tags-title").style.background = `url("resources/header_element_short_${Math.floor(Math.random() * 4 + 1)}.svg") no-repeat`;
document.getElementById("tags-title").style.backgroundSize = "100% 100%";
document.getElementById("bookmarks-header-title").style.background = `url("resources/header_element_long_${Math.floor(Math.random() * 4 + 1)}.svg") no-repeat`;
document.getElementById("bookmarks-header-title").style.backgroundSize = "100% 100%";

let regularElementsWithBorder = document.querySelectorAll('.border:not(.header-element)');
let regularElementsWithBorderArray = Array.prototype.slice.call(regularElementsWithBorder);
regularElementsWithBorderArray.forEach(function(elem){
  elem.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;
  elem.addEventListener("mouseover", function(){this.style.borderImage = `url("resources/border_dark_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
  elem.addEventListener("mouseleave", function(){this.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
});

let regularElementsWithSmallBorder = document.querySelectorAll('.border-small:not(.header-element)');
let regularElementsWithSmallBorderArray = Array.prototype.slice.call(regularElementsWithSmallBorder);
regularElementsWithSmallBorderArray.forEach(function(elem){
  elem.style.borderImage = `url("resources/border_small_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;
  elem.addEventListener("mouseover", function(){this.style.borderImage = `url("resources/border_small_dark_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;});
  elem.addEventListener("mouseleave", function(){this.style.borderImage = `url("resources/border_small_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;});
});