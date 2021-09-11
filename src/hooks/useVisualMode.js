import {useState} from 'react'

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); 

    const back = () => {
        if (history.length > 1) {
            let tempHistory = [...history]
            tempHistory.pop()
            setHistory(tempHistory)
            return setMode(history[history.length - 2])
        }
        return
    }

    const transition = (newMode, replace = false) => {
        if (replace) {
            let tempHistory = [...history]
            tempHistory.pop()
            tempHistory.push(newMode)
            setHistory(tempHistory)
            return setMode(newMode)
        }
        setHistory([...history, newMode])
        return setMode(newMode)
    }

    return {
        mode,
        transition,
        back
    }
}