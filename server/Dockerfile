FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV TWITCH_EVENTSUB_SECRET=
ENV CORS_URL=

EXPOSE 8042
EXPOSE 8043

CMD [ "npm", "start" ]