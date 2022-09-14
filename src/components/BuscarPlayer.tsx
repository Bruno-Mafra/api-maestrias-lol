import React from 'react'
import { useState, useRef } from 'react'
import './BuscarPlayer.css'

interface BuscarPlayerProps {
    setNickname: (nickname: string) => void;
};

const BuscarPlayer: React.FC<BuscarPlayerProps> = ({ setNickname }) => {
    
    const [isInputEmpty, setInputEmpty] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const inputRef = useRef<any>();

    const update = (event: any) => {
        setInput(event.target.value);
        setInputEmpty(false);
    }
    
    const searchPlayer = () => {
        if(input.match(/^\s*$/) === null) {
            setNickname(input);
            setInput('');
        }
        else {
            setInputEmpty(true);
            inputRef.current.focus();
        }
    }    

    const handleEnterKeyPress = (event: any) => {
        if (event.keyCode === 13) {
            searchPlayer();
        }
    };

    return (
        <div className='InputContainer'>
            <input 
            id="input"
            className={isInputEmpty ? "InputEmpty" : undefined}
            ref={inputRef}
            autoFocus
            onChange={update}
            value={input}
            onBlur={() => {setInputEmpty(false)}}
            onKeyDown={handleEnterKeyPress}
            placeholder="Digite o nome de invocador..."
            />
            <button className='inputButton' onClick={searchPlayer}>Buscar</button>
        </div>
    )
}

export default BuscarPlayer;