export const filterTypeSelected = (state) => state.notifications.get("filter");

export const getNotifications = (state) => state.notifications.get("notifications");

export const getUnreadNotificationsByType = (state) => {
  const notifications = state.notifications.get("notifications");
  const unread = notifications.filter((notification) => !notification.get("isRead"));
  return unread.valueSeq();
};
