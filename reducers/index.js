import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_QUESTION } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck
        }
      }
    case ADD_DECK_QUESTION:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            questions: state.decks[action.title].questions.concat(action.question)
          }
        }
      } 
    default :
      return state
  }
}

export default decks