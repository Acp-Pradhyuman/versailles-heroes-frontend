import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { getUserAllTransactions } from "../../../api";
import { useSelector } from "react-redux";
import Moment from 'react-moment';
import { DataNotFound } from "../../../containers";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../../assets/images/copy.svg";

export default function History() {
    const [historyList, setHistoryList] = useState([]);
    const [copy, setCopy] = useState(false);
    const userId = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        fetchUserTransactionHistory();
    }, []);

    async function fetchUserTransactionHistory() {
        try {
            const { data } = await getUserAllTransactions(userId);
            setHistoryList(data.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Tab.Pane eventKey="History">
            <div className="table-responsive">
                <table className="table avtart-table-wrap">
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>USD</th>
                            <th>Date</th>
                            <th>FROM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyList?.length ?
                            historyList.map((item, index) =>
                                <tr key={index}>
                                    <td>VRH 0.01</td>
                                    <td>$0.41</td>
                                    <td>
                                        <Moment format="DD-MMMM-YYYY">
                                            {(item?.createdAt)}
                                        </Moment>
                                    </td>
                                    <td>
                                        {`${item?.userData?.wallet_address.substring(
                                            0,
                                            9
                                        )}...${item?.userData?.wallet_address.substring(
                                            item?.userData?.wallet_address.length - 9
                                        )}`} <CopyToClipboard text={item?.userData?.wallet_address}
                                            onCopy={() => setCopy(true)}>
                                            <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                        </CopyToClipboard>
                                    </td>
                                </tr>
                            ) : <DataNotFound />}
                    </tbody>
                </table>
            </div>
        </Tab.Pane>
    )
}