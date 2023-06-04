import React, { useState, useEffect } from 'react';
import axios from '../../api/axios.js';
import './receiveMsg.css'
const MembersWhoReceivedMessage = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);
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

  // Calculate index of the last member on the current page
  const indexOfLastMember = currentPage * membersPerPage;
  // Calculate index of the first member on the current page
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  // Get the current page of members
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  // Change page
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
              <ul className="pagination">
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
