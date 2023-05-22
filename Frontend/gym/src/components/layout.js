import React, { useState, createContext } from 'react';
import Header from './header/header';
import SideBar from './sidebar/sidebar';
import '../App.css';

export const Url = createContext();

function Layout({ children, isSidebarClosed }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className={`App ${expanded ? 'expanded' : ''}`}>
      <Url.Provider value={{ expanded, setExpanded }}>
        <SideBar isSidebarClosed={isSidebarClosed} />

        <div className={`right_side ${isSidebarClosed ? 'closed-sidebar' : ''}`}>
          <div className="HeigthofPage">
            <div className="Header">
              <Header />
            </div>
            {children}
          </div>
        </div>
      </Url.Provider>
    </main>
  );
}

export default Layout;
