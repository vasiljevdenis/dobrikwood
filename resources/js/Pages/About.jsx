import { Box, Typography } from "@mui/material";
import * as React from "react";
import aboutus from '../../images/aboutus.jpg';
import axios from "axios";

const About = () => {

  const [state, setState] = React.useState({
    id: 1,
    image: "",
    page: "about",
    text: "",
    title: ""
  });

  React.useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/page/about')
      .then(res => {
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
      <Box sx={{
        maxWidth: '500px',
        width: '100%',
        float: { xs: 'none', md: 'right' },
        my: 1,
        mx: {xs: 0, md: 1}
      }}>
        <img src={state.image} alt={state.title} style={{
          width: '100%'
        }} />
      </Box>
      <Typography variant="body1" component="p" mx={2} gutterBottom dangerouslySetInnerHTML={{ __html: state.text }}>
      </Typography>      
    </>
  )
};

export default About;