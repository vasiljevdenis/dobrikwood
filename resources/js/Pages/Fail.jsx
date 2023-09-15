import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Divider, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

const Fail = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h2" component="h2" sx={{typography: {xs: 'h5', md: 'h2'}}} m={2} textAlign={'center'}>
                    <ErrorIcon color="error" fontSize="large" className="rotate" /> При оплате возникла ошибка!
                </Typography>
                <Divider />
                <Button component={RouterLink} to="/payment" variant="contained" sx={{
                    color: 'white',
                    mt: 1
                }}>Попробовать снова</Button>
            </Box>
        </>
    )
};
export default Fail;