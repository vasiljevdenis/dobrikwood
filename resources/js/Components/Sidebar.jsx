import { Box, Link, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { observer } from 'mobx-react-lite';
import appState from '../store/appState';

const Sidebar = observer(() => {

    const [store] = React.useState(appState);

    const listItemStyle = {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        color: '#212529',
        py: 0
    };

    return (
        <Box sx={{ p: 0 }}>
            <List dense={false} sx={{ p: 0 }}>
                <ListItem sx={{ ...listItemStyle, background: '#60a47c' }} secondaryAction={<ArrowDropDownIcon sx={{ color: 'white', verticalAlign: 'middle' }} />}>
                    <Link sx={{ color: 'white', textTransform: 'uppercase' }} component={RouterLink} to="/catalog" underline="none">
                        <ListItemText
                            primary="Все товары"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                }
                            }}
                        />
                    </Link>
                </ListItem>
                {
                    store.allCategories.map((el, i) => {
                        return (
                            <ListItem key={'category' + i} sx={listItemStyle}>
                                <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to={"/catalog/" + el.path} underline="none">
                                    <ListItemText
                                        primary={el.name}
                                        sx={{
                                            "& span": {
                                                fontFamily: 'FuturaPTDemi, sans-serif'
                                            }
                                        }}
                                    />
                                </Link>
                            </ListItem>
                        );
                    })
                }
                <ListItem sx={listItemStyle}>
                    <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Мебель на заказ"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                }
                            }}
                        />
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
});
export default Sidebar;