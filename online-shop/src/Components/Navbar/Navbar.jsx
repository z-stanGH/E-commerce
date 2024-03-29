import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { auth } from '../../Config/firebase-config';
import { Avatar } from '@mui/material';
import { getUserByID } from '../../Services/user.services';
import logoImage from '../../Images/Wordpress Transparent.png';

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [logState, setLogState] = React.useState('');
  const [user, setUser] = React.useState('');

  const [queryVal, setQueryVal] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLogState('Logout');
        const getUser = async () => {
          const data = await getUserByID(user.uid);
          setUser(data);
        };
        getUser();
      } else {
        setLogState('Login');
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const navItems = ['Home', 'Products', logState, 'Privacy', 'Contact'];
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLinkToPage = (page) => {
    const pageName = page.toLowerCase();
    if (pageName === 'home') {
      navigate('/');
    } else navigate(`/${pageName}`);
  };

  const handleShowCart = () => {
    navigate('/cart');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQueryVal(e.target.value);
    console.log('Search:', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      navigate(`/search/${queryVal}`);
    }
    setQueryVal('');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BNM
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: '#023620', color: '#CD8E33' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton href="/">
            <Avatar src={logoImage} />
          </IconButton>
          {user?.isLogged && (
            <Avatar sx={{ bgcolor: '#023620', color: '#CD8E33' }}>
              {user.firstName[0] + user.lastName[0]}
            </Avatar>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          ></Typography>
          <IconButton
            style={{ color: '#CD8E33', padding: 0 }}
            onClick={() => handleShowCart()}
          >
            <LocalMallIcon />
          </IconButton>
          <InputBase
            sx={{ color: '#CD8E33' }}
            placeholder="Search..."
            onChange={handleSearch}
            value={queryVal}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(event);
              }
            }}
          ></InputBase>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: '#CD8E33' }}
                onClick={() => handleLinkToPage(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ backgroundColor: '#023620' }}>
        <Toolbar />
        {/* <Typography>
          <p>Some text</p>
        </Typography> */}
      </Box>
    </Box>
  );
}

export default Navbar;
