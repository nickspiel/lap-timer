import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import * as constants from './constants';

const BTserial = new (require('bluetooth-serial-port')).BluetoothSerialPort(); // TODO

const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });
let socketService;

const sendMessage = (type, data) => {
  socketService.send(
    JSON.stringify({
      type,
      data,
    }),
  );
  console.log(JSON.stringify({
    type,
    data,
  }));
};

const throwError = (error) => {
  sendMessage(constants.DISPLAY_ERROR, error);
};

const getDeviceList = () => {
  BTserial.inquire();
  BTserial.listPairedDevices((devices) => {
    sendMessage(constants.SET_DEVICES, devices.map((device) => {
      const { name, address } = device;
      return ({
        name,
        address,
      });
    }));
  });
};

const connectDevice = (address) => {
  BTserial.findSerialPortChannel(address, (channel) => {
    BTserial.connect(address, channel, (device) => {
      sendMessage(constants.SET_DEVICES, device);
    }, throwError('Could establish a connection'));
  }, throwError('Could not find a serial port'));
};

// BTserial.on('data', function(buffer) {
//   console.log(buffer.toString('utf-8'))
// })
webSocketServer.on('connection', (ws) => {
  socketService = ws;
  BTserial.close();

  socketService.on('message', (message) => {
    const { type, data } = JSON.parse(message);
    const actions = {
      [constants.GET_DEVICE_LIST]: getDeviceList,
      [constants.CONNECT_DEVICE]: () => connectDevice(data.address),
      default: () => sendMessage(constants.SHOW_ERROR, `There is no action for ${type}`),
    };

    (actions[type] || actions.default)();
  });
});

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});

//   // TODO temp
//
//   BTserial.connect('98-d3-31-fd-64-b2', 1, (event) => {
//     console.log('connected')
//     BTserial.on('data', function(buffer) {
// 	    console.log(buffer.toString('utf-8'))
// 		})
//
//     // Get number of devices
//    var buffer = new Buffer('N0\n', 'utf8')
//    BTserial.write(buffer, function (err, bytesWritten){
//      if (err) {
//        console.log(err)
//      }
//      if (bytesWritten == buffer.length) {
//        console.log('All bytes sent')
//      }
//    })
//   }, (event) => {
//     console.warn('cannot connect to device', event)
//   })
// }
