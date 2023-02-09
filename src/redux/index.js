import { push } from 'react-router-redux';

const CLICK_ANSWER = 'app/CLICK_ANSWER';
const CLICK_PLAY_AGAIN = 'app/CLICK_PLAY_AGAIN';
const FETCH_QUESTIONS_SUCCESS = 'app/FETCH_QUESTIONS_SUCCESS';

export const fetchQuestionsSuccess = data => ({
  type: FETCH_QUESTIONS_SUCCESS,
  data,
});

export const fetchQuestionsRequest = () => dispatch => {
  fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then(res => res.json())
    .then(json => {
      dispatch(fetchQuestionsSuccess(json.results));
    });
};

export const clickAnswer = data => (dispatch, getState) => {
  const {
    app: { currentQuestionIdx, questions },
  } = getState();

  if (currentQuestionIdx + 1 >= questions.length) {
    dispatch(push('/results'));
    dispatch({
      type: CLICK_ANSWER,
      data,
    });

    return;
  }

  dispatch({
    type: CLICK_ANSWER,
    data,
  });
};

export const clickPlayAgain = data => dispatch => {
  dispatch({
    type: CLICK_PLAY_AGAIN,
    data,
  });
  dispatch(fetchQuestionsRequest());
};

const handleClickAnswer = (state, action) => {
  const { questions, results, currentQuestionIdx } = state;
  const answer = action.data;
  const currentQuestion = questions[currentQuestionIdx];
  const correctAnswer = currentQuestion.correct_answer === 'True';
  const answerIsCorrect = correctAnswer === answer;

  const updatedResults = Object.assign({}, results, {
    [currentQuestionIdx]: answerIsCorrect,
  });
  return Object.assign({}, state, {
    results: updatedResults,
    currentQuestionIdx: currentQuestionIdx + 1,
  });
};

const initialState = {
  questions: null,
  results: null,
  currentQuestionIdx: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_QUESTIONS_SUCCESS:
      return Object.assign({}, state, { questions: action.data });
    case CLICK_ANSWER:
      return handleClickAnswer(state, action);
    case CLICK_PLAY_AGAIN:
      return initialState;
    default:
      return state;
  }
}
