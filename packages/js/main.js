/*==================== ELEMENT SELECTORS ====================*/
const selectors = {
  navMenu: document.getElementById("nav-menu"),
  navToggle: document.getElementById("nav-toggle"),
  navClose: document.getElementById("nav-close"),
  navLinks: document.querySelectorAll(".nav__link"),
  skillsContent: document.getElementsByClassName("skills__content"),
  skillsHeader: document.querySelectorAll(".skills__header"),
  tabs: document.querySelectorAll("[data-target]"),
  tabContents: document.querySelectorAll("[data-content]"),
  modalViews: document.querySelectorAll(".services__modal"),
  modalBtns: document.querySelectorAll(".services__button"),
  modalCloses: document.querySelectorAll(".services__modal-close"),
  themeButton: document.getElementById("theme-button"),
  header: document.getElementById("header"),
  scrollUpBtn: document.getElementById("scroll-up"),
  sections: document.querySelectorAll("section[id]")
};

/*==================== MENU SHOW & HIDE ====================*/
if (selectors.navToggle) {
  selectors.navToggle.addEventListener("click", () => {
    selectors.navMenu.classList.add("show-menu");
    selectors.navToggle.setAttribute("aria-expanded", "true");
  });
}

if (selectors.navClose) {
  selectors.navClose.addEventListener("click", () => {
    selectors.navMenu.classList.remove("show-menu");
    selectors.navToggle.setAttribute("aria-expanded", "false");
  });
}

/*==================== REMOVE MENU ON MOBILE ====================*/
selectors.navLinks.forEach(link => 
  link.addEventListener("click", () => {
    selectors.navMenu.classList.remove("show-menu");
  })
);

/*==================== ACCORDION SKILLS ====================*/
function toggleAccordionSkills() {
  let itemClass = this.parentNode.className;
  Array.from(selectors.skillsContent).forEach(content => {
    content.className = "skills__content skills__close";
  });
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

selectors.skillsHeader.forEach(header => 
  header.addEventListener("click", toggleAccordionSkills)
);

/*==================== QUALIFICATION TABS ====================*/
selectors.tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    selectors.tabContents.forEach(content => content.classList.remove("qualification__active"));
    target.classList.add("qualification__active");

    selectors.tabs.forEach(t => t.classList.remove("qualification__active"));
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
function openModal(modalIndex) {
  selectors.modalViews[modalIndex].classList.add("active-modal");
}

selectors.modalBtns.forEach((button, i) => 
  button.addEventListener("click", () => openModal(i))
);

selectors.modalCloses.forEach(closeBtn => 
  closeBtn.addEventListener("click", () => 
    selectors.modalViews.forEach(modal => modal.classList.remove("active-modal"))
  )
);

/*==================== PORTFOLIO SWIPER  ====================*/
new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

/*==================== TESTIMONIAL SWIPER ====================*/
new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
function scrollActive() {
  const scrollY = window.pageYOffset;
  selectors.sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}

/*==================== CHANGE BACKGROUND HEADER & SHOW SCROLL-UP ====================*/
function handleScroll() {
  // Scroll Header Background
  if (window.scrollY >= 80) selectors.header.classList.add("scroll-header");
  else selectors.header.classList.remove("scroll-header");

  // Scroll Up Button Visibility
  if (window.scrollY >= 560) selectors.scrollUpBtn.classList.add("show-scroll");
  else selectors.scrollUpBtn.classList.remove("show-scroll");
}

/*==================== DARK LIGHT THEME ====================*/
const darkThemeClass = "dark-theme";
const iconThemeClass = "uil-sun";
const selectedTheme = localStorage.getItem("user-selected-theme");
const selectedIcon = localStorage.getItem("user-selected-icon");

// Set Initial Theme
if (selectedTheme) {
  document.body.classList.toggle(darkThemeClass, selectedTheme === "dark");
  selectors.themeButton.classList.toggle(iconThemeClass, selectedIcon === "uil-moon");
}

function toggleTheme() {
  document.body.classList.toggle(darkThemeClass);
  selectors.themeButton.classList.toggle(iconThemeClass);
  localStorage.setItem("user-selected-theme", document.body.classList.contains(darkThemeClass) ? "dark" : "light");
  localStorage.setItem("user-selected-icon", selectors.themeButton.classList.contains(iconThemeClass) ? "uil-moon" : "uil-sun");
}

selectors.themeButton.addEventListener("click", toggleTheme);

/*==================== EVENT LISTENERS ====================*/
window.addEventListener("scroll", throttle(scrollActive, 100));
window.addEventListener("scroll", throttle(handleScroll, 100));

/*==================== UTILITY FUNCTIONS ====================*/
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

