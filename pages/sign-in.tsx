import Image from "next/image"
import Link from "next/link"

import SiginForm from "../components/organisms/SignInForm"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { setLogin, setLoginGoogle } from "../services/auth"
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useEffect } from "react"
export default function SignIn(props: any) {
    const { sessionGoogle } = props;
    const router = useRouter();

    const onSubmitLogingoogle = async () => {
        const data = {
            email: sessionGoogle.user.email,
            password: 'rahasia'
        };
        const response = await setLoginGoogle(data);
        if (response.error) {
            toast.error(response.message)
            signOut()
        } else {
            toast.success('login success')
            const token = response.data.token;
            const tokenBase64 = btoa(token)
            Cookies.set('token', tokenBase64, { expires: 1 })
            router.push('/');
        }
    }

    useEffect(() => {
        if (sessionGoogle === null) {
        } else {
            onSubmitLogingoogle()
        }
    }, [sessionGoogle]);
    const { data: session } = useSession();


    return (
        <section className="sign-in mx-auto">
            <div className="row">
                <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
                    <form action="">
                        <div className="container mx-auto">
                            <div className="pb-50">
                                <Link href="/">
                                    <a className="navbar-brand" >
                                        <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
                                    </a>
                                </Link>

                            </div>
                            <SiginForm />
                        </div>
                    </form>
                </div>
                <div className="col-xxl-7 col-lg-6 bg-blue text-center pt-lg-145 pb-lg-145 d-lg-block d-none">
                    <img src="/img/Header-9.png" width="502" height="391.21" className="img-fluid pb-50" alt="" />
                    <h2 className="text-4xl fw-bold text-white mb-30">Win the battle.<br />
                        Be the Champion.{session?.user?.name}</h2>
                    <p className="text-white m-0">Kami menyediakan jutaan cara untuk<br /> membantu players menjadi<br />
                        pemenang
                        sejati</p>
                </div>
            </div>
        </section>
    )
};
export const getServerSideProps = async (context) => {
    const sessionGoogle = await getSession(context);
    return {
        props: { sessionGoogle }
    };

}