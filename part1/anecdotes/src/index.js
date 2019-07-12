import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const AnecdoteOfTheDay = (props) => {
    return (
    <div>
      <h2>Anecdote of the day</h2>
      <div> {props.selectedAnecdote} </div>
      <div>has {props.numberOfVotes} votes</div>
      <div>
           <button onClick={props.vote}>vote</button>
          <button onClick={props.getRandomAnecdote}>next anecdote</button>
          </div>
    </div>
    )
}

const AnecodeWithMostVotes = (props) => {

    const getMaxIndex = () => {
        let max=0, maxIndex=0;
        for(let i=0;i<Object.keys(props.votes).length;i++) {
            if(props.votes[i]>max) {
                max=props.votes[i];
                maxIndex=i;
            }
        }
        return maxIndex;
    }
    
    return (
        <div>
        <h2>Anecdote with most votes</h2>
        <div>{props.anecdotes[getMaxIndex()]}</div>
        </div>
    )
}
const App = (props) => {
  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const getRandomAnecdote = () => {
    let randNumber = Math.floor(Math.random() * 6);
    setSelectedAnecdote(randNumber);
  }

  const voteForSelectedAnecdote = () => {
    const copy = { ...votes }
    copy[selectedAnecdote]+=1;
    setVotes(copy);
  }
  return (
      
    <div>
        <AnecdoteOfTheDay selectedAnecdote={props.anecdotes[selectedAnecdote]}
         numberOfVotes={votes[selectedAnecdote]} vote={()=> voteForSelectedAnecdote()}
         getRandomAnecdote = {()=>getRandomAnecdote()}></AnecdoteOfTheDay>

         <AnecodeWithMostVotes anecdotes={props.anecdotes} votes={votes}></AnecodeWithMostVotes>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)