function handleSocket(io) {
    io.on("connection", (socket) => {
        // console.log("New client connected" + socket.id);
        socket.on("disconnect", () => {
            // console.log("Client disconnected");
        });
        socket.on("user-post", data => {
            socket.broadcast.emit("has-user-post", data)
        })
    });
}

module.exports = handleSocket;
