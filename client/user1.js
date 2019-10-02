// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlB3Tl9qNEduNiIsImlhdCI6MTU2OTkxNDM5MTQ5OCwiZXhwIjoxNTcwMDAwNzkxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6ODA4NzI2OTk0NiwiZW1haWwiOiJhbWl0LmdhcmdlQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiR2FyZ2UiLCJmaXJzdE5hbWUiOiJBbWl0IiwidXNlcklkIjoiQ194bDM4bFl5In19.gm1w02sxq6lHZxUfXepSrSiw7WKmx5VbqMaoPPXUgxg"
const userId = "C_xl38lYy"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'Y1k3qL6o9',//putting user2's id here 
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