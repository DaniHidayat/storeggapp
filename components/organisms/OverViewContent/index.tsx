import { useCallback, useEffect, useState } from "react"
import Categori from "./Categori"
import TableRows from "./TableRows"
import { toast } from "react-toastify";
import { getMemberOverview } from "../../../services/member";
import { useRouter } from "next/router";
import { HistoryTransactionTypes, TopUpCategoriesTypes } from "../../../services/data-types";
export default function OverViewContent() {
   const [count,setCount] = useState([]);
    
   const [data,setData] = useState([]);

   const getMemberOverviewAPI = useCallback(async()=>{
    const response = await getMemberOverview();
          // Do something with the response data
          if (response.error) {
            toast.error(response.message)
        }else{
         setCount(response.data.count);
         setData(response.data.data);
        }
   },[]);
    useEffect(() => {
        getMemberOverviewAPI();
      }, []);    
      const IMG = process.env.NEXT_PUBLIC_IMAGE;  
    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
                <div className="top-up-categories mb-30">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
                    <div className="main-content">
                        <div className="row">
                            {count.map((item: TopUpCategoriesTypes) =>{
                                return(
                                <Categori key={item._id} nominal={item.value} icon="ic-desktop">{item.name}</Categori>
                            )})}

                            
                        </div>
                    </div>
                </div>
                <div className="latest-transaction">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                    <div className="main-content main-content-table overflow-auto">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="color-palette-1">
                                    <th className="text-start" scope="col">Game</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item:HistoryTransactionTypes)=>{
                                    return (
                                    <TableRows 
                                    key={item._id}
                                    title={item.historyVoucherTopup.gameName} 
                                    categori={item.historyVoucherTopup.category}
                                    item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`} 
                                    price={item.historyVoucherTopup.price} 
                                    status={item.status} 
                                    image={`${IMG}${item.historyVoucherTopup.thumbnail}`} />
                                    )
                                })}
                                
                                
                               

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
    
}