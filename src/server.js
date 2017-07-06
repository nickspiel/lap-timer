import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import * as constants from './constants';
import translate from './store/translation';

const BTserial = new (require('bluetooth-serial-port')).BluetoothSerialPort(); // TODO

const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });
let socketService;

const sendMessage = (type, data) => {
  console.log(type, data);
  socketService.send(
    JSON.stringify({
      type,
      data,
    }),
  );
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

const getDeviceDetails = () => {
  const REQUEST_NUMBER_OF_RACERS = 'N0\n';
  const REQUEST_BULK_DEVICE_STATE = 'R0A\n';
  const REQUEST_RSSI_VALUES = 'R0V\n';
  BTserial.write(new Buffer(REQUEST_NUMBER_OF_RACERS, 'utf-8'), (err) => {
    if (err) throwError('Could not get number of racers');
  });
  BTserial.write(new Buffer(REQUEST_BULK_DEVICE_STATE, 'utf-8'), (err) => {
    if (err) throwError('Could not get bulk device state');
  });
  BTserial.write(new Buffer(REQUEST_RSSI_VALUES, 'utf-8'), (err) => {
    if (err) throwError('Could not get bulk device state');
  });
};
const connectDevice = (address) => {
  BTserial.findSerialPortChannel(address, (channel) => {
    BTserial.connect(address, channel, () => {
      sendMessage(constants.DEVICE_CONNECTED);
      getDeviceDetails();
    }, () => (throwError('Could not establish a connection')));
  }, () => (throwError('Could not find a serial port')));
};

BTserial.on('data', (buffer) => {
  translate(buffer);
  // const responseCode = bufferString.charAt(0);
  // console.log('CODE:', bufferString);
  // switch (responseCode) {
  //   case constants.NUMBER_OF_RACERS_CODE:
  //     sendMessage(constants.SET_NUMBER_OF_RACERS, parseInt(bufferString.charAt(1), 10));
  //     break;
  //   case constants.BULK_DEVICE_STATE_CODE:
  //     sendMessage(constants.SET_NUMBER_OF_RACERS, parseInt(bufferString.charAt(1), 10));
  //     break;
  //   default:
  //     break;
  // }
});

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

  // Close bluetooth connction on close
  ws.on('close', () => {
    BTserial.close();
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
