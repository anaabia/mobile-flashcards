import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, StyleSheet, TextInput,KeyboardAvoidingView } from 'react-native';
import { white, black } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { addDeckQuestion } from '../actions';
import Button from '../components/Button';

class NewQuestion extends Component{

    constructor(props) {
        super(props);
        this.state = {  question: '', answer: '' };
    }

    submitQuestion = () => {
        const { question, answer } = this.state
        const title = this.props.navigation.state.params.title
        this.props.dispatch(addDeckQuestion(title, { answer, question }))
        addCardToDeck(title, { answer, question })
        this.props.navigation.goBack()
    }

    render () {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.content}>
                <TextInput 
                    placeholder="Ex: What is a component? "
                    style={styles.txtInput}
                    onChangeText={(text) => this.setState({ question: text})}
                    value={this.state.question}
                />
                 <TextInput 
                    placeholder="Components let you split de UI into independent, reusable piece"
                    style={styles.txtInput}
                    onChangeText={(text) => this.setState({ answer: text})}
                    value={this.state.answer}
                />
                    <View style={styles.box}>
                        <Button style={styles.submit} onPress={this.submitQuestion}>
                            Submit
                        </Button>
                    </View>

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        flex: 1,
        alignItems: 'stretch',
    }, 
    txtInput: {
        margin:15,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    submit: {
        backgroundColor: black,
    },
})

export default connect(null)(NewQuestion)