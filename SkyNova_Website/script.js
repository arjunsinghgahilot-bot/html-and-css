document.addEventListener("DOMContentLoaded", () => {

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav ul");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}


const currentLocation = location.href;
const navLink = document.querySelectorAll("nav ul li a");

for (let link of navLink) {
  if (link.href === currentLocation) {
    link.classList.add("active");
  }
}

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
}

function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

setInterval(nextSlide, 3000);

const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (name === "" || email === "" || message === "") {
        alert("⚠️ Please fill in all fields before submitting!");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("❌ Please enter a valid email address!");
        return;
      }

      alert(`✅ Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }


});