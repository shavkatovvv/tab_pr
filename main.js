const tab = document.querySelector(".tab");
const box = document.querySelector(".box");
const btn = document.getElementsByClassName(".btn")

import { getdata,getdataContent } from "./data.js"




const renderContent = async (path) => {
    const data = await getdataContent(path)
    

    box.innerHTML = data.map((item) => `
    <li class="items">
    <div class="item__img_block">
    <img class="item__img" src="${item.img}" alt="">
    </div>
    
    <h2 class="item__title">${item.title}</h2>
    <p class="item__price">${item.price}</p>
    <p class="item__text">${item.text}</p>
    </li>


    <li class="items">
    <div class="item__img_block">
    <img class="item__img" src="${item.img}" alt="">
    </div>
    
    <h2 class="item__title">${item.title}</h2>
    <p class="item__price">${item.price}</p>
    <p class="item__text">${item.text}</p>
    </li>


    
    
    `)
}



const renderTabname = async () => {
    const data = await getdata()
    
    tab.innerHTML = data.map((item) => `
    <button class="btn" data-path="${item.path}">${item.name}</button>
    
    `).join("")
    renderContent(data[0].path)

}




renderTabname()


tab.addEventListener("click", (e) => {
    if(e.target.dataset.path){
        renderContent(e.target.dataset.path)
    }
})


