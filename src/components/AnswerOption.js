import React from 'react'
import PropTypes from 'prop-types'

function AnswerOption(props) {
  return (
    <button className="answerOption" onClick={() => props.handleClick(props.a_id)}>
      {props.answerText}
    </button>
  )
}

AnswerOption.propTypes = {
  answerText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default AnswerOption
