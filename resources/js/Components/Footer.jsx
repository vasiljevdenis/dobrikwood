import { Box, Container, Grid, IconButton, Link, List, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import viber from '../../images/viber.svg';
import vk from '../../images/vk.svg';
import mir from '../../images/mir.svg';
import visa from '../../images/visa.svg';
import mastercard from '../../images/mastercard.svg';
import unionpay from '../../images/unionpay.svg';
import jcb from '../../images/jcb.svg';
import sbp from '../../images/sbp.svg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function Footer() {

  const listItemStyle = {
    color: '#212529',
    py: 0
  };

  return (
    <Grid container sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', py: 2 }}>
      <Grid item xs={12} md={3} textAlign={'center'}>
        <Link component={RouterLink} to="/" sx={{
          marginRight: 'auto !important',
          marginLeft: 'auto',
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '0 !important',
          display: 'inline-block',
          height: '100px',
          width: '100px'
        }}>
          <img src={logo} width={100} height={100} style={{ objectFit: 'cover', objectPosition: '0 -16px' }} />
        </Link>
        <Typography variant="body1" component="p" pl={2} sx={{ fontFamily: 'Helvetica, sans-serif', color: 'rgba(0, 0, 0, 0.5)' }}>
          {`© ${new Date().getFullYear()} Добрик-Wood`}
        </Typography>
        <Stack direction="row" justifyContent={'center'} spacing={1}>
          <Tooltip title="Telegram" disableInteractive placement="top-start">
            <IconButton aria-label="Telegram" component={RouterLink} to="https://t.me/dobrikwood">
              <TelegramIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="WhatsApp" disableInteractive placement="top-start">
            <IconButton aria-label="WhatsApp" component={RouterLink} to="https://wa.me/79196628330">
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Viber" disableInteractive placement="top-start">
            <IconButton aria-label="Viber" component={RouterLink} to="viber://chat?number=%2B79196628330">
              <img src={viber} alt="Viber" width={21} />
            </IconButton>
          </Tooltip>
          <Tooltip title="VK" disableInteractive placement="top-start">
            <IconButton aria-label="VK" component={RouterLink} to="https://vk.com/dobrik.wood">
              <img src={vk} alt="VK" width={21} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Instagram" disableInteractive placement="top-start">
            <IconButton aria-label="Instagram" component={RouterLink} to="https://instagram.com/dobrik.wood">
              <InstagramIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Link variant='body1' underline="none" href="tel:+79196628330" sx={{
              color: 'white',
              background: '#60a47c',
              padding: 1,
              borderRadius: '4px'
            }}>
              <LocalPhoneIcon sx={{
                verticalAlign: 'sub'
              }} />
              &nbsp;
              <Typography variant="h6" component="span" color="white" sx={{
                display: 'inline-block'
              }}>
                +7 919 662 83 30
              </Typography>
            </Link>
      </Grid>
      <Grid item xs={12} md={3} textAlign={'left'} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h6" component="p" pl={2} sx={{ fontFamily: 'Helvetica, sans-serif', color: 'rgba(0, 0, 0, 0.5)' }}>
          Каталог
        </Typography>
        <List dense={false} sx={{ p: 0 }}>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Лошадки-качалки"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Столы и стулья"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Комоды и стеллажи"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Тумбочки"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Игрушки"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
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
      </Grid>
      <Grid item xs={12} md={3} textAlign={'left'} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Typography variant="h6" component="p" pl={2} sx={{ fontFamily: 'Helvetica, sans-serif', color: 'rgba(0, 0, 0, 0.5)' }}>
          Навигация
        </Typography>
        <List dense={false} sx={{ p: 0 }}>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Главная"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="О нас"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Доставка и оплата"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Контакты"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>          
          <ListItem sx={listItemStyle}>
            <Link sx={{ color: '#212529', textTransform: 'uppercase' }} component={RouterLink} to="/" underline="none">
              <ListItemText
                primary="Отзывы"
                sx={{
                  "& span": {
                    fontFamily: 'FuturaPTDemi, sans-serif'
                  }
                }}
              />
            </Link>
          </ListItem>          
        </List>
      </Grid>
      <Grid item xs={12} md={3} textAlign={'center'}>
      <Stack spacing={{ xs: 1, sm: 2 }} justifyContent={'center'} direction="row" useFlexGap flexWrap="wrap">
          <Tooltip title="МИР" disableInteractive placement="top-start">
            <img src={mir} alt="МИР" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
          <Tooltip title="VISA" disableInteractive placement="top-start">
            <img src={visa} alt="VISA" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
          <Tooltip title="MasterCard" disableInteractive placement="top-start">
            <img src={mastercard} alt="MasterCard" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
          <Tooltip title="UnionPay" disableInteractive placement="top-start">
            <img src={unionpay} alt="UnionPay" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
          <Tooltip title="JCB" disableInteractive placement="top-start">
            <img src={jcb} alt="JCB" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
          <Tooltip title="СБП" disableInteractive placement="top-start">
            <img src={sbp} alt="СБП" style={{width: '100%', maxWidth: '80px'}} />
          </Tooltip>
        </Stack>
        <br />
        <Link variant='body2' sx={{ color: '#212529' }} justifyContent={'center'} component={RouterLink} to="/" underline="none">
        Политика обработки персональных данных
            </Link>
      </Grid>
    </Grid>
  );
}