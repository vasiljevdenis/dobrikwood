import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Rating, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import img1 from '../../images/loshadki-kachalki.jpg';
import img2 from '../../images/stoly-stulya.jpg';
import img3 from '../../images/comody-stellazhi.jpg';
import img4 from '../../images/igrushki.jpg';

const Category = () => {

    const [goods, setGoods] = React.useState([]);

    const { categoryName } = React.useParams();
  
    React.useEffect(() => {
      axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName)
          .then(res => {
            let json = res.data;
            setGoods(json);
          })
          .catch(err => {
          })
          .finally(() => {            
          });
    }, [categoryName]);

    return (
        <Grid container p={1} textAlign={'center'}>
             {
                store.allCategories.map((el, i) => {
                    return (
                        <Grid key={'product' + i} item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                        <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + categoryName + '/' + el.path}>
                            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={el.img1}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {el.name}
                                        </Typography>
                                        <Divider />
                                        <Rating name="read-only" value={4} readOnly />
                                        <p style={{textAlign: 'right'}}>
                                        <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                            color: 'rgba(0, 0, 0, 0.5)',
                                            p: 1
                                        }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                        <Typography variant="h6" component="span" gutterBottom sx={{
                                            color: 'white',
                                            background: '#60a47c',
                                            p: 1
                                        }}>{el.price === 0 ? '' : el.price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </RouterLink>
                    </Grid>
                    );
                })
            }
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/product'}>
                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={img4}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Лошадки-качалки
                                </Typography>
                                <Divider />
                                <Rating name="read-only" value={4} readOnly />
                                <p style={{textAlign: 'right'}}>
                                <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                    color: 'rgba(0, 0, 0, 0.5)',
                                    p: 1
                                }}><del>1 790 Р</del></Typography>
                                <Typography variant="h6" component="span" gutterBottom sx={{
                                    color: 'white',
                                    background: '#60a47c',
                                    p: 1
                                }}>1 790 ₽</Typography>
                                </p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
        </Grid>
    )
};

export default Category;