import React from "react";
import { Bell, MessageSquare, UserPlus, Link } from "lucide-react";

const Notification = ({ type, title, message, user, time }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "Joined New User":
        return <UserPlus style={{ height: "16px", width: "16px" }} />;
      case "Message":
        return <MessageSquare style={{ height: "16px", width: "16px" }} />;
      case "Comment":
        return <MessageSquare style={{ height: "16px", width: "16px" }} />;
      case "Connect":
        return <Link style={{ height: "16px", width: "16px" }} />;
      default:
        return <Bell style={{ height: "16px", width: "16px" }} />;
    }
  };

  const getTypeStyles = (type) => {
    const baseStyles = {
      fontSize: "12px",
      fontWeight: 500,
      padding: "4px 10px",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };

    switch (type) {
      case "Joined New User":
        return { ...baseStyles, backgroundColor: "#dcfce7", color: "#166534" };
      case "Message":
        return { ...baseStyles, backgroundColor: "#ffedd5", color: "#9a3412" };
      case "Comment":
        return { ...baseStyles, backgroundColor: "#f3e8ff", color: "#6b21a8" };
      case "Connect":
        return { ...baseStyles, backgroundColor: "#dbeafe", color: "#1e40af" };
      default:
        return { ...baseStyles, backgroundColor: "#f3f4f6", color: "#1f2937" };
    }
  };

  const cardStyle = {
    marginBottom: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "16px"
  };

  const containerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px"
  };

  const contentStyle = {
    flexGrow: 1
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px"
  };

  const timeStyle = {
    fontSize: "14px",
    color: "#6b7280"
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "4px",
    color: "#111827"
  };

  const messageStyle = {
    fontSize: "14px",
    color: "#4b5563",
    marginBottom: "8px"
  };

  const userStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#2563eb"
  };

  return (
    <div style={cardStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={headerStyle}>
            <span style={getTypeStyles(type)}>
              {getTypeIcon(type)}
              {type}
            </span>
            <time style={timeStyle}>{time}</time>
          </div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={messageStyle}>{message}</p>
          <p style={userStyle}>{user}</p>
        </div>
      </div>
    </div>
  );
};

const MerchantNotification = () => {
  const notifications = [
    {
      type: "Joined New User",
      title: "New Registration: Finibus Bonorum et Malorum",
      message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      user: "Allen Deu",
      time: "24 Nov 2018 at 9:30 AM",
    },
    {
      type: "Message",
      title: "Darren Smith sent new message",
      message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      user: "Darren",
      time: "24 Nov 2018 at 9:30 AM",
    },
    {
      type: "Comment",
      title: "Arin Ganshiram Commented on post",
      message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      user: "Arin Ganshiram",
      time: "24 Nov 2018 at 9:30 AM",
    },
    {
      type: "Connect",
      title: "Jullet Den Connect Allen Depk",
      message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      user: "Jullet Den",
      time: "24 Nov 2018 at 9:30 AM",
    },
  ];

  const containerStyle = {
    // maxWidth: "672px",
    margin: "0 auto",
    padding: "24px"
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#111827"
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Notifications</h2>
      {notifications.map((notif, index) => (
        <Notification key={index} {...notif} />
      ))}
    </div>
  );
};

export default MerchantNotification;