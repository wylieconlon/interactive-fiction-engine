"use strict";

var rooms = {};
var roomConnections = {};

var levelHeader = document.createElement('div');
levelHeader.className = 'wif-header';
document.body.appendChild(levelHeader);

var messageLog = document.createElement('p');
messageLog.className = 'wif-messages';
document.body.appendChild(messageLog);

var input = document.createElement('input');
input.className = 'wif-input';
document.body.appendChild(input);

var button = document.createElement('button');
button.className = 'wif-button';
button.innerText = 'Go'
document.body.appendChild(button);

var head = document.head;
var link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://wylieconlon.github.io/interactive-fiction-engine/style.css';
head.appendChild(link);

var currentLocation;
var destinations = [];
var inputCallback;

function updateHeader() {
  var currentLocation = WIF.currentLocation;
  var connections = 'None';
  if (roomConnections[currentLocation].length) {
    connections = roomConnections[currentLocation].join(', ');
  }

  levelHeader.innerHTML = '<p>Current Room: <em class="roomName is-new">' + currentLocation + '</em></p><p>Connected rooms: <em>' + connections + '</em></p>';
  setTimeout(function() {
    document.querySelector('.roomName').className = 'roomName';
  }, 1000);
}

function displayMessage(message) {
  messageLog.innerHTML = message;
  messageLog.className = 'wif-messages is-new';

  setTimeout(function() {
    messageLog.className = 'wif-messages';
  }, 1000);
}

function addRoom(name, callback) {
  if (typeof name !== 'string') {
    alert('The first parameter of addRoom is room name, a string: WIF.addRoom("Dungeon", function() {...})');
    return;
  } else if (typeof callback !== 'function') {
    alert('The first parameter of addRoom is room name, a string: WIF.addRoom("Dungeon", function() {...})');
    return;
  } else if (rooms[name] !== undefined) {
    alert('Each room must have a unique name');
    return;
  }

  rooms[name] = callback;
  roomConnections[name] = [];
}

function hasConnection(name1, name2) {
  var connectionList = roomConnections[name1];

  for (var i = 0; i < connectionList.length; i++) {
    if (connectionList[i] === name2) {
      return true;
    }
  }

  return false;
}

function connectRooms(name1, name2) {
  if (typeof name1 !== 'string' || typeof name2 !== 'string') {
    alert('WIF.connectRooms(room1, room2) expects two room names as input');
    return;
  } else if (typeof rooms[name1] === 'undefined') {
    alert('You are trying to connect room ' + name1 + ', which has not been added yet.');
    return;
  } else if (typeof rooms[name2] === 'undefined') {
    alert('You are trying to connect room ' + name2 + ', which has not been added yet.');
    return;
  } else if (hasConnection(name1, name2)) {
    alert('The connection between ' + name1 + ' and ' + name2 + ' already exists.');
    return;
  }

  roomConnections[name1].push(name2);
  roomConnections[name2].push(name1);
}

function enterRoom(name) {
  if (typeof name !== 'string') {
    alert('You must call enterRoom with a string name, like WIF.enterRoom("Dungeon");');
    return;
  } else if (typeof rooms[name] !== 'function') {
    alert('The name ' + name + ' does not match any rooms. Try WIF.addRoom(name, roomHandler);');
    return;
  }

  rooms[name]();
  WIF.currentLocation = name;

  updateHeader();
}

input.addEventListener('keydown', processKeys);
button.addEventListener('click', processInput);

function processInput(e) {
  var text = input.value.toLowerCase();
  var splitText = text.split(' ');

  if (inputCallback) {
    inputCallback(text, splitText);
  }

  updateHeader();

  input.value = '';
  input.focus();
}

function setInputHandler(handler) {
  if (typeof handler !== 'function') {
    alert('Input handler must be a function');
  }

  inputCallback = handler;
}

function processKeys(e) {
  if (e.keyCode === 13) {
    processInput();
  }
}

window.WIF = {
  addRoom: addRoom,
  enterRoom: enterRoom,
  connectRooms: connectRooms,
  displayMessage: displayMessage,
  setInputHandler: setInputHandler,
  hasConnection: hasConnection,
  currentLocation: null,
};
