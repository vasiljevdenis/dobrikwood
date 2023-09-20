import { Alert, Box, Button, CircularProgress, Divider, FormControl, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";
import PaymentIcon from '@mui/icons-material/Payment';
import { YMaps, withYMaps } from "@pbe/react-yandex-maps";
import getDaysDelivery from "../helpers/getDaysDelivery";
import streetVariations from "../helpers/streetVariations";
import formValidator from "../helpers/formValidator";
import ReactInputMask from "react-input-mask";

const MapSuggestComponent = observer((props) => {
    const [store] = React.useState(appState);

    const { ymaps } = props;

    React.useEffect(() => {
        const suggestView = new ymaps.SuggestView("suggest");
        suggestView.events.add('select', (e) => {
            let fullAddress = e.get('item').value.split(',');
            if (fullAddress.length > 1) {
                let locality = [];
                let street = '';
                let house = '';
                fullAddress.forEach(item => {
                    const el = item.toLowerCase().trim();
                    const hasWord = streetVariations.some(word => el.includes(word));
                    const hasHouse = el.length > 0 && el.split('').filter(char => !isNaN(char)).length >= el.length / 2;
                    if (hasWord) {
                        street = item.trim();
                    } else if (hasHouse) {
                        house = item.trim();
                    } else {
                        locality.push(item.trim());
                    }
                });
                store.changeAddress({
                    city: locality.join(', '),
                    street: street,
                    house: house
                });
            } else {
                store.changeAddress({
                    ...store.addressVal,
                    city: fullAddress[0].trim(),
                });
            }
        });
    }, [ymaps.SuggestView]);

    return <TextField
        label="Город/населенный пункт"
        id="suggest"
        variant="outlined"
        value={store.addressVal.city}
        onChange={(event) => store.changeAddress({...store.addressVal, city: event.target.value})}
        required
        sx={{
            width: '100%',
            maxWidth: '250px'
        }}
    />;
});

const Checkout = observer(() => {

    const [store] = React.useState(appState);

    const cart = JSON.parse(localStorage.getItem('cart')) || {
        updated_at: new Date(),
        cartTotal: 0,
        goods: {}
    };

    const [cartState, setCartState] = React.useState({ ...cart });
    const [loadShipping, setloadShipping] = React.useState(false);


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
        delivery_sum: 0,
        delivery_days: [],
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
        },
        cdek: {
            code: 136
        }
    });

    const changeType = (val) => {
        setOrder({ ...order, type: val });
    }

    const changeName = (val) => {
        setOrder({ ...order, name: val.slice(0, 1).toUpperCase() + val.slice(1) });
    }

    const changeLastName = (val) => {
        setOrder({ ...order, lastName: val.slice(0, 1).toUpperCase() + val.slice(1) });
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
        setOrder({ ...order, recipient: { ...order.recipient, name: val.slice(0, 1).toUpperCase() + val.slice(1) } });
    }

    const changeRecipientLastName = (val) => {
        setOrder({ ...order, recipient: { ...order.recipient, lastName: val.slice(0, 1).toUpperCase() + val.slice(1) } });
    }

    const changeRecipientPhone = (val) => {
        setOrder({ ...order, recipient: { ...order.recipient, phone: val } });
    }

    React.useEffect(() => {
        setOrder({ ...order, city: store.addressVal.city, street: store.addressVal.street, house: store.addressVal.house });
    }, [store.addressVal]);

    const notify = (severity, text) => {
        store.openSnackbar(severity, text);;
    }

    const calcDelivery = () => {
        if (order.city && order.street && order.house) {
            setloadShipping(true);
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
            const packages = Object.values(cartState.goods).map(item => {
                return {
                    weight: item.weight * 1000,
                    length: item.length,
                    width: item.width,
                    height: item.height
                }
            });
            axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/calculator', {
                tariff_code: code,
                from_location: 'Чебоксары, ул. Гражданская, 105',
                to_location: order.city + ', ' + order.street + ', ' + order.house,
                packages: packages
            })
                .then(res => {
                    let result = res.data;
                    if (result.status) {
                        setOrder({ ...order, delivery_sum: Math.ceil(result.total_sum * 1.1), delivery_days: result.period_min === result.period_max ? [result.period_min] : [result.period_min, result.period_max] });
                        window.scrollTo(0, document.body.scrollHeight);
                    } else {
                        notify('error', result.message);
                    }
                    setloadShipping(false);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                });
        } else {
            notify('error', 'Неверно заполнены поля Город, Улица, Дом!')
        }
    }

    const SuggestComponent = React.useMemo(() => {
        return withYMaps(MapSuggestComponent, true, [
            "SuggestView",
            "geocode",
            "coordSystem.geo"
        ]);
    }, []);

    const saveOrder = () => {
        let isValid = formValidator(order);
        if (isValid) {
            let orderData = {};
            orderData.name = order.name;
            orderData.lastName = order.lastName;
            orderData.phone = order.phone.replace(/[^\d+]/g, "");
            orderData.email = order.email;
            orderData.goods = cartState.goods;
            orderData.price = cartState.cartTotal;
            orderData.note = order.note;
            if (order.type === "other") {
                orderData.recipient = {
                    name: order.recipient.name,
                    lastName: order.recipient.lastName,
                    phone: order.recipient.phone.replace(/[^\d+]/g, "")
                };
            }
            if (order.delivery) {
                orderData.delivery_type = order.courier ? 'Курьером' : 'Пункт выдачи';
                orderData.delivery_sum = order.delivery_sum;
                orderData.delivery_days = getDaysDelivery(order.delivery_days);
                orderData.address = order.city + ', ' + order.street + ', ' + order.house + (order.apartment ? ', кв. ' + order.apartment : '');
                orderData.cdek = {
                    tariff_code: order.cdek.code,
                    recipient: {
                        name: order.type === "other" ? order.recipient.name : order.name,
                        phones: [
                            {
                                number: order.type === "other" ? order.recipient.phone.replace(/[^\d+]/g, "") : order.phone.replace(/[^\d+]/g, "")
                            }
                        ]
                    },
                    from_location: {
                        address: 'Чебоксары, ул. Гражданская, 105'
                    },
                    to_location: {
                        address: order.city + ', ' + order.street + ', ' + order.house + (order.apartment ? ', кв. ' + order.apartment : '')
                    },
                    packages: Object.entries(cartState.goods).map(el => {
                        return Array.from({ length: el[1].count }, () => ({
                            number: el[0],
                            weight: el[1].weight * 1000,
                            length: el[1].length,
                            width: el[1].width,
                            height: el[1].height,
                            items: [{
                                name: el[1].name,
                                ware_key: el[0],
                                payment: {
                                    value: 0
                                },
                                cost: el[1].price,
                                weight: el[1].weight * 1000,
                                amount: 1
                            }]
                        }))
                    }).flat()
                };
            } else {
                orderData.address = 'Самовывоз';
            }
            axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/order/new', orderData)
                .then(res => {
                    let result = res.data;
                    if (result.status) {
                        store.changeOrderId(result.order_id);
                        navigate('/payment');
                    } else {
                        notify('error', result.message);
                    }
                    setloadShipping(false);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                });
        } else {
            notify('error', 'Заполните правильно все обязательные поля!');
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
                                1. Для кого вы хотели бы сделать заказ?
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
                            <ReactInputMask mask="+7 (999) 999-99-99" value={order.phone} onChange={(event) => changePhone(event.target.value)}>
                                <TextField
                                    label="Телефон"
                                    variant="outlined"
                                    required
                                    sx={{
                                        width: '100%',
                                        maxWidth: '250px'
                                    }}
                                />
                            </ReactInputMask>
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
                                    <ReactInputMask mask="+7 (999) 999-99-99" value={order.recipient.phone} onChange={(event) => changeRecipientPhone(event.target.value)}>
                                        <TextField
                                            label="Телефон"
                                            variant="outlined"
                                            required
                                            sx={{
                                                width: '100%',
                                                maxWidth: '250px'
                                            }}
                                        />
                                    </ReactInputMask>
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
                                    <YMaps
                                        enterprise
                                        query={{ 
                                            apikey: import.meta.env.VITE_APP_YMAPS_API_KEY,
                                            suggest_apikey: import.meta.env.VITE_APP_YMAPS_SUGGEST_API_KEY
                                         }}
                                    >
                                        <SuggestComponent />
                                    </YMaps>
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
                                <Grid item xs={12} md={6} py={1} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'center', md: 'left' }
                                }}>
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
                                        {loadShipping ? <CircularProgress sx={{ color: 'white' }} size={20} /> : "Рассчитать стоимость"}
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12} py={1}>
                                <Alert severity="info">Самовывоз доступен только из города Чебоксары Чувашской Республики</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} pt={3} pb={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <TextareaAutosize
                                rows={1}
                                placeholder='Примечание'
                                value={order.note}
                                onChange={(event) => changeNote(event.target.value)}
                                style={{
                                    width: '100%',
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
                            {order.delivery ? (
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={"Подытог: " + cartState.cartTotal.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                                            primaryTypographyProps={{
                                                typography: 'h6'
                                            }}
                                            sx={{
                                                "& span": {
                                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                                }
                                            }}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText
                                            primary={(order.courier ? 'Доставка до двери' : 'Доставка до пункта выдачи') + (order.delivery_days.length > 0 ? ' (' : '') + getDaysDelivery(order.delivery_days) + (order.delivery_days.length > 0 ? ')' : '')}
                                            secondary={order.delivery_sum === 0 ? <Button variant="text" size="small" onClick={calcDelivery}>{loadShipping ? <CircularProgress color="primary" size={20} /> : "Рассчитать"}</Button> : order.delivery_sum.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                                            sx={{
                                                "& span": {
                                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                                }
                                            }}
                                        />
                                    </ListItem>
                                </>
                            ) : (
                                <></>
                            )}
                        </List>
                        <Divider />
                        <Typography variant="h5" component="p" m={2}>
                            Итого: {(order.delivery ? cartState.cartTotal + order.delivery_sum : cartState.cartTotal).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9} p={1} textAlign={'center'}>
                    <Button disabled={order.delivery && order.delivery_sum === 0 ? true : false} variant="contained" onClick={saveOrder} sx={{ color: 'white' }} endIcon={<PaymentIcon />}>
                        Перейти к оплате
                    </Button>
                </Grid>
            </Grid>
        </>
    )
});
export default Checkout;