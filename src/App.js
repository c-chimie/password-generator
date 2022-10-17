import { useState, useRef, useEffect } from 'react';
import './App.css';
import { number, upperCaseLetters, lowerCaseLetters, specialCharacters } from "./Characters"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

toast.configure();
function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(20)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)

  const copyBtn = useRef();

  //generates a character list that contains checked value types to include
  const handleGeneratePassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      notification("You must select at least one option.", true)
    }
    let characterList = "";
    if (uppercase) {
      characterList += upperCaseLetters
    }
    if (lowercase) {
      characterList += lowerCaseLetters
    }
    if (numbers) {
      characterList += number
    }
    if (symbols) {
      characterList += specialCharacters
    }
    setPassword(passwordCreator(characterList))
  }

  //password will be generated when website renders
  useEffect(() => {
    handleGeneratePassword();
  }, [])

  //ensures that there are only 20 (or other number specified by user) characters in password
  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = generateRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex)
    }
    return password;
  }

  //used above to randomly select characters from character list (loops until it reaches number of characters specified by user)
  const generateRandomIndex = (limit) => {
    return Math.round(Math.random() * limit)
  }

  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea")
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea)
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false
    }, 3000)
  }

  const notification = (message, error = false) => {
    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopy = () => {
    copyFromClipboard()
    notification("Copied to clipboard!")
  }

  return (
    <>
      <h1 className='headline'>PASSWORD GENERATOR</h1>
      <div className="container">
        <div className='generator'>
          <div className='generator_password'>
            <span><strong>{password}</strong></span><br />
            {!password ? "" : <button
              className='btn'
              ref={copyBtn}
              onClick={handleCopy}
            >COPY TO CLIPBOARD</button>}
            <div className='form-group'>
              <label htmlFor="password-length">Password Length:</label>
              <input
                name="password-length"
                id="password-length"
                type="number"
                max="20"
                min='7'
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)} />
            </div>
            <div className='form-group'>
              <label htmlFor="uppercase-letters">Include Uppercase Letters:</label>
              <input
                name='uppercase-letters'
                id="uppercase-letters"
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)} />
            </div>
            <div className='form-group'>
              <label htmlFor="lowercase-letters">Include Lowercase Letters:</label>
              <input
                name='lowercase-letters'
                id="lowercase-letters"
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)} />
            </div>
            <div className='form-group'>
              <label htmlFor="include-numbers">Include Numbers:</label>
              <input
                name='include-numbers'
                id="include-numbers"
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)} />
            </div>
            <div className='form-group'>
              <label htmlFor="include-symbols">Include Symbols:</label>
              <input
                name='include-symbols'
                id="include-symbols"
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)} />
            </div>
            <button
              className='btn'
              onClick={handleGeneratePassword}
            >GENERATE NEW PASSWORD</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
