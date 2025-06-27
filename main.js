// MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn?.querySelector("i");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks?.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// SCROLL REVEAL ANIMATIONS
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container p", { ...scrollRevealOption });
ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__container .header__flex", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".faq__image img", { ...scrollRevealOption, origin: "left" });
ScrollReveal().reveal(".article__card", { ...scrollRevealOption, interval: 500 });

// FAQ TOGGLE
const faq = document.querySelector(".faq__grid");
faq?.addEventListener("click", (e) => {
  const header = e.target.closest(".faq__header");
  if (!header) return;
  const faqCard = header.parentElement;
  if (faqCard.classList.contains("active")) {
    faqCard.classList.remove("active");
  } else {
    Array.from(faq.children).forEach((item) => item.classList.remove("active"));
    faqCard.classList.add("active");
  }
});

// SWIPER INIT
const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// CONTACT FORM SUBMIT
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
      alert("Form submitted successfully!");
      contactForm.reset();
    } else {
      alert("Error submitting form.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again later.");
  }
});
