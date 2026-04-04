import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

//lucide components: -
import { ArrowUpRightIcon } from "lucide-react";

//main components: -
import Header from './header';
import NotificationFrame from './NotificationFrame';
import WasabiX_Logo from "./assets/WasabiX_Logo.png";
import DeafaultProfilePic from "./assets/Default_Profile_Pic.jpg" 
import Svg from "./svg";
import DescriptionFrame from './descriptionFrame';
import { useMediaQuery } from './useMediaQuery';

function LandingPage() {
    
    let isMobile = useMediaQuery("(max-width: 648px");
    let isTablet = useMediaQuery("(min-width: 640px)");
    const isLaptop = useMediaQuery("(min-width: 1024px)");
    if(isLaptop == true){
        isMobile = false;
        isTablet = false;
    }

    return (
        <>
            <Header />
            <div className="w-full min-h-screen relative flex flex-col justify-center items-center bg-[url(./assets/WasabiX_Background.webp)] bg-cover bg-left bg-fixed bg-no-repeat">    
                <section id="home" className="section-style
                    sm:min-h-screen sm:mb-0 sm:mt-0 lg:mt-15">
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
                            <Button asChild size="lg" className="bg-white hover:bg-Wasabi text-black font-bold font-Andika border border-black rounded-xl
                                sm:text-lg">
                                <a href="#features">See Features</a>
                            </Button>
                        </div>
                    </div>
                </section>
                <section id="features" className="section-style
                    sm:mt-0">
                    <div className="section-basic-blur h-8/10">
                        <h2 className="section-title">Features</h2>
                        <h1 className="section-heading">Everything you need in one sky</h1>
                        <p className="section-text">WasabiX combines powerful weather tools with social features so you always know what is happening overhead.</p>
                        <Carousel className="w-8/10 shadow-lg shadow-black rounded-2xl
                            sm:w-95/100">
                            {isMobile && (
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
                            )}
                            {isTablet && (
                                <CarouselContent>
                                    <CarouselItem className="flex justify-between gap-2">
                                        <DescriptionFrame 
                                            type = "1" 
                                            id={1}
                                            heading="Live Weather Data" 
                                            text="Get hyper-local forecasts with real-time data, 3-day outlooks for any location worldwide." 
                                        />
                                        <DescriptionFrame
                                            type = "1"
                                            id = {2} 
                                            heading = "Community Comments" 
                                            text = "Share your weather experience, post updates, and discuss conditions with people in your area or around the globe." 
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/2">
                                        <DescriptionFrame
                                            type = "1"
                                            id = {3}
                                            heading = "Location Feeds"
                                            text = "Follow cities and regions to see what the weather is really like, straight from locals on the ground." 
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/2">
                                        <DescriptionFrame
                                            type = "1" 
                                            id={4}  
                                            heading="Smart Alerts" 
                                            text="Get notified about severe weather, trending discussions, and replies to your posts. Stay safe, stay connected." 
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/2 flex justify-between gap-2">
                                        <DescriptionFrame 
                                            type = "1"
                                            id={6} 
                                            heading="Verified Reports" 
                                            text="Our community-driven verification system ensures the weather updates you see are accurate and trustworthy." 
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                            )}
                            {isLaptop && (
                                <CarouselContent>
                                    <CarouselItem className="flex justify-between gap-4">
                                        <DescriptionFrame 
                                            type = "1" 
                                            id={1}
                                            heading="Live Weather Data" 
                                            text="Get hyper-local forecasts with real-time data, 3-day outlooks for any location worldwide." 
                                        />
                                        <DescriptionFrame
                                            type = "1"
                                            id = {2} 
                                            heading = "Community Comments" 
                                            text = "Share your weather experience, post updates, and discuss conditions with people in your area or around the globe." 
                                        />
                                        <DescriptionFrame
                                            type = "1"
                                            id = {3}
                                            heading = "Location Feeds"
                                            text = "Follow cities and regions to see what the weather is really like, straight from locals on the ground." 
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/3">
                                        <DescriptionFrame
                                            type = "1" 
                                            id={4}  
                                            heading="Smart Alerts" 
                                            text="Get notified about severe weather, trending discussions, and replies to your posts. Stay safe, stay connected." 
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/3 flex">
                                        <DescriptionFrame 
                                            type = "1"
                                            id={6} 
                                            heading="Verified Reports" 
                                            text="Our community-driven verification system ensures the weather updates you see are accurate and trustworthy." 
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                            )}
                            <CarouselPrevious className="hover:bg-Wasabi hover:border-none" />
                            <CarouselNext className="hover:bg-Wasabi hover:border-none" />
                        </Carousel>
                    </div>
                </section>
                <section id="community" className="section-style mt-20">
                    <div className="section-basic-blur">
                        <h2 className="section-title">Community</h2>
                        <h1 className="section-heading">See what people are saying</h1>
                        <p className="section-text">Real weather updates from real people. Join the conversation and share your sky.</p>
                        {isLaptop ? (
                            <div className="w-9/10 flex flex-col items-center gap-4">
                                <div className="w-full flex gap-4">
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
                                </div>
                                <DescriptionFrame
                                    type = "2"
                                    username = "Moaz_gaming"
                                    comment = " Perfect weather today. Clear skies at 72F. Best day to vist Natonal Park."
                                    location = "faisalabad"
                                    timePassed = "2"
                                />
                            </div>
                        ):
                        (
                            <>
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
                            </>
                        )
                        }
                    </div>
                </section>
                <section id="working" className="section-style mt-20">
                    <div className="section-basic-blur">
                        <h2 className="section-title">How It Works</h2>
                        <h1 className="section-heading">Up and running in minutes</h1>
                        <p className="section-text">Getting started with SkyCast is as simple as checking the weather outside.</p>
                        <div className="w-9/10 flex justify-center items-stretch gap-5">
                            <div className="z-0 w-4/10 bg-offWhite rounded-full
                                sm:w-15/100 lg:w-8/100 xl:w-5/100">&nbsp;</div>
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
                            <p className="text-xl font-Andika text-black/80
                                sm:text-2xl lg:text-xl">For Android :</p>
                            <Button className="bg-Wasabi hover:bg-Wasabi4 text-black/80 text-md border border-black rounded-xl
                                sm:text-xl lg:text-lg">Click Here</Button>
                        </div>
                        <div className="w-9/10 flex flex-wrap justify-start items-center gap-4">
                            <p className="text-xl font-Andika text-black/80
                                sm:text-2xl lg:text-xl">For iOS :</p>
                            <Button className="bg-Wasabi hover:bg-Wasabi4 text-black/80 text-md border border-black rounded-xl
                                sm:text-xl lg:text-lg">Click Here</Button>
                        </div>
                    </div>
                </section>
                <footer className="mt-10 w-full flex flex-wrap justify-start items-center gap-2 p-3 backdrop-blur-md bg-black/70 border-t-2 border-white">
                    <div className="mt-5 w-full flex justify-start items-center gap-2">
                        <img src={WasabiX_Logo} alt="Wasabi X logo" className="w-1/8 rounded-lg
                            sm:w-1/12 lg:w-1/20" />
                        <h2 className="font-Andka text-Wasabi4 font-bold text-2xl
                            sm:text-3xl lg:text-2xl">WasabiX</h2>
                    </div>
                    <p className="w-8/10 text-base font-Andika text-offWhite
                        sm:text-lg lg:text-base">Weather is better together. Join the community that is changing how the world experiences forecasts.</p>
                    <div className="mt-4 w-full flex justify-between">
                        <div className="w-1/2 flex flex-col text-offWhite font-Andika text-lg
                            sm:text-xl lg:text-base">
                            <h2 className="text-Wasabi">Product</h2>
                            <a href="#features" className="w-min hover:bg-Wasabi">Features</a>
                            <a href="#community" className="w-min hover:bg-Wasabi">Community</a>
                            <a href="#working" className="w-min hover:bg-Wasabi text-nowrap">How it works</a>
                            <a href="#download" className="w-min hover:bg-Wasabi">Download</a>
                        </div>
                        <div className="w-2/3 flex flex-col text-offWhite font-Andika text-lg
                            sm:text-xl lg:text-lg">
                            <h2 className="text-Wasabi">Legal</h2>
                            <button className="w-min text-nowrap hover:bg-Wasabi" >Privacy Policy</button>
                            <button className="w-min text-nowrap hover:bg-Wasabi">Terms and Conditions</button>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="mt-4 w-1/2 flex flex-col text-offWhite font-Andika text-lg
                            sm:text-xl lg:text-lg">
                            <h2 className="text-Wasabi">Company</h2>
                            <button className="w-min text-nowrap hover:bg-Wasabi">About</button>
                            <button className="w-min text-nowrap hover:bg-Wasabi">Contact</button>
                        </div>
                        <div className="w-2/3 flex flex-col text-offWhite font-Andika text-lg
                            sm:text-xl lg:text-lg">
                                <h2 className="text-Wasabi">Report a bug / issue</h2>
                                <button className="w-min text-nowrap hover:bg-Wasabi" >abdulrafea97@gmail.com</button>
                        </div>
                    </div>
                    <div className="mt-4 w-full flex flex-col items-center text-base font-Andika text-offWhite
                        sm:text-lg lg:text-base">
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