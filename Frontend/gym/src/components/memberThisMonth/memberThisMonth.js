import React, { useState, useEffect } from 'react';
import axios from '../../api/axios.js';

const MembershipsThisMonth = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await axios.get('membership/totalMember');
        const count = response.data.count;
        setMemberCount(count);
      } catch (error) {
        console.error('Failed to fetch member count:', error.response.data.message);
        setError('Failed to fetch member count. Please try again.');
      }
    };

    fetchMemberCount();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h4 className='finance-details'>Total members for this month:<span className='sub-detail'>${memberCount}</span> </h4>

    </div>
  );
};

export default MembershipsThisMonth;
