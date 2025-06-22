import React from 'react'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'

export default function SigninScreen({ navigation }) {
  const { signIn, loading } = useAuth()

  return (
      <AuthForm
        authBtnTitle={"Sign In"}
        formTitle={"Sign In to Tracker"}
        handleAuth={signIn}
        loading={loading}
        navigation={navigation}
        isSignInForm />
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
