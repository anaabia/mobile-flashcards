import React from 'react'

import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';

const CoupleButton = ({ firstText, secondText, firstPress, secondPress, firstStyle, secondStyle, firstStyleText, secondStyleText }) => {
    return (
        <View style={styles.box}>
            <Button style={firstStyle} onPress={firstPress} styleText={firstStyleText}>
                {firstText}
            </Button>
            <Button style={secondStyle} onPress={secondPress} styleText={secondStyleText} >
                {secondText}
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
    }
})

export default CoupleButton