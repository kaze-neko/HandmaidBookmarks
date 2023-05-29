let selectedTags = [];

window.onload = async function() {
  // drawing all tags
  getTags();
  //getting bookmarks
  getBookmarks();
}

function reListenTags() {
  let tags = Array.prototype.slice.call(document.querySelectorAll('.tag-checkbox'));
  tags.forEach(function(elem){
    elem.addEventListener('change', async function() {
      if (this.checked) {
        selectedTags.push(this.id);
      } else {
        selectedTags.pop(this.id);
      }
      getBookmarks();
    });
  });
}

function drawBorderForTags() {
  let tags = document.querySelectorAll('.tag');
  let tagsArray = Array.prototype.slice.call(tags);
  tagsArray.forEach(function(elem){
    elem.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;
    elem.addEventListener("mouseover", function(){this.style.borderImage = `url("resources/border_dark_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
    elem.addEventListener("mouseleave", function(){this.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
  });
}

function drawBorderForBookmarks() {
  let bookmarks = document.querySelectorAll('.border.bookmark-border');
  let bookmarksArray = Array.prototype.slice.call(bookmarks);
  bookmarksArray.forEach(function(elem){
    elem.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;
    elem.addEventListener("mouseover", function(){this.style.borderImage = `url("resources/border_dark_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
    elem.addEventListener("mouseleave", function(){this.style.borderImage = `url("resources/border_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 25`;});
  });
  bookmarks = document.querySelectorAll('.border-small.bookmark-border');
  bookmarksArray = Array.prototype.slice.call(bookmarks);
  bookmarksArray.forEach(function(elem){
    elem.style.borderImage = `url("resources/border_small_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;
    elem.addEventListener("mouseover", function(){this.style.borderImage = `url("resources/border_small_dark_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;});
    elem.addEventListener("mouseleave", function(){this.style.borderImage = `url("resources/border_small_light_${Math.floor(Math.random() * 4 + 1)}.svg") 5 5`;});
  });
}

async function getBookmarks() {
  let response = await fetch(`http://localhost:8080/HandmaidBookmarks/server/bookmarks/?tags=${selectedTags.join(",")}`);
  if (response.ok) {
    let bookmarks = await response.json();
    let bookmarkElements = document.getElementsByClassName("bookmark");
    while(bookmarkElements.length > 0){
      bookmarkElements[0].parentNode.removeChild(bookmarkElements[0]);
    }
    bookmarks.forEach(function(bookmark){
      let bookmarkElement = document.createElement('div');
      bookmarkElement.setAttribute('id', "bookmark-ID_" + bookmark.id);
      bookmarkElement.setAttribute('class', 'bookmark');
      let bookmarkLink = document.createElement('a');
      bookmarkLink.setAttribute('id', "bookmark-title-ID_" + bookmark.id);
      bookmarkLink.setAttribute('class', 'bookmark-title border bookmark-border');
      bookmarkLink.setAttribute('href', bookmark.url);
      bookmarkLink.innerHTML = bookmark.title;
      let bookmarkTags = document.createElement('p');
      bookmarkTags.setAttribute('id', "bookmark-tags-ID_" + bookmark.id);
      bookmarkTags.setAttribute('class', 'bookmark-tags border-small bookmark-border');
      bookmarkTags.setAttribute('title', bookmark.tags);
      bookmarkTags.innerHTML = "Tags";
      let bookmarkButton = document.createElement('button');
      bookmarkButton.setAttribute('id', "bookmark-delete-ID_" + bookmark.id);
      bookmarkButton.setAttribute('class', 'bookmark-remove-button border-small bookmark-border');
      bookmarkButton.setAttribute('onclick', `deleteBookmarkById(${bookmark.id})`);
      bookmarkButton.innerHTML = "X";
      let parent = document.getElementById("bookmarks-content");
      bookmarkElement.appendChild(bookmarkLink);
      bookmarkElement.appendChild(bookmarkTags);
      bookmarkElement.appendChild(bookmarkButton);
      parent.prepend(bookmarkElement);
    });
    drawBorderForBookmarks();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

async function getTags() {
  console.log("!");
  let response = await fetch(`http://localhost:8080/HandmaidBookmarks/server/bookmarks/tags`);
  if (response.ok) {
    let tags = await response.json();
    let tagElements = document.getElementsByClassName("tag");
    let tagCheckboxElements = document.getElementsByClassName("tag-checkbox");
    while(tagElements.length > 0){
      tagElements[0].parentNode.removeChild(tagElements[0]);
    }
    while(tagCheckboxElements.length > 0){
      tagCheckboxElements[0].parentNode.removeChild(tagCheckboxElements[0]);
    }
    tags.forEach(function(elem){
      let tagInput = document.createElement('input');
      tagInput.setAttribute('type', 'checkbox');
      tagInput.setAttribute('id', elem);
      tagInput.setAttribute('class', 'tag-checkbox hidden');
      let tagLabel = document.createElement('label');
      tagLabel.setAttribute('for', elem);
      tagLabel.setAttribute('class', 'tag border');
      tagLabel.innerHTML = elem;
      let parent = document.getElementById("tags");
      parent.appendChild(tagInput);
      parent.appendChild(tagLabel);
    });
    drawBorderForTags();
    reListenTags();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

async function deleteBookmarkById(id) {
  let response = await fetch(`http://localhost:8080/HandmaidBookmarks/server/bookmarks/${id}`,{method: 'DELETE'});
  if (response.ok) {
    getTags();
    reListenTags();
    getBookmarks();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}


let createButton = document.getElementById("bookmarks-header-create-button");
createButton.addEventListener("click", function(){
  document.getElementById("bookmark-new").setAttribute('class', '');
  document.getElementById("bookmark-new-title").value = "";
  document.getElementById("bookmark-new-tags").value = "";
  document.getElementById("bookmark-new-url").value = "";
});

let cancelButton = document.getElementById("bookmark-new-cancel");
cancelButton.addEventListener("click", function(){
  document.getElementById("bookmark-new").setAttribute('class', 'hidden');
});

let saveButton = document.getElementById("bookmark-new-save");
saveButton.addEventListener("click", function(){
  let newBookmark = new Object();
  newBookmark.title = document.getElementById("bookmark-new-title").value;
  newBookmark.tags = document.getElementById("bookmark-new-tags").value.replace(/\s/g, '').split(",");
  newBookmark.url = document.getElementById("bookmark-new-url").value;
  let newBookmarkJSON = JSON.stringify(newBookmark);
  fetch("http://localhost:8080/HandmaidBookmarks/server/bookmarks/", {
    method: "POST",
    body: newBookmarkJSON,
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }).then(()=>{
    getTags();
    reListenTags();
    getBookmarks();
    document.getElementById("bookmark-new").setAttribute('class', 'hidden');
  });
  console.log(newBookmarkJSON);
});