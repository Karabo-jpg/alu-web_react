import * as notificationItem from "../../notifications.json";

export default function getAllNotificationsByUser(userId) {
  return notificationItem.default
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context);
}
