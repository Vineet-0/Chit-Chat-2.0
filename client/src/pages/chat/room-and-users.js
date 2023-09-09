import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className="border-r-[1px] border-[#dfdfdf]">
      <h2 className="mb-[60px] text-[2rem] uppercase text-white">{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className="text-[1.2rem] text-white">Users:</h5>}
        <ul className="pl-0 mb-[60px] text-[#99d9ea]">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

        <button
            className="px-[14px] py-[8px] rounded-[6px] font-bold
                    text-[#00196f] text-[1.1rem] bg-[#99d9ea]
                    cursor-pointer border-[1px] border-[#99d9ea]
                    transition ease-in-out delay-150
                    hover:text-white hover:bg-[#00186f]"
            onClick={leaveRoom}
        >
            Leave
        </button>
    </div>
  );
};

export default RoomAndUsers;