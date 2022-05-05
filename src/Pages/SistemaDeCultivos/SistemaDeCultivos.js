import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import Juego from "./Juego.js"

const name = "build_sistema_de_cultivos/Build/build_sistema_de_cultivos";

const unityContext = new UnityContext({
    loaderUrl: name + ".loader.js",
    dataUrl: name + ".data",
    frameworkUrl: name + ".framework.js",
    codeUrl: name + ".wasm",
    webglContextAttributes: {
        preserveDrawingBuffer: true,
      },
  });  

export default function SistemaDeCultivos() {
    
    const [tutorialFlag, setTutorialFlag] = React.useState(false)
    const [progression, setProgression] = React.useState(0);
    const [isUnityMounted, setIsUnityMounted] = React.useState(true);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [playerPosition, setPlayerPosition] = React.useState({x: 0, y:0});
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [score, setScore] = React.useState(0);

  React.useEffect(function () {
    unityContext.on("GameOver", function (userName, score) {
      setIsGameOver(true);
      setUserName(userName);
      setScore(score);
      console.log("Evento");
    });
  }, []);
  
    const navigate = useNavigate();

    React.useEffect(function () {
      unityContext.on("progress", handleOnUnityProgression);
      unityContext.on("loaded", handleOnUnityLoaded);
      setPlayerPosition({x:0, y:0});

      return function () {
        if (unityContext)
        {        
        unityContext.removeAllEventListeners();
        }
      };
    }, []);
  
    function capture() {
      unityContext.send("MenuPrincipal", "CaptureKeyboard");
    }

    function release() {
      unityContext.send("MenuPrincipal", "ReleaseKeyboard");
    }
  
    function handleOnClickUnMountUnity() {
        if (isLoaded === true) {
          setIsLoaded(false);
        }
        unityContext.send("MenuPrincipal", "QuitGame");
        setTimeout(
            ()=> {
                setIsUnityMounted(isUnityMounted === false);
                navigate("/", { replace: true });
            }, 500
        )
        
      }

    // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded() {
    setIsLoaded(true);    
    //  createCube(0,0,0,20); 
    //  createCube(1,1,0,20); 
    //  createCube(2,2,0,20); 
    //  createCube(3,3,0,20);     
    const juego = new Juego();
    juego.initGame();    
    // console.log(juego.carte);
     juego.carte.forEach( (row, y) => {
       row.forEach( (col, x) => {
         let altura = 20;
         if (col == 0) altura = 20
         if (col == 1) altura = 20
         if (col == 2) altura = 20
         if (col == 3) altura = 20
         createCube( col, x, y-2, altura);
       })
     });
  }

  function handleOnUnityProgression(progression) {
    setProgression(progression);      
  }

  function createCube(tipo, x, y, altura)
  {
    let obj = { tipo: tipo, altura: altura, x: x, y: y};    
    unityContext.send("CubeManager", "CreateCubeJSON", JSON.stringify(obj));
  }

  return (
    <div>     
    
    {isUnityMounted === true && (
    <>    
      <div className="wrapper">        
        <div className="unity-container m-4 position-relative">
          <Unity unityContext={unityContext} className="unity-canvas" />
          <button className="btn btn-danger btn-sm box-shadow--8dp m-2 position-absolute top-10 end-0"
          onClick={() => handleOnClickUnMountUnity()}> X
      </button>
      <button
        className="btn btn-sm btn-primary box-shadow--8dp m-2 position-absolute" style={buttonStyleCapture}
        onClick={() => capture()}>         
        Capture Keyboard
      </button>
      <button
        className="btn btn-sm btn-primary box-shadow--8dp m-2 position-absolute" style={buttonStyleRelease}
        onClick={() => release()}>          
        Release Keyboard
      </button> 
        <textarea className="position-absolute" style={textStyle}></textarea>      
        </div>                                    
      </div>
      
      <div className="text-center">      
      {progression == 1 ? "" : <p>Loading {progression * 100} percent...</p>}
    </div> 
    </>
       )  }   
    </div>
  );
}

const buttonStyleCapture = {
  right: "15px", 
  bottom: "40px"
};

const buttonStyleRelease = {
  right: "15px", 
  bottom: "5px"
};

const textStyle = {
width: "100%",
maxHeight: "57px",
minHeight: "57px",
right: "0px",
bottom: "-60px"
}

