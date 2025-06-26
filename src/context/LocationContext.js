import React, { createContext, useState, useContext, useEffect } from 'react';
import tracker from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [recording, setRecording] = useState(false);
    const [name, setName] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [tracks, setTracks] = useState([])

    const addLocation = (newLocation) => {
        setLocations([...locations, newLocation])
    }

    const fetchAllTracks = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await tracker.get('/tracks', { headers: { Authorization: `Bearer ${token}` } });
            setTracks(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const saveTrack = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await tracker.post('/tracks', {
                name, locations
            }, { headers: { Authorization: `Bearer ${token}` } });
            setName('');
            setLocations([]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!recording) fetchAllTracks()
    }, [recording])


    useEffect(() => {
        if (recording && currentLocation) {
            addLocation(currentLocation)
        }
        if (!recording && locations.length > 0 && name) {
            saveTrack()
        }
    }, [currentLocation, recording])

    return (
        <LocationContext.Provider value={{ name, recording, currentLocation, setCurrentLocation, locations, setRecording, setName, tracks }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
