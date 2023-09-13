import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from 'react-router-dom';
import appState from "../store/appState";
import { Box, Button, Divider, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = observer(() => {

    const [store] = React.useState(appState);

    localStorage.setItem('cart', JSON.stringify({
        updated_at: new Date(),
        cartTotal: 0,
        goods: {}
    }));
    store.changeCartTotal(0);
    store.changeOrderId(0);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h2" component="h2" m={2} textAlign={'center'}>
                <CheckCircleIcon color="primary" fontSize="large" className="rotate" /> Заказ успешно оплачен!
            </Typography>
        <Divider />
            <Button component={RouterLink} to="/catalog" variant="contained" sx={{
                color: 'white',
                mt: 1
            }}>Продолжить покупки</Button>
        </Box>
    )
});
export default Success;