import "./App.css"
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/starship.loader.js",
  dataUrl: "build/starship.data",
  frameworkUrl: "build/starship.framework.js",
  codeUrl: "build/starship.wasm",
});


function App() {
  return (
    <>    
    <div className="wrapper">    
      <h1>Spaceship</h1>
      <div className="unity-container">
      <Unity unityContext={unityContext} className="unity-canvas"/>      
      </div>
    </div>
    </>
  
    )

}

export default App;
