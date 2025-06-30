import React, { useState, useEffect } from "react";
import "./Das.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../Common/Api/Api";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../../Common/loader/index";
import Backdrop from "@mui/material/Backdrop";
import ReactApexChart from "react-apexcharts";
import { FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaPoll } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();
  const user = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10_1796)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.25 11.875C6.25 8.7684 8.7684 6.25 11.875 6.25C14.9816 6.25 17.5 8.7684 17.5 11.875C17.5 14.9816 14.9816 17.5 11.875 17.5C8.7684 17.5 6.25 14.9816 6.25 11.875Z"
          fill="#fff"
        />
        <path
          d="M17.9594 15.079C17.9025 15.1867 17.9266 15.3211 18.0245 15.3936C18.7515 15.9318 19.6511 16.25 20.625 16.25C23.0413 16.25 25 14.2912 25 11.875C25 9.45875 23.0413 7.5 20.625 7.5C19.6511 7.5 18.7515 7.81825 18.0245 8.35641C17.9266 8.42891 17.9025 8.56322 17.9594 8.67099C18.4643 9.62774 18.75 10.718 18.75 11.875C18.75 13.032 18.4643 14.1223 17.9594 15.079Z"
          fill="#fff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.80144 19.6241C7.34189 18.9555 9.36306 18.75 11.8749 18.75C14.389 18.75 16.4116 18.9559 17.9526 19.626C19.6313 20.3559 20.6515 21.5991 21.1863 23.3545C21.4369 24.1772 20.8189 25 19.9673 25H3.78501C2.93236 25 2.31306 24.176 2.56446 23.3518C3.09993 21.5961 4.12173 20.3532 5.80144 19.6241Z"
          fill="#191f23"
        />
        <path
          d="M18.5231 17.5455C18.0056 17.5776 17.9752 18.2729 18.4507 18.4796C19.7537 19.0463 20.7349 19.8804 21.4385 20.945C22.0159 21.8186 22.9125 22.5 23.9596 22.5H26.1854C27.0694 22.5 27.7144 21.6216 27.4034 20.7635C27.3855 20.7141 27.3669 20.6651 27.3476 20.6165C26.9196 19.5358 26.186 18.7401 25.0997 18.233C24.0799 17.7569 22.8031 17.5604 21.299 17.501L21.2742 17.5H21.2496C20.3636 17.5 19.4382 17.4886 18.5231 17.5455Z"
          fill="#191f23"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_1796">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const Group = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 49 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.8238 26.9062C42.2856 28.2544 43.6919 30.6562 43.5156 33.0581C43.3975 34.5225 43.3394 34.5825 41.4644 34.8169C40.2925 34.9931 32.9087 35.0512 25.2925 35.0512C16.6788 35.0512 7.65625 34.875 7.01125 34.6987C4.43312 34.0537 5.83937 29.3662 9.23875 27.1406C11.875 25.4419 17.2656 22.8637 18.7319 22.5694C20.725 22.1587 20.9594 20.9287 18.7319 16.9444C18.205 16.065 17.6181 13.3706 17.56 10.5581C17.5019 5.98686 18.3813 2.88186 22.3656 1.35936C23.1869 1.06686 24.0063 0.94873 24.7675 0.94873C27.4038 0.94873 29.8656 2.41311 30.8613 4.58248C32.3256 7.45311 31.7406 15.1294 30.2162 17.8837C28.4575 20.9887 28.6338 21.9862 30.5688 22.5131C31.8588 22.8656 35.8431 24.7406 39.8275 26.9081L39.8238 26.9062ZM7.94875 25.1494C7.01125 25.7944 6.13187 26.6137 5.42875 27.435C3.20125 27.435 1.5025 27.3769 1.32625 27.3169C-0.138125 26.9644 0.68125 24.27 2.61625 23.0981C4.08063 22.1606 7.06937 20.6962 7.89062 20.52C8.94625 20.2856 9.18062 19.6406 7.89062 17.415C7.59812 16.9462 7.24562 15.4219 7.24562 13.8412C7.1875 11.2631 7.71437 9.50436 9.94187 8.74311C11.8169 8.03998 13.9262 8.91936 14.6875 10.5019C15.4487 12.1425 15.04 16.3612 14.2187 17.8856C13.2812 19.7025 13.4575 20.1712 14.5113 20.4637C14.7456 20.5219 15.2144 20.7562 15.8594 21.0506C13.2812 22.1062 9.76562 24.0394 7.94875 25.1531V25.1494ZM46.5044 22.9219C47.9106 23.6831 48.6719 24.9731 48.5556 26.3212C48.4975 27.1425 48.4975 27.2006 47.4419 27.3169C47.1494 27.375 45.8013 27.435 44.0425 27.435C43.2813 26.4394 42.2256 25.5019 40.9375 24.8569C38.5356 23.4506 35.605 21.9262 33.4375 20.9887C34.0244 20.7544 34.5513 20.5781 34.7856 20.52C35.8994 20.2856 36.0756 19.6406 34.7856 17.415C34.5513 16.9462 34.1406 15.4219 34.1406 13.8412C34.0825 11.2631 34.5513 9.50436 36.7769 8.74311C38.71 8.03998 40.8194 8.91936 41.5225 10.5019C42.2838 12.1425 41.9913 16.3612 41.17 17.8856C40.2325 19.7025 40.3488 20.1712 41.3463 20.4637C42.0494 20.6981 44.2769 21.7537 46.5025 22.9256L46.5044 22.9219Z"
        fill="black"
      />
    </svg>
  );

  const Revenue = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11_1822)">
        <path
          d="M28.3771 5.02343V9.33593C28.3771 9.66745 28.2454 9.9854 28.011 10.2198C27.7766 10.4542 27.4586 10.5859 27.1271 10.5859H22.7521C22.5709 10.588 22.3914 10.5506 22.2261 10.4764C22.0608 10.4022 21.9136 10.293 21.7947 10.1562C21.6758 10.0195 21.588 9.85855 21.5375 9.68453C21.487 9.51051 21.4749 9.32759 21.5021 9.14843C21.5609 8.84521 21.7247 8.57242 21.9648 8.37808C22.2049 8.18374 22.5058 8.08029 22.8146 8.08593H24.2521C22.7962 6.46454 20.9007 5.3009 18.7959 4.73638C16.6911 4.17187 14.4677 4.23078 12.3958 4.90597C10.3239 5.58116 8.49271 6.84356 7.12468 8.53978C5.75665 10.236 4.91069 12.293 4.6896 14.4609C4.65851 14.7703 4.51321 15.057 4.28207 15.2651C4.05094 15.4731 3.75056 15.5875 3.4396 15.5859C3.26438 15.5868 3.09093 15.5508 2.93051 15.4804C2.77009 15.4099 2.62628 15.3064 2.50841 15.1768C2.39054 15.0471 2.30125 14.8941 2.24633 14.7278C2.1914 14.5614 2.17208 14.3853 2.1896 14.2109C2.45213 11.5866 3.46385 9.0932 5.10415 7.02794C6.74445 4.96268 8.94411 3.41274 11.4408 2.56293C13.9376 1.71312 16.626 1.59929 19.1857 2.23502C21.7453 2.87075 24.0681 4.22922 25.8771 6.14843V4.96093C25.875 4.77974 25.9124 4.60027 25.9866 4.43495C26.0608 4.26963 26.1701 4.12242 26.3068 4.00352C26.4435 3.88462 26.6045 3.79687 26.7785 3.74635C26.9525 3.69582 27.1354 3.68374 27.3146 3.71093C27.6178 3.76971 27.8906 3.93355 28.085 4.17362C28.2793 4.41369 28.3827 4.71461 28.3771 5.02343Z"
          fill="black"
        />
        <path
          d="M3.3771 26.1485V21.836C3.3771 21.5044 3.50879 21.1865 3.74321 20.9521C3.97763 20.7176 4.29558 20.586 4.6271 20.586H9.0021C9.18329 20.5839 9.36276 20.6213 9.52808 20.6955C9.6934 20.7697 9.84061 20.8789 9.95951 21.0157C10.0784 21.1524 10.1662 21.3133 10.2167 21.4874C10.2672 21.6614 10.2793 21.8443 10.2521 22.0235C10.1933 22.3267 10.0295 22.5995 9.78941 22.7938C9.54934 22.9881 9.24842 23.0916 8.9396 23.086H7.5021C8.95804 24.7073 10.8535 25.871 12.9583 26.4355C15.0631 27 17.2865 26.9411 19.3584 26.2659C21.4303 25.5907 23.2615 24.3283 24.6295 22.6321C25.9975 20.9359 26.8435 18.8789 27.0646 16.711C27.0957 16.4015 27.241 16.1148 27.4721 15.9068C27.7033 15.6988 28.0036 15.5844 28.3146 15.586C28.4898 15.5851 28.6633 15.621 28.8237 15.6915C28.9841 15.762 29.1279 15.8654 29.2458 15.9951C29.3637 16.1248 29.4529 16.2777 29.5079 16.4441C29.5628 16.6105 29.5821 16.7866 29.5646 16.961C29.3021 19.5853 28.2903 22.0787 26.65 24.1439C25.0097 26.2092 22.8101 27.7591 20.3134 28.609C17.8166 29.4588 15.1282 29.5726 12.5685 28.9369C10.0089 28.3011 7.68609 26.9427 5.8771 25.0235V26.211C5.87915 26.3921 5.84178 26.5716 5.76759 26.7369C5.69339 26.9023 5.58414 27.0495 5.4474 27.1684C5.31066 27.2873 5.14971 27.375 4.97569 27.4255C4.80167 27.4761 4.61875 27.4881 4.4396 27.461C4.13637 27.4022 3.86359 27.2383 3.66924 26.9983C3.4749 26.7582 3.37145 26.4573 3.3771 26.1485Z"
          fill="black"
        />
        <path
          d="M16.3146 14.3359C14.1271 13.8984 14.1271 13.5234 14.1271 13.2109C14.1271 12.8984 14.2521 12.8359 14.4396 12.6484C14.7844 12.4631 15.1737 12.3766 15.5646 12.3984C16.2908 12.3921 17.0046 12.5868 17.6271 12.9609C17.7536 13.0642 17.9011 13.1387 18.0593 13.1792C18.2175 13.2197 18.3826 13.2253 18.5432 13.1955C18.7038 13.1658 18.856 13.1014 18.9892 13.007C19.1224 12.9125 19.2334 12.7901 19.3146 12.6484C19.4217 12.5206 19.5007 12.3717 19.5465 12.2113C19.5922 12.051 19.6037 11.8827 19.5801 11.7177C19.5565 11.5526 19.4984 11.3943 19.4096 11.2531C19.3208 11.112 19.2032 10.9911 19.0646 10.8984C18.4703 10.5316 17.8135 10.2774 17.1271 10.1484V8.71094C17.1271 8.37942 16.9954 8.06147 16.761 7.82705C16.5266 7.59263 16.2086 7.46094 15.8771 7.46094C15.5456 7.46094 15.2276 7.59263 14.9932 7.82705C14.7588 8.06147 14.6271 8.37942 14.6271 8.71094V10.0859C12.7521 10.3984 11.5021 11.6484 11.5021 13.3359C11.5021 15.0234 13.5646 16.3984 15.5646 16.7734C17.5646 17.1484 17.6271 17.5859 17.6271 17.8984C17.6271 18.2109 16.9396 18.7734 16.0646 18.7734C15.1443 18.7916 14.2438 18.506 13.5021 17.9609C13.3632 17.8686 13.2073 17.805 13.0434 17.7738C12.8796 17.7427 12.7111 17.7446 12.5481 17.7796C12.385 17.8145 12.2305 17.8817 12.0938 17.9773C11.9571 18.0728 11.8409 18.1948 11.7521 18.3359C11.6535 18.4532 11.58 18.5893 11.5359 18.7359C11.4918 18.8826 11.4781 19.0367 11.4956 19.1888C11.5132 19.341 11.5616 19.4879 11.6379 19.6207C11.7143 19.7535 11.8169 19.8692 11.9396 19.9609C12.7438 20.5253 13.6606 20.9091 14.6271 21.0859V22.4609C14.6271 22.7925 14.7588 23.1104 14.9932 23.3448C15.2276 23.5792 15.5456 23.7109 15.8771 23.7109C16.2086 23.7109 16.5266 23.5792 16.761 23.3448C16.9954 23.1104 17.1271 22.7925 17.1271 22.4609V21.0859C17.8127 20.9848 18.4595 20.7046 19.0021 20.2734C19.3939 19.9858 19.7116 19.6091 19.9289 19.1744C20.1463 18.7396 20.2571 18.2594 20.2521 17.7734C20.2521 15.4609 18.1271 14.7109 16.3146 14.3359Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_1822">
          <rect
            width="30"
            height="30"
            fill="white"
            transform="translate(0.877106 0.585938)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const [loading, setloading] = useState(false);
  const [Dashcount, setDashcount] = useState();
  console.log("🚀 ~ Dashcount:", Dashcount);
  const Dashboardcount = async () => {
    setloading(true);
    try {
      const Response = await axios.get("dashboard/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MyToken}`,
        },
      });
      // console.log("🚀 ~ Response:", Response)
      setDashcount(Response.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  useEffect(() => {
    Dashboardcount();
  }, []);
  const cardItems = [
    {
      icon: FaUsers,
      name: "Total Users ",
      link: "/Home/Userlist",
      count: Dashcount?.TotalUser,
    },
    {
      icon: MdArticle,
      name: "Total Post",
      link: "/Home/Postlist",
      count: Dashcount?.PostCount,
    },
    {
      icon: AiOutlinePlayCircle,
      name: "Play Count",
      link: "/Home/Userlist",
      count: Dashcount?.PlayCount,
    },
    {
      icon: FaPoll,
      name: "Poll Count",
      link: "/Home/Userlist",
      count: Dashcount?.PollCount,
    },
  ];

  class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [
          {
            name: "Month wise user",
            data: [11, 22, 33, 44, 55, 66, 55, 44, 33, 22, 11, 0],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded",
            },
          },
          colors: ["#003354", "#6fc6ff"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yaxis: {
            title: {
              text: "Month Wise User Registered",
            },
          },
          fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal", // Choose 'vertical' if you want a top-to-bottom gradient
              shadeIntensity: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: "#003354",

                  opacity: 1,
                },
                {
                  offset: 50,
                  color: "#6fc6ff",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#003354",

                  opacity: 1,
                },
              ],
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [0, 50, 100],
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val;
              },
            },
          },
        },
      };
    }

    render() {
      return (
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
      );
    }
  }

  class ApexpeiChart extends React.Component {
    constructor(props) {
      super(props);

      // Splitting each main segment into three smaller segments with different shades
      this.state = {
        series: [24, 8],
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          colors: [
            // Defining a smooth transition of colors for each split segment

            "#003354",
            "#6fc6ff", // Simulated gradient for iOS
          ],
          labels: ["Android ", "iOS"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          legend: {
            formatter: function (val, opts) {
              // Handling legend labels to group them back to original categories
              return val.includes("Android") ? "Android" : "iOS";
            },
          },
        },
      };
    }

    render() {
      return (
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            width={380}
          />
        </div>
      );
    }
  }
  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="main_des_div">
            <div className="card_div">
              {cardItems.map((item, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={() => navigate(item.link)}
                  >
                    <div className="image">
                      <span>{<item.icon />}</span>
                    </div>
                    <div className="card-info">
                      <span>{item.count}</span>
                      {/* <span>05</span> */}
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="Des_heading_text">
              <h2>User Data</h2>
            </div>
            <div className="main_chat">
              <div className="month_wise_chat">
                <ApexChart />
              </div>
              <div className="paichat">
                <ApexpeiChart />
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
            }}
            open={true}
          >
            <Loader />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Index;
