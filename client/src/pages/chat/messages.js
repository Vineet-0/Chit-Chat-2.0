import { useState, useEffect , useRef } from 'react';

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages) => {
      console.log('Last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    }
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="h-screen my-8 overflow-auto p-[10px] pl-[40px]">
      {messagesRecieved.map((msg, i) => (
        <div className="bg-[#00186f] rounded-[6px] mb-[24px] max-w-[600px] p-[12px]" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-[#99d8ea] text-xs">{msg.username}</span>
            <span className="text-[#99d8ea] text-xs">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className="text-white">{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;