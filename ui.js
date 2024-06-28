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
    var listFb = document.querySelector('#feedback-list')
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
    listFb.innerHTML = htmls.join('')
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