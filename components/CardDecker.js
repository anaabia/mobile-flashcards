import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray } from '../utils/colors';

class CardDeck extends Component {
    render () {
        const { item } = this.props
        return  (
            <TouchableOpacity style={styles.card}
            onPress={() => this.props.navigation.navigate(
            'Deck',
            { title: item.title }
            )}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.cardsLength}>{item.questions.length} cards</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
      height: 100,
      justifyContent: 'center',
      borderBottomWidth: 2,
      alignItems: 'center',
      borderRadius: 2
    },
    title: {
        fontSize: 24
    },
    cardsLength: {
        fontSize: 18,
        color: gray
    }
  })

export default connect(null)(CardDeck)
