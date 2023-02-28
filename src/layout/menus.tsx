import { List, Tooltip, ListItemButton, ListItem, ListItemIcon, ListItemText, Icon } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Link as ToPage, useLocation } from "react-router-dom"
import Pages from '../pages';
const Menus = () => {
    return (
        <List>
            {Pages.map((text, index) => (
                <ListItem id={text} key={text} disablePadding sx={{ display: 'block' }}
                    component={ToPage} to={"/" + text.toLocaleLowerCase()}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Tooltip title={text} placement="right-end">
                                <img src={process.env.PUBLIC_URL + '/' + text + '.png'} width={30} height={30}/>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}
export default Menus;