import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Spacer({ children }) {
    return (
        <View style={styles.viewStyle}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        marginVertical: 10,
    },

})