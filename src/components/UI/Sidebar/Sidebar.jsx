import React, { useState, useRef, useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobalContext";
import "./sidebar.css";
// import logo from "../../../Assets/Logo.png";
// import logo from "../../../Assets/Logo2.png";
import logo from "../../../Assets/bgLogo.png";
import mobile_logo from "../../../Assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { MdNoAccounts } from "react-icons/md";
import {
  MdOutlinePostAdd,
  MdReportProblem,
  MdNotificationsNone,
  MdOutlineWeb,
} from "react-icons/md";
import { FaHashtag, FaBullhorn } from "react-icons/fa";
import { AiOutlinePieChart, AiOutlineMail } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt1 } from "react-icons/hi";
import { TfiVideoClapper } from "react-icons/tfi";
import { IoIosImages } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

const menuItems = [
  {
    name: "Dashboard",
    icon: <RiDashboardHorizontalFill />,
    link: "/Home/Dashboard",
  },
  {
    name: "User Management",
    icon: <FaUserCog />,
    items: [
      {
        name: "User Lists",
        link: "/Home/Userlist",
        icon: <FaUsers />,
      },
      {
        name: "Blue-Tick Verification",
        link: "/Home/Blue-Tick-Verification",
        icon: <FaUserCheck />,
      },
      {
        name: "Banned Users",
        link: "/Home/BanUsers",
        icon: <FaUserSlash />,
      },
      {
        name: "User Authentication",
        link: "/Home/UserAuthentication",
        icon: <FaUserLock />,
      },
      {
        name: "Bot & Fake Account",
        link: "/Home/FakeBotAccount",
        icon: <MdNoAccounts />,
      },
    ],
  },
  {
    name: "Post Management",
    icon: <MdOutlinePostAdd />,
    items: [
      {
        name: "Post Lists",
        link: "/Home/Postlist",
        icon: <IoIosImages />,
      },
      {
        name: "Play Lists",
        link: "/Home/Playlist",
        icon: <TfiVideoClapper />,
      },
      {
        name: "Reported Post",
        link: "/Home/ReportedPost",
        icon: <MdReportProblem />,
      },
    ],
  },
  {
    name: "Hashtag",
    link: "/Home/Hastag",
    icon: <FaHashtag />,
  },
  {
    name: "Business Category",
    link: "/Home/BusinessCategory",
    icon: <FaBriefcase />,
  },
  {
    name: "Sections",
    link: "/Home/Sections",
    icon: <FaList />,
  },
  {
    name: "Analytics",
    link: "/Home/Analytics",
    icon: <AiOutlinePieChart />,
  },
  {
    name: "Support",
    link: "/Home/Supports",
    icon: <BiSupport />,
  },
  {
    name: "Notifications",
    link: "/Home/SendNotification",
    icon: <MdNotificationsNone />,
  },
  {
    name: "Mail",
    link: "/Home/Mail",
    icon: <AiOutlineMail />,
  },
  {
    name: "Ads controller",
    link: "/",
    icon: <FaBullhorn />,
    newTab: true,
  },
  {
    name: "CMS",
    icon: <MdOutlineWeb />,
    items: [
      {
        name: "Faq's",
        link: "/Home/Faqs",
        icon: <MdOutlineQuestionAnswer />,
      },
      {
        name: "Terms & Condition",
        link: "/Home/Trems&Condition",
        icon: <GiNotebook />,
      },
      {
        name: "Privacy Policy",
        link: "/Home/PrivacyPolicy",
        icon: <RiLockPasswordLine />,
      },
    ],
  },
];

const Icon = ({ icon }) => {
  return <span className="sidebar-icon">{icon}</span>;
};

const NavHeader = ({ toggleSidebar, isOpen }) => (
  <header className="sidebar-header">
    <button type="button" onClick={toggleSidebar}>
      <HiMenuAlt1 />
    </button>

    {/* {isOpen && <img src={logo} alt="" className="main_logo_img" />} */}
    {isOpen && <span className="main_logo_img"></span>}
    {isOpen && <img className="main_logo_img" src={logo} />}

    <img src={mobile_logo} alt="" className="mobile_view_logo" />
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav, isOpen }) => (
  <button
    type="Link"
    onClick={() => onClick(name)}
    className={`nav-button ${isActive ? "active" : ""} ${
      hasSubNav && !isOpen ? "hasSubNav-closed" : ""
    }`}
  >
    {icon && <Icon icon={icon} />}
    <span style={{ display: isOpen ? null : "none" }}>{name}</span>
    {hasSubNav && isOpen && <IoIosArrowDown />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick, selectedItem, isOpen }) => {
  const navRef = useRef(null);
  const [subNavOpen, setSubNavOpen] = useState(false);

  useEffect(() => {
    if (
      selectedItem === item.name ||
      item.items.some((subItem) => subItem.name === activeItem)
    ) {
      setSubNavOpen(true);
    }
  }, [activeItem, item.items, selectedItem]);

  return (
    <div
      className={`sub-nav ${subNavOpen ? "open" : ""}`}
      style={{
        height: subNavOpen ? navRef.current?.clientHeight : 0,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item.items.map((subItem) => (
          <NavButton
            key={subItem.name}
            onClick={() => handleClick(subItem)}
            icon={subItem.icon}
            name={subItem.name}
            isActive={activeItem === subItem.name}
            isOpen={isOpen}
          />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, setIsOpen } = useContext(GlobalContext);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [activeItem, setActiveItem] = useState(menuItems[0].name);

  const [subActiveItem, setSubActive] = useState(menuItems[1].name);

  const [selectedItem, setSelectedItem] = useState(menuItems[0].name);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleMainItemClick = (item) => {
    if (item.items) {
      setOpenSubMenus((prevOpenSubMenus) => ({
        ...prevOpenSubMenus,
        [item.name]: !prevOpenSubMenus[item.name],
      }));
    }
    handleClick(item);
  };
  const navi = useNavigate();
  const handleClick = (item) => {
    if (item.newTab) {
      window.open(item.link, "_blank");
    } else {
      setActiveItem(item.name);
      setSelectedItem(item.name);
      setSubActive(item.name);
      navi(item.link);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const findActiveItem = (items) => {
      for (const item of items) {
        if (item.link && item.link === currentPath) {
          return item.name;
        }
        if (item.items) {
          const activeSubItem = findActiveItem(item.items);
          if (activeSubItem) {
            setOpenSubMenus((prevOpenSubMenus) => ({
              ...prevOpenSubMenus,
              [item.name]: true,
            }));
            return activeSubItem;
          }
        }
      }
      return null;
    };

    const activeItemName = findActiveItem(menuItems);
    if (activeItemName) {
      setActiveItem(activeItemName);
      setSelectedItem(activeItemName);
    }
  }, [location]);
  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <NavHeader toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <div className="main_item_div_of_sidebar">
          {menuItems.map((item) => (
            <div key={item.name} className="item_div_of_sidebar">
              <NavButton
                onClick={() => handleMainItemClick(item)}
                name={item.name}
                icon={item.icon}
                isActive={selectedItem === item.name}
                hasSubNav={!!item.items}
                isOpen={isOpen}
              />
              {item.items && openSubMenus[item.name] && (
                <SubMenu
                  item={item}
                  activeItem={activeItem}
                  handleClick={handleClick}
                  selectedItem={selectedItem}
                  isOpen={isOpen}
                />
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
