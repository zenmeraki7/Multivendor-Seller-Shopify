import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Container
} from "@mui/material";
import {
  NotificationsOutlined,
  MessageOutlined,
  PersonAddOutlined,
  LinkOutlined,
  CommentOutlined
} from "@mui/icons-material";

const Notification = ({ type, title, message, user, time }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "Joined New User":
        return <PersonAddOutlined fontSize="small" />;
      case "Message":
        return <MessageOutlined fontSize="small" />;
      case "Comment":
        return <CommentOutlined fontSize="small" />;
      case "Connect":
        return <LinkOutlined fontSize="small" />;
      default:
        return <NotificationsOutlined fontSize="small" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Joined New User":
        return "success";
      case "Message":
        return "warning";
      case "Comment":
        return "secondary";
      case "Connect":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Chip
            icon={getTypeIcon(type)}
            label={type}
            size="small"
            color={getTypeColor(type)}
            variant="outlined"
          />
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {message}
        </Typography>
        
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          {user}
        </Typography>
      </CardContent>
    </Card>
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

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
        Notifications
      </Typography>
      
      <Stack spacing={2}>
        {notifications.map((notif, index) => (
          <Notification key={index} {...notif} />
        ))}
      </Stack>
    </Container>
  );
};

export default MerchantNotification;