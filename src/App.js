import "./App.css"
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Navbar from "./Navbar";

const unityContext = new UnityContext({
  loaderUrl: "build/starship.loader.js",
  dataUrl: "build/starship.data",
  frameworkUrl: "build/starship.framework.js",
  codeUrl: "build/starship.wasm",
});


function App() {
  return (
    <>    
    <Navbar></Navbar>
    <div className="wrapper">              
      <div className="unity-container m-4">
      <Unity unityContext={unityContext} className="unity-canvas"/>      
      </div>
    </div>
    <div className="text-center">
      <button className="btn btn-primary btn-lg box-shadow--8dp m-2"> JUGAR </button>
      <button className="btn btn-primary btn-lg box-shadow--8dp m-2"> TUTORIAL </button>
      <button className="btn btn-primary btn-lg box-shadow--8dp m-2"> SALIR </button>
    </div>
    </>
  
    )

}

export default App;
