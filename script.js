let add = document.querySelector("#addBtn");
let formC = document.querySelector(".form-container");
let close = document.querySelector("#closeBtn");
let form = document.querySelector("form");
let imageInput   = document.querySelector("input[name='image']");
let nameInput    = document.querySelector("input[name='name']");
let purposeInput = document.querySelector("input[name='purpose']");
let cityInput    = document.querySelector("input[name='city']");
let back =document.querySelector(".back");
  let cardStack = document.getElementById("cardStack");
  let stack = document.querySelector(".stack");
  let next = document.querySelector(".next");

// ✅ Save to localStorage safely
function savetolocalstorage(obj) {
  let oldtask = JSON.parse(localStorage.getItem("task")) || [];
  oldtask.push(obj);
  localStorage.setItem("task", JSON.stringify(oldtask));
}

// ✅ Show form
add.addEventListener("click", function(evt) {
  evt.preventDefault();
  formC.style.display = "initial";
});

// ✅ Hide form
close.addEventListener("click", function() {
  formC.style.display = "none";
});

// ✅ Handle form submit
form.addEventListener("submit", function(evt) {
  evt.preventDefault();

  if (imageInput.value.trim() === "") {
    alert("Please fill the image URL");
    return;
  }
  if (nameInput.value.trim() === "") {
    alert("Please fill the name");
    return;
  }
  if (purposeInput.value.trim() === "") {
    alert("Please fill the purpose");
    return;
  }
  if (cityInput.value.trim() === "") {
    alert("Please fill the city");
    return;
  }

  // Save data
  savetolocalstorage({
    image: imageInput.value,
    name: nameInput.value,
    purpose: purposeInput.value,
    city: cityInput.value
    // priority: "Emergency"  
  });

  form.reset();
  formC.style.display = "none"; // hide after submit
  showcards();
});

// ✅ Render cards
// ✅ Render cards
function showcards() {
  let alltask = JSON.parse(localStorage.getItem("task")) || [];

  cardStack.innerHTML = ""; // clear old cards

  alltask.forEach((task, index) => {
    // Card wrapper
    let card = document.createElement("div");
    card.classList.add("card");

    // Avatar (image)
    let img = document.createElement("img");
    img.src = task.image;
    img.alt = task.name;
    img.classList.add("avatar");
    card.appendChild(img);

    // Name
    let h2 = document.createElement("h2");
    h2.textContent = task.name;
    card.appendChild(h2);

    // Purpose
    let h3 = document.createElement("h3");
    h3.textContent = task.purpose;
    card.appendChild(h3);

    // City
    let city = document.createElement("p");
    city.innerHTML = `<strong>City:</strong> ${task.city}`;
    card.appendChild(city);

    // Buttons
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.innerHTML = `
      <button class="call">Call</button>
      <button class="msg">Message</button>
      <button class="delete">Delete</button>
    `;
    card.appendChild(buttons);

    // 🗑️ Delete button event
    buttons.querySelector(".delete").addEventListener("click", function () {
      let tesk = JSON.parse(localStorage.getItem("task")) || [];
      tesk.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tesk))
      showcards(); // re-render after delete
    });

    // Add card to stack
    cardStack.appendChild(card);
  });
}


// ✅ Load cards when page opens
showcards();
back.addEventListener("click",function(){
  let lastelement =stack.lastElementChild;
  if(lastelement){
    stack.insertBefore(lastelement,stack.firstElementChild)
  }
  updatecards();
  
});
next.addEventListener("click",function(){
  let first = stack.firstElementChild;
  if(first){
    stack.append(first);
  }
 updatecards();
});
 function updatecards(){
  let cards = document.querySelectorAll(".stack  .card");
  for(let i =0; i<=3;i++){
        cards.style.zIndex = 3 - i;
    cards.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
    cards.style.opacity = `${1 - i * 0.02}`;
  }
 }


