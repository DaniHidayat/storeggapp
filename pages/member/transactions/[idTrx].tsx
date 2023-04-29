import jwtDecode from "jwt-decode";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import { HistoryTransactionTypes, JWTPayLoadTypes, UserType } from "../../../services/data-types";
import { getTransactionDetail } from "../../../services/member";

interface TransactionsDetailProps{
    transactionDetail:HistoryTransactionTypes;
}
export default function TransactionsDetail(props:TransactionsDetailProps) {
    const {transactionDetail } = props;

    
    return (
        <section className="transactions-detail overflow-auto">
            <TransactionDetailContent data={transactionDetail}/>
        </section>  
    )
}

interface  GetServerSideProps{
    req:{
        cookies:{
            token: string
        }
    }
    params:{
        idTrx: string
    }

}
export async function getServerSideProps({req,params}:GetServerSideProps) {
   
    const {idTrx} = params;
    
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
    const response = await  getTransactionDetail(idTrx,jwtToken)
   
    
 
         return{
             props:{
                 
                    transactionDetail:response.data
                 }
         }
 }