import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users';
import MessagesReceived from './messages';
import SendMessage from './send-message';

const Chat = ({ username, room, socket }) => {
  return (
    <div className="max-w-[1100px] mx-auto my-0 grid grid-cols-2 gap-[20px]">
        <div className="w-1/4">
            <RoomAndUsersColumn socket={socket} username={username} room={room} />
        </div>
        
        <div className="w-3/4">
            <MessagesReceived socket={socket} />
            <SendMessage socket={socket} username={username} room={room} />
        </div>
    </div>
  );
};

export default Chat;