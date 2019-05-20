import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white } from '../utils/colors';

export const Button = ({style, children, onPress, styleText, disabled}) => {
    const btnDisabled = disabled ? styles.btnDisabled : ''
    return (
        <TouchableOpacity disabled={disabled} style={[styles.button, style, btnDisabled]}
            onPress={onPress}>
            <Text style={[styles.btnText, styleText]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    btnDisabled: {
        opacity: 0.5,
    }
})

export default Button