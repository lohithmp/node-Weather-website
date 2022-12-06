console.log("script level")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // messageThree = ''

    /* fetch function expects to be called with the URL as the first
        argument. It sends off the HTTP request and gives you back the response */
    fetch("/weather?address="+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // messageThree = data.forecast.forecastday[0].day.condition.icon
            // console.log(messageThree)
        }
    })
})
    
})