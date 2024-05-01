let input = document.querySelector("#userInput");
const btn = document.querySelector("#submit-btn");
const showContainer = document.querySelector("#show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());
let ts = "1714568293679";
// *publicKey = ea0184caab6119e1b3b7c3b007a18d17
// *privateKey = 280fc3b6524da77eaab331db318cd5c8fe4a7754
let publicKey = "ea0184caab6119e1b3b7c3b007a18d17";
let hashVal = "0d123b28a762824c19d4340fd4f7eda4";
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}
input.addEventListener("keyup", async() => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const data = await response.json();
    data.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`
        listContainer.appendChild(div);
    })
})


btn.addEventListener("click", (getResult = async() => {
    if (input.value.trim().length < 1) {
        document.querySelector(".notice").innerHTML = `<p class="msg">Input cannot be blank.</p>`
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const data = await response.json();
    data.data["results"].forEach((element) => {
        showContainer.innerHTML = `<div class="card-container">
          <div class="container-character-image">
          <img src="${
            element.thumbnail["path"] + "." + element.thumbnail["extension"]
          }"/></div>
          <div class="character-name">${element.name}</div>
          <div class="character-description">${element.description}</div>
          </div>`;
    });
}))

window.onload = () => {
    getResult();
}