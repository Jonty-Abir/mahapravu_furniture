/*=================
swiper js
================?*/
let swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  // autoplay:{
  //   delay:5000,
  //   disableOnInteraction:false
  // },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// function([string1, string2],target id,[color1,color2])    
consoleText(['Welcome To Mahapravu Furniture.', 'Thanks for visiting us.',"Thank You💐"], 'text',['turquoise','#a0f669','mediumorchid']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  setInterval(function() {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}


// scrollbar button

const footerElement= document.querySelector("#footer");
const scrollElement= document.createElement("div");
const sectionHero= document.querySelector(".section-hero");
scrollElement.classList.add("scrollType-style-top");


scrollElement.innerHTML=`<span class="material-symbols-outlined scroll-icone">
keyboard_double_arrow_up
</span>`;
footerElement.after(scrollElement);

const scrollToTop=()=>{
  sectionHero.scrollIntoView({behavior:"smooth"});
}

scrollElement.addEventListener("click",scrollToTop);




/// img ref
/*
const imgRef= document.querySelector("img[data-src]");
const leazyLoad=(entrise)=>{
  const [entry]=entrise;
  // console.log(entry)
  if(!entry.isIntersecting )return
  entry.target.src= imgRef.dataset.src;
};
const imgObserver= new IntersectionObserver(leazyLoad,{root:null,threshold:0});
imgObserver.observe(imgRef);
*/