import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");           // current input
  const [justCalculated, setJustCalculated] = useState(false); // flag after "="

  const operators = ["+", "-", "*", "/"];

  // Handle numbers and operators
  const handleClick = (value) => {
    const lastChar = input.slice(-1);

    // If last action was "=" and user presses number → reset input
    if (justCalculated && !operators.includes(value)) {
      setInput(value);
      setJustCalculated(false);
      return;
    }

    // Prevent multiple operators in a row
    if (operators.includes(value) && operators.includes(lastChar)) {
      setInput(prev => prev.slice(0, -1) + value);
    } else {
      setInput(prev => prev + value);
    }

    setJustCalculated(false);
  };

  // Decimal point
  const handleDecimal = () => {
    const parts = input.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];

    if (!lastNumber.includes(".")) {
      if (justCalculated) {
        setInput("0.");
      } else {
        setInput(prev => prev + ".");
      }
    }
    setJustCalculated(false);
  };

  // Backspace
  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
    setJustCalculated(false);
  };

  // Clear input
  const clearInput = () => {
    setInput("");
    setJustCalculated(false);
  };

const handlePercent = () => {
  try {
    // Convert current input to number and divide by 100
    const result = Function('"use strict"; return (' + input + '/100)')();
    setInput(result.toString());
    setJustCalculated(true); // mark as calculated
  } catch {
    setInput("Error");
    setJustCalculated(true);
  }
};

  // Calculate result safely
  const calculate = () => {
    try {
      const result = Function('"use strict"; return (' + input + ')')();
      setInput(result.toString());
      setJustCalculated(true);
    } catch {
      setInput("Error");
      setJustCalculated(true);
    }
  };

  return (
    <div className="calculator">
      <h1>Advanced Calculator</h1>

      <div className="display">{input || "0"}</div>

      <div className="buttons">
        {/* First row */}
        <button onClick={clearInput}>C</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("*")}>*</button>

        {/* Second row */}
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>-</button>

        {/* Third row */}
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        {/* Fourth row */}
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={calculate}>=</button>

        {/* Fifth row */}
        <button onClick={() => handleClick("0")} className="zero">0</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handlePercent}>%</button>
      </div>
    </div>
  );
}

export default App;
