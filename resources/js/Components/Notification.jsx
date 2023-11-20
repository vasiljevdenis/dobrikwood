import * as React from 'react';
import { observer } from 'mobx-react-lite';
import appState from '../store/appState';
import { Alert, Snackbar } from '@mui/material';

const Notification = observer(() => {

    const [store] = React.useState(appState);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
          }
        store.closeSnackbar();
    }

    return (
        <Snackbar open={store.snackbarOpen} autoHideDuration={5000} onClose={(event, reason) => handleClose(reason)}>
            <Alert onClose={(event, reason) => handleClose(reason)} severity={store.snackbarSeverity}>
                <div dangerouslySetInnerHTML={{__html: store.snackbarText}}></div>
            </Alert>
        </Snackbar>
    );
});
export default Notification;