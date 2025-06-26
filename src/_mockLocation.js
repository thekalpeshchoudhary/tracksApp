import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 1000000,
        coords: {
            latitude: 18.997681 + increment * tenMetersWithDegrees,
            longitude: 72.8413814 + increment * tenMetersWithDegrees,
            "altitude": 10000,
            "accuracy": 1,
            "heading": 20,
            "speed": 100
        }
    }
}

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        lcoation: getLocation(counter)
    });
    counter++;
}, 1000);