import app from '../app.js';  // Importing the app instance

const port = normalizePort(process.env.PORT || '3000');  // Normalize port

app.set('port', port);  // Set the port

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', onError);  // Handle server errors
server.on('listening', onListening);  // Handle server listening

// Function to normalize port
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// Function to handle server errors
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Function to handle server listening
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
}
