import React, { useState, useEffect, Component } from "react";
import "./styles.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "react-circular-progressbar/dist/styles.css";

export const MainPage = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [countDownTimer, setCountDownTimer] = useState(60);
  useEffect(() => {
    if (countDownTimer == 0) setCountDownTimer(60);
    countDownTimer > 0 &&
      setTimeout(() => setCountDownTimer(countDownTimer - 1), 1000);
  }, [countDownTimer]);
  const onThemeButtonClick = () => {
    setIsLightTheme(!isLightTheme);
  };

  //-------------------------------
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTickerData = () => {
      fetch("http://localhost:3000/api/tickers/all")
        .then((response) => response.json())
        .then((data) => {
          // Sort the data in descending order based on ticker.last and get the top 10 highest values
          const sortedData = data
            .sort((a, b) => b.last - a.last)
            .slice(0, 10);
          setTickerData(sortedData);
        })
        .catch((error) => {
          console.error("Error fetching ticker data:", error);
        });
    };

    fetchTickerData();

    const interval = setInterval(fetchTickerData, 5000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------

  return (
    <React.Fragment>
      <div className={"theme-" + (isLightTheme ? "light" : "dark")}>
        <Header
          isLightTheme={isLightTheme}
          onThemeButtonClick={onThemeButtonClick}
          countDownTimer={countDownTimer}
        />
        <div class="Container-fluid " style={{ padding: "0px 30px" }}>
          <div
            class="d-flex justify-content-around align-items-center average-header"
            style={{ padding: "10px 0px" }}
          >
            <div class="text-center">
              <div class="average-header-maintext color-green">0.47 %</div>
              <div class="average-header-subHeading">5 Mins</div>
            </div>
            <div class="text-center">
              <div class="average-header-maintext color-green">0.98 %</div>
              <div class="average-header-subHeading">1 Hour</div>
            </div>
            <div style={{ "max-width": "40%" }}>
              <div class="text-center font-32 average-block">
                <div class="average-subText">
                  <span class="subText-heading">Best Price to Trade</span>
                </div>
                <div
                  class="average-heading"
                  style={{ "padding-bottom": "10px" }}
                >
                  ₹ 24,45,178
                </div>
                <div class="average-subText">
                  Average ETH/INR net price including commission
                </div>
              </div>
            </div>
            <div class="text-center">
              <div class="average-header-maintext color-green">5.86 %</div>
              <div class="average-header-subHeading">1 Day</div>
            </div>
            <div class="text-center">
              <div class="average-header-maintext color-green">6.41 %</div>
              <div class="average-header-subHeading">7 Days</div>
            </div>
          </div>
        </div>
        <div
          class="fiat-crypto-table table-responsive "
          style={{ margin: "0px auto" }}
        >
          <table class=" text-center ">
            <thead>
              <tr>
                <th>
                  <h4>
                    <span class="pointer ">#</span>
                  </h4>
                </th>
                <th>
                  <h4>
                    <span class="pointer">Platform</span>
                  </h4>
                </th>
                <th>
                  <h4>
                    <span class="pointer">Last Traded Price</span>
                  </h4>
                </th>
                <th>
                  <h4>
                    <span class="pointer">Buy / Sell Price</span>
                  </h4>
                </th>
                <th>
                  <h4>
                    <span class="pointer">Difference</span>
                  </h4>
                </th>
                <th>
                  <h4>
                    <span class="pointer">Savings</span>
                  </h4>
                </th>
              </tr>
            </thead>

            <tbody id="table-body">
              {tickerData.map((ticker, index) => (
                <tr key={index}>
                  <td class="align-middle">
                    <h4 class="table-text">{index + 1}</h4>
                  </td>
                  <td class="align-middle">
                    <a target="_blank" href="">
                      <h4 class="table-text">
                        <img src="wazix.png" class="exchange-logo"></img>{" "}
                        <span class="exchange-name ">{ticker.name}</span>
                      </h4>
                    </a>
                  </td>
                  <td class="align-middle">
                    <h4 class="table-text">₹{ticker.last}</h4>
                  </td>
                  <td class="align-middle">
                    <h4 class="table-text">
                      <span>
                        ₹ {ticker.buy} / ₹ {ticker.sell}
                      </span>
                    </h4>
                  </td>
                  <td class="align-middle">
                    <h4 class="table-text color-green">
                      {100 - (ticker.buy * 100) / ticker.sell} %
                    </h4>
                  </td>
                  <td class="align-middle">
                    <h4 class="table-text color-green">▲ ₹ {ticker.volume}</h4>
                  </td>
                </tr>
              ))}
            </tbody>




          </table>
        </div>
        <div class="padding-header" style={{ padding: "20px" }}></div>
        <Footer />
        <div
          class="d-flex justify-content-center"
          style={{
            border: "solid 1px #191d28",
            "background-color": "#191d28",
            position: "fixed",
            left: "0",
            "align-items": "center",
            width: "100vw",
            height: "47px",
            bottom: "0",
            "z-index": "8",
          }}
        >
          <button
            class="add-button btn btn-outline-info"
            style={{ display: "block" }}
          >
            Add hodlinfo to home screen
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

/*

<tr>
                <td class="align-middle">
                  <h4 class="table-text">2</h4>
                </td>
                <td class="align-middle">
                  <a target="_blank" href="https://bit.ly/2BJxccc">
                    <h4 class="table-text">
                      <img src="bitbns.png" class="exchange-logo" />
                      <span class="exchange-name ">Bitbns</span>
                    </h4>
                  </a>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">₹ 1,76,875</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">
                    <span>₹ 1,75,745 / ₹ 1,76,801</span>
                  </h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">5.70 %</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">▲ ₹ 9,540</h4>
                </td>
              </tr>
              <tr>
                <td class="align-middle">
                  <h4 class="table-text">3</h4>
                </td>
                <td class="align-middle">
                  <a target="_blank" href=" ">
                    <h4 class="table-text">
                      <img src="giotus.png" class="exchange-logo" />
                      <span class="exchange-name ">Giotus</span>
                    </h4>
                  </a>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">₹ 1,79,000</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">
                    <span>₹ 1,78,010 / ₹ 1,79,000</span>
                  </h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">6.97 %</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">▲ ₹ 11,665</h4>
                </td>
              </tr>
              <tr>
                <td class="align-middle">
                  <h4 class="table-text">4</h4>
                </td>
                <td class="align-middle">
                  <a target="_blank" href=" ">
                    <h4 class="table-text">
                      <img src="colodax.png" class="exchange-logo" />
                      <span class="exchange-name ">Colodax</span>
                    </h4>
                  </a>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">₹ 1,08,675</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">
                    <span>₹ 1,08,675 / ₹ 1,10,469</span>
                  </h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-red">-35.06 %</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-red">▼ ₹ 58,659</h4>
                </td>
              </tr>
              <tr>
                <td class="align-middle">
                  <h4 class="table-text">5</h4>
                </td>
                <td class="align-middle">
                  <a target="_blank" href="">
                    <h4 class="table-text">
                      <img src="zebpay.png" class="exchange-logo" />
                      <span class="exchange-name">Zebpay</span>
                    </h4>
                  </a>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">₹ 1,82,000</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">
                    <span>₹ 1,82,200 / ₹ 1,82,000</span>
                  </h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">8.76 %</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">▲ ₹ 14,665</h4>
                </td>
              </tr>
              <tr>
                <td class="align-middle">
                  <h4 class="table-text">6</h4>
                </td>
                <td class="align-middle">
                  <a target="_blank" href=" ">
                    <h4 class="table-text">
                      <img src="coibdcx.png" class="exchange-logo" />
                      <span class="exchange-name">CoinDCX</span>
                    </h4>
                  </a>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">₹ 1,77,959</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text">
                    <span>₹ 1,77,959 / ₹ 1,78,763</span>
                  </h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">6.35 %</h4>
                </td>
                <td class="align-middle">
                  <h4 class="table-text color-green">▲ ₹ 10,624</h4>
                </td>
              </tr>
*/
