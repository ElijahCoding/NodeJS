fetch('http://localhost:3000/weather?address=boston').then(response => {
    response.json().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value


})
