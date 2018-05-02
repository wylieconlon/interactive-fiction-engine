window.addEventListener('DOMContentLoaded', function() {
  const messageLog = document.querySelector('.wif-messages');

  WIF.addRoom('Drawbridge', castleOfDoomDrawbridge);
  WIF.addRoom('Guard Tower', castleOfDoomGuardTower);

  let isDrawbridgeOpen = false;

  WIF.enterRoom('Drawbridge');
  displayHelp();

  function castleOfDoomDrawbridge() {
    WIF.displayMessage('You are looking at the castle of DOOM from across the moat. You know that ' +
      'inside the castle of DOOM lies the helpless princess who must be rescued from the evil wizard. ' +
      'Across the moat is a tiny door.');
  }

  function castleOfDoomGuardTower() {
    WIF.displayMessage('You cross the drawbridge');
  }

  function processInput(text, splitText) {
    if (splitText[0] === 'look' && splitText.length === 1) {
      if (WIF.currentLocation !== 'Drawbridge') {
        WIF.displayMessage('Look at what?');
      }
    }
    if (splitText[0] === 'talk' && splitText.length === 1) {
      if (WIF.currentLocation !== 'Drawbridge') {
        WIF.displayMessage('Talk to what?');
      }
    }
    if (splitText[0] === 'pick' && splitText.length <= 2) {
      WIF.displayMessage('Pick up what?');
    }

    if (text === 'help') {
      displayHelp();
    }

    if (WIF.currentLocation === 'Drawbridge') {
      if (splitText[0] === 'look') {
        if (splitText.length === 1) {
          WIF.displayMessage('You look around, and see a large number of sharpened sticks lying on the ground next to the moat.');
        }
        if (splitText[splitText.length - 1] === 'moat') {
          WIF.displayMessage('It\'s a long way down... but maybe there\'s a way to get across?');
        }
        if (splitText[splitText.length - 1] === 'castle') {
          WIF.displayMessage('The castle of DOOM is taller than the clouds. On the other side of the moat you can see a tiny door, just barely big enough for one person to get through. The door is closed');
        }
      }
      if (splitText[0] === 'pick') {
        if (splitText[splitText.length - 1].indexOf('stick') === 0) {
          WIF.displayMessage('You pick up one of the many sharpened sticks lying around.');
          carrying = 'stick';
        }
      }
      if (splitText[0] === 'talk') {
        if (splitText.length === 1) {
          WIF.displayMessage('You start mumbling to yourself, and eventually a tiny window opens up across the moat. A guard tells you to shut your mouth, or he will shut it for you.');
        }
        if (splitText[splitText.length - 1].indexOf('guard') === 0) {
          WIF.connectRooms('Drawbridge', 'Guard Tower');
          WIF.displayMessage('You shout obscenities at the guard. He says "I\'ll be forced to open this drawbridge to come arrest you!\"');
        }
      }
      if (splitText[0].indexOf('n') === 0) {
        // North is room 1, guard tower
        WIF.enterRoom('Guard Tower');
      }
    }
  }

  WIF.setInputHandler(processInput);

  function displayHelp() {
    const helpMessage = document.createElement('div');
    helpMessage.innerHTML = '<p><strong>Commands for playing:</strong></p>' +
      '<p>Compass directions: N, E, S, W.</p>' + 
      '<p>Look &lt;something&gt;</p>' +
      '<p>Pick up &lt;something&gt;</p>' + 
      '<p>Talk to &lt;something&gt;</p>' +
      '<p>Help</p>';
    messageLog.appendChild(helpMessage);
  }
});
