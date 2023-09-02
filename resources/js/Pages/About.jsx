import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';

const About = () => {

  const [state, setState] = useState({
    id: 1,
    image: "",
    page: "about",
    text: "",
    title: ""
  });

  useEffect(() => {
    axios.get(`/api/page/about`)
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
  return state ? (
    <Box pt={5} pb={5} pl={5} pr={5}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography sx={{ typography: { xs: 'h5', sm: 'h4', lg: 'h2' } }} gutterBottom>
          {state.title}
        </Typography>
        <img src={state.image} style={{ width: '100%', maxWidth: '1200px' }} alt={state.title} />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'left' }} pt={3} pb={3}>
        <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{ __html: state.text }}>
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }} pt={3} pb={3}>
        <Button component={RouterLink} to={'/feedback'} variant="contained">Отправить заявку</Button>
      </Grid>
    </Box>
  ) : (
    <>
    </>
  )
};

export default About;