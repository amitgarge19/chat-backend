// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJfN0tjV2I1MCIsImlhdCI6MTU1ODY4MDc5MjU1MiwiZXhwIjoxNTU4NzY3MTkyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6ODAwNzU2OTk0NSwiZW1haWwiOiJhbmFuZG5hcndhZGUxMUBnbWFpbC5jb20iLCJsYXN0TmFtZSI6Ik5hcndhZGUiLCJmaXJzdE5hbWUiOiJBbmFuZCIsInVzZXJJZCI6IjBBeHNiRXpWViJ9fQ.nYCOwjbeQrqOBaOLbngXJOohBIWTkjpNFk9F248XVBE";
const userId = "0AxsbEzVV"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'qfZyvfHWh',//putting user1's id here 
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