let openbar = document.getElementById("opennav");
let closebar = document.getElementById("closenav");
let container = document.getElementById("navcontent");

openbar.addEventListener("click", function() {
    container.style.display = "block";
    container.style.transition = "5s";
});
closebar.addEventListener("click", function() {
    container.style.display = "none";
});
