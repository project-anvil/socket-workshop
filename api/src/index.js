import express from "express";
import cors from "cors";
import { DB } from "./db.js";

const app = express();
const db = new DB();
const port = 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.send("nothing to see here!");
});

app.get("/channels", (req, res) => {
  const channels = db.getAllChannels();
  res.send(channels);
});

app.get("/messages/:channelId", (req, res) => {
  const { channelId } = req.params;
  const messages = db.getMessagesByChannelId(channelId);
  res.send(messages);
});

app.post("/messages/:channelId", (req, res) => {
  const { channelId } = req.params;
  const { message } = req.body;

  if (!message) return res.status(400).send("no message provided");

  const newMessage = db.addMessageToChannel(channelId, message);

  res.status(201).send(newMessage);
});

app.listen(port, () => {
  console.log(`server started on port:${port}`);
});
