import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
 
  function transition(newMode, replace = false) {
    
    if(replace === true) {
      setHistory(prev =>{ 
        let result = [...prev.slice(0, prev.length - 1)]
        result = [...result, newMode]
        setMode(result[result.length - 1])
        return result;
      })
    } else {
      setMode(newMode)
      setHistory(prev => [...prev, newMode])
    }
  };

  function back(){
    
    if(history.length > 1){
      setHistory(prev =>{ 
        const result = [...prev.slice(0, prev.length - 1)]
        setMode(result[result.length - 1])
        return result;
      })  
    };

  };

  return {mode, transition, back};
}