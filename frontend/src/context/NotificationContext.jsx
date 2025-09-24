import { createContext, useState, useContext, useMemo } from "react";

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const markAsRead = () => {
    setHasNewNotification(false);
  };

  const receiveNewNotification = () => {
    setHasNewNotification(true);
  };

  const notify = useMemo(
    () => ({ hasNewNotification, markAsRead, receiveNewNotification }),
    [hasNewNotification]
  );

  return (
    <NotificationContext.Provider value={notify}>
      {children}
    </NotificationContext.Provider>
  );
};
