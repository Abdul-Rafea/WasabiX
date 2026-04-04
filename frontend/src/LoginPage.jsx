import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

//lucide components: -
import { CornerUpLeft } from "lucide-react";

// main components: -
import WasabiX_Logo from "./assets/WasabiX_Logo.png";

function LoginPage(){
    const navigate = useNavigate();

    const {
        setIsLoading,
        setIsLoggedIn,
        setNotificationMsg,
        setShowNotification,
        setNotificationError,
        setGlobalUserName,
        setGlobalAvatar,
    } = useContext(WeatherContext);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [useEmail, setUseEmail] = useState(true);

    let fieldError = false; 

    const changeType = () =>{
        if (useEmail){
            setUseEmail(false);
        }
        else{
            setUseEmail(true);
        }
    }

    const handleLogin = async () =>{
        if(useEmail == true){
            if(email == ""){
                setEmailError(true);
                fieldError = true;
            }
        }
        
        if(useEmail == false){
            if(username == ""){
                setUsernameError(true);
                fieldError = true;
            }
        }
        
        if(password == ""){
            setPasswordError(true);
            fieldError = true
        }

        if(fieldError == true){
            setShowNotification(true);
            setNotificationMsg("Please fill are the required fields");
            setNotificationError(true);
            return;
        }
        else{
            setEmailError(false);
            setUsernameError(false);
            setPasswordError(false);
        }

        const userData = {
            email: email,
            username:username,
            password: password,
            useEmail: useEmail,
        }

        try{
            setIsLoading(true);

            const response = await api.post("/login", userData);
            const result = response.data;

            localStorage.setItem("token", result.token);
            setGlobalAvatar(result.avatar);
            setGlobalUserName(result.username);
            setIsLoggedIn(true);

            setShowNotification(true);
            setNotificationMsg(result.message);
            setNotificationError(false);

            navigate("/");
        }
        catch(err){
            console.error(err);
            
            setShowNotification(true);
            if (err.response && err.response.data){
                setNotificationMsg(err.response.data.message );
            }
            else{
                setNotificationMsg("Could not connect to server");
            }
            setNotificationError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <>
            <div className="authBack">
                <div className="w-9/10 mt-5 mb-5">
                    <Button asChild size="sm" className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black rounded-lg">
                        <Link to="/">
                            <CornerUpLeft className="size-7"/>
                            Return
                        </Link>    
                    </Button>
                </div>
                <div className="authMain">
                    <img src={WasabiX_Logo} alt="WasaiX Avatar" className="w-1/4 rounded-md " />
                    <div className="authHeader">
                        <h2 className="authTagline">Welcome Back!</h2>
                        <h1 className="authHeading">Please Log In to continue</h1>
                    </div>
                    <FieldSet className="w-full">
                        <FieldGroup>
                            {useEmail ? (
                                <Field>
                                    <FieldLabel
                                        htmlFor="email" 
                                        className={`${emailError ? "authLabelError" : "authLabel"}`}
                                    >
                                        Email
                                    </FieldLabel>
                                    <Input 
                                        className="authInput"
                                        aria-invalid={emailError}
                                        id="email" 
                                        type="email" 
                                        value={email}
                                        onChange={(e) =>{setEmail(e.target.value)}}
                                        placeholder="Enter your email"
                                        autoComplete="off" 
                                    />
                                </Field>
                            ):
                            (
                                <Field>
                                    <FieldLabel 
                                        htmlFor="username" 
                                        className={`${usernameError? "authLabelError" : "authLabel"}`}
                                    >
                                        Username
                                    </FieldLabel>
                                    <Input 
                                        className="authInput"
                                        aria-invalid={usernameError}
                                        id="username" 
                                        type="text"
                                        value={username}
                                        onChange={(e) =>{setUsername(e.target.value)}} 
                                        placeholder="Enter your username"
                                        autoComplete="off" 
                                    />
                                </Field>
                            )}
                            <Field>
                                <FieldLabel 
                                    htmlFor="password" 
                                    className={`${passwordError? "authLabelError" : "authLabel"}`}
                                >
                                    Password
                                </FieldLabel>
                                <Input 
                                    className="authInput"
                                    aria-invalid={passwordError}
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>{setPassword(e.target.value)}} 
                                    placeholder="Enter your password"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="w-full flex flex-col items-center gap-2">
                        <Button onClick={handleLogin} size="sm" className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black">Log In</Button>
                        <button onClick={changeType}  className="text-xl text-black/80 font-Andika">
                            {useEmail ? ("Or log in with username")
                            : ("Or log in with email")}
                        </button>
                    </div>
                    <Link to="/signUp" className="text-xl text-black/80 font-Andika underline">Create an Account</Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;