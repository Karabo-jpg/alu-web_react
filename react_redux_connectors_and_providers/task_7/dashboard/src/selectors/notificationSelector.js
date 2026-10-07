import { createSelector } from "reselect";

export const filterTypeSelected = (state) => state.notifications.get("filter");

export const getNotifications = (state) => state.notifications.get("notifications");

export const getUnreadNotificationsByType = createSelector(
  filterTypeSelected,
  getNotifications,
  (filter, notifications) => {
    const unread = notifications.filter((notification) => !notification.get("isRead"));
    if (filter === "URGENT") {
      return unread.filter((notification) => notification.get("type") === "urgent").valueSeq();
    }
    return unread.valueSeq();
  }
);
