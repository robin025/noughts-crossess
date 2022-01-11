import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { io } from "socket.io-client";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/joinRoom";
import GameContext, { IGameContextProps } from "./gameContext";
import { Game } from "./components/game";
import TTT from "./ttt.png";





const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  background: #0B0C10;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #66FCF1;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Footer = styled.div`

color: #66FCF1;

`;

const WebPort = styled.a`

text-decoration: none;
color:#66FCF1;



`;

const AppImg = styled.img`
margin-top:25px;
height:200px;
width:auto;
margin-bottom:-50px;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Noughts and Crosses</WelcomeText>
        {/* <AppImg src={TTT} ></AppImg> */}
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game />}
        </MainContainer>
        <Footer>Copyright © 2022. All Rights Reserved - Made By <WebPort target="_blank" rel="noopener noreferrer" href ="https://robinsingh.xyz" >Robin Singh </WebPort> </Footer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
