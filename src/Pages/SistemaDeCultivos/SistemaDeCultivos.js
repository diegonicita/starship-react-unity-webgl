import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";

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
  
    const navigate = useNavigate();

    React.useEffect(function () {
      unityContext.on("progress", function (progression) {
        setProgression(progression);
      });
      unityContext.on("loaded", handleOnUnityLoaded);

      return function () {
        if (unityContext)
        {        
        unityContext.removeAllEventListeners();
        }
      };
    }, []);
  
    function loadLevel() {
      unityContext.send("MenuPrincipal", "LoadNivel");
    }
  
    function toggleTutorial() {    
      if (tutorialFlag == false)
        unityContext.send("MenuPrincipal", "OpenTutorial");
      else {unityContext.send("MenuPrincipal", "CloseTutorial");}
      setTutorialFlag(!tutorialFlag);
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
  }

  return (
    <>
    
    {isUnityMounted === true && (
    <>
      <div className="wrapper">        
        <div className="unity-container m-4">
          <Unity unityContext={unityContext} className="unity-canvas" />
        </div>                                    
      </div>

      <div className="text-center">
      <button
        className="btn btn-primary btn-lg box-shadow--8dp m-2"
        onClick={() => loadLevel()}>         
        JUGAR
      </button>
      <button
        className="btn btn-primary btn-lg box-shadow--8dp m-2"
        onClick={() => toggleTutorial()}>          
        TUTORIAL
      </button>
      <button
        className="btn btn-primary btn-lg box-shadow--8dp m-2"
        onClick={() => handleOnClickUnMountUnity()}>          
        DESMONTAR
      </button>
      {progression == 1 ? "" : <p>Loading {progression * 100} percent...</p>}
    </div> 
    </>
       )  }   
    </>
  );
}