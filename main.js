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
    navbarMenu.classList.remove('open');
}})

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
}); 

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

const workBtnContainer = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project')
const projectContainer = document.querySelector('.work__projects')
workBtnContainer.addEventListener('click', (e) => {  
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if( filter == null ){
        return; 
    }

    // Remove selection from the previous item and select the new one

    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    e.target.classList.add('selected');
    // 왠지 모르겠지만 span을 클릭했을 때에도 e.target이 button으로 나오고 있다. 
    // 일단은 잘 작동하니 넘어가지만 문제가 될 경우 다시 한번 확인할 필요 있다. 
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

const sectionIds = [
    '#home',
    '#about',
    '#skill',
    '#work',
    '#testimonials',
    '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
    const selectNavbarbyentry = 
        document.querySelector(`[data-link="#${entry.target.id}"`);

    if(entry.isIntersecting){
        selectNavbarbyentry.classList.add('active');
    } else {
        selectNavbarbyentry.classList.remove('active');
    }
    });

};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));
