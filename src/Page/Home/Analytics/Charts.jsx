import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

export const ApexChart = ({ mode, selectedYear, selectedMonth }) => {
  const now = dayjs();

  const getMonthlyData = () => {
    const categories = Array.from({ length: 12 }, (_, i) =>
      dayjs().month(i).format("MMM")
    );
    const data = categories.map(() => Math.floor(Math.random() * 100)); // Dummy data
    return { categories, data };
  };

  const getDailyData = () => {
    const date = dayjs().year(selectedYear).month(selectedMonth);
    const daysInMonth = date.daysInMonth();
    const categories = Array.from(
      { length: daysInMonth },
      (_, i) => `${i + 1}`
    );
    const data = categories.map(() => Math.floor(Math.random() * 100)); // Dummy data
    return { categories, data };
  };

  const { categories, data } =
    mode === "daily" ? getDailyData() : getMonthlyData();

  const state = {
    series: [
      {
        name: "Users",
        data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      title: {
        text: `User Trends (${mode === "daily" ? "Daily" : "Monthly"})`,
        align: "left",
      },
      xaxis: {
        categories,
        title: {
          text: mode === "daily" ? "Date" : "Month",
          style: { fontSize: "14px", fontWeight: 600 },
        },
      },
      yaxis: {
        title: {
          text: "Users",
          style: { fontSize: "14px", fontWeight: 600 },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export const EngagementTable = ({ mode, year, month }) => {
  const now = dayjs().year(year).month(month);
  const daysInMonth = now.daysInMonth();

  const generateRandomData = (length) =>
    Array.from({ length }, () => Math.floor(Math.random() * 1000));

  const likes = generateRandomData(mode === "daily" ? daysInMonth : 1);
  const comments = generateRandomData(mode === "daily" ? daysInMonth : 1);
  const shares = generateRandomData(mode === "daily" ? daysInMonth : 1);
  const avgTimeSpent = generateRandomData(mode === "daily" ? daysInMonth : 1);

  return (
    <div className="engagement_table_container">
      <div className="engagement_table_wrapper">
        <table className="engagement_table">
          <thead>
            <tr>
              {mode === "daily" ? (
                <>
                  <th className="TH_tag">Date</th>
                  <th className="TH_tag">Likes</th>
                  <th className="TH_tag">Comments</th>
                  <th className="TH_tag">Shares</th>
                  <th className="TH_tag">Duration (min)</th>
                </>
              ) : (
                <>
                  <th>Metric</th>
                  <th>Total Count</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {mode === "daily" ? (
              likes.map((_, index) => (
                <tr key={index}>
                  <td>
                    {index + 1} {dayjs().month(month).format("MMM")} {year}
                  </td>
                  <td>{likes[index]}</td>
                  <td>{comments[index]}</td>
                  <td>{shares[index]}</td>
                  <td>{avgTimeSpent[index]}</td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td>Likes</td>
                  <td>{likes[0]}</td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td>{comments[0]}</td>
                </tr>
                <tr>
                  <td>Shares</td>
                  <td>{shares[0]}</td>
                </tr>
                <tr>
                  <td>Duration (min)</td>
                  <td>{avgTimeSpent[0]}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AgeDistributionChart = () => {
  // Replace these dummy counts with your real data
  const ageCounts = [
    75, // 10–17
    120, // 18–20
    200, // 21–25
    150, // 25–30
    90, // 30–35
    60, // 35–40
  ];

  const state = {
    series: ageCounts,
    options: {
      chart: {
        width: "100%",
        height: "100%",
        type: "pie",
      },
      labels: ["10–17", "18–20", "21–25", "25–30", "30–35", "35–40"],
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const bucket = opts.w.globals.labels[opts.seriesIndex];
          return [`${bucket}`, `${val.toFixed(1)}%`];
        },
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
      />
    </div>
  );
};

// Utility to shuffle usernames predictably based on seed
const seededpostShuffle = (array, seed) => {
  let result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seed % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
    seed = (seed * 9301 + 49297) % 233280;
  }
  return result;
};

export const generateTrendingPosts = (mode, year, month) => {
  const usernames = [
    "sunny_dev",
    "techqueen",
    "aesthetic_life",
    "john_the_don",
    "photo_maniac",
    "fitness_guru",
    "daily_doodles",
    "meme_machine",
    "nomad_travels",
    "coder_beast",
  ];

  // Generate a numeric seed from mode, year, month
  const seed = `${mode}-${year}-${month}`
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const shuffledUsernames = seededpostShuffle(usernames, seed);

  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/seed/post${mode}-${year}-${month}-${i}/100/100`,
    username: shuffledUsernames[i % shuffledUsernames.length],
    likes: Math.floor(Math.random() * 1500 + 300),
    comments: Math.floor(Math.random() * 500 + 80),
    shares: Math.floor(Math.random() * 200 + 30),
  }));
};

export const TrendingPostsTable = ({ mode, year, month }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const data = generateTrendingPosts(mode, year, month);
    setTrendingPosts(data);
  }, [mode, year, month]);

  return (
    <div className="engagement_table_container">
      <div className="engagement_table_wrapper">
        <table className="engagement_table">
          <thead>
            <tr>
              <th className="TH_tag" style={{ textAlign: "center" }}>
                #
              </th>
              <th className="TH_tag">Post</th>
              <th className="TH_tag">Username</th>
              <th className="TH_tag">Likes</th>
              <th className="TH_tag">Comments</th>
              <th className="TH_tag">Shares</th>
            </tr>
          </thead>
          <tbody>
            {trendingPosts.map((post, index) => (
              <tr key={post.id}>
                <td className="TD_index">#{index + 1}</td>
                <td>
                  <img
                    src={post.image}
                    alt={`Post ${index + 1}`}
                    className="post-thumbnail"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{post.username}</td>
                <td>{post.likes}</td>
                <td>{post.comments}</td>
                <td>{post.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Seeded shuffle utility to get consistent shuffling for same inputs
const seededShuffle = (array, seed) => {
  let result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seed % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
    seed = (seed * 9301 + 49297) % 233280;
  }
  return result;
};

export const generateTrendingStories = (mode, year, month) => {
  const usernames = [
    "sunny_dev",
    "techqueen",
    "aesthetic_life",
    "john_the_don",
    "photo_maniac",
    "fitness_guru",
    "daily_doodles",
    "meme_machine",
    "nomad_travels",
    "coder_beast",
  ];

  // Generate a simple numeric seed based on mode, year, and month
  const seed = `${mode}-${year}-${month}`
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const shuffledUsernames = seededShuffle(usernames, seed);

  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/seed/story${mode}-${year}-${month}-${i}/100/100`,
    username: shuffledUsernames[i % shuffledUsernames.length],
    views: Math.floor(Math.random() * 3000 + 500),
    replies: Math.floor(Math.random() * 300 + 50),
  }));
};

export const TrendingStoriesTable = ({ mode, year, month }) => {
  const [trendingStories, setTrendingStories] = useState([]);

  useEffect(() => {
    const data = generateTrendingStories(mode, year, month);
    setTrendingStories(data);
  }, [mode, year, month]);

  return (
    <div className="engagement_table_container">
      <div className="engagement_table_wrapper">
        <table className="engagement_table">
          <thead>
            <tr>
              <th className="TH_tag" style={{ textAlign: "center" }}>
                #
              </th>
              <th className="TH_tag">Story</th>
              <th className="TH_tag">Username</th>
              <th className="TH_tag">Views</th>
              <th className="TH_tag">Replies</th>
            </tr>
          </thead>
          <tbody>
            {trendingStories.map((story, index) => (
              <tr key={story.id}>
                <td className="TD_index">#{index + 1}</td>
                <td>
                  <img
                    src={story.image}
                    alt={`Story ${index + 1}`}
                    className="post-thumbnail"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{story.username}</td>
                <td>{story.views}</td>
                <td>{story.replies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Utility to shuffle usernames predictably based on seed
const seededUserShuffle = (array, seed) => {
  let result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seed % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
    seed = (seed * 9301 + 49297) % 233280;
  }
  return result;
};

// Generate trending users with profile pics and followers
export const generateTrendingUsers = (mode, year, month) => {
  const usernames = [
    "sunny_dev",
    "techqueen",
    "aesthetic_life",
    "john_the_don",
    "photo_maniac",
    "fitness_guru",
    "daily_doodles",
    "meme_machine",
    "nomad_travels",
    "coder_beast",
  ];

  const seed = `${mode}-${year}-${month}`
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const shuffled = seededUserShuffle(usernames, seed);

  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: shuffled[i % shuffled.length],
    profilePic: `https://i.pravatar.cc/100?u=${shuffled[i]}`,
    followers: Math.floor(Math.random() * 10000 + 500),
  }));
};

// Component to render trending users
export const TrendingUsersTable = ({ mode, year, month }) => {
  const [trendingUsers, setTrendingUsers] = useState([]);

  useEffect(() => {
    const data = generateTrendingUsers(mode, year, month);
    setTrendingUsers(data);
  }, [mode, year, month]);

  return (
    <div className="engagement_table_container">
      <div className="engagement_table_wrapper">
        <table className="engagement_table">
          <thead>
            <tr>
              <th className="TH_tag TH_index">#</th>
              <th className="TH_tag">Profile</th>
              <th className="TH_tag">Username</th>
              <th className="TH_tag">Followers</th>
            </tr>
          </thead>
          <tbody>
            {trendingUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="TD_index">#{index + 1}</td>
                <td>
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="profile-thumbnail"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.followers.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
