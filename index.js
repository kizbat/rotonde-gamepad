'use strict';

var gamepad = require("gamepad");

var newClient = require('./Rotonde-Client-babel');

var client = newClient('ws://192.168.0.164:4224/');

// Initialize the library
gamepad.init()

// List the state of all currently attached devices
gamepad.on("move", function (id, axis, value) {
  console.log("move", {
    id: id,
    axis: axis,
    value: value,
  });
  client.sendAction("GAMEPAD_MOVE", {
    id: id,
    axis: axis,
    value: value,
  });
});

// Listen for button up events on all gamepads
gamepad.on("up", function (id, num) {
  console.log("up", {
    id: id,
    num: num,
  });
  client.sendAction("GAMEPAD_UP", {
    id: id,
    num: num,
  });
});

// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
  console.log("down", {
    id: id,
    num: num,
  });
  client.sendAction("GAMEPAD_DOWN", {
    id: id,
    num: num,
  });
});

client.onReady(function(){
  setInterval(gamepad.processEvents, 16);
  setInterval(gamepad.detectDevices, 500);
});

client.connect();
