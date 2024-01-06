import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLogin } from "../../../services/auth";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import { FaGoogle } from 'react-icons/fa';
import {signIn,signOut } from "next-auth/react"
export default function SiginForm() {
  
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const onSubmit= async ()=>{
        const data ={
            email,
            password
        };
        if(!email || !password){
            toast.error('email dan password wajib diisi!!')
        }else{
            const response = await setLogin(data);
            if (response.error) {
                toast.error(response.message)
            }else{
                toast.success('login success')
                const token = response.data.token;
                const tokenBase64 = btoa(token)
                Cookies.set('token',tokenBase64, { expires: 1 })
                router.push('/');

            }
        }

    }
    return (
        <>
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
            <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
            <div className="pt-50">
                <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">Email
                    Address</label>
                <input type="email" 
                className="form-control rounded-pill text-lg"
                 id="email"
                 name="email"
                 value={email}
                 onChange={(event)=>{
                     setEmail(event.target.value)
                 }}
                aria-describedby="email"
                placeholder="Enter your email address" />
            </div>
            <div className="pt-30">
                <label htmlFor="password"
                    className="form-label text-lg fw-medium color-palette-1 mb-10">Password</label>
                <input type="password" 
                    className="form-control rounded-pill text-lg"
                    id="password"
                    name="password"
                     value={password}
                    onChange={(event)=>{
                        setPassword(event.target.value)
                    }} aria-describedby="password" placeholder="Your password" />
            </div>
            <div className="button-group d-flex flex-column mx-auto pt-50">
                <button type="button"
                onClick={onSubmit}
                 className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
                    role="button">Continue to Sign In</button>
                    <button type="button"
                onClick={signIn}
                 className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
                    role="button"> <FaGoogle size={24} color="#DB4437" /> 
                    <span> with Google</span></button>
                  

                <Link  href="/sign-up">
                <a className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
                   role="button">Sign Up</a>
                </Link>
                
            </div>
            
        </>
    )
}
