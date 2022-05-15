import { findByLabelText } from "@testing-library/react";
import React from "react";
import io from "socket.io-client";
import { IoMdSend } from "react-icons/io";

var socket = undefined; 
//const socket = io.connect("https://diego-test-server.herokuapp.com");

function Chat() {
  const [user, setUser] = React.useState("");
  const [isRoomSelected, setIsRoomSelected] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);

  async function joinRoom() {
    if (user !== "")
    {
    const m = {
      room: 100,
      author: user,
      message: "joined room",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    socket = io("http://localhost:8000");    
    // socket = io("https://diego-test-server.herokuapp.com");
    socket.emit("join_room", m);
    setIsRoomSelected(true);
    }
  }

  async function leftRoom() {
    const m = {
      room: 100,
      author: user,
      message: "left room",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };    
    // socket = io("https://diego-test-server.herokuapp.com");
    socket.close();
    setIsRoomSelected(false);
    setChatMessages([]);
  }

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
    setChatMessages((oldChatMessages) => [
      ...oldChatMessages,
      { author: user, message: newMessage },
    ]);
    setNewMessage("");
  };

  React.useEffect(() => {
    if (isRoomSelected) {
      console.log("useEffect");
      socket.on("receive_message", (data) => {
        setChatMessages((oldChatMessages) => [
          ...oldChatMessages,
          { author: data.author, message: data.message },
        ]);
      });

      socket.on("have_joined_room", (data) => {
        setChatMessages((oldChatMessages) => [
          ...oldChatMessages,
          { author: data.author, message: data.message },
        ]);
      });

      socket.io.on("error", (error) => {
        console.log("error: " + error);
        setIsRoomSelected(false);        
      });
    }
    
  }, [socket]);

  return (
    <div style={chatContainer}>
      <div style={leftColumn}>Users</div>
      <div style={rightColumn}>Chat
    <div style={chatStyle}>
      <br />
      <label htmlFor="user">
        {" "}
        Nombre:{" "}
        <input
          autoComplete="off"
          type="text"
          id="user"
          value={user}
          placeholder="Diego..."
          onChange={(event) => {
            setUser(event.target.value);
          }}
          disabled={isRoomSelected}
        ></input>{" "}
        {isRoomSelected ? (
          <button onClick={leftRoom}> Desconectarse </button>
        ) : (
          <button onClick={joinRoom}> Join Room 100 </button>
        )}
      </label>

      <br />
      <div className="d-flex flex-column flex-wrap">
        {chatMessages.map((m, index) => {
          let estilo;
          if (m.author == user) estilo = meUser;
          else estilo = otherUser;
          return (
            <span style={estilo} key={index + 100}>
              {" "}
              {m.author + ": " + m.message}
            </span>
          );
        })}
      </div>
      <br />
      {isRoomSelected ? (
        <>
          <label htmlFor="mensaje">
            {" "}
            Mensaje{" "}
            <input
              type="text"
              autoComplete="off"
              id="mensaje"
              placeholder="Mensaje..."
              value={newMessage}
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendNewMessage();
              }}
            ></input>
            <button onClick={sendNewMessage}>
              {" "}
              <IoMdSend />{" "}
            </button>
          </label>
        </>
      ) : (
        ""
      )}
    </div>
    </div>
    </div>
  );
}

const leftColumn = {  
  width: "20vw",
  backgroundColor : "white",
  padding: "5px"
}

const rightColumn = {  
  width: "80vw",
  padding: "5px"
}

const chatContainer = {
  backgroundColor : "#ece5dd",
  display: "flex",  

}

const chatStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 50px",  
};

const meUser = {
  alignSelf: "self-start",
  padding: "10px",
  margin: "2px 10px",
  color: "black",
  backgroundColor: "white",
};

const otherUser = {
  alignSelf: "self-end",
  margin: "2px 10px",
  padding: "10px",
  color: "black",
  backgroundColor: "#dcf8c6",
};

export default Chat;
