'use strict'

//실시간으로 scrollY불러와서 navbarHeight와 비교해서 넘으면 색이 진해지도록 처리 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if (link == null) {
        return;
    } else {
    scrollIntoView(link);
}})

// Handling scrolling when tapping on the contactme button

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})

//home transparent animation
// 마이너스 값이 되면 그냥 두게 한건 내가 그냥 해봄
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(1 - window.scrollY/homeHeight >= 0){
    home.style.opacity = 1 - window.scrollY/homeHeight;
    } else {
        return;
    } 
})

// Arrow up
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible')
    }   
})

//Handle click on the "arrow up" button

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})

//Project
//Handling sort by project buttons

const workBtnContainer = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project')
const projectContainer = document.querySelector('.work__projects')
workBtnContainer.addEventListener('click', (e) => {  
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if( filter == null ){
        return; 
    }
    projectContainer.classList.add('anim-out');
    
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
})


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}



