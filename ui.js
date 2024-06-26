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
    const feedBack = document.querySelector("")
}