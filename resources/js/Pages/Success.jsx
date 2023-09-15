import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from 'react-router-dom';
import appState from "../store/appState";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RandomGoods from "../Components/RandomGoods";

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
        <>
            <Box sx={{ py: 3, textAlign: 'center' }}>
                <Typography variant="h2" component="h2" sx={{typography: {xs: 'h5', md: 'h2'}}} m={2} textAlign={'center'}>
                    <CheckCircleIcon color="primary" fontSize="large" className="rotate" /> Заказ успешно оплачен!
                </Typography>
                <Divider />
                <Button component={RouterLink} to="/catalog" variant="contained" sx={{
                    color: 'white',
                    mt: 1
                }}>Продолжить покупки</Button>
            </Box>
            <Grid container p={2}>
                <Grid item xs={12}>
                    <RandomGoods title="Возможно Вам понравится" />
                </Grid>
            </Grid>
        </>
    )
});
export default Success;