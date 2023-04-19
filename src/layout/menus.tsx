import { List, Tooltip, Divider, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as ToPage } from "react-router-dom"
import Pages from '../pages';
const Menus = () => {
    return (
        <List>
            {Pages.map((text, index) => (
                <ListItem id={text} key={text} disablePadding sx={{ display: 'block' }}
                    component={ToPage} to={"/" + text.toLocaleLowerCase()}
                >
                    <Divider variant="middle" style={{ color: 'black', display: text === "crypto" ? 'block' : 'none' }} />
                    <Divider variant="middle" style={{ marginTop: 0.5, color: 'black', display: text === "crypto" ? 'block' : 'none' }} />
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
                                <img src={process.env.PUBLIC_URL + '/' + text + '.png'} width={30} height={30} />
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