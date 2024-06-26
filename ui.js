const animation = document.querySelectorAll('.animation')

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entries)
        const { target } = entry;
        target.classList.toggle('active', entry.isIntersecting)
    })
},{})

animation.forEach(ani => {
    observer.observe(ani)
});


const initSlider = () => {
    const feedBackList = document.querySelector("#feedback-list");
    const slideButtons = document.querySelectorAll(".slide-button");
    const maxScrollLeft = feedBackList.scrollWidth - feedBackList.clientWidth;

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "pre-slide" ? -1 : 1;
            const scrollAmount = feedBackList.offsetWidth * direction;
            feedBackList.scrollBy({left: scrollAmount, behavior: "smooth"});
        })
    })

    
    const handleSlideButtons = () => {
        slideButtons[0].style.display = feedBackList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = feedBackList.scrollLeft >= maxScrollLeft ? "none" : "block"
    }
    feedBackList.addEventListener("scroll",() => {
    handleSlideButtons()
    })
}





window.addEventListener("load", initSlider);