import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
const socket = io('http://localhost:3333');
const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // const [socket, setSocket] = useState(null);  // если каждый раз новое позключение создавать

  useEffect(() => {
  //  const newSocket = io('http://localhost:3333');   соединение
    // setSocket(newSocket);

    //  сообщения от сервера
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    //   window.scrollTo(0, document.body.scrollHeight);
    // - соединение при размонтировании
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
     e.preventDefault();
    if (socket) {
      socket.emit('message', input); // => сообщение
      setInput('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="enter your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default App;
