import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

const Quiz = ({ question, questionIdx, questionsLength, onClickAnswer }) => (
  <div className="quiz">
    <h1>{question.category}</h1>
    <div className="quiz__question-ctr">
      <div className="quiz__question">
        <span>{question.question}</span>
      </div>
      <div className="quiz__question-idx">
        {`${questionIdx + 1} of ${questionsLength}`}
      </div>
    </div>
    <div className="quiz__buttons">
      <button onClick={() => onClickAnswer(true)}>True</button>
      <button onClick={() => onClickAnswer(false)}>False</button>
    </div>
  </div>
);

Quiz.propTypes = {
  onClickAnswer: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  questionIdx: PropTypes.number.isRequired,
  questionsLength: PropTypes.number.isRequired,
};

export default Quiz;
