import React, { useContext } from "react";
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
import { ClipboardDocumentListIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const Sidebar = () => {
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
          <Typography variant="h5" color="blue-gray" className="font-bold text-primary">
            VocaNova
          </Typography>
        </div>
        <List>
          <ListItem className="text-success">
            <ListItemPrefix>
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                withBorder={true}
                color="blue"
                className="p-0.5"
              />
            </ListItemPrefix>
            Hi, {userData.fullName.split(" ")[0]}
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