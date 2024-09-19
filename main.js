const tab = document.querySelector(".tab");
const box = document.querySelector(".box");
const div = document.querySelector(".cost_main_block");
const counterDisplay = document.getElementsByClassName(".count");

const totalPriceDisplay = document.querySelector(".total-price");

import { getdata, getdataContent } from "./data.js";

const items = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];

  div.innerHTML = data.map((item, index) => `
    <li class="itemss">
      <div class="item__img_block">
        <img class="item__img" src="${item.img}" alt="">
      </div>
      <h2 class="item__title">${item.title}</h2>
      <p class="item__price">${item.price}</p>
      <p class="item__text">${item.text}</p>
      <button class="del" data-id="${index}">delete</button>
      <p class="count">count: ${item.count || 1}</p>
    </li>
  `).join("");

  div.addEventListener('click', (e) => {
    if (e.target.classList.contains('del')) {
      const id = e.target.dataset.id;
      data.splice(id, 1);
      localStorage.setItem("datas", JSON.stringify(data));
      items();
      updateCounter();
      updateTotalPrice();
    }
  });
};

const local = (item) => {
  const olddata = JSON.parse(localStorage.getItem("datas")) || [];
  const existingItem = olddata.find(dataItem => dataItem.id === item.id);

  if (existingItem) {
    existingItem.count = (existingItem.count || 1) + 1;
  } else {
    item.count = 1;
    olddata.push(item);
  }

  localStorage.setItem("datas", JSON.stringify(olddata));
  items();
  updateCounter();
  updateTotalPrice();
};

const renderContent = async (path) => {
  const data = await getdataContent(path);

  box.innerHTML = data.map((item) => `
    <li class="items">
      <div class="item__img_block">
        <img class="item__img" src="${item.img}" alt="">
      </div>
      <h2 class="item__title">${item.title}</h2>
      <p class="item__price">${item.price}</p>
      <p class="item__text">${item.text}</p>
      <button data-id="${item.id}" data-item='${JSON.stringify(item)}' class="buttonn">add</button>
    </li>
  `).join("");
};

const renderTabname = async () => {
  const data = await getdata();

  tab.innerHTML = data.map((item) => `
    <button class="btn" data-path="${item.path}">${item.name}</button>
  `).join("");
  renderContent(data[0].path);
};

tab.addEventListener("click", (e) => {
  if (e.target.dataset.path) {
    renderContent(e.target.dataset.path);
  }
});

box.addEventListener("click", (e) => {
  if (e.target.classList.contains('buttonn')) {
    const item = JSON.parse(e.target.dataset.item);
    local(item);
  }
});

const updateCounter = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];
  const totalCount = data.reduce((sum, item) => sum + (item.count || 1), 0);
  counterDisplay.textContent = `Total items: ${totalCount}`;
};

const updateTotalPrice = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];
  const totalPrice = data.reduce((sum, item) => sum + (item.price * (item.count || 1)), 0);
  totalPriceDisplay.textContent = `Total price: $${totalPrice.toFixed(2)}`;
};


updateCounter();
updateTotalPrice();
renderTabname();
items();
