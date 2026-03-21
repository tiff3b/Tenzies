import { useState, useRef, useEffect } from 'react'
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = useState(() => generateNewDice())
    const buttonFocus = useRef(null)

    const gameWon = 
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {  
            buttonFocus.current.focus()
        }
        }, [gameWon])
        
    function generateNewDice(){
        const newDice = []
            for (let i =0; i <10; i++) {
                newDice.push({
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false})
            }
        return newDice
    }

    function hold(id){
        setDice(prevDice => {
            const newDice = prevDice.map(die =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        )
        return newDice
        })
    }

    const diceValues = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld}
            hold={() => hold(die.id)}
            id={die.id}
        />
    ))

    function rollDice(){
        if (gameWon) {
            setDice(generateNewDice())
        } else {
        setDice(prevDice => {
            const newDice= prevDice.map(die =>
                die.isHeld ? die : 
                    { ...die, value: Math.ceil(Math.random() *6) }
        )
        return newDice})
    }
}

    return (
        <main>
            {gameWon && <Confetti /> }
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceValues}
            </div>
            <button className="roll-dice" onClick={rollDice} ref={buttonFocus}>
                {gameWon ? "New Game" : "Roll"}              
            </button>
        </main>
)}


