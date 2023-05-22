import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import Image from '../../pages/login/img/gymLogo.png';
import { CgGym } from 'react-icons/cg';
import { RxDashboard } from 'react-icons/rx';
import {FaUsers} from 'react-icons/fa';
import { Url } from '../layout.js';
import {MdSportsGymnastics ,MdOutlineAttachMoney} from 'react-icons/md'
import {GiMasonJar} from 'react-icons/gi'

const Sidebar = () => {
  const location = useLocation();
  const { setExpanded } = useContext(Url);

  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [title, setTitle] = useState('');

  const handleArrowClick = (e) => {
    const arrowParent = e.target.closest('.arrow').parentElement.parentElement;
    arrowParent.classList.toggle('showMenu');
  };

  const activeStyle = {
    backgroundColor: '#393A3C',
    color: '#D3D4D5',
    borderRadius: '30px',
    width: '100%',
  };

  const handleSidebarToggle = () => {
    setSidebarClosed(!isSidebarClosed);
    setExpanded(!isSidebarClosed);
  };

  const listItems = [
    {
      id: 1,
      icon: <RxDashboard/>,
      name: 'Dashboard',
      link: '/Dashboard',
    },
    {
      id: 2,
      icon: <CgGym />,
      name: 'Coaches',
      subItems: [
        { id: 1, name: 'Coaches',link:'/Coaches' },
        { id: 2, name: 'Salary' },
      ],
    },
    {
      id: 3,
      icon: <FaUsers />,
      name: 'Members',
      subItems: [
        { id:1, name: 'Members' },
        { id: 2, name: 'MemberShip' },
        { id: 3, name: 'Payment' },
        { id: 4, name: 'Attendance' },
      ],
    },
    {
      id: 4,
      icon: <MdSportsGymnastics />,
      name: 'Programs',
      link: '/dashboard',

    },
    {
      id: 5,
      icon: <MdOutlineAttachMoney />,
      name: 'Finance',
      subItems: [
        { id:1, name: 'Income' },
        { id: 2, name: 'Debt' },
        { id: 3, name: 'Expense' },
      ],
    },
    {
      id: 4,
      icon: <GiMasonJar/>,
      name: 'Supplement',
      link: '/Dashboard',

    },
  ];

  const isLinkActive = (link) => {
    return location.pathname === link;
  };

  return (
    <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`} style={{ maxWidth: '1438px' }}>
      <div className="hamburger-menu" onClick={handleSidebarToggle}>
        <i className={`bx ${isSidebarClosed ? 'bx-menu' : 'bx-x'}`}></i>
      </div>
      <div className="logo-details">
        {isSidebarClosed ? (
          <span className="title">O<sub>2</sub>xygen</span>
        ) : (
          <img src={Image} alt="Image" />
        )}
      </div>
      <ul className="nav-links">
        {listItems.map((item) => (
          <li key={item.id} className={isLinkActive(item.link) ? 'active' : ''}>
            {item.link ? (
              <Link to={item.link} onClick={() => setTitle(item.name)}>
<i className="icon-class">{item.icon}</i>
                <span className="link_name">{item.name}</span>
              </Link>
            ) : (
              <div className="icon-link">
                <a href="#">
                <i className="icon-class">{item.icon}</i>
                  <span className="link_name">{item.name}</span>
                </a>
                <i className="bx bxs-chevron-down arrow" onClick={handleArrowClick}></i>
              </div>
            )}
            {item.subItems && (
              <ul className="sub-menu">
                {item.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <Link to={subItem.link}>
                      <span>{subItem.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
