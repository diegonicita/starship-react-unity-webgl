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
    const [playerHealth, setPlayerHealth] = React.useState(100);
    const [score, setScore] = React.useState(0);
    
    const juego = new Juego(); 
    
  React.useEffect(function () {
    unityContext.on("Choque", function (name, tipo, id) {
      // console.log("Choque con " + name + " id: " + id + "tipo: " + tipo);
      if (tipo != 5)
      {
      unityContext.send("CubeManager", "DeleteCube", id);
      // Falta borrar el cubo en el mapa de juego
      juego.player.health--; 
      juego.player.score++;
      setPlayerHealth(juego.player.health);
      setScore(juego.player.score);
      }
    });
  }, []);
  
    const navigate = useNavigate();

    React.useEffect(function () {
      unityContext.on("progress", handleOnUnityProgression);
      unityContext.on("loaded", handleOnUnityLoaded);      

      return function () {
        if (unityContext)
        {        
        unityContext.removeAllEventListeners();
        }
      };
    }, []);
  
    function capture() {
      unityContext.send("MenuPrincipal", "CaptureKeyboard");      
      initGame();
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
    initGame();     
  }

  function handleOnUnityProgression(progression) {
    setProgression(progression);      
  }

  function initGame() {        
     unityContext.send("CubeManager", "DeleteAllCubes");
     juego.initGame();       
     juego.carte.forEach( (row, y) => {
       row.forEach( (col, x) => {
         let altura = 20;               
         if (col != 100) createCube( col, x, y-2, altura);
       })
     });
  }

  function createCube(tipo, x, y, altura)
  {
    let obj = { tipo: tipo, altura: altura, x: x, y: y};    
    unityContext.send("CubeManager", "CreateCubeJSON", JSON.stringify(obj));
  }
  
  const progressBarStyleHealth = {
    width: playerHealth + "%",
    ariaValuenow: playerHealth,
    ariaValuemin: "0",
    ariaValuemax: "100",
    zIndex: 100,
    height: "100%"
    }

  return (
    <div>     
    
    {isUnityMounted === true && (
    <>
      <div className="wrapper">        
        <div className="unity-container m-4 position-relative">
          <Unity unityContext={unityContext} className="unity-canvas" />
          <div className="progress bg-dark position-absolute top-10 start-0" style={{marginLeft: "20%", height: '20px', zIndex: 100, width: "60%"}}>            
            <div className="progress-bar bg-danger" role="progressbar" style={progressBarStyleHealth}></div>
          </div>            
          <div className="position-absolute start-0 text-white" style={{zIndex:200, right: "0px", top: "-3px"}}>Health {playerHealth}% - Score {score}
          </div>
            <button
              className="btn btn-sm btn-danger box-shadow--8dp m-2 position-absolute" style={buttonStyleClose}
              onClick={() => handleOnClickUnMountUnity()}>          
              X
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
            <button
              className="btn btn-sm btn-primary box-shadow--8dp m-2 position-absolute" style={buttonStyleInit}
              onClick={() => initGame()}>          
              Init
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

const buttonStyleRelease = {
  right: "0px", 
  bottom: "0px"
};

const buttonStyleCapture = {
  right: "0px", 
  bottom: "35px"
};

const buttonStyleInit = {
  right: "0px", 
  bottom: "70px"
};

const buttonStyleClose = {
  right: "0px", 
  top: "0px",
  zIndex: 1000
};

const textStyle = {
width: "100%",
maxHeight: "57px",
minHeight: "57px",
right: "0px",
bottom: "-60px"
}


