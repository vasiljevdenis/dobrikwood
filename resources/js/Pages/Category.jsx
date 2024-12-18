import { Box, Card, CardActionArea, CardContent, Divider, Grid, LinearProgress, Rating, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from "axios";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";
import Carousel from "../Components/Carousel";

const Category = observer(() => {

    const [store] = React.useState(appState);

    const [goods, setGoods] = React.useState([]);

    const [category, setCategory] = React.useState('');

    const [progress, setProgress] = React.useState(true);

    const { categoryName } = useParams();

    React.useEffect(() => {
        setProgress(true);
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName)
            .then(res => {
                let json = res.data;
                setGoods(json);
                setProgress(false);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, [categoryName]);

    React.useEffect(() => {
        const c = [...store.allCategories].find(el => el.path === categoryName);
        setCategory(c ? c.name : '');
    }, [store.allCategories, categoryName]);

    return (
        <>
            {progress ? (<LinearProgress color="primary" />) : (
                <>
                    <Typography variant="h4" component="h2" m={2}>
                        {category}
                    </Typography>
                    <Grid container p={1} textAlign={'center'}>
                        {
                            goods.map((el, i) => {
                                return (
                                    <Grid key={'product' + i} item xs={12} sm={6} md={4} lg={3} p={1} textAlign={'center'}>
                                        <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + categoryName + '/' + el.path}>
                                            <Card sx={{ maxWidth: '18rem', mx: 'auto', height: '100%', position: 'relative' }}>
                                                <CardActionArea component="div" sx={{ height: '100%' }}>
                                                    <Carousel items={JSON.parse(el.images).map(item => { return { image: import.meta.env.VITE_APP_BASE_URL + '/' + item, link: '#' } })} dots={true} arrows={false} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {el.name}
                                                        </Typography>
                                                        <Divider />
                                                        <Rating name="read-only" value={el.rate} readOnly />
                                                        <p style={{ textAlign: 'right' }}>
                                                            {el.published === "true" ? (
                                                                <>
                                                                    <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                                                        color: 'rgba(0, 0, 0, 0.5)',
                                                                        p: 1
                                                                    }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                                                    <Typography variant="h6" component="span" gutterBottom sx={{
                                                                        color: 'white',
                                                                        background: '#60a47c',
                                                                        p: 1
                                                                    }}>{el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                                </>
                                                            ) : (
                                                                <Typography variant="h6" component="span" gutterBottom sx={{
                                                                    color: 'white',
                                                                    background: '#60a47c',
                                                                    p: 1
                                                                }}>Нет в продаже</Typography>
                                                            )}
                                                        </p>
                                                    </CardContent>
                                                </CardActionArea>
                                                <Box sx={{
                                                    width: 'fit-content',
                                                    height: 20,
                                                    borderRadius: 4,
                                                    px: 2,
                                                    backgroundColor: el.badge === "new" ? "#1565c0" : el.badge === "top" ? "#c62828" : "#ffc107",
                                                    color: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'absolute',
                                                    top: 2,
                                                    right: 2
                                                }}>
                                                    <Typography variant="caption" display="block">
                                                        {el.badge === "new" ? "Новинка" : el.badge === "top" ? "Хит" : el.badge}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </RouterLink>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </>
            )}
        </>
    )
});
export default Category;