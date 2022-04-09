import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({stats}) => {
  const all = stats.good + stats.neutral + stats.bad
  const avg = (stats.good - stats.bad) / all
  const pos = (stats.good / all) * 100

  if (stats.good || stats.neutral || stats.bad) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good}/>
          <StatisticLine text="neutral" value={stats.neutral}/>
          <StatisticLine text="bad" value={stats.bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avg}/>
          <StatisticLine text="positive" value={pos + ' %'}/>
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics stats={{good, neutral, bad}} />
    </div>
  )
}

export default App