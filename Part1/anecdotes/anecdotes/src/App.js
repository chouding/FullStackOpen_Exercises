import { useState } from 'react'


const Display = ({ title, anecdote, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  console.log(handleClick)
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const getRandomValue = arrayLength => {
    return () => {
      setSelected(Math.floor(Math.random()*arrayLength))
    }
  }

  const addSelected = index => {
    const copiedVotes = [...votes]
    copiedVotes[index] = copiedVotes[index] + 1
    return () => {
      setVotes(copiedVotes)
    }
  }

  return (
    <div>
      <Display title = "Anecdote of the day" anecdote = {anecdotes[selected]} votes = {votes[selected]}></Display>
      <div>
        <Button handleClick = {addSelected(selected)} text = "vote"></Button>
        <Button handleClick = {getRandomValue(anecdotes.length)} text = "next anecdote"></Button>
      </div>
      <Display title = "Anecdote with most votes" anecdote = {anecdotes[votes.indexOf(Math.max(...votes))]} votes = {Math.max(...votes)}></Display>
    </div>
  )
}

export default App