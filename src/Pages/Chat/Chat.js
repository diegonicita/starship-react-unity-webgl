import { findByLabelText } from "@testing-library/react";
import React from "react";
import io from "socket.io-client";
import { IoMdSend } from "react-icons/io";

const socket = io.connect("http://localhost:8000");

// const socket = io.connect("https://diego-test-server.herokuapp.com");

function Chat() {
  const [user, setUser] = React.useState("");
  const [isRoomSelected, setIsRoomSelected] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);

  const joinRoom = () => {
    socket.emit("join_room", 100);
    setIsRoomSelected(true);
  };

  const sendNewMessage = async () => {
    const m = {
      room: 100,
      author: user,
      message: newMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", m);
    setChatMessages( oldChatMessages => [...oldChatMessages, { author: user, message: newMessage }])
    setNewMessage("");
  };

  React.useEffect(() => {
    console.log("useEffect");
    socket.on("receive_message", (data) => {
      // console.log("from useEffect: " + JSON.stringify(data.message));
      setChatMessages((oldChatMessages) => [
        ...oldChatMessages,
        { author: data.author, message: data.message },
      ]);
    });
  }, [socket]);

  return (
    <div style={ChatStyle}>      
      <br />
      <label htmlFor="user" className="text-white"> Nombre: {" "}
        <input
          type="text"
          id="user"
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
          }}
          disabled={isRoomSelected}
        ></input>  {" "}
        {isRoomSelected?"Conectado!":<button onClick={joinRoom}> Join Room 100 </button>}
      </label>      
     
      <br />
      <div className="d-flex flex-column flex-wrap">
        {chatMessages.map((m, index) => {
          let estilo;
          if (m.author == user) estilo = meUser; else estilo = otherUser;
          return <span style={estilo} key={index + 100}> {m.author + ": " + m.message}</span>;
          }
        )}
      </div>
      <br />
      {isRoomSelected ? (
        <>
          <label htmlFor="mensaje" className="text-white"> Mensaje {" "}
          <input
            type="text"
            id="mensaje"
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
          ></input>
          <button onClick={sendNewMessage}> <IoMdSend /> </button>
          </label>                    
        </>
      ) : (
        ""
      )}
    </div>
  );
}

const ChatStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 auto",
  color: "yellow",  
};

const meUser = {  
  alignSelf: "self-start",  
  padding: "10px",
  margin: "2px 10px",  
  color: "black",
  backgroundColor: "white"
};

const otherUser = {
  alignSelf: "self-end",
  margin: "2px 10px",  
  padding: "10px",
  color: "black",  
  backgroundColor: "#dcf8c6"
};

export default Chat;
