import { createContext, useState, useEffect } from 'react';

import DefautAvatar from "./assets/Default_Profile_Pic.jpg";

export const WeatherContext = createContext();

export function WeatherProvider({children}){

    const [isLoading, setIsLoading] = useState(false);
    const [locationCoords, setLocationCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(() =>{
        return !!localStorage.getItem('token');
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState("Error");
    const [notificationError, setNotificationError] = useState(false);
    const [globalAvatar, setGlobalAvatar] = useState(() =>{
        return localStorage.getItem("avatar") || DefautAvatar;
    });
    const [globalUsername, setGlobalUsername] = useState(() =>{
        return localStorage.getItem("username") || "";
    });

    useEffect(() =>{
        if(globalUsername){
            localStorage.setItem("username", globalUsername);
        }
    }, [globalUsername]);

    useEffect(() =>{
        if(globalAvatar && globalAvatar != DefautAvatar){
            localStorage.setItem('avatar', globalAvatar);
        }
    }, [globalAvatar])

    return(
        <WeatherContext.Provider value={{
            isLoading, setIsLoading,
            locationCoords, setLocationCoords, 
            weatherData, setWeatherData,
            isConfirmPage, setIsConfirmPage,
            isLoggedIn, setIsLoggedIn,
            showNotification, setShowNotification,
            notificationMsg, setNotificationMsg,
            notificationError, setNotificationError,
            globalAvatar, setGlobalAvatar,
            globalUsername, setGlobalUsername,

            }}>
            {children}
        </WeatherContext.Provider>
    );
}