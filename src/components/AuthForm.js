import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import Spacer from '../components/Spacer'

export default function AuthForm({ loading, formTitle, authBtnTitle, isSignInForm, handleAuth, navigation }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        reTypedPassword: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setError('')
        if (!isSignInForm && 
            (formData.password || formData.reTypedPassword) &&
            formData.password !== formData.reTypedPassword) {
            setError('Passwords do not match!')
        }
    }, [formData.password, formData.reTypedPassword])

    return (
        <View style={styles.viewStyle}>
            <Spacer>
                <Text h3>{formTitle}</Text>
            </Spacer>

            <Input autoCapitalize='none' autoCorrect={false} onChangeText={(val) => { setFormData({ ...formData, email: val }) }} label="Email" />

            <Input autoCapitalize='none' autoCorrect={false} onChangeText={(val) => { setFormData({ ...formData, password: val }) }} label="Password" textContentType='password' secureTextEntry />

            {isSignInForm ? 
                null :
                <Input autoCapitalize='none' autoCorrect={false} onChangeText={(val) => { setFormData({ ...formData, reTypedPassword: val }) }} label="Re-Type Password" textContentType='password' secureTextEntry />
            }

            {error ?
                <Text style={styles.errorStyle} h5>{error}</Text>
                : null
            }

            <Spacer />
            <Button 
                loading={loading} 
                disabled={!!error || !formData.email || !formData.password || (!isSignInForm && !formData.reTypedPassword)} 
                title={authBtnTitle} 
                onPress={() => handleAuth(formData)} />

            <Button 
                type='clear' 
                title={
                    isSignInForm ? 
                    "Don't have an Account? Go to Sign Up" : 
                    "Already have an Account? Go to Sign In"} 
                onPress={() => {
                isSignInForm ?
                    navigation.navigate('Signup') :
                    navigation.navigate('Signin')
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        padding: 20,
        marginBottom: 40,
        gap: 5,
        flex: 1,
        justifyContent: 'center'
    },
    errorStyle: {
        textAlign: 'center',
        color: '#A22'
    }
})