import Categori from "./Categori"
import TableRows from "./TableRows"

export default function OverViewContent() {

    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
                <div className="top-up-categories mb-30">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
                    <div className="main-content">
                        <div className="row">
                            <Categori nominal={18500000} icon="icon-desktop">Game <br />Desktop</Categori>
                            <Categori nominal={7850000} icon="icon-mobile">Game <br />Mobile</Categori>
                            <Categori nominal={70000} icon="icon-desktop">Other <br />Categories</Categori>                    
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
                                <TableRows title="Mobile Lagend" categori="Mobile" item={200} price={203000} status="Pending" image="overview-1" />
                                <TableRows title="Call of Duty:moderen" categori="Desktop" item={200} price={203000} status="Success" image="overview-2" />
                                <TableRows title="Class of clans" categori="Mobile" item={200} price={203000} status="Failed" image="overview-3" />
                                <TableRows title="The royal game" categori="Desktop" item={200} price={203000} status="Pending" image="overview-4" />
                               

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
    
}