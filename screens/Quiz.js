import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, gray, red, green, purple } from '../utils/colors';
import Button from '../components/Button';
import DoubleButton from '../components/DoubleButton';

class Quiz extends Component {
    state = {
        isQuestion: true
    }

    changeView = () => {
        this.setState((prevState) => {
            return {
                isQuestion: !prevState.isQuestion
            }
          }
        )
    }

    nextQuestion = (isCorrect) => {
        const { questions, currentQuiz, correctAnswer } = this.props.navigation.state.params
        const numberCorrect = isCorrect ? (correctAnswer + 1) :  correctAnswer
        const nextQuiz = currentQuiz + 1
        if (nextQuiz === questions.length) {
            this.props.navigation.navigate(
                'Result',
                { total: questions.length, correctAnswer: numberCorrect}
            )
        } else {
            this.props.navigation.navigate(
                'Quiz',
                { questions, currentQuiz: nextQuiz, correctAnswer: numberCorrect}
            )
        }
    }

    render() {
        const { isQuestion } = this.state
        const { questions, currentQuiz } = this.props.navigation.state.params
        const { question, answer } = questions[currentQuiz]
        return (
            <View style={styles.content}>
                <View style={styles.totalCards}>
                    <Text>
                        {currentQuiz + 1}/{questions.length}
                    </Text>
                </View>
                <View style={styles.boxQuestion}>
                    <View style={styles.box}>
                        <Text style={styles.title}>
                            {isQuestion ? question : answer}
                        </Text>
                        <TouchableOpacity onPress={this.changeView}>
                            <Text style={styles.changeText}>{isQuestion ? 'Awswer' : 'Question'}</Text>
                        </TouchableOpacity>
                    </View>
                    <DoubleButton
                        firstStyle={styles.correct}
                        firstPress={() => this.nextQuestion(true)}
                        firstText='Correct'
                        secondStyle={styles.wrong}
                        secondPress={() => this.nextQuestion(false)}
                        secondText='Incorrect'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: white,
        padding: 15,
        height: 100,
        borderBottomWidth: 2,
        borderRadius: 2
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    questions: {
        fontSize: 30,
        color: gray
    },
    wrong: {
        backgroundColor: red,
        borderColor: red
    },
    correct: {
        backgroundColor: green,
        borderColor: green
    },
    changeText: {
        textAlign: 'center',
        color: red,
    },
    totalCards: {
        alignItems: 'flex-start'
    },
    boxQuestion: {
        flex: 1,
        justifyContent: 'space-around'
    }
})

export default connect(null)(Quiz)