import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import img4 from '../../images/igrushki.jpg';

const Product = () => {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const { categoryName } = React.useParams();

    // React.useEffect(() => {
    //   fetch(`https:///${categoryName}`)
    //     .then((res) => res.json())
    //     .then((data) => setPost(data));
    // }, [categoryName]);

    return (
        <Grid container p={2}>
            <Grid item xs={12}>
                <Card sx={{ width: '100%', mx: 'auto' }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} md={6} p={1} textAlign={'center'}>
                                <img src={img4} alt="" style={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={12} md={6} p={1}>
                                <Typography gutterBottom variant="h4" component="h1">
                                    Лошадки-качалки
                                </Typography>
                                <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="caption" display="block" gutterBottom>
                                    Код товара: <span></span>
                                </Typography>
                                <p>
                                    <Typography variant="h5" component="span" gutterBottom sx={{
                                        color: 'white',
                                        background: '#60a47c',
                                        p: 1
                                    }}>1 790 ₽</Typography>
                                    <Typography variant="subtitle1" component="span" gutterBottom sx={{
                                        color: 'rgba(0, 0, 0, 0.5)',
                                        p: 1,
                                        my: 1
                                    }}><del>1 790 Р</del></Typography>
                                </p>
                                <Button sx={{ color: 'white', my: 1 }} variant="contained" startIcon={<AddShoppingCartIcon />}>
                                    В корзину
                                </Button>
                                <Box>
                                <IconButton color="primary" aria-label="Minus button">
                                    <RemoveCircleIcon />
                                </IconButton>
                                <Typography variant="h6" component="span" gutterBottom sx={{
                                        border: '1px solid rgba(0,0,0,0.14)',
                                        px: 1.5,
                                        py: 0.1
                                    }}>1</Typography>
                                <IconButton color="primary" aria-label="Plus button">
                                    <AddCircleIcon />
                                </IconButton>
                                </Box>
                                <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="body2" display="block" gutterBottom>
                                    <LocalShippingOutlinedIcon sx={{ verticalAlign: 'sub' }} fontSize="small" /> Доставка по всей России
                                </Typography>
                                <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="body2" display="block" gutterBottom>
                                    <PersonOutlinedIcon sx={{ verticalAlign: 'sub' }} fontSize="small" /> Самовывоз из г. Чебоксары
                                </Typography>
                            </Grid>
                            <Grid item xs={12} p={1}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                                    border: '1px solid rgba(0,0,0,0.14)',
                                    boxShadow: 'none'
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        sx={{
                                            background: '#c4ffdc'
                                        }}
                                    >
                                        <Typography sx={{ color: '#60a47c' }}>
                                            Описание товара
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                            Aliquam eget maximus est, id dignissim quam.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Product;