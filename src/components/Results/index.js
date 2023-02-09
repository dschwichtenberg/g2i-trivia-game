import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

const Results = ({ questions, results, onClickPlayAgain }) => {
  const numCorrect = Object.values(results).filter(r => !!r).length;

  return (
    <div className="results">
      <div>
        <h1>You scored</h1>
        <h1>{`${numCorrect} / ${Object.keys(results).length}`}</h1>
      </div>

      <div>
        {questions.map((q, i) => (
          <div className="results__question" key={q.question}>
            <span className="results__question-indicator">
              {results[i] ? '+' : '-'}
            </span>
            <span>{q.question}</span>
          </div>
        ))}
      </div>
      <a href="#" onClick={onClickPlayAgain}>
        Play Again?
      </a>
    </div>
  );
};

Results.propTypes = {
  onClickPlayAgain: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
};

export default Results;
