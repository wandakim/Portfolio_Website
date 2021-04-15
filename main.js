'use strict'

//실시간으로 scrollY불러와서 navbarHeight와 비교해서 넘으면 색이 진해지도록 처리 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
});

// Handle scrolling when tapping on the navbar menu
//navbar menu 요소를 클릭하면 이벤트가 실행되도록 하기. 
// event.target 하면 클릭한 요소가 출력된다. 
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link == null) {
        return;
    } else {
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: "smooth"});
}})



