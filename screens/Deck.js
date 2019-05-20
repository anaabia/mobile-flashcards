import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet } from 'react-native';
import { white, gray, black } from '../utils/colors';
import { formatIdTitle } from '../utils/helpers';
import DoubleButton from '../components/DoubleButton';

class Deck extends Component {
    render() {
        const { item: { title, questions } } = this.props
        return (
            <View style={styles.content}>
                <View style={styles.box}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.questions}>{questions.length} cards</Text>
                </View>
                <DoubleButton
                    firstStyle={styles.newCard}
                    firstPress={() => this.props.navigation.navigate(
                        'NewQuestion',
                        { title: title }
                    )}
                    firstStyleText={styles.btnTextCard}
                    firstText='Add card'
                    secondStyle={styles.quiz}
                    secondPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { questions, currentQuiz: 0, correctAnswer: 0 }
                    )}
                    secondText='Start quiz'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: white,
        padding: 15,
        height: 100,
        borderBottomWidth: 2,
        alignItems: 'center',
        borderRadius: 2
    },
    box: {
        alignItems: 'center',
    },
    title: {
        fontSize: 40
    },
    questions: {
        fontSize: 30,
        color: gray
    },
    btnTextCard: {
        color: black,
    },
    quiz: {
        backgroundColor: black,
    },
    newCard: {
        backgroundColor: white,
    }
})

const mapStateToProps = ({ decks }, ownProps) => {
    const title = formatIdTitle(ownProps.navigation.state.params.title)
    return {
        item: decks[title]
    }
}

export default connect(mapStateToProps)(Deck)