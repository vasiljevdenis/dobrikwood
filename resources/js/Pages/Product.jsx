import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, LinearProgress, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import img4 from '../../images/igrushki.jpg';
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {

    const [expanded, setExpanded] = React.useState('panel1');

    const [product, setProduct] = React.useState({});

    const [progress, setProgress] = React.useState(true);

    const [count, setCount] = React.useState(0);

    const [rate, setRate] = React.useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { categoryName, productName } = useParams();

    React.useEffect(() => {
        setProgress(true);
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName + '/' + productName)
            .then(res => {
                let json = res.data[0];
                setProduct(json);
                setRate(product.rate);
                setProgress(false);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, [categoryName, productName]);

    const changeRate = (newValue) => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName + '/' + productName + '/rate',
            {
                id: product.id,
                rate: newValue
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
            });
    }

    return (
        <>
            {progress ? (<LinearProgress color="primary" />) : (
                <Grid container p={2}>
                    <Grid item xs={12}>
                        <Card sx={{ width: '100%', mx: 'auto' }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} md={6} p={1} textAlign={'center'}>
                                        <img src={import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + product.category + '/' + product.path + '1.jpg'} alt="" style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={6} p={1}>
                                        <Typography gutterBottom variant="h4" component="h1">
                                            {product.name}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="caption" display="block" gutterBottom>
                                            Код товара: <span>{product.id}</span>
                                        </Typography>
                                        <p>
                                            <Typography variant="h5" component="span" gutterBottom sx={{
                                                color: 'white',
                                                background: '#60a47c',
                                                p: 1
                                            }}>{product.price === 0 ? '' : product.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                            <Typography variant="subtitle1" component="span" gutterBottom sx={{
                                                color: 'rgba(0, 0, 0, 0.5)',
                                                p: 1,
                                                my: 1
                                            }}><del>{product.lastPrice === 0 ? '' : product.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                        </p>
                                        <Button sx={{ color: 'white', my: 1, display: count > 0 ? 'none' : 'inline-flex' }} variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => setCount(1)}>
                                            В корзину
                                        </Button>
                                        <Box display={count > 0 ? 'block' : 'none'}>
                                            <IconButton color="primary" aria-label="Minus button">
                                                <RemoveCircleIcon />
                                            </IconButton>
                                            <Typography variant="h6" component="span" gutterBottom sx={{
                                                border: '1px solid rgba(0,0,0,0.14)',
                                                px: 1.5,
                                                py: 0.1,
                                                verticalAlign: 'middle'
                                            }}>{count}</Typography>
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
                                        <Rating name="product-rate" value={product.rate} onChange={(evenet, newValue) => changeRate(newValue)} />
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
                                                <Typography dangerouslySetInnerHTML={{
                                                    __html: product.description
                                                }}></Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </>
    )
};

export default Product;