import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SignUpForm from "../components/organisms/SignUpForm";
import { setSignUp, setSignUpGoogle } from "../services/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useSession,getSession,signOut } from "next-auth/react"
import { useEffect } from "react";

export default function SignUp(props:any) {
    const {sessionGoogle} = props;
    const router = useRouter();

    const onSubmitSignupgoogle = async () => {

        const userForm = {
            name:sessionGoogle.user.name,
            email:sessionGoogle.user.email,
            password: 'rahasia'
        }
          const data = new FormData();
          data.append('email',sessionGoogle.user.email);
          const result = await setSignUp(data);
          if (result.error) {
            signOut();
            toast.error(result.message);
            localStorage.removeItem('user-form');
          
          } else {
            localStorage.setItem("user-form", JSON.stringify(userForm));
            router.push("/sign-up-photo");
          }
    }

    useEffect(() => {
        if (sessionGoogle === null) {
           
        }else{
            onSubmitSignupgoogle()
        }
      }, [sessionGoogle]);
    const {data:session} = useSession();
    return (
        <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
            <div className="container mx-auto">
                <form action="">
                    <div className="pb-50">
                        <Link href="/">
                            <a className="navbar-brand">
                                <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
                            </a>
                        </Link>   
                    </div>
                    <SignUpForm/>
                </form>
            </div>
        </section>
    );
}
export const getServerSideProps = async(context)=>{
    const sessionGoogle =  await getSession(context);

    return {
        props:{sessionGoogle}
    };
}
