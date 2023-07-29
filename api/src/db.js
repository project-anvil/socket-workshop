import { v4 as uuid } from "uuid";

const topics = [
  { name: "football", icon: "🏈" },
  { name: "basketball", icon: "🏀" },
  { name: "soccer", icon: "⚽️" },
  { name: "rugby", icon: "🏉" },
  { name: "golf", icon: "⛳️" },
];

const messageCount = 10;

export class DB {
  constructor() {
    this.db = { channels: [], messages: [] };

    this.init();
  }

  init() {
    topics.forEach(({ name, icon }) => {
      const channelMessages = createFakeData(name);
      const channelId = uuid();

      this.db.channels.push({
        id: channelId,
        name,
        icon,
      });

      this.db.messages[channelId] = channelMessages;
    });
  }

  getAllChannels() {
    return this.db.channels;
  }

  getMessagesByChannelId(channelId) {
    if (!channelId) return [];

    return this.db.messages[channelId];
  }

  addMessageToChannel(channelId, message) {
    if (!channelId || !message) return;

    const newMessage = { id: uuid(), text: message };

    this.db.messages[channelId].push(newMessage);

    return newMessage;
  }
}

function createFakeData(channelTopic) {
  const adjectives = [
    "amazing",
    "awesome",
    "cool",
    "epic",
    "great",
    "incredible",
    "inspiring",
    "marvelous",
    "spectacular",
    "splendid",
    "superb",
    "wonderful",
  ];
  const verbs = [
    "is",
    "was",
    "will be",
    "could be",
    "should be",
    "might be",
    "would be",
    "must be",
    "can be",
    "may be",
  ];

  return [...Array(messageCount)].map((_) => {
    const text = `${channelTopic} ${
      verbs[getRandomIntInRange(0, verbs.length - 1)]
    } ${adjectives[getRandomIntInRange(0, adjectives.length - 1)]}!`;
    return { id: uuid(), text };
  });
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
