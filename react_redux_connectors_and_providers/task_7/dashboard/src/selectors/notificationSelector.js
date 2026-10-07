export const filterTypeSelected = (state) => state.notifications.get("filter");

export const getNotifications = (state) => state.notifications.get("notifications");

export const getUnreadNotifications = (state) => {
  const notifications = state.notifications.get("notifications");
  return notifications.filter((notification) => !notification.get("isRead"));
};
