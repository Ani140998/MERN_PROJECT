import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth-ContextAPI";
import { PiUserCircleCheckFill } from "react-icons/pi";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { IoMenu, IoSettingsSharp } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { BsSearch } from "react-icons/bs";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { VscGraph } from "react-icons/vsc";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineInventory } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import Badge from '@mui/material/Badge';
import { PiUserDuotone } from "react-icons/pi";
import { MdHistory } from "react-icons/md";




export default function Navbar() {

    // --------------------- Search Bar Defined varibles ------------------------- //
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '40%',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '200%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));


    // ------------------ Drawer Defined Variables ------------------ //

    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));


    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        height: '12px',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            variants: [
                {
                    props: ({ open }) => open,
                    style: {
                        ...openedMixin(theme),
                        '& .MuiDrawer-paper': openedMixin(theme),
                    },
                },
                {
                    props: ({ open }) => !open,
                    style: {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    },
                },
            ],
        }),
    );

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    //  ----------------- Dropdown and Navbar Defined Variables -------------- // 
    const { isLoggedIn, user } = useAuth();
    const [anchorElUSer, setAnchorElUser] = useState(null);
    const opens = Boolean(anchorElUSer);
    const handleClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElUser(null);
    };

    const { LogoutUser } = useAuth();

    return (
        <>
            {/* // ------------------ Mini Variant Drawer (Side Bar) -----------------// */}

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <IoMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ marginRight: "17%" }}>
                            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>STORE</NavLink>
                        </Typography>

                        {/* // ------------------------ Search Bar ---------------------------- // */}
                        <Search>
                            <SearchIconWrapper>
                                <BsSearch />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search Items…"
                                inputProps={{ 'aria-label': 'search' }}
                            />

                        </Search>

                        {/* // ------------------- Login Button -------------------- // */}
                        <Box sx={{ flexGrow: 1.2 }} />
                        {!isLoggedIn &&

                            <NavLink to="/login" style={{ textDecoration: "none", color: "white" }}><Button color="inherit" variant="outlined" size="medium" startIcon={<FaUserCircle />}>Login</Button></NavLink>

                        }


                        {/* // ------------------ Menu dropdown with tooltip ----------------------// */}
                        {isLoggedIn &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 1 }}
                                        aria-controls={opens ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={opens ? 'true' : undefined}
                                    >

                                        {/* <Avatar sx={{ width: 32, height: 32 }}> */}
                                        <PiUserCircleCheckFill style={{ fontSize: "30px", color: "white" }} />
                                        {/* </Avatar> */}
                                    </IconButton>
                                </Tooltip>

                                {/* // ----------- Cart Icon ---------- // */}
                                <Tooltip title="Cart Items">
                                    <IconButton
                                        // onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 1 }}

                                    >
                                        {/* <Avatar sx={{ width: 32, height: 32 }}> */}
                                        <Badge badgeContent={0} color="error" showZero>
                                            <GiShoppingCart style={{ fontSize: "30px", color: "white" }} />
                                        </Badge>
                                        {/* </Avatar> */}
                                    </IconButton>
                                </Tooltip>

                                {/* // ---------------------------- Dropdown Menu -------------------------// */}
                                <Menu
                                    anchorEl={anchorElUSer}
                                    id="account-menu"
                                    open={opens}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar />
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar />
                                        My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <IoSettingsSharp fontSize="large" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={LogoutUser}>
                                        <ListItemIcon>
                                            <LuLogOut fontSize="large" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>}

                    </Toolbar>
                </AppBar>

                {/* // ----------------- Drawer JSX --------------------- // */}
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <List>
                            <ListItem>
                                <ListItemIcon sx={[
                                    {
                                        minWidth: 0,
                                        fontSize: "20px",
                                        justifyContent: 'center',
                                    },
                                    open ? {
                                        mr: 2,
                                    }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}>
                                    <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <IoMenu /> : <IoMenu />}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>
                                    <b style={{ margin: "0px 4px 0px 0px" }}>{user ? <span>Welcome, {user.name.toUpperCase()} <PiUserDuotone style={{fontSize: "20px" }} /></span> :
                                        <NavLink to="/login" style={{ textDecoration: "none" }}>
                                            LOGIN<PiUserDuotone style={{ margin: "0px 76px 0px 6px", fontSize: "20px" }} />
                                        </NavLink>}
                                    </b>
                                </ListItemText>
                            </ListItem>
                        </List>
                        {/* <IconButton onClick={handleDrawerClose} sx={{marginLeft: !user && "70px"}}>
                            {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
                        </IconButton> */}
                    </DrawerHeader>
                    <Divider />

                    {/* // ------------------------ List of side bar icons only valid for admin ------------------------ // */}
                    {user.isAdmin === true ?
                    <>
                    <List>
                        {['Dashboard', 'Products', 'Users', 'Orders'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {index === 0 && <VscGraph />} {index === 1 && <FaBoxOpen />}
                                        {index === 2 && <FaUsers />} {index === 3 && <TbTruckDelivery />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> 
                    
                    <Divider />
                    <List>
                        {['Inventory', 'Customer Service'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {index === 0 && <MdOutlineInventory />}  {index === 1 && <RiCustomerService2Fill />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> 
                    </>
                    
                    : 

                    // ------------------ List of side bar icons valid only for client ------------------ //
                    <>
                    <List>
                        {['All Products', 'Orders History'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {index === 0 && <FaBoxOpen />}
                                        {index === 1 && <MdHistory />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                     <Divider />
                    <List>
                        {['Track Orders', 'Customer Care'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {index === 0 && <TbTruckDelivery />}  {index === 1 && <RiCustomerService2Fill />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> 
                    </>
                    }
                    
                </Drawer>

            </Box>

        </>
    )
} 