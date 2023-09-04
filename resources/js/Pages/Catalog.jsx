import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import appState from "../store/appState";

const Catalog = observer(() => {

    const [store] = React.useState(appState);

    return (
        <Grid container p={1} textAlign={'center'}>
            {
                store.allCategories.map((el, i) => {
                    return (
                        <Grid key={'categoryCard' + i} item xs={12} sm={6} md={4} p={1} textAlign={'center'}>
                            <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + el.path}>
                                <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={el.image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {el.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </RouterLink>
                        </Grid>
                    );
                })
            }
        </Grid>
    )
});
export default Catalog;