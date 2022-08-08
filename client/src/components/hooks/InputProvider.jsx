
import { useState, createContext, useContext, useMemo } from "react";

const InputContext = createContext({});

const InputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState([]);

  console.log(userInput, 'userInput from input context');

  const setInput = async (input) => setUserInput(input);

  const value = useMemo(
    () => ({
      userInput,
      setInput
    }),
    [userInput],
  );

  return <InputContext.Provider value={value}>{children}</InputContext.Provider>;
}

const useInput = () => {
  return useContext(InputContext);
}

export { useInput, InputProvider };