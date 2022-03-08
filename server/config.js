require('dotenv').config();

module.exports = {
  twitchApiClientId: process.env.TWITCH_API_CLIENT_ID,
  twitchApiOauthToken: process.env.TWITCH_API_TOKEN,
  twitchApiSecret: process.env.TWITCH_API_SECRET,
};