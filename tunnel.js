import { spawn } from 'child_process';

function startServer() {
  console.log('Starting server on port 8080...');
  const server = spawn('npx', ['serve', 'dist', '-l', '8080'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: '8080' }
  });
  return server;
}

function startTunnel() {
  console.log('Starting tunnel...');
  const tunnel = spawn('npx', ['lt', '--port', '8080', '--subdomain', 'zerobytes-live'], {
    stdio: 'inherit',
    shell: true
  });
  return tunnel;
}

let server = startServer();
let tunnel = startTunnel();

tunnel.on('close', (code) => {
  console.log(`Tunnel closed, restarting...`);
  setTimeout(() => {
    tunnel = startTunnel();
  }, 2000);
});

server.on('close', (code) => {
  console.log(`Server closed, restarting...`);
  setTimeout(() => {
    server = startServer();
  }, 2000);
});
