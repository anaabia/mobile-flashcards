import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors';
import DoubleButton from '../components/DoubleButton';

class Result extends Component {
    render () {
        const { total, correctAnswer } = this.props.navigation.state.params
        const percentage = (100 * correctAnswer) / total
        const message = percentage >= 80 ? 'Congratilation! 🎉' :
          (percentage < 80 && percentage >= 50 ? 'Very well! 😁' :
          (percentage < 50 && percentage > 10 ? 'You need to practice 😢' :
           'You need study more 😭'))
        return  (
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>{percentage > 50 && percentage < 10 && 'Sorry!!'}</Text>
                    <Text style={styles.title}>{message}</Text>
                    <Text style={styles.pontuation}>{correctAnswer}/{total}</Text>
                </View>
                <DoubleButton
                    firstStyle={styles.defaultButton}
                    firstPress={() => this.props.navigation.pop(total)}
                    firstStyleText={styles.btnTextCard}
                    firstText='Restart Quiz'
                    secondStyle={styles.defaultButton}
                    secondPress={() => this.props.navigation.pop(total+1)}
                    secondText='Back to deck'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
      height: 100,
      justifyContent: 'space-around',
      borderBottomWidth: 2,
      alignItems: 'center',
      borderRadius: 2
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    pontuation: {
        textAlign: 'center',
        fontSize: 18,
        color: gray
    },
    defaultButton: {
        backgroundColor: black
    }
  })

export default connect(null)(Result)
