import * as React from "react";
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReactInputMask from "react-input-mask";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SubjectIcon from '@mui/icons-material/Subject';
import { SmartCaptcha } from "@yandex/smart-captcha";
import TextareaAutosize from "react-autosize-textarea"
import { useCallback } from "react";

const Feedback = () => {
  const [state, setState] = useState({
    id: 1,
    image: "",
    page: "feedback",
    text: "Заполните все обязательные поля!",
    status: "error",
    title: ""
  });

  useEffect(() => {
    axios.get(`/api/page/feedback`)
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

  const [name, setName] = useState('');

  const changeName = (e) => {
    setName(e.target.value);
    if (name) setErrName(false);
  }

  const [phone, setPhone] = useState('');

  const changePhone = (e) => {
    setPhone(e.target.value);
    if (phone) setErrPhone(false);
  }

  const [email, setEmail] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const [subject, setSubject] = useState('');

  const changeSubject = (e) => {
    setSubject(e.target.value);
    setErrSubject(false);
  }

  const [text, setText] = useState('');

  const changeText = (e) => {
    setText(e.target.value);
  }

  const [token, setToken] = useState('');
  const [status, setStatus] = useState('hidden');

  const handleChallengeVisible = useCallback(() => setStatus('visible'), []);
  const handleChallengeHidden = useCallback(() => setStatus('hidden'), []);
  const handleNetworkError = useCallback(() => setStatus('network-error'), []);
  const handleSuccess = useCallback((token) => {
    setStatus('success');
    setToken(token);
  }, []);
  const handleTokenExpired = useCallback(() => {
    setStatus('token-expired');
    setToken('');
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const openSnackbar = () => {
    setSnackbar({ ...snackbar, open: true });
  };
  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false, text: 'Заполните все обязательные поля!', status: "error" });
  };

  const [errName, setErrName] = useState(false);
  const [errPhone, setErrPhone] = useState(false);
  const [errSubject, setErrSubject] = useState(false);

  const sendForm = () => {
    if (name && phone && subject) {
      axios.post(import.meta.env.VITE_APP_BASE_URL + `/feedback/send`, {
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        text: text
      })
        .then(res => {
          console.log(res);
          setSnackbar({ ...snackbar, open: true, text: 'Успешно отправлено!', status: "success" });
          setName('');
          setPhone('');
          setEmail('');
          setText('');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
        });
    } else {
      openSnackbar();
      if (!name) setErrName(true);
      if (!phone) setErrPhone(true);
      if (!subject) setErrSubject(true);
    }
  }

  const [checked, setChecked] = useState(false);

  const changeCheck = (event) => {
    setChecked(event.target.checked);
  };

  return state ? (
    <Box pt={5} pb={5} pl={5} pr={5}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography sx={{ typography: { xs: 'h5', sm: 'h4', lg: 'h2' } }} gutterBottom>
          {state.title}
        </Typography>
        {/* <img src={state.image} style={{ width: '100%', maxWidth: '1200px' }} alt={state.title} /> */}
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'left' }} pt={3} pb={3}>
        <Typography variant="body1" gutterBottom>
          {state.text}
        </Typography>
      </Grid>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 2 }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField error={errName} id="input-with-sx" label="Ваше имя" variant="standard" value={name} onChange={changeName} required />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 2 }}>
          <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <ReactInputMask mask="+7 (999) 999-99-99" value={phone} onChange={changePhone}>
            <TextField error={errPhone} id="input-with-sx" label="Номер телефона" variant="standard" required />
          </ReactInputMask>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 2 }}>
          <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Email" value={email} onChange={changeEmail} variant="standard" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 2 }}>
          <SubjectIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <FormControl variant="standard" sx={{ my: 1, minWidth: 207 }}>
            <InputLabel id="demo-multiple-name-label">Тема обращения *</InputLabel>
            <Select
              error={errSubject}
              required
              labelId="demo-multiple-name-label"
              id="demo-simple-select-standard"
              label="Тема обращения"
              value={subject}
              onChange={changeSubject}
            >
              <MenuItem value={"Реклама на постаматах"}>Реклама на постаматах</MenuItem>
              <MenuItem value={"Франшиза"}>Франшиза</MenuItem>
              <MenuItem value={"Сотрудничество"}>Сотрудничество</MenuItem>
              <MenuItem value={"Постамат в подьезд"}>Постамат в подьезд</MenuItem>
              <MenuItem value={"Ячейка не открылась"}>Ячейка не открылась</MenuItem>
              <MenuItem value={"Обратная связь"}>Обратная связь</MenuItem>
              <MenuItem value={"Постаматы на карте"}>Постаматы на карте</MenuItem>
              <MenuItem value={"Поддержать развитие проекта"}>Поддержать развитие проекта</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 2 }}>
          <TextareaAutosize
            rows={3}
            placeholder='Текст сообщения'
            value={text}
            onChange={changeText}
            style={{ width: '235px', lineHeight: '1.5' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <FormControlLabel sx={{ maxWidth: 275 }} control={<Checkbox checked={checked} onChange={changeCheck} required />} label="Я даю согласие на обработку своих персональных данных" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <SmartCaptcha
            sitekey="ysc1_zcHjsGtrzDFWYhz4ZkjoxTfAvZrGuzqcubQF7ewB6f7c94c7"
            onChallengeVisible={handleChallengeVisible}
            onChallengeHidden={handleChallengeHidden}
            onNetworkError={handleNetworkError}
            onSuccess={handleSuccess}
            onTokenExpired={handleTokenExpired}
          />
        </Box>
      </Box>
      <Grid item xs={12} style={{ textAlign: 'center' }} pt={3} pb={3}>
        <Button variant="contained" onClick={sendForm} disabled={status === "success" && checked ? false : true}>Отправить заявку</Button>
      </Grid>
      <Snackbar anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }} open={snackbar.open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={snackbar.status} sx={{ width: '100%' }}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <>
    </>
  )
};

export default Feedback;