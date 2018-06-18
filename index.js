const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const keyboardRoute = require("./src/routes/keyboard");
const unknownRoute = require("./src/routes/unknown");
const messageRoute = require("./src/routes/message");
const chatRoomRoute = require("./src/routes/chatRoom");

const PORT = process.env.DEV_MODE ? 3000 : 4001;

// Middlewares
app.use(bodyParser.json());

// Setup routes
app.use("/keyboard", keyboardRoute);
app.use("/message", messageRoute);
app.use("/chat_room", chatRoomRoute);
app.use("*", unknownRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
