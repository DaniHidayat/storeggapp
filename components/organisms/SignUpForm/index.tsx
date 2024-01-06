
import { useState } from "react";
import {useRouter } from "next/router"
import cx from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useSession,signIn,signOut,getSession } from "next-auth/react"

export default function SiginForm() {
    const {data:session} = useSession()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const router = useRouter();
    const className = {
        label: cx('form-label text-lg fw-medium color-palette-1 mb-10')
    }
    const onSubmit = () => {

        const userForm = {
            name,
            email,
            password
        }

        const errorMessage = [
            { field: "name", message: "Nama belum di isi" },
            { field: "email", message: "Email belum di isi" },
            { field: "password", message: "Password belum di isi" }
          ];
          
          for (const { field, message } of errorMessage) {
            if (userForm[field] === "") {
              toast.error(message);
              signOut();
              return router.push("/sign-up");
            }
          }
          localStorage.setItem("user-form", JSON.stringify(userForm));
          router.push("/sign-up-photo");
       
    }
    return (
        <>
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
            <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
            <div className="pt-50">
                <label className={className.label}>Full Name</label>
                <input
                    type="text"
                    className="form-control rounded-pill text-lg"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    aria-describedby="name"
                    placeholder="Enter your name"
                />
            </div>
            <div className="pt-30">
                <label className={className.label}>EmailAddress</label>

                <input type="email"
                    className="form-control rounded-pill text-lg"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-describedby="email"
                    placeholder="Enter your email address"
                />
            </div>
            <div className="pt-30">
                <label htmlFor="password" className={className.label}>Password</label>
                <input
                    type="password"
                    className="form-control rounded-pill text-lg"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-describedby="password"
                    placeholder="Your password" />
            </div>
            <div className="button-group d-flex flex-column mx-auto pt-50">
                <button type="button" className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
                    onClick={onSubmit} role="button">Continue</button>
                     <button type="button" className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
                    onClick={signIn} role="button">  <FaGoogle size={24} color="#DB4437" /> Signup With Google</button>

                <a className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill" href="/sign-in"
                    role="button">Sign
                    In</a>
            </div>
            <ToastContainer />
        </>
    )
}



