import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "./WeatherContext";

//shadcn components: -
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

//lucide components: -
import { LocateFixed, Menu } from "lucide-react";

//motion components: -
import { motion } from "motion/react";


//main components: -
import Portal from "./generatePortal";
import Header from "./header";
import api from "./api";

function Dashboard(){
    const {
        setIsLoading,
        setShowNotification,
        setNotificationMsg,
        setNotificationError,
    } = useContext(WeatherContext);
    
    const [searchPopUp, setSearchPopUp] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const [coords, setCoords] = useState(Array(2).fill(null));
    const [weatherData, setWeatherData] = useState(null);
    const [reverseGeocoding, setReverseGeocoding] = useState(null);

    useEffect(() =>{
        setSearchPopUp(true)
    }
    , []);

    const openSidebar = () =>{
        if(showSidebar){
            setShowSidebar(false);
        }
        else{
            setShowSidebar(true);
        }
    }

    const fetchWeatherData = async () =>{
        if(coords.includes(null)){
            setShowNotification(true);
            setNotificationMsg("Cannot acess yout location, please search mannually");
            setNotificationError(true);
            
            return;
        }

        try{
            setIsLoading(true);

            const response = await  api.post("/weather", {
                coords: coords,
                reverseGeocoding: reverseGeocoding,
            });
            const result = await response.data;

            console.log("weather data fetching sucess!");

            setIsLoading(false);
        }
        catch(error){
            setIsLoading(false);
            
            setShowNotification(true);
            setNotificationMsg("");
            setNotificationError(true);

            console.error("Error fetching weather data:", error);
        }
    }
    
    const getCoords = () =>{
        if (!navigator.geolocation){
            setShowNotification(true);
            setNotificationMsg("Cannot access your location, please search mannually");
            setNotificationError(true);

            setReverseGeocoding(false);
            return;
        }

        const handleSucess = (position) => {
            const {latitude, longitude} = position.coords;
            setCoords([latitude, longitude]);

            setReverseGeocoding(true);
            fetchWeatherData();
        };

        navigator.geolocation.getCurrentPosition(handleSucess);
    }

    return (
        <>
        <div className="w-full min-h-screen relative flex justify-start items-center flex-col">
            <Header isDashboard={true} />
            <motion.div
                initial={{ x: "-85%" }}
                animate={{ x: showSidebar? 0 : "-85%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-60 h-screen fixed left-0 z-50 mt-13 bg-black/80"

            >
                <div className="w-full flex justify-end pt-1 pr-1">
                <button onClick={openSidebar}>
                    <Menu className="size-8 text-offWhite" />
                </button>
                </div>
            </motion.div>
            <section className="mt-13 ml-9 p-2 w-auto flex flex-col items-center">
                {searchPopUp? (
                    <div className="w-full h-1/2-screen p-3 flex flex-col items-center gap-3 bg-black/50 rounded-xl">
                        <p className="text-xl text-offWhite font-Andika">Search Soemthing to get startted </p>
                        <Input type="text" placeholder="Type city here" className="w-9/10 placeholder:text-white" />
                        <Button 
                            size="sm" 
                            className="bg-Wasabi text-black text-lg font-Andika border border-black"
                            onClick={getCoords}
                        >
                            <LocateFixed className="size-5" />
                            Use Current Location
                        </Button>
                    </div>
                ):
                (
                    <div>
                        <div className="w-full bg-[#1C8EA3] rounded-3xl flex flex-col justify-center items-center">
                            <div className="w-6/10 h-auto">
                                <img alt="Weather Icon" className="w-full h-auto" />
                            </div>
                            <div className="w-full h-auto text-center text-[#ffffff] text-3xl font-semibold mb-2
                                sm:text-6xl"></div>
                            <div className="w-7/10 h-auto text-center plus-jakarta-sans font-bold text-6xl text-[#ffffff]
                                sm:text-[8rem]">°C</div>
                            <div className='w-17/20 height-auto flex justify-between items-center mt-10'>
                                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-3xl text-[#ffffff]
                                sm:text-5xl"></div>
                                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-3xl text-[#ffffff]
                                sm:text-5xl"></div>
                            </div>
                            <div className="w-9/10 h-1 bg-[#D9A22B] mt-3"></div>
                            <div className="w-85/100 h-auto flex justify-center items-center flex-col mt-7 mb-7 gap-3">
                                <div className="w-full flex items-center">
                                    {/* {props.is_day == 0 ?
                                        <> 
                                        </>
                                    :   <>  
                                        </>
                                    } */}
                                </div>
                                <div className='w-19/20 flex items-center'>
                                    <svg
                                        width={40}
                                        height={40}
                                        viewBox="0 0 18 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M5.2 16H5.25625M11.35 9.85L13.6 7.6M13.6 7.6L15.85 9.85M13.6 7.6V4M13.6 7.6L10.6 6.1M13.6 7.6L16.6 6.1M9.4 16C9.4 18.3196 7.5196 20.2 5.2 20.2C2.8804 20.2 1 18.3196 1 16C1 14.5728 1.71191 13.3118 2.8 12.5528V3.39843C2.8 2.07295 3.87452 1 5.2 1C6.52548 1 7.6 2.07452 7.6 3.4V12.5528C8.45925 13.3219 9.4 14.7561 9.4 16Z"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="pl-1 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Feels like-°C</div>
                                </div>
                            </div>
                            <div className="w-9/10 h-auto flex justify-between items-center bg-[#D9A22B] p-2 pl-4 pr-4 mb-7 rounded-xl shadow-[2px_4px_5px_0_#00000040]">
                                <div className="w-1/2 flex items-center">
                                    <svg
                                        width={60}
                                        height={60}
                                        viewBox="0 0 47 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M0.105441 0.923661C0.406701 0.17051 1.26147 -0.19582 2.01462 0.105441L7.17645 2.17017C8.22695 2.59037 9.39883 2.59037 10.4493 2.17017L13.4292 0.978209C15.1801 0.277877 17.1332 0.277876 18.884 0.978209L21.8639 2.17017C22.9144 2.59037 24.0863 2.59037 25.1368 2.17017L28.1167 0.978209C29.8676 0.277877 31.8207 0.277876 33.5715 0.978209L36.5514 2.17017C37.6019 2.59037 38.7738 2.59037 39.8243 2.17017L44.9862 0.105441C45.7393 -0.19582 46.5941 0.17051 46.8953 0.923661C47.1966 1.67681 46.8303 2.53158 46.0771 2.83284L40.9153 4.89757C39.1645 5.59791 37.2113 5.5979 35.4605 4.89757L32.4806 3.70561C31.4301 3.28541 30.2582 3.28541 29.2077 3.70561L26.2278 4.89757C24.477 5.59791 22.5238 5.5979 20.773 4.89757L17.7931 3.70561C16.7426 3.28541 15.5707 3.28541 14.5202 3.70561L11.5403 4.89757C9.78946 5.59791 7.83632 5.5979 6.08549 4.89757L0.923661 2.83284C0.17051 2.53158 -0.19582 1.67681 0.105441 0.923661ZM0.105441 9.73616C0.406701 8.98301 1.26147 8.61668 2.01462 8.91794L7.17645 10.9827C8.22695 11.4029 9.39883 11.4029 10.4493 10.9827L13.4292 9.79071C15.1801 9.09038 17.1332 9.09038 18.884 9.79071L21.8639 10.9827C22.9144 11.4029 24.0863 11.4029 25.1368 10.9827L28.1167 9.79071C29.8676 9.09038 31.8207 9.09038 33.5715 9.79071L36.5514 10.9827C37.6019 11.4029 38.7738 11.4029 39.8243 10.9827L44.9862 8.91794C45.7393 8.61668 46.5941 8.98301 46.8953 9.73616C47.1966 10.4893 46.8303 11.3441 46.0771 11.6453L40.9153 13.7101C39.1645 14.4104 37.2113 14.4104 35.4605 13.7101L32.4806 12.5181C31.4301 12.0979 30.2582 12.0979 29.2077 12.5181L26.2278 13.7101C24.477 14.4104 22.5238 14.4104 20.773 13.7101L17.7931 12.5181C16.7426 12.0979 15.5707 12.0979 14.5202 12.5181L11.5403 13.7101C9.78946 14.4104 7.83632 14.4104 6.08549 13.7101L0.923661 11.6453C0.17051 11.3441 -0.19582 10.4893 0.105441 9.73616ZM0.105441 18.5487C0.406701 17.7955 1.26147 17.4292 2.01462 17.7304L7.17645 19.7952C8.22695 20.2154 9.39883 20.2154 10.4493 19.7952L13.4292 18.6032C15.1801 17.9029 17.1332 17.9029 18.884 18.6032L21.864 19.7952C22.9144 20.2154 24.0863 20.2154 25.1368 19.7952L28.1167 18.6032C29.8676 17.9029 31.8207 17.9029 33.5715 18.6032L36.5514 19.7952C37.6019 20.2154 38.7738 20.2154 39.8243 19.7952L44.9862 17.7304C45.7393 17.4292 46.5941 17.7955 46.8953 18.5487C47.1966 19.3018 46.8303 20.1566 46.0771 20.4578L40.9153 22.5226C39.1645 23.2229 37.2113 23.2229 35.4605 22.5226L32.4806 21.3306C31.4301 20.9104 30.2582 20.9104 29.2077 21.3306L26.2278 22.5226C24.477 23.2229 22.5238 23.2229 20.773 22.5226L17.7931 21.3306C16.7426 20.9104 15.5707 20.9104 14.5202 21.3306L11.5403 22.5226C9.78946 23.2229 7.83632 23.2229 6.08549 22.5226L0.923661 20.4578C0.17051 20.1566 -0.19582 19.3018 0.105441 18.5487ZM0.105441 27.3612C0.406701 26.608 1.26147 26.2417 2.01462 26.5429L7.17645 28.6077C8.22695 29.0279 9.39883 29.0279 10.4493 28.6077L13.4292 27.4157C15.1801 26.7154 17.1332 26.7154 18.884 27.4157L21.864 28.6077C22.9144 29.0279 24.0863 29.0279 25.1368 28.6077L28.1167 27.4157C29.8676 26.7154 31.8207 26.7154 33.5715 27.4157L36.5514 28.6077C37.6019 29.0279 38.7738 29.0279 39.8243 28.6077L44.9862 26.5429C45.7393 26.2417 46.5941 26.608 46.8953 27.3612C47.1966 28.1143 46.8303 28.9691 46.0771 29.2703L40.9153 31.3351C39.1645 32.0354 37.2113 32.0354 35.4605 31.3351L32.4806 30.1431C31.4301 29.7229 30.2582 29.7229 29.2077 30.1431L26.2278 31.3351C24.477 32.0354 22.5238 32.0354 20.773 31.3351L17.7931 30.1431C16.7426 29.7229 15.5707 29.7229 14.5202 30.1431L11.5403 31.3351C9.78946 32.0354 7.83632 32.0354 6.08549 31.3351L0.923661 29.2703C0.17051 28.9691 -0.19582 28.1143 0.105441 27.3612Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <div className=" h-auto flex justify-left items-center flex-col">
                                        <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">%</div>
                                        <div className="w-full h-auto text-left text-[#ffffff] text-1xl pl-2  box-border text-extralight">Humidity</div>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-center">
                                    
                                    <div className=" h-auto flex justify-center items-center flex-col">
                                        <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">km/h</div>
                                        <div className="w-full h-auto text-left text-[#ffffff] text-1xl  box-border text-extralight text-nowrap">Wind Speed</div>
                                    </div>
                                </div>            
                            </div>
                        </div>
                    </div>
                )
                } 
            </section>
        </div>
            {/* {getCoords &&(
                <GetCoords onClose={closeGetCoords} />
            )}
            {!getLocation &&(
                <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center">
                    <div className="w-9/10 bg-[#1C8EA3] rounded-2xl flex justify-center items-center flex-wrap gap-5 p-2">
                        <h2 className="text-2xl text-[#ffffff] text-center">Where are you?</h2>
                        <input className="w-9/10 bg-[#D9A22B] text-3xl text-[#ffffff] rounded-2xl p-2"
                            type="text"
                            placeholder="Search City"
                            value = {cityName}
                            onChange={(e) =>{setcityName(e.target.value)}}
                            ></input>
                        <h1 className="w-full text-3xl text-center text-[#ffffff]">OR</h1>
                        <h2 className="w-full text-2xl text-center text-[#ffffff]">Get you current location</h2>
                        <button onClick={openGetCoords} className=" bg-[#D9A22B] text-2xl text-[#ffffff] rounded-2xl p-2">My location</button>
                    </div>
                </Portal>
            )}
            {weatherData &&(
               <>
                <LeftFrame 
                    temp = {weatherData.tempC} 
                    city = {weatherData.city} 
                    weather_condition = {weatherData.weatherText} 
                    feels_like = {weatherData.feelsLikeC} 
                    humidity = {weatherData.humidity} 
                    wind_speed = {weatherData.windKPH}
                    is_day = {weatherData.timeOfDay}
                    day = {weatherData.day}
                    icon = {weatherData.icon}
                 />
                <RightFrame 
                    aqi = {weatherData.aqi} 
                    uvIndex = {null} 
                    pressure = {weatherData.pressure} 
                    sunrise = {weatherData.sunrise} 
                    sunset = {weatherData.sunset}
                    uv = {weatherData.uv}
                    precipData = {weatherData.precipData}
                    weekData = {weatherData.weekData}
                    />
                </>
            )} */}
        </>
    )
}
export default Dashboard;