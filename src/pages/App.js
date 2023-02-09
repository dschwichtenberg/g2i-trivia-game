import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickAnswer, clickPlayAgain, fetchQuestionsRequest } from '../redux';

// components
import Home from '../components/Home';
import Quiz from '../components/Quiz';
import Results from '../components/Results';

// styles
import './App.scss';

const App = ({
  questions,
  results,
  onClickPlayAgain,
  onClickAnswer,
  currentQuestionIdx,
  onFetchQuestions,
}) => {
  useEffect(() => {
    onFetchQuestions();
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/quiz"
          render={() =>
            questions ? (
              <Quiz
                question={questions[currentQuestionIdx]}
                questionIdx={currentQuestionIdx}
                questionsLength={questions.length}
                onClickAnswer={onClickAnswer}
              />
            ) : null
          }
        />
        <Route
          path="/results"
          render={() =>
            questions && results ? (
              <Results
                questions={questions}
                results={results}
                onClickPlayAgain={onClickPlayAgain}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </div>
  );
};

App.propTypes = {
  onFetchQuestions: PropTypes.func.isRequired,
  onClickPlayAgain: PropTypes.func.isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  currentQuestionIdx: PropTypes.number.isRequired,
  questions: PropTypes.array,
  results: PropTypes.object,
};

App.defaultProps = {
  questions: null,
  results: null,
};

const mapStateToProps = state => ({
  currentQuestionIdx: state.app.currentQuestionIdx,
  questions: state.app.questions,
  results: state.app.results,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchQuestions: fetchQuestionsRequest,
      onClickPlayAgain: clickPlayAgain,
      onClickAnswer: clickAnswer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
