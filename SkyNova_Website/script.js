document.addEventListener("DOMContentLoaded", () => {

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav ul");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
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

});