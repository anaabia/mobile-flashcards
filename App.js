import React from 'react'
import { View, StatusBar, HeaderBackButton } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, black, gray } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DeckList from './screens/DeckList';
import NewDeck from './screens/NewDeck';
import setDeckData from './utils/setLocalStorage';
import Deck from './screens/Deck';
import NewQuestion from './screens/NewQuestion'
import Quiz from './screens/Quiz'
import Result from './screens/Result';
import { setLocalNotification } from './utils/helpers';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck'
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'New question'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      title: 'Result'
    }
  }
},{
  navigationOptions
})

const navigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
})

export default class App extends React.Component {
  componentDidMount(){
    setDeckData()
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}