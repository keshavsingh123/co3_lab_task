import express from "express";
import cors from "cors";
import { Player } from "./Schema/player.schema.js";
import { connectDB } from "./config/db.js";
import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow requests from the frontend server
  methods: ["GET", "POST"]
}));
app.use(express.json());
const BOT_TOKEN = "7896685507:AAECcGSFkW_t39fNAhsujaqz1jYZMTI8v74";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// API to get a user's coin balance
app.get("/api/coins/:username", async (req, res) => {
  const { username } = req.params;
  let user = await Player.findOne({ username });
  if (!user) {
    user = new Player({ username, coins: 0 });
    await user.save();
  }
  res.status(200).send(user);
});

// API to update coin balance
app.post("/api/coins/update", async (req, res) => {
  const { username, coins } = req.body;
  await Player.findOneAndUpdate({ username }, { coins }, { upsert: true });
  res.status(200).send({ success: true });
});


// Telegram Bot Logic
bot.onText(/\/start/,async(msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
   // Insert new user into the backend
   await axios.post("http://localhost:8080/api/coins/update", {
    username,
    coins: 0,
  });
  bot.sendMessage(
    chatId,
    "Welcome to the Clicker Game! Start playing here"
  );
});
app.get("/",(req,res)=>{
    res.status(200).send("welcome to the game")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
