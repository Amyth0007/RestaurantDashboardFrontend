import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ViewListIcon from '@mui/icons-material/ViewList';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TableBarIcon from '@mui/icons-material/TableBar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentsIcon from '@mui/icons-material/Payments';
import { CircularProgress, Icon, Stack, Tooltip } from '@mui/material';
import { flexBox, size } from 'theme/defaultFunction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useRouter } from 'next/router';
import HookSidebar from './HookSidebar';
const drawerWidth = 240;


export default function SideBar({handleDrawerToggle, mobileOpen, setMobileOpen, isLoading, user}) {
    const router = useRouter();
    const tabJSON = [
        {
            title:"Home",
            icons:<HomeRoundedIcon/>,
            url:"/"
        },
        {
            title:"Book Table",
            icons:<TableRestaurantIcon/>,
            url:"/restaurant/table"

        },
        {
            title: "Current Orders",
            icons:<LocalMallIcon/>,
            url:"/restaurant/currentOrder"

        },
        {
            title: "Orders",
            icons:<ViewListIcon/>,
            url:"/restaurant/orders"

        },
        {
            title:"Dashboard",
            icons:<DashboardIcon/>,
            url:"/restaurant/dashboard/dashboard"
        },
        {
            title:"Inventory",
            icons:<InventoryIcon/>,
            url:"/restaurant/inventory"
        },
        {
            title:"Payments",
            icons:<AccountBalanceWalletIcon/>,
            url:"/restaurant/payments"
        },
        {
            title:"Attendance",
            icons:<CurrencyRupeeIcon/>,
            url:"/restaurant/attendance"
        },
    ]
    const tab2JSON=[
        {
            title:"Manage Table",
            icons:<TableBarIcon/>,
            url:"/restaurant/manage/table"
        },
        {
            title:"Manage Menu",
            icons:<MenuBookIcon/>,
            url:"/restaurant/manage/menu"
        },
        {
            title:"Manage Users",
            icons:<PersonAddAltIcon/>,
            url:"/restaurant/manage/users"
        },
        {
            title:"Manage Customers",
            icons:<PeopleAltIcon/>,
            url:"/restaurant/manage/customers"
        },
        {
            title:"Recharge",
            icons:<PaymentsIcon/>,
            url:"/restaurant/manage/recharge"
        }
    ]

  const drawer = (
    <div>
        <Stack sx={{
            ...flexBox("column"),
            py:3,
            cursor:"pointer"
        }}>
          <Tooltip title={"etoPOS"}>
            <Typography variant='h3'>etoPOS</Typography>
          </Tooltip>
            <Typography variant='caption'>Restaurant</Typography>
        </Stack>
      {/* <Toolbar title='etoPOS' variant='regular' /> */}
      <Divider />
      {isLoading?
      <Stack sx={{...size("70vh", "100%"), ...flexBox()}}>
        <CircularProgress/>
      </Stack>
      :
      <Stack>
      <List>
        {tabJSON.map((text, index) =><HookSidebar text={text} key={index}/>
        )} 
      </List>
      <Divider />
      <List>
      {tab2JSON.map((text, index) =><HookSidebar text={text} key={index}/>
        )} 
      </List>
      </Stack>
      }
    </div>
  );
  return (
        <Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            height:"100%",
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  height:"100%" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height:"100%" },
          }}
          open
        >
          {drawer}
        </Drawer>
        </Box>
  );
}
