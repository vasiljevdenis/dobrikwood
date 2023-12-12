import { Box, Typography } from "@mui/material";
import * as React from "react";
import dostavka from '../../images/dostavka.jpg';
import axios from "axios";

const Delivery = () => {

    const [state, setState] = React.useState({
        id: 1,
        image: "",
        page: "delivery",
        text: "",
        title: ""
      });
    
      React.useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/page/delivery')
          .then(res => {
            console.log(res);
            let json = res.data[0];
            setState((oldState) => ({ ...oldState, title: json.title, text: json.text, image: json.image }));
          })
          .catch(err => {
          })
          .finally(() => {
          });
      }, []);

    return (
        <>
            <Typography variant="h4" component="h2" m={2}>
            {state.title}
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom dangerouslySetInnerHTML={{ __html: state.text.slice(0, state.text.indexOf('<h3>')) }}>                
            </Typography>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <img src={state.image} alt={state.title} style={{
                    maxWidth: '500px',
                    width: '100%',
                    margin: 1
                }} />
            </Box>
            <Typography variant="body1" component="p" mx={2} gutterBottom dangerouslySetInnerHTML={{ __html: state.text.slice(state.text.indexOf('<h3>')) }}>
            </Typography>
        </>
    )
};

export default Delivery;