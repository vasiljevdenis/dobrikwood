import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import viber from '../../images/viber.svg';
import vk from '../../images/vk.svg';
import { Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import appState from "../store/appState";
import { observer } from "mobx-react-lite";
import { Clusterer, Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import logo from '../../images/logo.svg';

const Contact = observer(() => {

    const [store] = React.useState(appState);

    const notify = (severity, text) => {
        store.openSnackbar(severity, text);;
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                notify('success', 'Скопировано!');
            });
    }

    return (
        <Grid container p={1}>
            <Grid item xs={12} p={1}>
                <Typography variant="h4" component="h2" m={2}>
                    Контакты
                </Typography>
                <Typography variant="body1" component="p" m={2}>
                    Вы можете свзяться с нами удобным для вас способом:
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} p={1}>
                <List>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('+79196628330')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="tel:+79196628330">
                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Телефон" secondary="+7 919 662 83 30" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('viber://chat?number=%2B79196628330')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="viber://chat?number=%2B79196628330">
                            <ListItemIcon>
                                <img src={viber} alt="Viber" width={21} />
                            </ListItemIcon>
                            <ListItemText primary="Viber" secondary="+7 919 662 83 30" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('https://wa.me/79196628330')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="https://wa.me/79196628330">
                            <ListItemIcon>
                                <WhatsAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="WhatsApp" secondary="+7 919 662 83 30" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('https://t.me/dobrikwood')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="https://t.me/dobrikwood">
                            <ListItemIcon>
                                <TelegramIcon />
                            </ListItemIcon>
                            <ListItemText primary="Telegram" secondary="@dobrikwood" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('info@dobrik-wood.ru')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="mailto:info@dobrik-wood.ru">
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary="E-mail" secondary="info@dobrik-wood.ru" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('https://instagram.com/dobrik.wood')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="https://instagram.com/dobrik.wood">
                            <ListItemIcon>
                                <InstagramIcon />
                            </ListItemIcon>
                            <ListItemText primary="Instagram" secondary="@dobrik.wood" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('https://vk.com/dobrik.wood')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="https://vk.com/dobrik.wood">
                            <ListItemIcon>
                                <img src={vk} alt="VK" width={21} />
                            </ListItemIcon>
                            <ListItemText primary="Вконтакте" secondary="dobrik.wood" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="copy" onClick={() => copyText('Чувашская Республика, г. Чебоксары, ул. Энтузиастов')}>
                                <ContentCopyIcon />
                            </IconButton>
                        }>
                        <ListItemButton component={RouterLink} to="https://yandex.ru/maps/-/CDUeVRO2">
                            <ListItemIcon>
                                <PlaceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Адрес" secondary="Чувашская Республика, г. Чебоксары, ул. Энтузиастов" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
            {/* <Grid item xs={12} sm={6} p={1} sx={{ width: '100%', height: 'auto' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', width: '100%', height: '100%' }}><a href="https://yandex.ru/maps/45/cheboksary/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Чебоксары</a><a href="https://yandex.ru/maps/45/cheboksary/geo/ulitsa_entuziastov/11103368/?ll=47.192980%2C56.121760&utm_medium=mapframe&utm_source=maps&z=15.04" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Улица Энтузиастов — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?ll=47.192980%2C56.121760&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCggxMTEwMzM2OBJs0KDQvtGB0YHQuNGPLCDQp9GD0LLQsNGI0YHQutCw0Y8g0KDQtdGB0L_Rg9Cx0LvQuNC60LAsINCn0LXQsdC-0LrRgdCw0YDRiywg0YPQu9C40YbQsCDQrdC90YLRg9C30LjQsNGB0YLQvtCyIgoNs8Q8QhUnfmBC&z=15.04" style={{ width: '100%', height: '100%', position: 'relative' }} frameborder="0" allowfullscreen={true}></iframe></div>
            </Grid> */}
            <Grid item xs={12} sm={6} p={1} sx={{ width: '100%', height: {xs: '300px', sm: 'auto'} }}>
                <YMaps query={{ lang: 'ru_RU', apikey: import.meta.env.VITE_APP_YMAPS_API_KEY }} style={{ borderRadius: '12px' }}>
                    <Map
                        style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                        defaultState={{
                            center: [56.123197, 47.192086],
                            zoom: 15,
                            controls: ["zoomControl", "fullscreenControl"],
                        }}
                        options={{
                            suppressMapOpenBlock: true,                            
                        }}
                        modules={["control.ZoomControl",
                            "control.FullscreenControl",
                            "geoObject.addon.balloon",
                            "geoObject.addon.hint"
                        ]}
                    >
                        <Placemark
                            geometry={[56.123197, 47.192086]}
                            properties={{
                                hintContent: 'Чувашская Республика, г. Чебоксары, ул. Энтузиастов',
                                balloonContentBody: '<center><img src="' + logo + '" width="100" height="100"><br><b>Добрик-Wood</b><br><span>Чувашская Республика, г. Чебоксары, ул. Энтузиастов</span></center>',
                            }}
                            options={{
                                iconColor: '#60a47c'
                            }}
                            instanceRef={ref => {
                                window.innerWidth > 900 && ref && ref.balloon.open()
                            }}                            
                        >
                        </Placemark>
                    </Map>
                </YMaps>
            </Grid>
        </Grid>
    )
});
export default Contact;