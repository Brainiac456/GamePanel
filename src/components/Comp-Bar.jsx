import React from "react";
import "../style/Comp-Bar.css";
import ImgSlider from "./SubComponents/Slider";
import { BsCloudUploadFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { SlDiamond } from "react-icons/sl";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";

import "./audio/styles.scss";
import Audio from "./audio/Audio";

const CompBar = ({
  Expended,
  subtypes,
  assetsType,
  Title,
  hasFrame,
  close,
}) => {
  const [typeAll, setTypeAll] = useState(null);
  const [limit, setLimit] = useState(10);
  const [viewIndex, setViewIndex] = useState([]);
  const [isPremium, setIsPreminum] = useState(false);
  const [scrollTop, setScrollTop] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  const [activePriceBtn, setActivePriceBtn] = useState(1);
  const [musicCheck, setMusicCheck] = useState(false);

  const [viewAllClick, setViewAllClick] = useState(false);

  const fetchData = async () => {
    let Api = subtypes?.map((sub) => {
      return axios.get(
        `https://dev.breshna.io/api/assets?assetTypeId=${assetsType}&templateId=628cb173fdd0331e553ecd93&assetSubType=${sub}&limit=${limit}&isPremium=${isPremium}`
      );
    });
    await axios
      .all(Api)
      .then(
        axios.spread((...responses) => {
          let Arr = [];
          responses.map((resp) => {
            if (resp.data.message === undefined) Arr.push(resp.data);
          });

          setTypeAll(Arr);
        })
      )
      .catch((errors) => {});
  };

  const handleViewAll = () => {
    setViewAllClick((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [viewIndex, limit, isPremium, subtypes]);

  const handleLimit = (index) => {
    if (viewIndex.includes(index)) {
      let temp = viewIndex;
      let arr = temp.filter((item) => item !== index);
      setViewIndex([...arr]);
    } else {
      let temp = viewIndex;

      temp.push(index);
      console.log("limit", temp);
      setViewIndex([...temp]);
    }
  };
  const checkHandler = (e) => {
    setMusicCheck(e.target.checked);
  };

  const onScrollHandler = () => {
    const element = document.getElementById("panel-id");
    setScrollTop(element.scrollTop);
    setScrollHeight(element.scrollHeight);
  };

  const handlePremium = (e) => {
    if (e.target.name === "Premium") {
      setIsPreminum(true);
      setActivePriceBtn(2);
    } else {
      setIsPreminum(false);
      setActivePriceBtn(1);
    }
  };

  return (
    <div>
      <div className={Expended === false ? "CompBar" : "CompBar active"}>
        <button
          onClick={(e) => close(e)}
          style={{
            float: "right",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
            marginTop: "10px",
          }}
        >
          <ImCancelCircle style={{ fontSize: "20px" }} />
        </button>
        <div className="Compbar-title">{Title}</div>

        {Title !== "Music" && (
          <div style={{ display: "flex" }}>
            <form>
              <input
                className="input_field"
                type="text"
                name="Search"
                placeholder="Search "
              />
            </form>
            <button
              style={{
                height: "38px",
                background: "#8c3dff",
                border: "none",
                borderRadius: "6px",
                position: "relative",
                right: "5%",
                top: "19px",
                color: "white",
                width: "100px",
              }}
            >
              Search
            </button>
          </div>
        )}
        {hasFrame === false ||
          (hasFrame === undefined && (
            <button className="Comp-Button">
              <BsCloudUploadFill
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  marginLeft: "auto",
                  marginRight: "7px",
                }}
              />
              Upload {Title}
            </button>
          ))}

        {Title === "Music" && (
          <label class="container">
            No music
            <input
              type="checkbox"
              value="Text"
              onChange={(e) => checkHandler(e)}
            />
            <span class="checkmark"></span>
          </label>
        )}
        {Title !== "Music" && (
          <div
            disabled={viewAllClick}
            style={{ display: "flex", margin: "0px 26px" }}
          >
            <button
              onClick={(e) => {
                handlePremium(e);
              }}
              name="Free"
              style={{ borderRadius: "6px 0px 0px 0px" }}
              className={
                activePriceBtn === 1
                  ? "Comp-Pricing-button active"
                  : "Comp-Pricing-button"
              }
            >
              {" "}
              Free
            </button>
            <button
              onClick={(e) => {
                handlePremium(e);
              }}
              name="Premium"
              style={{ borderRadius: "0px 6px 0px 0px" }}
              className={
                activePriceBtn === 2
                  ? "Comp-Pricing-button active"
                  : "Comp-Pricing-button"
              }
            >
              <SlDiamond
                style={{
                  verticalAlign: "middle",
                  marginLeft: "auto",
                  marginRight: "7px",
                }}
              />
              Premium
            </button>
          </div>
        )}

        {Title !== "Music" && (
          <div style={{ marginTop: "10px" }}>
            <div
              id="panel-id"
              onScroll={onScrollHandler}
              style={{
                width: "409px",
                height: "62vh",
                marginLeft: "27px",
                overflowX: "hidden",
              }}
            >
              <ImgSlider
                Dat={typeAll}
                handleViewAll={handleViewAll}
                scrollTop={scrollTop}
                scrollHeight={scrollHeight}
                limit={handleLimit}
                view={viewIndex}
                assetsType={assetsType}
              />
            </div>
          </div>
        )}
        {Title === "Music" && (
          <div
            id="panel-id"
            onScroll={onScrollHandler}
            style={{
              width: "409px",
              height: "62vh",
              marginLeft: "27px",
              overflowX: "hidden",
            }}
          >
            {typeAll &&
              typeAll[0].data.map((data, index) => {
                console.log("typeAll", typeAll);
                return (
                  <div
                    key={data}
                    style={{
                      width: "409px",
                      height: "13vh",
                      marginTop: "0px",
                    }}
                  >
                    <Audio data={data} index={index} Disable={musicCheck} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default CompBar;
