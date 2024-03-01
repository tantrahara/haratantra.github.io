// ads carousel
var splide = new Splide( '.splide' );
splide.mount();

// product selection
let scrollContainer = document.querySelector(".selection");
let nextBtn = document.getElementById("nextBtn");
let backBtn = document.getElementById("backBtn");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
})

nextBtn.addEventListener("click", () =>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 1215;
});

backBtn.addEventListener("click", () =>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 1215;
});