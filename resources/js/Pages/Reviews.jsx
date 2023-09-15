import * as React from "react";
import review1 from "../../images/review1.jpg";
import review2 from "../../images/review2.jpg";
import review3 from "../../images/review3.jpg";
import review4 from "../../images/review4.jpg";
import review5 from "../../images/review5.jpg";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ImageList, ImageListItem, Slide, Typography, useMediaQuery, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Reviews = () => {

    const itemData = [
        {
            img: review1,
            title: '',
        },
        {
            img: review2,
            title: '',
        },
        {
            img: review3,
            title: '',
        },
        {
            img: review4,
            title: '',
        },
        {
            img: review5,
            title: '',
        }
    ];

    const [open, setOpen] = React.useState(false);
    const [dialogImage, setDialogImage] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (image) => {
        setOpen(true);
        setDialogImage(image);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h4" component="h2" m={2}>
                Отзывы
            </Typography>
            <ImageList sx={{ width: '100%', height: 'auto', overflow: 'hidden' }} cols={window.innerWidth > 600 ? 3 : 2} rowHeight={500}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}
                        onClick={() => handleClickOpen(item.img)}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                transition: 'transform .2s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: 'scale(1.03)'
                            }
                        }}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <img
                        src={dialogImage}
                        alt={''}
                        loading="lazy"
                        style={{ width: '100%' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Reviews;