import io from 'socket.io-client';

// const socket = io('http://localhost:3002')

const socket = io.connect()

export default socket