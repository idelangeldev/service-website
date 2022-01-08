///////////////////////////////////////////////////////////
// Make Slider Work

const slides = document.querySelectorAll(".slider__slide");
const btns = document.querySelectorAll(".slider__btn");
let currentSlide = 1;

// Manual Navigation
const manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("slider__active");
    btns.forEach((slider__btn) => {
      slider__btn.classList.remove("slider__active");
    });
  });

  slides[manual].classList.add("slider__active");
  btns[manual].classList.add("slider__active");
};

btns.forEach((slider__btn, i) => {
  slider__btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

// Image slider autoplay navigation
const repeat = function (activeClass) {
  let active = document.getElementsByClassName("slider__active");
  let i = 1;

  const repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("slider__active");
      });

      slides[i].classList.add("slider__active");
      btns[i].classList.add("slider__active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
};
repeat();

///////////////////////////////////////////////////////////
// Make Tabs Appear
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) =>
      tabContent.classList.remove("activeTab")
    );
    tabs.forEach((tab) => tab.classList.remove("activeTab"));
    tab.classList.add("activeTab");
    target.classList.add("activeTab");
  });
});

////////////////////////////////////////////////////////////////
//// Makes cards appear smoothly
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.5,
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

///////////////////////////////////////////////////////////
// Make Mobile navigation work

const btnNavEL = document.querySelector(".mobile-nav__btn");
const headerEL = document.querySelector(".header");

btnNavEL.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Set current year
const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

///////////////////////////////////////////////////////////
// Smooth Scrolling Animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sectionEL.scrollIntoView({ behavior: "smooth" });
    }

    // Open other links
    if (!href.startsWith("#")) {
      window.open(href);
    }

    // Close Mobile Navigation
    if (link.classList.contains("nav__link"))
      headerEL.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky Navigation

const sectionHeroEL = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEL);
