//Required imports: -
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa6";
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

//main components: -
import api from './api';
import NotificationFrame from './NotificationFrame';
import WasabiX_Logo from "./assets/WasabiX_Logo.png";
import DeafaultProfilePic from "./assets/Default_Profile_Pic.jpg" 
import Svg from "./svg";
import DescriptionFrame from './descriptionFrame';

function LandingPage() {
    const navigate = useNavigate();
    
    const {isLoggedIn, setIsLoggedIn,
        showNotification, setShowNotification,
        setNotificationMsg}= useContext(WeatherContext);

    const [ProfMenuOpen, setProfMenuOpen] = useState(false);
    const [navUnderline, setNavUnderline] = useState("community");
    const [userCount, setUserCount] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(()=>{
            async()=>{
            try{
                const response = await api.get("/user-count");
                setUserCount(response.data.totalUsers);
            }
            catch (err){
                console.error(err);
            }
        }
    }, [])
    const handleProfileMenu = () =>{
        if (ProfMenuOpen){
            setProfMenuOpen(false);
        }
        else{
            setProfMenuOpen(true);
        }
    }
    
    const handleLogOut = () =>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setNotificationMsg("Logged out successfully");
        setShowNotification(true);
    }

    const handleNav = (value) =>{
        if ( value === 0 ){
            setNavUnderline("features");
        }
        else if( value === 1 ){
            setNavUnderline("community");
        }
        else if(value === 2){
            setNavUnderline("download");
        }
        else{
            setNavUnderline("community");
        }
    }

    return (
        <>
            {showNotification && <NotificationFrame />}
            <div className="w-full min-h-screen relative flex flex-col justify-center items-center bg-[url(./assets/WasabiX_Background.webp)] bg-cover bg-left bg-fixed bg-no-repeat">
                <header className="z-50 fixed top-0 w-full flex justify-between items-center p-2 backdrop-blur-md bg-black/70 border-b-2 border-white
                    sm:p-3 sm:border-b-3">
                    <div className="w-1/2 flex justify-start items-center gap-2 
                        sm:gap-3 ">
                        <img src={WasabiX_Logo} alt="Wasabi X logo" className="w-1/5 rounded-md
                            sm:w-1/7" />
                        <h2 className="font-Andka text-Wasabi4 font-bold text-2xl 
                            md:text-3xl">WasabiX</h2>
                    </div>
                    <div className="w-1/2 flex justify-end gap-2">
                        <DropdownMenu onOpenChange={setMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <button className="bg-Wasabi4 hover:bg-Wasabi rounded-md p-1">
                                    { menuOpen? (
                                        <>
                                            <Svg
                                                id = {8}
                                                svgColor = "fillBlack"
                                                size = "headerIcon"
                                            /> 
                                        </>
                                ):
                                    (
                                        <>
                                            <Svg
                                                id = {9}
                                                svgColor = "Black"
                                                size = "headerIcon"
                                            />

                                        </>
                                    )
                                    }
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black/70 backdrop-blur-md text-white">
                                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                <Separator />
                                <DropdownMenuItem><a href="#home">Home</a></DropdownMenuItem>
                                <DropdownMenuItem><a href="#features">Features</a></DropdownMenuItem>
                                <DropdownMenuItem><a href="#community">Community</a></DropdownMenuItem>
                                <DropdownMenuItem><a href="#working">How it Works</a></DropdownMenuItem>
                                <DropdownMenuItem><a href="#download">For AndroidS/iOS</a></DropdownMenuItem>
                                <Separator />
                                <DropdownMenuItem >
                                    <Button asChild size="sm" className="bg-Wasabi4 text-black hover:bg-Wasabi font-Andika">
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button asChild size="sm" className="bg-Wasabi4 text-black hover:bg-Wasabi font-Andika">
                                        <Link to="/signup">Sign Up</Link>
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {isLoggedIn ? (
                            <div className="relative flex justify-end items-center gap-1">
                                <Link to="/dashboard" className="text-center text-md text-Main1 font-Andika rounded-3xl p-0.5 pl-3 pr-3 bg-Wasabi ">Dashboard</Link>
                                <button     onClick={handleProfileMenu} className="w-1/5">
                                    <img src="src\assets\prof pic all plat.png" alt="User Avatar" className="rounded-full border-2 border-Wasabi"></img>
                                </button>
                                { ProfMenuOpen && (
                                    <div className="absolute right-0 top-full mt-1 bg-Wasabi text-Wasabi text-lg text-center text-nowrap font-Andika p-2 rounded-xl">
                                        <ul className="w-min flex flex-wrap justify-end items-center gap-2">
                                            <li>
                                                <Link to="/user-settings" className="bg-Main1 rounded-3xl p-0.5 pl-3 pr-3">User Settings</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogOut} className="bg-Main1 rounded-3xl p-0.5 pl-3 pr-3">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) :
                        (
                            <div className="flex items-center justify-center gap-2">
                                <Button asChild size="sm" variant="ghost" className="hover:bg-Wasabi font-Andika font-bold hidden">
                                    <Link >Log In</Link>
                                </Button>
                                
                            </div>
                        ) }
                    </div>
                </header>
                <section id="home" className="section-style h-screen">
                    <div className="section-basic-blur h-8/10">
                        <div className="flex justify-center items-center flex-col gap-5 text-center">
                            <div className="section-title">CONNECT, COMMENT, CLOUD</div>
                        <h1 className="section-heading">Weather Powered by People.</h1>
                            <p className="section-text">Track real-time weather, share your sky, and connect with a community that cares about the forecast as much as you do.</p>
                        </div>
                        <div className="mt-10 w-full flex justify-center items-center flex-col gap-3">
                            <Button size="lg" className="bg-Wasabi4 hover:bg-Wasabi text-black font-bold font-Andika border border-black rounded-xl
                                sm:text-lg">
                                <Link to="signup">Get Started</Link>
                                <ArrowUpRightIcon className="sm:size-7" />
                                </Button>
                            <Button asChild size="lg" className="bg-white hover:bg-Wasabi2 text-black font-bold font-Andika border border-black rounded-xl
                                sm:text-lg">
                                <a href="#features">See Features</a>
                            </Button>
                        </div>
                    </div>
                </section>
                <section id="features" className="section-style">
                    <div className="section-basic-blur h-8/10">
                        <h2 className="section-title">Features</h2>
                        <h1 className="section-heading">Everything you need in one sky</h1>
                        <p className="section-text">WasabiX combines powerful weather tools with social features so you always know what is happening overhead.</p>
                        <Carousel className="w-8/10 aspect-square shadow-lg shadow-black rounded-2xl">
                            <CarouselContent>
                                <CarouselItem>
                                    <DescriptionFrame 
                                        type = "1" 
                                        id={1}
                                        heading="Live Weather Data" 
                                        text="Get hyper-local forecasts with real-time data, 3-day outlooks for any location worldwide." 
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionFrame
                                        type = "1"
                                        id = {2} 
                                        heading = "Community Comments" 
                                        text = "Share your weather experience, post updates, and discuss conditions with people in your area or around the globe." 
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionFrame
                                        type = "1"
                                        id = {3}
                                        heading = "Location Feeds"
                                        text = "Follow cities and regions to see what the weather is really like, straight from locals on the ground." 
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionFrame
                                        type = "1" 
                                        id={4}  
                                        heading="Smart Alerts" 
                                        text="Get notified about severe weather, trending discussions, and replies to your posts. Stay safe, stay connected." 
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionFrame 
                                        type = "1"
                                        id={6} 
                                        heading="Verified Reports" 
                                        text="Our community-driven verification system ensures the weather updates you see are accurate and trustworthy." 
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>
                <section id="community" className="section-style mt-20">
                    <div className="section-basic-blur">
                        <h2 className="section-title">Community</h2>
                        <h1 className="section-heading">See what people are saying</h1>
                        <p className="section-text">Real weather updates from real people. Join the conversation and share your sky.</p>
                        <DescriptionFrame 
                            type = "2"
                            username = "Hamza_Ali" 
                            comment = "The fog rolling in over the Golden Gate right now is absolutely stunning. Temperature dropped 8 degrees in the last hour!"
                            location = "Lahore"
                            timePassed = "12"    
                        />
                        <DescriptionFrame
                            type = "2"
                            username = "AbdulGhani9"
                            comment = "Tropical storm update: winds picking up here on South Beach. Everyone stay safe! Will keep posting live updates."
                            location = "Karachi"
                            timePassed = "7"
                        />
                        <DescriptionFrame
                            type = "2"
                            username = "Moaz_gaming"
                            comment = " Perfect weather today. Clear skies at 72F. Best day to vist Natonal Park."
                            location = "faisalabad"
                            timePassed = "2"
                        />
                    </div>
                </section>
                <section id="working" className="section-style mt-20">
                    <div className="section-basic-blur">
                        <h2 className="section-title">How It Works</h2>
                        <h1 className="section-heading">Up and running in minutes</h1>
                        <p className="section-text">Getting started with SkyCast is as simple as checking the weather outside.</p>
                        <div className="w-9/10 flex justify-center items-stretch gap-5">
                            <div className="z-0 w-4/10 bg-offWhite rounded-full">&nbsp;</div>
                            <div className="flex flex-wrap justify-start items-center gap-4">
                                <DescriptionFrame
                                    type = "3"
                                    place = "top"
                                    svgId = {7}
                                    step = "1"
                                    heading = "Create Your Account"
                                    description = "Sign up in seconds with email or social login. Your personalized weather feed starts immediately."
                                />
                                <DescriptionFrame
                                    type = "3"
                                    place = "middle"
                                    svgId = {3}
                                    step = "2"
                                    heading = "Set your locations"
                                    description = "Add the cities and regions you care about. Get tailored forecasts and community feeds for each one."
                                />
                                <DescriptionFrame
                                    type = "3"
                                    place = "bottom"
                                    svgId = {2}
                                    step = "3"
                                    heading = "Join the conversation"
                                    description = "Post weather updates, comment on reports, and engage with a global community of weather enthusiasts."
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="download" className="section-style mt-20">
                    <div className="section-basic-blur">
                        <h2 className="section-title">Android / iOS</h2>
                        <h1 className="section-heading">Get it also on you phone</h1>
                        <p className="section-text">Download the latest version and start using WasabiX direclty from your phone</p>
                        <div className="mt-5 w-9/10 flex flex-wrap justify-start items-center gap-4">
                            <p className="text-xl font-Andika text-black/80">For Android :</p>
                            <Button className="bg-Wasabi hover:bg-Wasabi4 text-black/80 text-md border border-black rounded-xl">Click Here</Button>
                        </div>
                        <div className="w-9/10 flex flex-wrap justify-start items-center gap-4">
                            <p className="text-xl font-Andika text-black/80">For iOS :</p>
                            <Button className="bg-Wasabi hover:bg-Wasabi4 text-black/80 text-md border border-black rounded-xl">Click Here</Button>
                        </div>
                    </div>
                </section>
                <footer className="mt-10 w-full flex flex-wrap justify-start items-center gap-2 p-3 backdrop-blur-md bg-black/70 border-t-2 border-white">
                    <div className="mt-5 w-2/5 flex  justify-center items-center gap-2">
                        <img src={WasabiX_Logo} alt="Wasabi X logo" className="w-1/4 rounded-lg" />
                        <h2 className="font-Andka text-Wasabi4 font-bold text-2xl">WasabiX</h2>
                    </div>
                    <p className="w-8/10 text-base font-Andika text-offWhite">Weather is better together. Join the community that is changing how the world experiences forecasts.</p>
                    <div className="mt-4 w-full flex justify-between">
                        <div className="w-1/2 flex flex-col text-offWhite font-Andika text-lg">
                            <h2 className="text-Wasabi">Product</h2>
                            <a href="#features" className="hover:bg-Wasabi">Features</a>
                            <a href="#community" className="hover:bg-Wasabi">Community</a>
                            <a href="#working" className="hover:bg-Wasabi">How it works</a>
                            <a href="#download" className="hover:bg-Wasabi">Download</a>
                        </div>
                        <div className="w-2/3 flex flex-col text-offWhite font-Andika text-lg">
                            <h2 className="text-Wasabi">Legal</h2>
                            <button className="w-min text-nowrap hover:bg-Wasabi" >Privacy Policy</button>
                            <button className="w-min text-nowrap hover:bg-Wasabi">Terms and Conditions</button>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="mt-4 w-1/2 flex flex-col text-offWhite font-Andika text-lg">
                            <h2 className="text-Wasabi">Company</h2>
                            <button className="w-min text-nowrap hover:bg-Wasabi">About</button>
                            <button className="w-min text-nowrap hover:bg-Wasabi">Contact</button>
                        </div>
                        <div className="w-2/3 flex flex-col text-offWhite font-Andika text-lg">
                                <h2 className="text-Wasabi">Report a bug / issue</h2>
                                <button className="w-min text-nowrap hover:bg-Wasabi" >abdulrafea97@gmail.com</button>
                        </div>
                    </div>
                    <div className="mt-4 w-full flex flex-col items-center text-base font-Andika text-offWhite">
                        <h2>&copy;2026 WasabiX. All rights reserved.</h2>
                        <div className="flex gap-5">
                            <a href="" className="hover:bg-Wasabi">Github</a>
                            <a href="" className="hover:bg-Wasabi">Linkdein</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LandingPage;