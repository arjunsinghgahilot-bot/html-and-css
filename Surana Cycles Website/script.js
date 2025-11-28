// Mobile Menu Toggle
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("open");
}

// Contact Form Validation
function validateForm() {
    const name = document.getElementById("name")?.value;
    const message = document.getElementById("message")?.value;

    if (!name || !message) {
        alert("Please fill in all fields.");
        return false;
    }
    alert("Message Sent!");
    return true;
}
