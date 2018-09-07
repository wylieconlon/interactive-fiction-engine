Interactive Fiction Engine
==========================

This API allows you to build a simple interactive fiction game in the browser.
It provides a "Room" abstraction and minimal UI elements for entering commands
and viewing the current room and connected rooms.

The game author is responsible for implementing all game-related logic for
handling commands entered by the player.

This interactive fiction engine API is meant for use by students learning
Javascript.

## Installation

Insert this script tag at the end of the `<body>` tag in your HTML

```
<script src="https://wylieconlon.github.io/interactive-fiction-engine/api.js"></script>
```

## Usage

The API is all part of the `WIF` object.

**displayMessage(message)**

Adds a message to the log. The message in inserted as HTML.

Example:

```
WIF.displayMessage('<strong>Welcome to the game.</strong>');
```

**addRoom(roomName, onEnterRoomCallback)**

This creates a named room. When the room is entered, the callback will always be called
with no arguments.

Example:

```
WIF.addRoom('cave', function() {
  WIF.displayMessage('You find yourself in a dark cave.');
});
```

**enterRoom(roomName)**

You are required to start the game by creating a room and then entering that room.

Example:

```
WIF.enterRoom('cave');
```

**connectRooms(roomName1, roomName2)**

You can at any time connect two rooms. This lets the user travel between them.

Example:

```
WIF.connectRooms('cave', 'cave entrance');
```

**hasConnection(roomName1, roomName2)**

Calling this function will return a boolean indicating whether two rooms are connected

**currentRoom**

A variable containing the name of the current room

**setInputHandler(handler)**

Required function. The handler is called with two arguments:

* text **String** The lower-case version of the text entered by the user.
* splitText **Array<String>** An array of lower-case words entered by the user, split by spaces

Example:

// The user has typed "Talk to Guard"

WIF.setInputHandler(function (text, splitText) {
  // text is "talk to guard"
  // splitText is ["talk", "to", "guard"]

  if (splitText[0] === 'talk' && splitText.length === 3 && splitText[2] === 'guard') {
    WIF.displayMessage('The guard responds by unlocking the door');
    WIF.connectRooms(WIF.currentRoom, 'secret room');
  }
});

## Demo

An implementation of a sample game can be seen [here](https://wylieconlon.github.io/interactive-fiction-engine/)

The code can be found [here](https://github.com/wylieconlon/interactive-fiction-engine/blob/master/script.js)
