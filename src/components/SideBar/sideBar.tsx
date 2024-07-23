import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

const drawerWidth = 240;

const SideBar = () => {
  return (
    <Drawer
      sx={{
        borderRight: `1px solid ${palette.color.gray[5]}`,
        width: drawerWidth,
        flexShrink: 0,
        // paddingRight: "100px",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: palette.base.white,
          borderRight: `1px solid ${palette.color.gray[5]}`,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          height: "72px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: `1px solid ${palette.color.gray[5]}`,
        }}
      >
        <Icon icon="logo" height={24} width={175} />
      </Box>
      {/* <Divider /> */}
      <List>
        <Box
          sx={{
            my: "20px",
            mx:"30px",
          }}
        >
          <ListItem
            sx={{ color: palette.color.gray[730] }}
            key={"Invoices"}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="invoiceIcon" width={20} height={18} />
              </ListItemIcon>
              <ListItemText primary={"Invoices"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{ color: palette.color.gray[730] }}
            key={"Clients"}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="clientsIcon" width={20} height={20} />
              </ListItemIcon>
              <ListItemText primary={"Clients"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{ color: palette.color.gray[730] }}
            key={"My Details"}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="settingsIcon" width={20} height={20} />
              </ListItemIcon>
              <ListItemText primary={"My Details"} />
            </ListItemButton>
          </ListItem>

          {/* {["Invoices", "Clients", "My Details"].map((text, index) => (
            <ListItem
              sx={{ color: palette.color.gray[730] }}
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Icon icon="invoiceIcon" width={20} height={20} />
                  ) : (
                    <Icon icon="clientsIcon" width={20} height={20} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </Box>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;
