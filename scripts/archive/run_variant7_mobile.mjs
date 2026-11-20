// run_variant7_mobile.mjs
import { variant7MobileScript } from './build_variant7_mobile.mjs';

const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  console.log('Connected to Figma bridge');
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  ws.send(JSON.stringify({
    id: 'build-v7-mobile',
    action: 'eval',
    code: variant7MobileScript
  }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'build-v7-mobile') {
    if (json.error) {
      console.error('Error executing build script:', json.error);
      ws.close();
      process.exit(1);
    }
    console.log('Build result:', JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WebSocket error:', err);
  process.exit(1);
};

setTimeout(() => {
  console.error('Timeout waiting for Figma response');
  process.exit(1);
}, 30000);
