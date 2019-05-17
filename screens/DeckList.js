import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux'
import { valuesIn } from 'lodash'
import CardDeck from '../components/CardDecker';
import { white } from '../utils/colors';

class DeckList extends Component{

    componentDidMount () {
        const { dispatch } = this.props
    
        getDecks()
          .then((decks) => 
              dispatch(receiveDecks(decks))
            )
    }

    render () {
        const { decks } = this.props
        return (
            <View style={styles.content}>
                <FlatList
                data={valuesIn(decks)}
                renderItem={({item}) => <CardDeck navigation={this.props.navigation} item={item}/>}
                keyExtractor={(item) => item.title}
               />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
    },
  })

const mapStateToProps = ({decks}) => {
    return {
        decks
    }
}

export default connect(mapStateToProps,null)(DeckList)