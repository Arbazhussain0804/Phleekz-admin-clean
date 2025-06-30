import React, { useState } from "react";
import "./Analytics.css";
import ReactApexChart from "react-apexcharts";
import {
  AgeDistributionChart,
  ApexChart,
  EngagementTable,
  TrendingPostsTable,
  TrendingStoriesTable,
  TrendingUsersTable,
} from "./Charts";
import dayjs from "dayjs";

const Analytics = () => {
  const [mode, setMode] = useState("monthly");

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [mode2, setMode2] = useState("monthly");
  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const [selectedMonth2, setSelectedMonth2] = useState(currentMonth);
  const [mode3, setMode3] = useState("monthly");
  const [selectedYear3, setSelectedYear3] = useState(currentYear);
  const [selectedMonth3, setSelectedMonth3] = useState(currentMonth);
  const [mode4, setMode4] = useState("monthly");
  const [selectedYear4, setSelectedYear4] = useState(currentYear);
  const [selectedMonth4, setSelectedMonth4] = useState(currentMonth);
  const [mode5, setMode5] = useState("monthly");
  const [selectedYear5, setSelectedYear5] = useState(currentYear);
  const [selectedMonth5, setSelectedMonth5] = useState(currentMonth);

  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const monthOptions = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );

  return (
    <div className="All-Conatinor-perfect-divv">
      <div className="All-Containor-perfect-second-divv">
        <div className="heading_div_of_notification">
          <h1>Analytics</h1>
        </div>
        <div className="Analytics_main_div">
          <div className="first_div_of_Analytics_data">
            <div className="Analytics_box_1">
              <div className="Analytics_box_1_heading_div">
                <h2>User Data</h2>
                <div className="analytics_filters">
                  <div className="analytics_dropdown_div">
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="analytics-dropdown"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="analytics-dropdown"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {mode === "daily" && (
                    <div className="analytics_dropdown_div">
                      <select
                        value={selectedMonth}
                        onChange={(e) =>
                          setSelectedMonth(Number(e.target.value))
                        }
                        className="analytics-dropdown"
                      >
                        {monthOptions.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <ApexChart
                mode={mode}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
              />
            </div>
            <div className="Analytics_box_2">
              <div className="Analytics_box_2_heading_div">
                <h2>Engagement Analytics</h2>
                <div className="analytics_filters">
                  <div className="analytics_dropdown_div">
                    <select
                      value={mode2}
                      onChange={(e) => setMode2(e.target.value)}
                      className="analytics-dropdown"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>

                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedYear2}
                      onChange={(e) => setSelectedYear2(Number(e.target.value))}
                      className="analytics-dropdown"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedMonth2}
                      onChange={(e) =>
                        setSelectedMonth2(Number(e.target.value))
                      }
                      className="analytics-dropdown"
                    >
                      {monthOptions.map((month, index) => (
                        <option key={index} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <EngagementTable
                mode={mode2}
                year={selectedYear2}
                month={selectedMonth2}
              />
            </div>
          </div>
          <div className="second_div_of_Analytics_data">
            <div className="Analytics_box_3">
              <div className="Analytics_box_3_heading_div">
                <h2>Age Distribution</h2>
              </div>
              <AgeDistributionChart />
            </div>
            <div className="Analytics_box_4">
              <div className="Analytics_box_4_heading_div">
                <h2>
                  <h2>Trending Post</h2>
                </h2>
                <div className="analytics_filters">
                  {/* Mode selection: Monthly or Daily */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={mode3}
                      onChange={(e) => setMode3(e.target.value)}
                      className="analytics-dropdown"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {/* Always show year dropdown */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedYear3}
                      onChange={(e) => setSelectedYear3(Number(e.target.value))}
                      className="analytics-dropdown"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditionally show month dropdown if mode is "monthly" */}
                  {mode3 === "monthly" && (
                    <div className="analytics_dropdown_div">
                      <select
                        value={selectedMonth3}
                        onChange={(e) =>
                          setSelectedMonth3(Number(e.target.value))
                        }
                        className="analytics-dropdown"
                      >
                        {monthOptions.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <TrendingPostsTable
                mode={mode3}
                year={selectedYear3}
                month={selectedMonth3}
              />
            </div>
          </div>
          <div className="first_div_of_Analytics_data">
            <div className="Analytics_box_5">
              <div className="Analytics_box_4_heading_div">
                <h2>Trending Stories</h2>
                <div className="analytics_filters">
                  {/* Mode selection: Monthly or Daily */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={mode4}
                      onChange={(e) => setMode4(e.target.value)}
                      className="analytics-dropdown"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {/* Always show year dropdown */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedYear4}
                      onChange={(e) => setSelectedYear4(Number(e.target.value))}
                      className="analytics-dropdown"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditionally show month dropdown if mode is "monthly" */}
                  {mode4 === "monthly" && (
                    <div className="analytics_dropdown_div">
                      <select
                        value={selectedMonth4}
                        onChange={(e) =>
                          setSelectedMonth4(Number(e.target.value))
                        }
                        className="analytics-dropdown"
                      >
                        {monthOptions.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <TrendingStoriesTable
                mode={mode4}
                year={selectedYear4}
                month={selectedMonth4}
              />
            </div>

            <div className="Analytics_box_6">
              <div className="Analytics_box_2_heading_div">
                <h2>Trending Influencers</h2>
                <div className="analytics_filters">
                  {/* Mode selection: Monthly or Daily */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={mode5}
                      onChange={(e) => setMode5(e.target.value)}
                      className="analytics-dropdown"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {/* Always show year dropdown */}
                  <div className="analytics_dropdown_div">
                    <select
                      value={selectedYear5}
                      onChange={(e) => setSelectedYear5(Number(e.target.value))}
                      className="analytics-dropdown"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditionally show month dropdown if mode is "monthly" */}
                  {mode5 === "monthly" && (
                    <div className="analytics_dropdown_div">
                      <select
                        value={selectedMonth5}
                        onChange={(e) =>
                          setSelectedMonth5(Number(e.target.value))
                        }
                        className="analytics-dropdown"
                      >
                        {monthOptions.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <TrendingUsersTable
                mode={mode5}
                year={selectedYear5}
                month={selectedMonth5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
