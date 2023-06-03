import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import "./location.css";
import {BiCurrentLocation} from 'react-icons/bi'


const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchMembersByLocation();
  }, []);

  const fetchMembersByLocation = async () => {
    try {
      const response = await axios.get("member/getMemberLocations"); 
      setMembers(response.data);
      calculateProgress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateProgress = (members) => {
    const totalCount = members.reduce((total, member) => total + member.count, 0);
    const progressData = members.map((member) => ({
      location: member.location,
      count: member.count,
      progress: (member.count / totalCount) * 100,
    }));
    setProgress(progressData);
  };

  return (
    <div className="cardLocation">
    <div className="titleLocation">
      <BiCurrentLocation className="cardDashIcon" />
      <h3>Member Locations</h3>
    </div>
    <div className="titleLine"></div>
      {progress.map((item, index) => (
        <div key={index}>
          <div className="card-header">
            <p>{item.location}</p>
          </div>
          <div className="card-body">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${item.progress}%` }}>
                <p className="progress-label">{item.progress.toFixed(0)}%</p>
              </div>
            </div>
            <p className="total-members">{item.count} Members</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
