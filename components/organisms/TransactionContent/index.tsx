import { useCallback, useEffect, useState } from "react";
import ButtonTabs from "./ButtonTabs";
import TableRows from "./TableRows";
import { getMemberTransactions } from "../../../services/member";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { HistoryTransactionTypes } from "../../../services/data-types";

export default function TransactionsContent() {
    const [transactions,setTransactions] = useState([]);
  
    const [total,setTotal] = useState(0);
    const [tab,setTab] = useState('all');
    const onTabClick = (value)=>{
       
        setTab(value);
        getMemberTransactionsAPI(value);
    } 
    const getMemberTransactionsAPI = useCallback(async(value)=>{
       
        const response = await getMemberTransactions(value);
       
         // Do something with the response data
         if (response.error) {
            toast.error(response.message)
        }else{
            setTotal(response.data.total)
            setTransactions(response.data.data)
        }
    },[])
    useEffect(()=>{
        getMemberTransactionsAPI('all');
    },[])
    const IMG = process.env.NEXT_PUBLIC_IMAGE;  
    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
                <div className="mb-30">
                    <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
                    <h3 className="text-5xl fw-medium color-palette-1"> <NumberFormat value={total}
                      prefix="Rp."
                      displayType='text'
                      thousandSeparator="."
                      decimalSeparator=','
                  /></h3>
                </div>
                <div className="row mt-30 mb-20">
                    <div className="col-lg-12 col-12 main-content">
                        <div id="list_status_title">
                            <ButtonTabs onClick={()=>onTabClick('all')} title="All Trx" active={tab == 'all'} />
                            <ButtonTabs onClick={()=>onTabClick('success')}title="Success" active={tab == 'success'} />
                            <ButtonTabs onClick={()=>onTabClick('pending')}title="Pending" active={tab == 'pending'} />
                            <ButtonTabs onClick={()=>onTabClick('failed')}title="Failed" active={tab == 'failed'} />
                          
                        </div>
                    </div>
                </div>
                <div className="latest-transaction">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                    <div className="main-content main-content-table overflow-auto">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="color-palette-1">
                                    <th className="" scope="col">Game</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="list_status_item">
                                {transactions.map((item:HistoryTransactionTypes)=>{
                                    return (
                                         <TableRows
                                         key={item._id}
                                         image={`${IMG}${item.historyVoucherTopup.thumbnail}`} 
                                         title={item.historyVoucherTopup.gameName}
                                         category={item.historyVoucherTopup.category}
                                         item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`} 
                                         price={item.historyVoucherTopup.price} 
                                         status={item.status}
                                         id={item._id} />
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