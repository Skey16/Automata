import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [transitionHistory, setTransitionHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const transitions = {
    0: { R: 1, S: 2, T: 3 },
    1: {
      K: 4, L: 4, M: 4, N: 4, O: 4, P: 4, Q: 4, R: 4, S: 4, T: 4,
      U: 4, V: 4, W: 4, X: 4, Y: 4, Z: 4
    },
    2: {
      A: 4, B: 4, C: 4, D: 4, E: 4, F: 4, G: 4, H: 4, I: 4, J: 4,
      K: 4, L: 4, M: 4, N: 4, O: 4, P: 4, Q: 4, R: 4, S: 4, T: 4,
      U: 4, V: 4, W: 4, X: 4, Y: 4, Z: 4
    },
    3: { A: 4, B: 4, C: 4, D: 4, E: 4, F: 4, G: 4 },
    4: {
      A: 5, B: 5, C: 5, D: 5, E: 5, F: 5, G: 5, H: 5, I: 5, J: 5,
      K: 5, L: 5, M: 5, N: 5, O: 5, P: 5, Q: 5, R: 5, S: 5, T: 5,
      U: 5, V: 5, W: 5, X: 5, Y: 5, Z: 5
    },
    5: { "-": 6 },
    6: {
      "0": 8,
      "1": 7, "2": 7, "3": 7, "4": 7, "5": 7, "6": 7, "7": 7, "8": 7, "9": 7
    },
    7: {
      "0": 9, "1": 9, "2": 9, "3": 9, "4": 9, "5": 9, "6": 9, "7": 9, "8": 9, "9": 9
    },
    8: {
      "0": 10,
      "1": 9, "2": 9, "3": 9, "4": 9, "5": 9, "6": 9, "7": 9, "8": 9, "9": 9
    },
    9: {
      "0": 11, "1": 11, "2": 11, "3": 11, "4": 11, "5": 11, "6": 11, "7": 11, "8": 11, "9": 11
    },
    10: {
      "1": 11, "2": 11, "3": 11, "4": 11, "5": 11, "6": 11, "7": 11, "8": 11, "9": 11
    },
    11: { "-": 12 },
    12: {
      A: 13, B: 13, C: 13, D: 13, E: 13, F: 13, G: 13, H: 13, I: 13, J: 13,
      K: 13, L: 13, M: 13, N: 13, O: 13, P: 13, Q: 13, R: 13, S: 13, T: 13,
      U: 13, V: 13, W: 13, X: 13, Y: 13, Z: 13
    },
    13: "accept",
  };

  useEffect(() => {
    if (currentStep < transitionHistory.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, transitionHistory]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setIsValid(null);
    setTransitionHistory([]);
    setCurrentStep(0); 
  };

  const handleValidation = () => {
    let currentState = 0;
    let history = [];

    for (const char of inputValue) {
      const nextState = transitions[currentState]?.[char];
      const nextStateDescription = nextState !== undefined ? nextState : "inválido";
      history.push(`Desde estado ${currentState} con carácter '${char}' --> estado ${nextStateDescription}`);
      if (nextState === undefined) {
        setIsValid(false);
        setTransitionHistory(history);
        return;
      }
      currentState = nextState;
    }

    setIsValid(currentState === 13);
    setTransitionHistory(history);
  };

  return (
    <div>
      <p>INGRESA TU MATRICULA</p>
      <input type="text" value={inputValue} onChange={handleChange} maxLength={13} />
      <button onClick={handleValidation}>Verificar</button>
      {isValid === null ? (
        <p>Esperando validación...</p>
      ) : isValid ? (
        <p style={{ color: "green" }}>Válido</p>
      ) : (
        <p style={{ color: "red" }}>Inválido</p>
      )}
      <div>
        <h3>Historial de transiciones:</h3>
        <ol>
          {transitionHistory.slice(0, currentStep).map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
