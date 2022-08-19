import { useState } from 'react'

const StatisticLine = ( { text, num }) => <tr><th>{text}</th> <th>{num}</th></tr>

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = (good-bad) / (good+neutral+bad)
  const positive = good / (good+neutral+bad) * 100

  if (sum === 0) {
    return <div>No feedback given</div>
  } 
  return (
    <table>
        <StatisticLine text = "good" num = {good}></StatisticLine>
        <StatisticLine text = "neutral" num = {neutral}></StatisticLine>
        <StatisticLine text = "bad" num = {bad}></StatisticLine>
        <StatisticLine text = "all" num = {sum}></StatisticLine>
        <StatisticLine text = "average" num = {average}></StatisticLine>
        <StatisticLine text = "positive" num = {positive + " %"}></StatisticLine>
    </table>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick = {handleClick}>{text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const moreStats = {
    sum: good+neutral+bad, 
    average: (good-bad) / (good+neutral+bad),
    positive: good / (good+neutral+bad)
  }

  return (
    <>
      <table>
        <td>
          <tr>test</tr>
          <tr>again</tr>
        </td>
        <td>
          <tr>test</tr>
          <tr>again</tr>
        </td>
      </table>
      <div>
        <h1>
          give feedback
        </h1>
        <Button handleClick = {() => setGood(good + 1)} text="good"></Button>
        <Button handleClick = {() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button handleClick = {() => setBad(bad + 1)} text = "bad"></Button>
        <h1>
          statistics
        </h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
      </div>
    </>
  )
}

export default App