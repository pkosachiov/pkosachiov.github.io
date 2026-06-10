import http from 'http';
import express from 'express';
import logger from 'morgan';
import { WebSocketServer } from 'ws';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();

function myMiddleware(req, res, next) {
  console.log(`Request for ${req.url}`);

  //   a = b

  next();
}

app.use(myMiddleware);
app.use(logger("dev"));
app.use(cookieParser());

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: false });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});
app.use(express.static("."));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Разрешает подключение всем локальным устройствам
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  let messageIndex = 0;
  console.log("A user connected");

  socket.on('set_number', (data) => {
    const userNumber = data.number;
    const room = io.sockets.adapter.rooms.get(userNumber); 
    const usersInRoom = (room ? room.size : 0) + 1;

    // Сохраняем номер в самом сокете, чтобы помнить его при отключении
    socket.userNumber = userNumber; 

    // Добавляем клиента в комнату с этим номером
    socket.join(userNumber);

    console.log(`user ${socket.id}[Count:${usersInRoom}] enter to frequency: ${userNumber}`);
    io.to(userNumber).emit('message', `user enter to frequency: ${userNumber} [UsersCount:${usersInRoom}]`);
  });

  /*
  socket.on("message", (message) => {
    const messageString = message.toString();
    console.log(`Received: ${messageString}`);

    io.emit('message', messageString);

    messageIndex++;
  });
  */
  socket.on('message', (data) => {
    const userNumber = socket.userNumber;

    if (userNumber) {
      io.to(userNumber).emit('message', data);
    }
  });

  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

const port = 8080;
const HOST = '0.0.0.0';

server.listen(port, HOST, () => {
  console.log(`Server started on http://${HOST}:${port}`);
});