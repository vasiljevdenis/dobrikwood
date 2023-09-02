import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import img1 from '../../images/loshadki-kachalki.jpg';
import img2 from '../../images/stoly-stulya.jpg';
import img3 from '../../images/comody-stellazhi.jpg';
import img4 from '../../images/igrushki.jpg';

const Catalog = () => {
    return (
        <Grid container p={1} textAlign={'center'}>
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/category'}>
                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={img1}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Лошадки-качалки
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/category'}>
                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={img2}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Лошадки-качалки
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/category'}>
                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={img3}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Лошадки-качалки
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/category'}>
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
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                <RouterLink style={{ textDecoration: 'none' }} to={'/category'}>
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
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </RouterLink>
            </Grid>
        </Grid>
    )
};

export default Catalog;