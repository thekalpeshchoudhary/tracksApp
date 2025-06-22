import React, { createContext, useState, useContext, useEffect } from 'react';
import tracker from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const tryLocalSignIn = async () => {
    setTimeout(async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsSignedIn(true);
        navigate('TrackList')
      } else {
        navigate('loginFlow')
      }
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    tryLocalSignIn()
  }, [])


  const signIn = async (userData) => {
    try {
      setLoading(true);
      const res = await tracker.post('/signin', userData);
      setLoading(false);
      if (res.data.token) {
        await AsyncStorage.setItem('token', res.data.token)
        setIsSignedIn(true);
        navigate('TrackList')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };

  const signUp = async (userData) => {
    try {
      setLoading(true);
      const res = await tracker.post('/signup', userData);
      setLoading(false);
      if (res.data.token) {
        await AsyncStorage.setItem('token', res.data.token)
        setIsSignedIn(true);
        navigate('TrackList')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token')
    setIsSignedIn(false);
    setUser(null);
    navigate('loginFlow')
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, loading, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
