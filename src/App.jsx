import { use, useState } from 'react'
import Die from "./Die"

export default function App() {

    function generateNewDice(){
        const newDice = []
            for (let i =0; i <10; i++) {
                const rand = Math.ceil(Math.random() * 6)
                newDice.push(rand)
            }
        return newDice
    }
    const [newDice, setNewDice] = useState(generateNewDice())

    const diceValues = newDice.map((num,index) => {
        return <Die key={index} value={num} />
    })

    function rollDice(){
        setNewDice(generateNewDice())
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


