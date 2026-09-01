const WebSocket = require('ws');

let ws = null;
let connected = false;

function connect(api_key, api_url) {
    ws = new WebSocket(`${api_url}/v1/api/script?api_key=${api_key}`);

    ws.on('open', () => {
        connected = true;
    });

    ws.on('close', () => {
        connected = false;
        setTimeout(() => connect(api_key, api_url), 5000);
    });

    ws.on('error', (err) => {
        console.error(err.message);
    });
}

exports('connect_websocket', (api_key, api_url) => {
    if (connected) return true;

    connect(api_key, api_url);
});

exports('update_livemap', (data) => {
    if (!connected || !ws || ws.readyState !== WebSocket.OPEN) return false;

    ws.send(JSON.stringify(data));
    return true;
});