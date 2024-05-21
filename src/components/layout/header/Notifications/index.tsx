import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoNotifications } from 'react-icons/io5';
import NotificationModal from './NotificationModal';
import api from '../../../../api';

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [notificationData, setNotificationData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await api.get('/api/notification');
        setNotificationData(response.data.data.notificationResponseDtos);
        if (response.data.data.count > 0) {
          setHasNewNotifications(true); // Assuming the data indicates new notifications
        }
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchNotificationData();
  }, []);

  const handleNotificationClick = () => {
    setIsModalOpen(true);
    setHasNewNotifications(false); // After opening modal, reset the new notifications flag
  };

  return (
    <>
      <Noti onClick={handleNotificationClick}>
        <IoNotifications />
        {hasNewNotifications && <NewNotificationDot />}
      </Noti>
      {isModalOpen && (
        <NotificationModal
          onClose={() => setIsModalOpen(false)}
          notificationData={notificationData}
        />
      )}
    </>
  );
};

// Styled components
const Noti = styled.div`
  position: relative;
`;

const NewNotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;

export default Notification;
