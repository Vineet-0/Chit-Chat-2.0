import { useNavigate } from 'react-router-dom'; // Add this

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); // Add this

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }

    // Redirect to /chat
    navigate('/chat', { replace: true }); // Add this
  };
  return (
    <div className="h-screen w-full flex align-center justify-center bg-[#3f49cc]">
      <div className="w-[400px] h-auto m-auto  p-[32px] bg-[#add8e6] rounded-[6px] flex flex-col items-center gap-[28px]">
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className="w-full p-[12px] rounded-[6px] border border-[#3f49cc] text-sm"
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)} // Add this
        />

        <select
          className="w-full p-[12px] rounded-[6px] border border-[#3f49cc] text-sm"
          onChange={(e) => setRoom(e.target.value)} // Add this
        >
          <option>Select Room</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button
          className="p-[14px] rounded-[6px] w-full font-bold text-3 text-base cursor-pointer border-0 bg-[#00186f] text-white"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;