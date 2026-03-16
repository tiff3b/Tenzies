import { useState } from 'react'
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {

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
        setDice(prevDice => prevDice.map(die =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
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
        setDice(generateNewDice())
    }
    return (
        <main>
            <div className="dice">
                {diceValues}
            </div>
            <div className="roll">
            <button onClick={rollDice}>Roll</button>
            </div>
        </main>
)}


