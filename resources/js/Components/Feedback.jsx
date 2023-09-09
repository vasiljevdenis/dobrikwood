import * as React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon, createSvgIcon } from "@mui/material";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ChatIcon from '@mui/icons-material/Chat';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';

const Feedback = () => {

    const ViberIcon = createSvgIcon(
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 631.99 666.43">
            <defs>
                <style>{".cls-1{fill:rgba(0, 0, 0, 0.54);}.cls-2{fill:none;stroke:rgba(0, 0, 0, 0.54);stroke-linecap:round;stroke-linejoin:round;stroke-width:16.86px;}"}</style>
            </defs>
            <title>Artboard 4</title>
            <path
                class="cls-1"
                d="M560.65,65C544.09,49.72,477.17,1.14,328.11.48c0,0-175.78-10.6-261.47,68C18.94,116.19,2.16,186,.39,272.55S-3.67,521.3,152.68,565.28l.15,0-.1,67.11s-1,27.17,16.89,32.71c21.64,6.72,34.34-13.93,55-36.19,11.34-12.22,27-30.17,38.8-43.89,106.93,9,189.17-11.57,198.51-14.61,21.59-7,143.76-22.65,163.63-184.84C646.07,218.4,615.64,112.66,560.65,65Zm18.12,308.58C562,509,462.91,517.51,444.64,523.37c-7.77,2.5-80,20.47-170.83,14.54,0,0-67.68,81.65-88.82,102.88-3.3,3.32-7.18,4.66-9.77,4-3.64-.89-4.64-5.2-4.6-11.5.06-9,.58-111.52.58-111.52s-.08,0,0,0C38.94,485.05,46.65,347,48.15,274.71S63.23,143.2,103.57,103.37c72.48-65.65,221.79-55.84,221.79-55.84,126.09.55,186.51,38.52,200.52,51.24C572.4,138.6,596.1,233.91,578.77,373.54Z"
            />
            <path class="cls-2" d="M389.47,268.77q-2.46-49.59-50.38-52.09" />
            <path class="cls-2" d="M432.72,283.27q1-46.2-27.37-77.2c-19-20.74-45.3-32.16-79.05-34.63" />
            <path class="cls-2" d="M477,300.59q-.61-80.17-47.91-126.28t-117.65-46.6" />
            <path
                class="cls-1"
                d="M340.76,381.68s11.85,1,18.23-6.86l12.44-15.65c6-7.76,20.48-12.71,34.66-4.81A366.67,366.67,0,0,1,437,374.1c9.41,6.92,28.68,23,28.74,23,9.18,7.75,11.3,19.13,5.05,31.13,0,.07-.05.19-.05.25a129.81,129.81,0,0,1-25.89,31.88c-.12.06-.12.12-.23.18q-13.38,11.18-26.29,12.71a17.39,17.39,0,0,1-3.84.24,35,35,0,0,1-11.18-1.72l-.28-.41c-13.26-3.74-35.4-13.1-72.27-33.44a430.39,430.39,0,0,1-60.72-40.11,318.31,318.31,0,0,1-27.31-24.22l-.92-.92-.92-.92h0l-.92-.93c-.31-.3-.61-.61-.92-.92a318.31,318.31,0,0,1-24.22-27.31,430.83,430.83,0,0,1-40.11-60.71c-20.34-36.88-29.7-59-33.44-72.28l-.41-.28a35,35,0,0,1-1.71-11.18,16.87,16.87,0,0,1,.23-3.84Q141,181.42,152.12,168c.06-.11.12-.11.18-.23a129.53,129.53,0,0,1,31.88-25.88c.06,0,.18-.06.25-.06,12-6.25,23.38-4.13,31.12,5,.06.06,16.11,19.33,23,28.74a366.67,366.67,0,0,1,19.74,30.94c7.9,14.17,2.95,28.68-4.81,34.66l-15.65,12.44c-7.9,6.38-6.86,18.23-6.86,18.23S254.15,359.57,340.76,381.68Z"
            />
        </svg>,
        'Viber'
    );

    const actions = [
        { icon: <TelegramIcon />, name: 'Telegram', link: "https://t.me/dobrikwood" },
        { icon: <WhatsAppIcon />, name: 'WhatsApp', link: "https://wa.me/79196628330" },
        { icon: <ViberIcon />, name: 'Viber', link: "viber://chat?number=%2B79196628330" }
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: 'fixed', bottom: 5, right: {xs: 'auto', md: 5}, left: {xs: 5, md: 'auto'} }}
            icon={<SpeedDialIcon sx={{color: 'white'}} icon={<ChatIcon />} openIcon={<MarkUnreadChatAltIcon />} />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    component={RouterLink}
                    to={action.link}
                />
            ))}
        </SpeedDial>
    )
};

export default Feedback;