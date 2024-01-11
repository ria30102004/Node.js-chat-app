document.addEventListener('DOMContentLoaded',()=>{
    const socket=io()

    let name1;
    let textarea=document.querySelector('#textarea')
    let messageArea=document.querySelector('.area')
    function askName() {
        do {
            name1 = prompt('Please enter your name:');
        } while (!name1);
    }

    askName(); 
    textarea.addEventListener('keyup',(e)=> {
        if(e.key==='Enter'){
            sendMessage(e.target.value)
        }
    })
    function sendMessage(message){
        let msg={
            user: name1,
            message :message.trim()
        }
        appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
        //send to server
        socket.emit('message',msg)
    }
    function appendMessage(msg,type){
        let mainDiv=document.createElement('div')
        let className=type
        mainDiv.classList.add(className,'message')
        let timestamp = new Date().toLocaleTimeString();
        let markup=`
        <h5>${msg.user} </h5>
        <p>${msg.message}</p> <span class="timestamp">${timestamp}</span>`
        mainDiv.innerHTML=markup
        messageArea.appendChild(mainDiv)
    }//Recieve messages
    socket.on('message',(msg)=>{
        appendMessage(msg,'incoming')
        scrollToBottom()
    })
    
    function scrollToBottom(){
        messageArea.scrollTop=messageArea.scrollHeight
    }  
})
