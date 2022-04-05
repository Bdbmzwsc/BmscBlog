import * as React from 'react';
import Link from "next/link";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { Home, Menu, Brightness4, Brightness7} from '@mui/icons-material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from "axios";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
import '../styles/globals.css'
import { Button } from '@mui/material';

function MainF(){

  const [bg,setBg]=React.useState("");
  //theme
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);



   //background
   const getbg = () =>{
     axios.get("https://api.codelife.cc/api/bing").then((result) => {
         setBg(result.data.data.fullSrc);
     });
   };
 
  const [state, setState] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState(open);
  };
  const list = (anchor) => (
    <div className='pd'>

      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270 ,color: "text.primary" , bgcolor: "background.default"}}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
          <div className='img1'> 
        <img src={bg}  width={270} height={170}/>
         <List>
          <Link href="/">
            <ListItem button>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>
        </List></div>
        <div className='img2'>
        <Avatar src="https://avatars.githubusercontent.com/u/88311279?s=400&u=9f913b319c2cf39977f8ca5e54d07052ca9d99c0&v=4" alt='face' sx={{ width: 85, height: 85 }}/>
       <Typography sx={{color: "white"}}>Coding is my life</Typography>
        </div>
        <div className='img3'>
    <IconButton  sx={{ ml: 1, color: "white"}} onClick={colorMode.toggleColorMode}
    aria-owns={open ? 'mouse-over-popover' : undefined}
    aria-haspopup="true"
    onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}
    
    >
    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
    <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>切换日夜间模式</Typography>
      </Popover>
      </div>
     
     
     


     

      {"code":200,"data":{"copyright":"太湖边盛开的樱花，无锡 (© Eric Yang/Getty Images)","enddate":"20220403","urlbase":"/th?id=OHR.TaihuCherry_ZH-CN9040685764","fullSrc":"https://cn.bing.com//th?id=OHR.TaihuCherry_ZH-CN9040685764_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp","engine":[{"key":"baidu","href":"https://www.baidu.com/s?tn=02003390_71_hao_pg&ie=utf-8&word="},{"key":"baidu","href":"https://www.baidu.com/s?tn=44004473_22_oem_dg&ie=utf-8&word="},{"key":"baidu","href":"https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&word="},{"key":"baidu","href":"https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&word="},{"key":"baidu","href":"https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&word="}]},"msg":"请求成功"}



{/*     <div className='img3'>
      
     </div>
     */} 
     
      
      </Box>

    </div>
    );
    React.useEffect(getbg,[]);
   return(
       <Box sx={{bgcolor: "background.default"}}>
         
          <IconButton onClick={toggleDrawer("left",true)} sx={{color: "white"}}>
            <Menu />
          </IconButton>
         <Drawer
           anchor="left"
           open={state}
           onClose={toggleDrawer("left", false)}
         >
           {list("left")}
         </Drawer>
         
         
       </Box>
       
   )
}


function MyApp({ Component, pageProps }) {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <MainF />
      <Component {...pageProps}/>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default MyApp
