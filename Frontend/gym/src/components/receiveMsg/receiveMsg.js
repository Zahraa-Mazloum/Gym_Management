import React, { useState, useEffect } from 'react';
import axios from '../../api/axios.js';
import './receiveMsg.css';

const MembersWhoReceivedMessage = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(3); // Change the value to 3
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('membership/receiveMsg');
        setMembers(response.data.members);
      } catch (error) {
        console.error('Failed to fetch members:', error.response.data.message);
        setError('Failed to fetch members. Please try again.');
      }
    };

    fetchMembers();
  }, []);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {error && <p>{error}</p>}
      {members.length === 0 ? (
        <p>No members have received the message yet.</p>
      ) : (
        <>
          <ul>
            {currentMembers.map((membership) => (
              <li key={membership._id}>
                {membership.member.first_name} {membership.member.middle_name} {membership.member.last_name}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <nav>
              <ul className="pagination" style={{ flexDirection: 'row' }}>
                {Array.from({ length: Math.ceil(members.length / membersPerPage) }, (_, index) => (
                  <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MembersWhoReceivedMessage;
