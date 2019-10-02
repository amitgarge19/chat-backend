// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Il9SekFmRFVGXyIsImlhdCI6MTU2OTkxNDI5OTgxOSwiZXhwIjoxNTcwMDAwNjk5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6ODAwNzI0NTc4OSwiZW1haWwiOiJhbmFuZEBnbWFpbC5jb20iLCJsYXN0TmFtZSI6Ik5hcndhZGUiLCJmaXJzdE5hbWUiOiJBbmFuZCIsInVzZXJJZCI6IlkxazNxTDZvOSJ9fQ.uYzhfHW78b10yHGL7rQSgqMHaGPYlyCdvHnptTvcwU0";
const userId = "Y1k3qL6o9"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'C_xl38lYy',//putting user1's id here 
    receiverName: "Amit Garge",
    senderId: userId,
    senderName: "Anand Narwade"
}

let chatSocket = () => {

    socket.on('verifyUser', (data) => {
        console.log("socket trying to verify user");
        socket.emit("set-user", authToken);
    });

    socket.on(userId, (data) => {
        console.log("you received a message from " + data.senderName)
        console.log(data.message)
    });

    socket.on("online-user-list", (data) => {
        console.log("Online user list is updated. some user can online or went offline")
        console.log(data)
    });


    $("#send").on('click', function () {
        let messageText = $("#messageToSend").val()
        chatMessage.message = messageText;
        socket.emit("chat-msg", chatMessage)
    })

    $("#messageToSend").on('keypress', function () {
        socket.emit("typing", "Anand Narwade")
    })

    socket.on("typing", (data) => {
        console.log(data + " is typing")
    });

}// end chat socket function

chatSocket();