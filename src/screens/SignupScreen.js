import React from 'react'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

export default function SignupScreen({ navigation }) {
    const { signUp, loading } = useAuth()

    return (
        <AuthForm
            authBtnTitle={"Sign Up"}
            formTitle={"Sign Up for Tracker"}
            handleAuth={signUp}
            loading={loading}
            navigation={navigation} />
    )
}

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
