import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";

export default function Game({gamePath})
{

    const name = gamePath;

    const unityContext = new UnityContext({
        loaderUrl: name + ".loader.js",
        dataUrl: name + ".data",
        frameworkUrl: name + ".framework.js",
        codeUrl: name + ".wasm",
        webglContextAttributes: {
            preserveDrawingBuffer: true,
          },
      });    

    return (

        <>
            <div className="wrapper">        
                <div className="unity-container m-4">
                <Unity unityContext={unityContext} className="unity-canvas" />
                </div>                                    
            </div>
        </>
    )
}