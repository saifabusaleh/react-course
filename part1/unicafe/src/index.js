import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Givefeedback = (props) => {
    return (
    <div>
    <h4>Give feedback</h4>
    <button onClick={props.handleGoodClick}>good</button>
    <button onClick={props.handleNeutralClick}>neutral</button>
    <button onClick={props.handleBadClick}>bad</button>
    </div>
    )
}
const Statistic = (props) => {
    if(props.shouldDisplayPercent) {
        return (
    
            <div>{props.text} {props.value}%</div>
            )
    }
    return (
    
    <div>{props.text} {props.value}</div>
    )
}
const Statistics = (props) => {
    let good=props.good;
    let neutral=props.neutral;
    let bad=props.bad;
    

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
          <div>
            No feedback given!
          </div>
        )
    }
    let sum = good+neutral+bad;
    let average = (good+bad*-1)/sum;
    let positive = (good/(sum))*100;
    return(
        <div>
      <h4>Statistics</h4>
      <table>
          <tbody>
          <tr><td><Statistic text="Good:" value={good}></Statistic></td></tr>
          <tr><td><Statistic text="Neutral:" value={neutral}></Statistic></td></tr>
          <tr><td><Statistic text="Bad:" value={bad}></Statistic></td></tr>
          <tr><td><Statistic text="All:" value={sum}></Statistic></td></tr>
          <tr><td><Statistic text="Average:" value={average}></Statistic></td></tr>
          <tr><td><Statistic shouldDisplayPercent="true" text="Positive:" value={positive}></Statistic></td></tr>
          </tbody>
      </table>
    </div>
    )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1);
  const handleNeutralClick = () => setNeutral(neutral+1);
  const handleBadClick = () => setBad(bad+1);
  return (
    <div>
      <Givefeedback handleGoodClick={()=> handleGoodClick()} handleNeutralClick={()=>handleNeutralClick()}
      handleBadClick={()=>handleBadClick()}></Givefeedback>
      <br></br>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)