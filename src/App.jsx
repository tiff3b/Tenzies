import { useState } from 'react'
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {

    function gameWon(dice) {
        if ( dice.every(die => die.isHeld) &&
             dice.every(die => die.value === dice[0].value)
            ) {
                console.log("Game won!");
            }
    }
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
    const [dice, setDice] = useState(generateNewDice())

    function hold(id){
        setDice(prevDice => {
            const newDice = prevDice.map(die =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        )
        gameWon(newDice)
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
        setDice(prevDice => {
            const newDice= prevDice.map(die =>
            die.isHeld ? die :
                { ...die, value: Math.ceil(Math.random() *6) }
        )
        gameWon(newDice)
        return newDice
    })
    }
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
                {diceValues}
            </div>
            <div className="roll">
            <button onClick={rollDice}>Roll</button>
            </div>
        </main>
)}


