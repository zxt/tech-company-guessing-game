import React, {useState} from 'react';
import './App.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Question from './components/Question'
import AnswerOption from './components/AnswerOption'
import {getRandomInt, shuffleArray} from './utils'

var data = require('./data/data.json')

function App() {
  const co = data.companies

  // anonymize company names
  co.forEach(function(c) {
    let re = new RegExp(c.name, 'g')
    c.hint = c.hint.replace(re, '[X]')
  })

  const [q_id, setQId] = useState(getRandomInt(0, co.length))
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  function fireAlertDialog(answer) {
    const MySwal = withReactContent(Swal)

    if(answer === 'correct') {
      MySwal.fire({
        type: 'success',
        title: 'Correct'
      })
    }
    else if(answer === 'wrong') {
      MySwal.fire({
        type: 'error',
        title: 'Wrong'
      })
    }
  }

  function handleAnswerSelect(answer_id) {
    if(answer_id === q_id) {
      fireAlertDialog('correct')
      setCorrectCount(correctCount + 1)
    }
    else {
      fireAlertDialog('wrong')
    }
    setTotalCount(totalCount + 1)
    let newQ = q_id
    while(newQ === q_id) {
      newQ = getRandomInt(0, co.length)
    }
    setQId(newQ)
  }

  let a_ids = []
  while(a_ids.length < 3) {
    let rand_id = getRandomInt(0, co.length)
    if(a_ids.includes(rand_id) || rand_id === q_id) {
      continue
    }
    else {
      a_ids.push(rand_id)
    }
  }
  a_ids.push(q_id)
  shuffleArray(a_ids)

  let answerOptions = []
  for(var i in a_ids) {
    answerOptions.push(<AnswerOption
                          key={i}
                          a_id={a_ids[i]}
                          answerText={co[a_ids[i]].name}
                          handleClick={handleAnswerSelect}
                       />)
  }

  return (
    <div className="App">
      <Question content={co[q_id].hint} />
      <div className="answerWrapper">
        {answerOptions}
      </div>
      <div>
        {correctCount} / {totalCount}
      </div>
    </div>
  )
}

export default App;
