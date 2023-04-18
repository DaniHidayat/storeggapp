import OverViewContent from "../../components/organisms/OverViewContent";
import Sidebar from "../../components/organisms/Sidebar";
import jwtDecode from "jwt-decode";
import { JWTPayLoadTypes, UserType } from "../../services/data-types";
export default function Member() {
    return (
        <section className="overview overflow-auto">
         <Sidebar activeMenu="overview"/>
        <OverViewContent/>
        </section> 
    )
}

interface  GetServerSideProps{
    req:{
        cookies:{
            token: string
        }
    }
}
export async function getServerSideProps({req}:GetServerSideProps) {
    const {token} = req.cookies;
    if(!token){
     return{
         redirect:{
             destination: '/sign-in',
             permanent:false,
         }
     }
    }
 
    const jwtToken = Buffer.from(token,'base64').toString('ascii'); //atob from serverside
    const payload:JWTPayLoadTypes = jwtDecode(jwtToken);
    const userFromPlayload:UserType = payload.player;
    const IMG = process.env.NEXT_PUBLIC_IMAGE;
    userFromPlayload.avatar = `${IMG}/${userFromPlayload.avatar}`;
 
         return{
             props:{
                 user:{
                     userFromPlayload
                 }
             }
         }
 }