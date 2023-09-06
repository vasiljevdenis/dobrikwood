import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid, LinearProgress, Rating, Typography } from "@mui/material";
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
                                    <Grid key={'product' + i} item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                                        <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + categoryName + '/' + el.path}>
                                            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                                <CardActionArea>
                                                    <Carousel items={[
                                                        {
                                                            image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '1.jpg',
                                                            link: '#'
                                                        },
                                                        {
                                                            image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '2.jpg',
                                                            link: '#'
                                                        },
                                                        {
                                                            image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '3.jpg',
                                                            link: '#'
                                                        }
                                                    ]} dots={true} arrows={false} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {el.name}
                                                        </Typography>
                                                        <Divider />
                                                        <Rating name="read-only" value={el.rate} readOnly />
                                                        <p style={{ textAlign: 'right' }}>
                                                            <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                                                color: 'rgba(0, 0, 0, 0.5)',
                                                                p: 1
                                                            }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                                            <Typography variant="h6" component="span" gutterBottom sx={{
                                                                color: 'white',
                                                                background: '#60a47c',
                                                                p: 1
                                                            }}>{el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                        </p>
                                                    </CardContent>
                                                </CardActionArea>
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