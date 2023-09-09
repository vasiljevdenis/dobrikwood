import { Alert, Box, Button, Divider, FormControl, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";

const Checkout = observer(() => {

    const [store] = React.useState(appState);

    const cart = JSON.parse(localStorage.getItem('cart')) || {
        updated_at: new Date(),
        cartTotal: 0,
        goods: {}
    };

    const [cartState, setCartState] = React.useState({ ...cart });


    const navigate = useNavigate();

    React.useEffect(() => {
        if (cartState.cartTotal === 0) {
            navigate('/')
        }
    }, [cartState.cartTotal]);

    const [order, setOrder] = React.useState({
        type: 'self',
        name: '',
        lastName: '',
        phone: '',
        email: '',
        delivery: true,
        company: 'CDEK',
        courier: false,
        city: '',
        street: '',
        house: '',
        apartment: '',
        note: '',
        recipient: {
            name: '',
            lastName: '',
            phone: ''
        }
    });

    const changeType = (val) => {
        setOrder({ ...order, type: val });
    }

    const changeName = (val) => {
        setOrder({ ...order, name: val });
    }

    const changeLastName = (val) => {
        setOrder({ ...order, lastName: val });
    }

    const changePhone = (val) => {
        setOrder({ ...order, phone: val });
    }

    const changeEmail = (val) => {
        setOrder({ ...order, email: val });
    }

    const changeDelivery = (val) => {
        setOrder({ ...order, delivery: val });
    }

    const changeCity = (val) => {
        setOrder({ ...order, city: val });
    }

    const changeStreet = (val) => {
        setOrder({ ...order, street: val });
    }

    const changeHouse = (val) => {
        setOrder({ ...order, house: val });
    }

    const changeApartment = (val) => {
        setOrder({ ...order, apartment: val });
    }

    const changeCompany = (val) => {
        setOrder({ ...order, company: val });
    }

    const changeCourier = (val) => {
        setOrder({ ...order, courier: val });
    }

    const changeNote = (val) => {
        setOrder({ ...order, note: val });
    }

    const changeRecipientName = (val) => {
        setOrder({ ...order, recipient: { ...order.recipient, name: val } });
    }

    const changeRecipientLastName = (val) => {
        setOrder({ ...order, recipient: { ...order.recipient, lastName: val } });
    }

    const changeRecipientPhone = (val) => {
        setOrder({ ...order, recipient: { ...order.recipient, phone: val } });
    }

    const notify = (severity, text) => {
        store.openSnackbar(severity, text);;
    }

    const calcDelivery = () => {
        if (order.city && order.street && order.house) {
            let code = 136;
            const totalWeight = Object.values(cartState.goods).map(item => item.weight).reduce((a, b) => a + b, 0) * 1000;
            if (totalWeight <= 30000 && !order.courier) {
                code = 136;
            } else if (totalWeight <= 30000 && order.courier) {
                code = 137;
            } else if (totalWeight > 30000 && totalWeight <= 50000 && !order.courier) {
                code = 234;
            } else if (totalWeight > 30000 && totalWeight <= 50000 && order.courier) {
                code = 233;
            }
            // code = 368;
            // code = 378;
            const packages = Object.values(cartState.goods).map(item => {
                return {
                    weight: item.weight,
                    length: item.length,
                    width: item.width,
                    height: item.height
                }
            });
            axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/calculator', {
                tariff_code: code,
                from_location: 'Чебоксары, ул. Гражданская, 105',
                to_location: order.city + ', ул. ' + order.street + ', ' + order.house,
                packages: packages
            });
        } else {
            notify('error', 'Неверно заполнены поля Город, Улица, Дом!')
        }
    }

    return (
        <>
            <Typography variant="h4" component="h2" m={2}>
                Оформление заказа
            </Typography>
            <Grid container p={1}>
                <Grid item xs={12} md={9} p={1}>
                    <Grid container>
                        <Grid item xs={12} py={1}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                1. Для кого вы бы хотели сделать заказ?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} py={1}>
                            <FormControlLabel
                                checked={order.type === 'self'}
                                onChange={() => changeType('self')}
                                control={<Radio />}
                                label="Для себя"
                                labelPlacement="end"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} py={1}>
                            <FormControlLabel
                                checked={order.type === 'other'}
                                onChange={() => changeType('other')}
                                control={<Radio />}
                                label="Другому человеку"
                                labelPlacement="end"
                            />
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                2. Контактные данные {order.type === "other" ? 'заказчика' : ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextField
                                label="Имя"
                                value={order.name}
                                onChange={(event) => changeName(event.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    width: '100%',
                                    maxWidth: '250px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextField
                                label="Фамилия"
                                value={order.lastName}
                                onChange={(event) => changeLastName(event.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    width: '100%',
                                    maxWidth: '250px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextField
                                label="Телефон"
                                value={order.phone}
                                onChange={(event) => changePhone(event.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    width: '100%',
                                    maxWidth: '250px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextField
                                label="E-mail"
                                value={order.email}
                                onChange={(event) => changeEmail(event.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    width: '100%',
                                    maxWidth: '250px'
                                }}
                            />
                        </Grid>
                        {order.type === "other" ? (
                            <>
                                <Grid item xs={12} py={1}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        3. Контактные данные получателя
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Имя"
                                        value={order.recipient.name}
                                        onChange={(event) => changeRecipientName(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Фамилия"
                                        value={order.recipient.lastName}
                                        onChange={(event) => changeRecipientLastName(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Телефон"
                                        value={order.recipient.phone}
                                        onChange={(event) => changeRecipientPhone(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <></>
                        )}
                        <Grid item xs={12} py={1}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {order.type === "other" ? '4' : '3'}. Способ получения
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} py={1}>
                            <FormControlLabel
                                checked={order.delivery}
                                onChange={() => changeDelivery(true)}
                                control={<Radio />}
                                label="Доставка"
                                labelPlacement="end"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} py={1}>
                            <Tooltip title="Доступен в г. Чебоксары" placement="top">
                                <FormControlLabel
                                    checked={!order.delivery}
                                    onChange={() => changeDelivery(false)}
                                    control={<Radio />}
                                    label="Самовывоз"
                                    labelPlacement="end"
                                />
                            </Tooltip>
                        </Grid>
                        {order.delivery ? (
                            <>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Город/населенный пункт"
                                        value={order.city}
                                        onChange={(event) => changeCity(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Улица"
                                        value={order.street}
                                        onChange={(event) => changeStreet(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Дом"
                                        value={order.house}
                                        onChange={(event) => changeHouse(event.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <TextField
                                        label="Квартира"
                                        value={order.apartment}
                                        onChange={(event) => changeApartment(event.target.value)}
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            maxWidth: '250px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <FormControl sx={{
                                        width: '100%',
                                        maxWidth: '250px'
                                    }}>
                                        <InputLabel id="company-label">Способ доставки</InputLabel>
                                        <Select
                                            labelId="company-label"
                                            id="company"
                                            value={order.company}
                                            label="Способ доставки"
                                            onChange={(event) => changeCompany(event.target.value)}
                                        >
                                            <MenuItem value={'CDEK'}>CDEK</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} py={1}>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="courier-label"
                                            name="courier"
                                        >
                                            <FormControlLabel
                                                checked={!order.courier}
                                                onChange={() => changeCourier(false)}
                                                control={<Radio />}
                                                label="Пункт выдачи"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                checked={order.courier}
                                                onChange={() => changeCourier(true)}
                                                control={<Radio />}
                                                label="Курьером до двери"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" size="small" sx={{ color: 'white' }} onClick={calcDelivery}>
                                        Рассчитать стоимость
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12} py={1}>
                                <Alert severity="info">Самовывоз доступен только из города Чебоксары Чувашской Республики</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} py={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextareaAutosize
                                rows={1}
                                placeholder='Примечание'
                                value={order.note}
                                onChange={(event) => changeNote(event.target.value)}
                                style={{
                                    width: '100%',
                                    maxWidth: '250px',
                                    lineHeight: '1.5',
                                    padding: '16.5px 14px',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '4px',
                                    fontFamily: 'Helvetica, sans-serif',
                                    fontSize: '1rem'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3} p={1} textAlign={'left'}>
                    <Box sx={{ backgroundColor: '#f8f3ef', py: 1, position: { xs: 'static', md: 'sticky' }, top: 0 }}>
                        <Typography variant="h6" component="h3" m={2}>
                            В корзине:
                        </Typography>
                        <List dense={false} sx={{ p: 0 }}>
                            {
                                Object.entries(cartState.goods).map((el, i) => {
                                    return (
                                        <ListItem key={'category' + i}>
                                            <ListItemText
                                                primary={el[1].name}
                                                secondary={el[1].price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽ - ' + el[1].count + ' шт.'}
                                                sx={{
                                                    "& span": {
                                                        fontFamily: 'FuturaPTDemi, sans-serif'
                                                    }
                                                }}
                                            />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                        <Divider />
                        <Typography variant="h5" component="p" m={2}>
                            Итого: {cartState.cartTotal.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
});
export default Checkout;