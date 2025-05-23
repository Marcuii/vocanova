import React, { useContext, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Context from "../../Context";
import { ArrowPathRoundedSquareIcon, ClipboardDocumentListIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [name, setName] = React.useState("");

  const {
    //App states
    userData,
    setUserData,

    //Logged Layout -----------------------------
    //app logout
    handleLogout,
    
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
      if (userData.fullName) {
        setName(userData.fullName.split(" ")[0])
      } else {
        setName("")
      }
    } , [userData])

  //redirect to clicked page + close sidebar
  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const closeDrawer = () => setIsSidebarOpen(false);

  return (
    <Drawer open={isSidebarOpen} onClose={closeDrawer}>
      <Card
        color="transparent"
        shadow={false}
        className="h-[calc(100vh-2rem)] w-full p-4"
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <Typography variant="h5" color="blue-gray" className="font-bold text-primary hover:cursor-default">
            VocaNova
          </Typography>
        </div>
        <List>
          <ListItem className="text-success" onClick={() => handleNavigation("/profile")}>
            <ListItemPrefix>
              <Avatar
                src={userData.profilePictureUrl ? userData.profilePictureUrl : "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"}
                alt="avatar"
                withBorder={true}
                color="blue"
                className="p-0.5"
              />
            </ListItemPrefix>
            Hi, {name}
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => handleNavigation("/job-recommendation")}>
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Job Recommendations
          </ListItem>
          <ListItem onClick={() => handleNavigation("/job-applications")}>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Job Applications
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => handleNavigation("/resume-analysis")}>
            <ListItemPrefix>
              <DocumentMagnifyingGlassIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Resume Analysis
          </ListItem>
          <ListItem onClick={() => handleNavigation("/mockup-interview")}>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            MockUp Interviews
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => handleNavigation("/profile")}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={() => handleNavigation("/settings")}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={() => handleNavigation("/change-password")}>
            <ListItemPrefix>
              <ArrowPathRoundedSquareIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Change Password
          </ListItem>
          <ListItem onClick={() => handleLogout()} className="text-error">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-primary" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </Drawer>
  );
}

export default Sidebar;