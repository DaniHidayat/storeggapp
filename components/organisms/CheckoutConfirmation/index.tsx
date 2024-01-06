
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { paymentMidtrans, setCheckout } from "../../../services/player";
import { useRouter } from "next/router";

export default function CheckoutConfirmation() {
    const [checkbox,setCheckbox] = useState(false)
    const [currentTime, setCurrentTime] = useState('');
    const router = useRouter();

    useEffect(() => {
      const intervalId = setInterval(() => {
        const date = new Date();
        const formattedTime = date.toLocaleString().replace(/[/: ,APMampm]/g, '');
        setCurrentTime(formattedTime);
      }, 1000); // Update the current time every 1000ms (1 second)
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);
    
    const handlePayment = async (transaction_token: string) => {
        // Load the Midtrans Snap script
        const midtransScript = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
    
        // After the script is loaded, initiate the payment process
        midtransScript.then(() => {
          const { snap } = window;
          snap.pay(transaction_token);
        });
      };
   const onSubmit = async ()=>{
    const dataItemLocal = localStorage.getItem('data-item'); 
    const dataTopUpLocal = localStorage.getItem('data-topup'); 
    const dataItem = JSON.parse(dataItemLocal!);
    const dataTopUp = JSON.parse(dataTopUpLocal!);
    const paymentType = dataTopUp.paymentItem.payment.type;
    if(!checkbox){
        toast.error('Pastikan anda telah melakukan pembayaran');
    }else{
     
        const data ={
            voucher: dataItem._id,
            nominal:dataTopUp.nominalItem._id,
            payment: dataTopUp.paymentItem.payment._id,
            bank: dataTopUp.paymentItem.bank._id,
            name: dataTopUp.bankAccountName == ""? "Payment Gateway" :  dataTopUp.bankAccountName,
            accountUser: dataTopUp.verifyID,
            numberTransaction: dataTopUp.verifyID + '-'+ currentTime
        };
   
  
      const response = await setCheckout(data);
      
      if (response.error) {
            toast.error(response.message)
        }else{
          let gross_amount = response.data.value;
          let order_id = response.data.numberTransaction;
          toast.success('Checkout success');
             if(paymentType == "Payment Gateway"){
             
              try {
                const data ={
                  gross_amount: gross_amount,
                  order_id:order_id,
                 };
                const response =  await paymentMidtrans(data)
                handlePayment(response.data)
              } catch (error) {
                console.log('====================================');
                console.log('error,',error);
                console.log('====================================');
                toast.error('Terjadi kesalahan');
              }
               
             }else{
            router.push('/complete-checkout');
             }
           
    
        }
      //     // <MidtransScript token={response.data}/>
      //     // router.push('/complete-checkout');
    }
    
   
   }
   
    return (
        <>
         <label className="checkbox-label text-lg color-palette-1">I have transferred the money
                    <input checked={checkbox} onChange={()=> setCheckbox(!checkbox)} type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <div className="d-md-block d-flex flex-column w-100 pt-50">
                    <button  type="button" onClick={onSubmit} className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
                        role="button">Confirm
                        Payment</button>
            </div>
            </>
    )
}