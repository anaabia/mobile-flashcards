import { AsyncStorage } from 'react-native'
import { DECKERS } from './setLocalStorage'
import { formatNewDeck, formatIdTitle } from './helpers';

export const getDecks  = () => {
  return AsyncStorage.getItem(DECKERS).then(data => {return JSON.parse(data)})
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(DECKERS)
  .then((results) => {
    const data = JSON.parse(results)
    return data[id]
  })
}

export const saveDeckTitle = (title) => {
   AsyncStorage.getItem(DECKERS)
    .then((results) => {
      const data = JSON.parse(results)
      const newData = {
        ...data,
        ...formatNewDeck(title)
      }
      AsyncStorage.setItem(DECKERS, JSON.stringify(newData))
    })
}

export const addCardToDeck = (title, card) => {
  const id = formatIdTitle(title)
  return AsyncStorage.getItem(DECKERS)
    .then((results) => {
      const data = JSON.parse(results)
      const newData = {
        ...data,
        [id]: {
          ...data[id],
          questions: data[id].questions.concat(card)
        }
      }
      AsyncStorage.setItem(DECKERS, JSON.stringify(newData))
    })
}