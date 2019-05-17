import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, StyleSheet, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { black } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { formatNewDeck, formatIdTitle } from '../utils/helpers';
import Button from '../components/Button';

class NewQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = { deck: '', disabled: true };
    }

    saveDeck = () => {
        const { deck } = this.state
        this.props.dispatch(addDeck(formatNewDeck(deck)))
        saveDeckTitle(deck)
        this.props.navigation.navigate(
            'Deck',
            { title: deck }
        )
        this.setState({
            deck: '',
            disabled: true
        })
    }

    isDisable = (title) => {
        const { decks } = this.props
        const id = formatIdTitle(title)

        if (decks[id]) {
            return true
        }
        return title === ''
    }

    handleChange = (text) => {
        const disabled = this.isDisable(text)
        this.setState({
            deck: text,
            disabled
        })
    }
    render() {
        const styleButtom = this.state.disabled ? styles.submitDisabled : styles.submit
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.content}>
                <Text style={styles.title}> What is the title </Text>
                <Text style={styles.title}> of your new </Text>
                <Text style={styles.title}> deck? </Text>
                <TextInput
                    style={styles.txtInput}
                    onChangeText={(text) => this.handleChange(text)}
                    value={this.state.deck}
                />
                <View style={styles.box}>
                    <Button disabled={this.state.disabled} style={styleButtom} onPress={() => this.saveDeck()} >
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
        justifyContent: 'center',
    },
    title: {
        marginRight: 10,
        fontSize: 45,
        textAlign: 'center',
        justifyContent: 'center',
    },
    txtInput: {
        margin: 15,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit: {
        backgroundColor: black,
    },
    submitDisabled: {
        opacity: 0.5,
        backgroundColor: black,
    },
})

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}

export default connect(mapStateToProps, null)(NewQuestion)