import { useState ,useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import { Link, Navigate } from "react-router-dom";

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
import { Separator } from "@/components/ui/separator";

//lucide components: -
import {
    LogOut,
    Menu,
    X,
} from "lucide-react";


//main compoonnets: -
import WasabiX_Logo from "./assets/WasabiX_Logo.png";

function Header(props){
    const {
        isLoggedIn, setIsLoggedIn,
        globalAvatar,
        setShowNotification,
        setNotificationMsg,
        setNotificationError,
        setGlobalAvatar,
        globalUsername, setGlovbalUsername,
    } = useContext(WeatherContext);
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDashboard] = useState(props.isDashboard || false);

    const handleLogOut = () =>{
        localStorage.removeItem('token');

        setIsLoggedIn(false);
        setGlobalAvatar(null);
        setGlovbalUsername("");

        setShowNotification(true);
        setNotificationMsg("Loged Out Sucessfully");
        setNotificationError(false);

        Navigate("/");
    }

    return (
        <header className="z-50 fixed top-0 w-full h-13 flex justify-between items-center p-2 backdrop-blur-md bg-black/70 border-b-2 border-white
                    sm:p-3 sm:border-b-3">
                    <div className="w-1/2 flex justify-start items-center gap-2 
                        sm:gap-3 ">
                        <img src={WasabiX_Logo} alt="Wasabi X logo" className="w-1/5 rounded-md
                            sm:w-1/7 lg:w-1/14" />
                        {!isDashboard && (
                            <h2 className="font-Andka text-Wasabi4 font-bold text-2xl 
                                md:text-3xl lg:text-2xl">WasabiX</h2>
                        )}
                    </div>
                    <div className="w-1/2 flex items-center justify-end gap-2">
                        {isLoggedIn && (
                            isDashboard? (
                                <h2 className="font-Andka text-Wasabi4 font-bold text-xl 
                                        md:text-3xl lg:text-2xl">{globalUsername}</h2>
                            ) : 
                            (
                                <Button size="sm" className="bg-Wasabi4 text-black/80 font-Andika text-base">
                                    <Link to="/dashboard">Dashboard</Link>
                                </Button>
                            )
                        )}
                        <DropdownMenu onOpenChange={setMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                    {isLoggedIn ? (
                                        <button>
                                            <img src={globalAvatar} alt="User Avatar" className="w-10 rounded-full border-2 border-Wasabi4"></img>
                                        </button>
                                    ) :
                                    ( 
                                        <button className="bg-Wasabi4 hover:bg-Wasabi rounded-md p-1">
                                            {
                                                menuOpen? (
                                                    <X />   
                                                ):
                                                (
                                                    <Menu />
                                                )
                                            }
                                        </button>
                                    )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="size-50 h-full bg-black/70 backdrop-blur-md text-white">
                                <DropdownMenuLabel className="sm:text-xl">Menu</DropdownMenuLabel>
                                <Separator />
                                <DropdownMenuItem className="data-highlighted:bg-Wasabi"><a href="#home" className="w-full sm:text-xl">Home</a></DropdownMenuItem>
                                <DropdownMenuItem className="data-highlighted:bg-Wasabi"><a href="#features" className="w-full sm:text-xl">Features</a></DropdownMenuItem>
                                <DropdownMenuItem className="data-highlighted:bg-Wasabi"><a href="#community" className="w-full sm:text-xl">Community</a></DropdownMenuItem>
                                <DropdownMenuItem className="data-highlighted:bg-Wasabi"><a href="#working" className="w-full sm:text-xl">How it Works</a></DropdownMenuItem>
                                <DropdownMenuItem className="data-highlighted:bg-Wasabi"><a href="#download" className="w-full sm:text-xl">For Android/iOS</a></DropdownMenuItem>
                                <Separator />
                                {isLoggedIn? (
                                    <>
                                    <DropdownMenuItem>
                                        <Button
                                            size="sm" 
                                            className="bg-Wasabi3 text-black"
                                            onClick={handleLogOut}
                                        >
                                            <LogOut className="text-black size-5" />Log Out
                                        </Button>
                                    </DropdownMenuItem>
                                    </>
                                ):
                                (
                                    <>
                                        <DropdownMenuItem className="data-highlighted:bg-black/0">
                                            <Button asChild size="sm" className="bg-Wasabi4 text-black hover:bg-Wasabi font-Andika
                                                sm:text-lg">
                                                <Link to="/login">Log In</Link>
                                            </Button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="data-highlighted:bg-black/0">
                                            <Button asChild size="sm" className="bg-Wasabi4 text-black hover:bg-Wasabi font-Andika
                                                sm:text-lg">
                                                <Link to="/signup">Sign Up</Link>
                                            </Button>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {!isLoggedIn && (
                            <div className="flex items-center justify-center gap-2">
                                <Button asChild size="sm" variant="ghost" className="hover:bg-Wasabi font-Andika font-bold hidden">
                                    <Link >Log In</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </header>
    );
}

export default Header;