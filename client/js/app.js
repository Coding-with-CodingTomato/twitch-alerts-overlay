const socket = io("DOMAINGOESHERE");
const body = document.querySelector('body');

const sound = new Audio('../assets/sounds/sound1.mp3');
sound.volume = 0.5;

const generateFollowAlert = (username) => {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertBox');
  alertDiv.innerHTML= `
    <div class="icon"><span>🍅</span></div>
    <div class="content">
      <h3>Neuer Follower!</h3>
      <p>${username}</p>
    </div>
  `;

  body.appendChild(alertDiv);

  return alertDiv;
};

const generateSubAlert = (username) => {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertBox');
  alertDiv.innerHTML= `
    <div class="icon"><span>💜</span></div>
    <div class="content">
      <h3>Neuer Subscriber!</h3>
      <p>${username}</p>
    </div>
  `;

  body.appendChild(alertDiv);

  return alertDiv;
};

const generateRaidAlert = (from_username, viewers) => {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertBox');
  alertDiv.innerHTML= `
    <div class="icon"><span>🚛</span></div>
    <div class="content">
      <h3>Raid incoming!</h3>
      <p class="raid"><b>${from_username}</b> raided uns mit <b>${viewers}</b> Zuschauer!</p>
    </div>
  `;

  body.appendChild(alertDiv);

  return alertDiv;
};

const generateCheerAlert = (username, bits, message) => {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertBox');
  
  if(message.trim() !== ""){
    alertDiv.innerHTML= `
      <div class="icon"><span>🪙</span></div>
      <div class="content">
        <h3 class="cheer"><b>${bits}</b> Bits von <b>${username}</b>!</h3>
        <p class="cheer">${message}</p>
      </div>
    `;
  } else {
    alertDiv.innerHTML= `
      <div class="icon"><span>🪙</span></div>
      <div class="content">
        <h3>Cheers!</h3>
        <p class="cheer"><b>${username}</b> hat <b>${bits}</b> Bits gespendet!</p>
      </div>
    `;
  }
  
  
  body.appendChild(alertDiv);

  return alertDiv;
};

socket.on('channel.follow', data => {
  const jsonData = JSON.parse(data);

  sound.play();

  const element = generateFollowAlert(jsonData.user_name || "Anonym");

  setTimeout(() => {
    element.remove();
  }, 11*1000);
});

socket.on('channel.subscribe', data => {
  const jsonData = JSON.parse(data);
  sound.play();
  const element = generateSubAlert(jsonData.user_name || "Anonym");

  setTimeout(() => {
    element.remove();
  }, 11*1000);
});

socket.on('channel.raid', data => {
  const jsonData = JSON.parse(data);
  sound.play();
  const element = generateRaidAlert(jsonData.from_broadcaster_user_name || "Anonym", jsonData.viewers || 0);

  setTimeout(() => {
    element.remove();
  }, 11*1000)
});

socket.on('channel.cheer', data => {
  const jsonData = JSON.parse(data);
  sound.play();
  const element = generateCheerAlert(jsonData.user_name || "Anonym", jsonData.bits || 0, jsonData.message || "");

  setTimeout(() => {
    element.remove();
  }, 11*1000)
});