//start animation
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
//end animation





// start scroll feedback
// const initSlider = () => {
//     const feedBackList = document.querySelector("#feedback-list");
//     const slideButtons = document.querySelectorAll(".slide-button");
//     const maxScrollLeft = feedBackList.scrollWidth - feedBackList.clientWidth;

//     slideButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const direction = button.id === "pre-slide" ? -1 : 1;
//             const scrollAmount = feedBackList.offsetWidth * direction;
//             feedBackList.scrollBy({left: scrollAmount, behavior: "smooth"});
//         })
//     })

    
//     const handleSlideButtons = () => {
//         slideButtons[0].style.display = feedBackList.scrollLeft <= 0 ? "none" : "block";
//         slideButtons[1].style.display = feedBackList.scrollLeft >= maxScrollLeft ? "none" : "block"
//     }
//     feedBackList.addEventListener("scroll",() => {
//     handleSlideButtons()
//     })
// }

// window.addEventListener("load", initSlider);
const initSlider = () =>{
    const imageList = document.querySelector("#slider-wrapper #image-list")
    const slideButtons = document.querySelectorAll("#slider-wrapper .slide-button")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const sliderScrollbar = document.querySelector("#container .slider-scrollbar")
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb")


    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX; 
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; 

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition,newThumbPosition))
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`

            imageList.scrollLeft = scrollPosition;
        }

        //remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        // add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    })



    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        })
    })
//kéo hết qua tría thì nút biến mất và tương tự bên phải
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";   // bug kéo chưa hết đã mất nút
    }


    // update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load",initSlider);

//end scroll feedback









//start CRUD feedback
var getURL = 'http://localhost:3000/feedBack'

function start() {
    getFeedBacks(renderFeedback)
    handleCreateFeedbacks()
}

start()

    //function
function getFeedBacks(callback) {
    fetch(getURL)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}

    //create
function createFeedback(data, callback){
    var options = {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(getURL, options)
        .then((response) => {
            response.json()
        })
        .then(callback)
}

    //end create

    //render
    function renderFeedback(feedbacks){
        var listFb = document.querySelector('#image-list')
        var htmls = feedbacks.map((feedback) => {
            console.log(typeof feedback.id);
            return `
                <div class="feedback">
                    <div class="name">${feedback.name}</div>
                    <hr>
                    <div class="opinion">${feedback.feedBack}</div>
                    <button onclick="handleDeleteFeedback('${feedback.id}')">&times; xóa</button>
                </div>
            `
        })
        // listFb.innerHTML = htmls.join('')    // hiển thị ra giao diện
    }
    // end render

    //add
    function handleCreateFeedbacks(){
        var createBtn = document.getElementById('addFb')

        createBtn.onclick = function() {
            var name = document.querySelector('input[name="name"]').value
            var feedBack = document.querySelector('input[name="feedbackContent"]').value


            var formData = {
                name: name,
                feedBack: feedBack
            }

            createFeedback(formData, () => {
                getFeedBacks(renderFeedback)
            })
        }
    }
    //end add

    //delete
    function handleDeleteFeedback(id){
        var options = {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
        }
        fetch(getURL + '/' + id, options)
            .then((response) => {
                response.json()
            })
            .then(()=>{
                getFeedBacks(renderFeedback)
            })
    }
    //end delete

//edit

//end edit
//end CRUD feedback