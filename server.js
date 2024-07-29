const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (message) => {
      console.log('received:', message);
    });

    // Example: Sending updates to clients every 5 seconds
    setInterval(() => {
      const updates = [
        { ticker: 'US10Y', p_l: Date.now(), totalValue: 99080.97, price: 101 },
        { ticker: 'CAD30Y', p_l: Date.now() + 5, totalValue: 50978.56, price: 97 },
      ];
      ws.send(JSON.stringify(updates));
    }, 1000);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
