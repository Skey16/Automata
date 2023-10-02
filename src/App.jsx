import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [characterValidities, setCharacterValidities] = useState(Array(9).fill(null));
  const [showNumbers, setShowNumbers] = useState(false);
  const [validCharacterIndex, setValidCharacterIndex] = useState(-1);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setCharacterValidities(Array(9).fill(null)); // Reinicia el estado de validación al cambiar el input
    setShowNumbers(false); // Oculta los números al cambiar el input
  };

  const handleValidation = () => {
    // Expresiones regulares para las validaciones
    const firstCharRegex = /^[RST]$/;
    const secondCharRegex =
      inputValue[0] === "R" ? /^[K-Z]$/ : inputValue[0] === "S" ? /^[A-Z  ]$/ : /^[A-G]$/;
    const thirdCharRegex = /^[A-Z]$/;
    const fourthCharRegex = /^[-]$/;
    const fifthCharRegex = /^[0-9]$/;
    const sixthCharRegex = /^[0-9]$/;
    const seventhCharRegex = /^[0-9]$/;
    const eighthCharRegex = /^[-]$/;
    const ninthCharRegex = /^[A-Z]$/;

    // Validación de cada carácter
    const characterValidities = [
      firstCharRegex.test(inputValue[0]),
      secondCharRegex.test(inputValue[1]),
      thirdCharRegex.test(inputValue[2]),
      fourthCharRegex.test(inputValue[3]),
      inputValue.slice(4, 7) === "000" ? /^[1-9]$/ : fifthCharRegex.test(inputValue[4]),
      sixthCharRegex.test(inputValue[5]),
      seventhCharRegex.test(inputValue[6]),
      eighthCharRegex.test(inputValue[7]),
      ninthCharRegex.test(inputValue[8]),
    ];

    // Validación especial para los tres números
    if (inputValue.slice(4, 7) === "000") {
      characterValidities[6] = false;
    }

    // Comprueba si todos los caracteres son válidos
    const isValidFormat = characterValidities.every((validity) => validity);

    setIsValid(isValidFormat);
    setCharacterValidities(characterValidities);

    // Al final de la validación, comienza a mostrar caracteres válidos uno por uno
    setValidCharacterIndex(-1);
    setShowNumbers(true);
  };

  useEffect(() => {
    if (showNumbers && validCharacterIndex < characterValidities.length - 1) {
      // Programa la próxima animación si aún no se han mostrado todos los caracteres
      const timer = setTimeout(() => {
        setValidCharacterIndex(validCharacterIndex + 1);
      }, 500); // Cambia el valor de 500 ms según tus preferencias
      return () => clearTimeout(timer); // Limpia el temporizador en la próxima renderización o desmontaje
    }
  }, [showNumbers, validCharacterIndex, characterValidities.length]);

  return (
    <div>
      <p>INGRESA TU MATRICULA</p>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleValidation}>Verificar</button>
      {isValid ? <p style={{ color: "green" }}>Válido</p> : <p style={{ color: "red" }}>Inválido</p>}
      {showNumbers && (
        <div>
          {inputValue.split("").map((char, index) => (
            <p key={index}>
              Carácter {index + 1}:{" "}
              <span style={{ color: characterValidities[index] ? "green" : "red" }}>{char}</span> -{" "}
              {index <= validCharacterIndex ? (
                <span style={{ color: characterValidities[index] ? "green" : "red" }}>
                  {characterValidities[index] ? "Válido" : "Inválido"}
                </span>
              ) : (
                "En espera"
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
