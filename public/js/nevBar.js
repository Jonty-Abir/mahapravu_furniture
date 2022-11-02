const clickToCloseAndOpen= document.querySelector(".for-toggle");
const header= document.querySelector(".header");

clickToCloseAndOpen.addEventListener("click",()=>{
  header.classList.toggle('active');
});






