// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjZmS0hiY3BiciIsImlhdCI6MTU1ODY4MDc1NjU1NywiZXhwIjoxNTU4NzY3MTU2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6ODA4NzI2OTk0NiwiZW1haWwiOiJhbWl0LmdhcmdlQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiR2FyZ2UiLCJmaXJzdE5hbWUiOiJBbWl0IiwidXNlcklkIjoicWZaeXZmSFdoIn19.oDnqnYDwGj4CqHNISKvdODhOzRILrjSufr3yMBrHsc0"
const userId = "qfZyvfHWh"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: '0AxsbEzVV',//putting user2's id here 
    receiverName: "Anand Narwade",
    senderId: userId,
    senderName: "Amit Garge"
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

    socket.on("typing", (data) => {
        console.log(data + " is typing")
    });

    $("#send").on('click', function () {
        let messageText = $("#messageToSend").val()
        chatMessage.message = messageText;
        socket.emit("chat-msg", chatMessage)
    })

    $("#messageToSend").on('keypress', function () {
        socket.emit("typing", "Amit Garge")
    })

}// end chat socket function

chatSocket();