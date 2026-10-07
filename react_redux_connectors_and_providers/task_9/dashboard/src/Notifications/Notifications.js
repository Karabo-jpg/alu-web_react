import React from "react";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import closeIcon from "../assets/close-icon.png";
import { StyleSheet, css } from "aphrodite";

function Notifications({
  displayDrawer,
  listNotifications,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead,
  setNotificationFilter,
}) {
  const menuPStyle = css(
    displayDrawer ? styles.menuItemPNoShow : styles.menuItemPShow
  );

  return (
    <>
      <div
        className={css(styles.menuItem)}
        id="menuItem"
        onClick={handleDisplayDrawer}
      >
        <p className={menuPStyle}>Your notifications</p>
      </div>
      {displayDrawer && (
        <div className={css(styles.notifications)} id="Notifications">
          <button
            style={{
              background: "transparent",
              border: "none",
              position: "absolute",
              right: 20,
            }}
            aria-label="close"
            onClick={handleHideDrawer}
            id="closeNotifications"
          >
            <img
              src={closeIcon}
              alt="close-icon"
              className={css(styles.notificationsButtonImage)}
            />
          </button>
          <p className={css(styles.notificationsP)}>
            Here is the list of notifications
          </p>
          <button
            type="button"
            className={css(styles.filterButton)}
            id="buttonFilterUrgent"
            onClick={() => {
              setNotificationFilter("URGENT");
            }}
          >
            !!
          </button>
          <button
            type="button"
            className={css(styles.filterButton)}
            id="buttonFilterDefault"
            onClick={() => {
              setNotificationFilter("DEFAULT");
            }}
          >
            ?
          </button>
          <ul className={css(styles.notificationsUL)}>
            {(!listNotifications || listNotifications.length === 0) && (
              <NotificationItem
                type="noNotifications"
                value="No new notifications for now"
              />
            )}

            {listNotifications &&
              listNotifications.map((notification) => (
                <NotificationItem
                  key={notification.get ? notification.get("guid") : notification.id || notification.guid}
                  id={notification.get ? notification.get("guid") : notification.id || notification.guid}
                  type={notification.get ? notification.get("type") : notification.type}
                  value={notification.get ? notification.get("value") : notification.value}
                  html={notification.get ? notification.get("html") : notification.html}
                  markAsRead={markNotificationAsRead}
                />
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  setNotificationFilter: () => {},
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.oneOfType([
    PropTypes.arrayOf(NotificationItemShape),
    PropTypes.object,
  ]),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func,
};

const cssVars = {
  mainColor: "#e01d3f",
};

const screenSize = {
  small: "@media screen and (max-width: 900px)",
};

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const translateYKeyframes = {
  "0%": {
    transform: "translateY(0)",
  },

  "50%": {
    transform: "translateY(-5px)",
  },

  "75%": {
    transform: "translateY(5px)",
  },

  "100%": {
    transform: "translateY(0)",
  },
};

const borderKeyframes = {
  "0%": {
    border: `3px dashed deepSkyBlue`,
  },

  "100%": {
    border: `3px dashed ${cssVars.mainColor}`,
  },
};

const styles = StyleSheet.create({
  menuItem: {
    float: "right",
    backgroundColor: "#fff8f8",
    ":hover": {
      cursor: "pointer",
      animationName: [opacityKeyframes, translateYKeyframes],
      animationDuration: "1s, 0.5s",
      animationIterationCount: 3,
    },
  },

  menuItemPNoShow: {
    marginRight: "8px",
    display: "none",
  },

  menuItemPShow: {
    marginRight: "8px",
  },

  notifications: {
    float: "right",
    padding: "10px",
    marginBottom: "20px",
    animationName: [borderKeyframes],
    animationDuration: "0.8s",
    animationIterationCount: 1,
    animationFillMode: "forwards",
    ":hover": {
      border: `3px dashed deepSkyBlue`,
    },
    [screenSize.small]: {
      float: "none",
      border: "none",
      listStyle: "none",
      padding: 0,
      fontSize: "20px",
      ":hover": {
        border: "none",
      },
      position: "absolute",
      background: "white",
      height: "110vh",
      width: "100vw",
      zIndex: 10,
    },
  },

  notificationsButtonImage: {
    width: "10px",
  },

  notificationsP: {
    margin: 0,
    marginTop: "15px",
  },

  filterButton: {
    margin: "0 5px",
  },

  notificationsUL: {
    [screenSize.small]: {
      padding: 0,
    },
  },
});

export default Notifications;
