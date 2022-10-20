import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { apiMysteryBox, apiGetRate } from "../../api";

export default function Home() {
  const [mysteryBox, setMysteryBox] = useState([]);
  const [usdRate, setUsdRate] = useState();

  async function fetchMysteryBox() {
    try {
      const { data } = await apiMysteryBox();
      setMysteryBox(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  // async function fetchCurrencyRate() {
  //   try {
  //     const { data } = await apiGetRate();
  //     console.log("currency rate", data);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    fetchMysteryBox();
    // fetchCurrencyRate();
  }, []);

  const handleBox = (name) => {
    const str = name.substring(0, name.indexOf(" "));
    return str.toLowerCase();
  }

  return (
    <div div className="container">
      <div className="row">
        <div className="col-md-12 text-center mb-5">
          <h1>MYSTERY BOXES</h1>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor<br /> invidunt ut labore et dolore magna aliquyam </p>
        </div>
      </div>
      <div className="row row mt-lg-5 mt-mb-2">
        {mysteryBox.map((item) =>
          <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-5 full-width-480 home-mystery-boxes-wrap" key={item?._id}>
            <div className="mystery-boxes-wrap">
              <div className={`mystery-boxes-img ${handleBox(item?.name)}`}>
                <Link to={`/mystery-boxes/${item?._id}`} className="btn-style1">
                  <img src={item?.image} alt="mystery-boxes" />
                </Link>
              </div>
              <div className="px-2">
                <div className="mystery-boxes-inner text-center">
                  <Link to={`/mystery-boxes/${item?._id}`} className="btn-style1">
                    <h3>{item?.name}</h3>
                  </Link>
                  <Link to={`/mystery-boxes/${item?._id}`} className="btn-style1">
                    <img src={require("../../assets/images/icon/btn-style2.png")} alt="btn-style2" />
                    <span>{item?.price} {item?.currency}<small>( $43.21 USD )</small></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}
