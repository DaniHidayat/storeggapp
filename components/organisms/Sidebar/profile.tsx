import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { JWTPayLoadTypes, UserType } from "../../../services/data-types";
import { log } from "console";

export default function profile() {
    const [isLogin,setIsLogin] = useState(false);
    const [user,setUser] = useState({
        avatar: "",
        name:'',
        email:'',
       
    });
    const IMG = process.env.NEXT_PUBLIC_IMAGE;
   
    useEffect(()=>{
        const token = Cookies.get('token');
        console.log('token:',token)
        if(token){
            const jwtToken =atob(token);
            const payload:JWTPayLoadTypes = jwtDecode(jwtToken);
            const userFromPlayload:UserType = payload.player;
           

           
            setIsLogin(true);
            setUser(userFromPlayload);
           
        }
        
    },[])
    return (
        <div className="user text-center pb-50 pe-30">
            <img src={`${IMG}${user.avatar}`} alt="profile" width="90" height="90" className="img-fluid mb-20" style={{borderRadius:'100%'}} />
            <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
            <p className="color-palette-2 m-0">{user.email}</p>
        </div>
    )
}