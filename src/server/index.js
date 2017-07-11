import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import * as constants from '../constants';
import { collectMessages } from './messagingService';

const BTserial = new (require('bluetooth-serial-port')).BluetoothSerialPort(); // TODO

const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });
let socketService;

// Send message to client
const sendMessage = (type, data) => {
  socketService.send(
    JSON.stringify({
      type,
      data,
    }),
  );
};

// Throw an error
const throwError = (error) => {
  sendMessage(constants.SET_ERROR, error);
};

const requestDeviceList = () => {
  BTserial.listPairedDevices((devices) => {
    sendMessage(constants.SET_DEVICES, devices.map((device) => {
      const { name, address } = device;
      return ({
        name,
        address,
      });
    }), () => (throwError('Could not get device list')));
  });
};

const getDeviceDetails = () => {
  const buffer = new Buffer('N0\n', 'utf8');
  BTserial.write(buffer, (err, bytesWritten) => {
    if (err) {
      console.log(err);
    }
    if (bytesWritten === buffer.length) {
      console.log('All bytes sent');
    }
  });
};

const writeData = (code) => {
  const buffer = new Buffer(`R0${code}\n`, 'utf8');
  BTserial.write(buffer, (err) => {
    if (err) throwError(`Could not write data for code R0${code}`);
  });
};

const requestConnectDevice = (address) => {
  BTserial.findSerialPortChannel(address, (channel) => {
    BTserial.connect(address, channel, () => {
      sendMessage(constants.SET_DEVICE_CONNECTED);
      getDeviceDetails();
    }, () => (throwError('Could not establish a connection')));
  }, () => (throwError('Could not find a serial port')));
};

BTserial.on('data', (buffer) => {
  collectMessages(sendMessage, buffer);
});

webSocketServer.on('connection', (ws) => {
  socketService = ws;
  BTserial.close();

  requestDeviceList();

  socketService.on('message', (message) => {
    const { type, data } = JSON.parse(message);
    const actions = {
      [constants.REQUEST_DEVICE_LIST]: () => requestDeviceList(),
      [constants.REQUEST_CONNECT_DEVICE]: () => requestConnectDevice(data.address),
      [constants.REQUEST_START_RACE]: () => writeData(constants.REQUEST_START_RACE),
      [constants.REQUEST_END_RACE]: () => writeData(constants.REQUEST_END_RACE),
      [constants.REQUEST_INCREASE_MINIMUM_LAP_TIME]: () => writeData(constants.REQUEST_INCREASE_MINIMUM_LAP_TIME),
      [constants.REQUEST_DECREASE_MINIMUM_LAP_TIME]: () => writeData(constants.REQUEST_DECREASE_MINIMUM_LAP_TIME),
      [constants.REQUEST_NEXT_BAND]: () => writeData(constants.REQUEST_NEXT_BAND),
      [constants.REQUEST_PREVIOUS_BAND]: () => writeData(constants.REQUEST_PREVIOUS_BAND),
      [constants.REQUEST_NEXT_CHANNEL]: () => writeData(constants.REQUEST_NEXT_CHANNEL),
      [constants.REQUEST_PREVIOUS_CHANNEL]: () => writeData(constants.REQUEST_PREVIOUS_CHANNEL),
      [constants.REQUEST_INCREASE_THRESHOLD]: () => writeData(constants.REQUEST_INCREASE_THRESHOLD),
      [constants.REQUEST_DECREASE_THRESHOLD]: () => writeData(constants.REQUEST_DECREASE_THRESHOLD),
      [constants.REQUEST_SET_THRESHOLD]: () => writeData(constants.REQUEST_SET_THRESHOLD),
      [constants.REQUEST_TOGGLE_SOUND]: () => writeData(constants.REQUEST_TOGGLE_SOUND),
      [constants.REQUEST_START_CALIBRATION]: () => writeData(constants.REQUEST_START_CALIBRATION),
      [constants.REQUEST_END_CALIBRATION]: () => writeData(constants.REQUEST_END_CALIBRATION),
      [constants.REQUEST_RSSI_MONITOR_ON]: () => writeData(constants.REQUEST_RSSI_MONITOR_ON),
      [constants.REQUEST_RSSI_MONITOR_OFF]: () => writeData(constants.REQUEST_RSSI_MONITOR_OFF),
      [constants.REQUEST_TOGGLE_FIRST_LAP]: () => writeData(constants.REQUEST_TOGGLE_FIRST_LAP),
      default: () => sendMessage(constants.SHOW_ERROR, `There is no action for ${type}`),
    };

    (actions[type] || actions.default)();
  });

  // Close bluetooth connction on close
  ws.on('close', () => {
    BTserial.close();
  });
});

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});
