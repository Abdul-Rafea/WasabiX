//shadcn components: -
import { Separator } from "@/components/ui/separator";

// main components: -
import Svg from "./svg";
import DefaultProfilePic from "./assets/Default_Profile_Pic.jpg";

function CommunityFrame(props){
    let Avatar = props.avatar;

    if (!Avatar){
        Avatar = DefaultProfilePic;   
    }
    
    if (props.type === "1"){
        return(
            <div className="w-full h-full aspect-square flex flex-col gap-2 p-5 bg-Wasabi rounded-2xl">
                <div className="w-min rounded-lg">
                    <Svg 
                        id = {props.id} 
                        svgColor = "Black"   
                        size = "descriptionIcon1"
                    />
                </div>
                <h2 className="w-full text-xl font-Andika text-black/80
                    sm:text-2xl">{props.heading}</h2>
                <Separator className="bg-black/80" />
                <p className="w-full text-base font-Andika text-offWhite
                    sm:text-lg"><q>{props.text}</q></p>
            </div>
        );
    }
    else if (props.type === "2"){
        return(
            <div className="w-9/10 bg-Wasabi flex flex-col items-center justify-center rounded-xl p-3 gap-2 shadow-lg shadow-black">
                <div className="w-full flex justify-start items-center gap-3">
                    <img src={Avatar} alt="User Profile Pic" className="w-2/10 rounded-full" />
                    <h2 className="text-lg text-black/80 font-Andika
                        sm:text-xl">{props.username}</h2>
                </div>
                <p className="w-full font-Andika text-base text-black/80">{props.comment}</p>
                <Separator className="bg-black/80" /> 
                <div className="w-full flex flex-col justify-start items-center">
                    <div className="w-full flex items-center gap-1 font-Andika text-m text-offWhite">
                        <Svg 
                            id = {3} 
                            svgColor = "offWhite" 
                            size = "descriptionIcon2"
                        />
                        <h3>{props.location}</h3>
                    </div>
                    <div className="w-full text-md text-offWhite font-Andika ml-2">
                        <p>{props.timePassed} hours ago</p>
                    </div>
                </div>
            </div>
        );
    }
    else if (props.type === "3"){
        return(
            <div className="relative flex flex-wrap justify-start items-center font-Andika bg-Wasabi rounded-2xl p-3 shadow-lg shadow-black">
                <div className="w-7 absolute top-4 -left-9.5 aspect-square rounded-full bg-black border-3 border-Wasabi">&nbsp;</div>
                <div className="z-10 w-min rounded-xl">
                    <Svg 
                        id = {props.svgId}  
                        svgColor = "Black"
                        size = "descriptionIcon3"
                    /> 
                </div>
                <h2 className="w-full text-lg text-black/80">Step {props.step}</h2>
                <h1 className="w-full text-xl text-offWhite">{props.heading}</h1>
                <Separator className="bg-black/80 mt-1" />
                <p className="w-full text-base text-black/80">{props.description}</p>
            </div>
        );
    }
    
}

export default CommunityFrame;