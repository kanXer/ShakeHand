// conecting to nodeserver/index.js api who runs on localhost:8000
const socket = io(`http://localhost:8000/`);
// creating javascript variable selectin dom elements 
const form = document.getElementById('sentCon')
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector('.container')

// adding media file as js variable 
var audio = new Audio('tune.mp3');


// append msg in main container 
const append = (message, position)=>{
    const messageElement = document.createElement(`div`);
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }

}








const Name = prompt("Enter Your Name To Join");
socket.emit(`new-user-joined`,Name);

socket.on(`user-joined`, Name => {
    append(`${Name} Joined The Chat`,`right`)

})

socket.on(`recived`, data=>{
    append(`${data.Name}:${data.message}`,'left')
})
socket.on(`left`, Name=>{
    append(`${Name} Left The Chat`,'left')
})

// assigning event on submit button

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message)
    messageInput.value=''

})