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
import axios from "axios";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MainF(){

  const [bg,setBg]=React.useState("");
 //theme
 const theme = useTheme();
 const colorMode = React.useContext(ColorModeContext);

  //background
  const getbg = () =>{
    axios.get("https://api.codelife.cc/api/bing").then((result) => {
        setBg(result.data.data.fullSrc);
     //   return;
     // console.log(result.data.data.fullSrc);
    });
  }

 const [state, setState] = React.useState(false);
 const toggleDrawer = (anchor, open) => (event) => {
     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
       return;
     }
     setState(open);
 };
 const list = (anchor) => (
     <Box
       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 ,color: "text.primary" , bgcolor: "background.default"}}
       role="presentation"
       onClick={toggleDrawer(anchor, false)}
       onKeyDown={toggleDrawer(anchor, false)}
     >
       <Box sx={{textAlign: "right",m: 1}}>
    <img src={bg}  width={100} height={100}/>
   <IconButton sx={{ ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
     {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
   </IconButton>
       </Box>
       <List>
         <Link href="/">
           <ListItem button>
             <ListItemIcon><Home /></ListItemIcon>
             <ListItemText>Home</ListItemText>
           </ListItem>
         </Link>
       </List>
     </Box>
   );
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
         {getbg()}
       </Box>
   )
}


export default function App(){
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}