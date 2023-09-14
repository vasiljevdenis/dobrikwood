import { observer } from "mobx-react-lite";
import * as React from "react";
import appState from "../store/appState";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = observer(() => {

  const [store] = React.useState(appState);

  const [progress, setProgress] = React.useState(true);

  const navigate = useNavigate();

  const notify = (severity, text) => {
    store.openSnackbar(severity, text);;
  }

  const initWidget = (token) => {
    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
    document.head.append(script);
    script.onload = function () {
      const checkout = new window.YooMoneyCheckoutWidget({
        confirmation_token: token,
        customization: {
          colors: {
            control_primary: '#60a47c',
            control_primary_content: '#ffffff'
          },
          // payment_methods: ['bank_card', 'yoo_money', 'sberbank', 'sbp']
        },
        error_callback: function (error) {
          notify('error', error);
        }
      });

      checkout.on('success', () => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/order/notification?id=' + store.orderIdVal)
          .then(res => {
            let result = res.data;
            if (result) {
              axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/order/mail?id=' + store.orderIdVal)
                .then(res => {
                  let result = res.data;
                  if (result) {
                    checkout.destroy();
                    navigate('/success');
                  }
                })
                .catch(err => {
                })

                .finally(() => {
                });
            }
          })
          .catch(err => {
          })

          .finally(() => {
          });
      });
      checkout.on('fail', () => {
        checkout.destroy();
        navigate('/fail');
      });
      checkout.render('payment-form');
    }
  };

  React.useEffect(() => {
    if (store.orderIdVal > 0) {
      setProgress(true);
      axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/payment', {
        orderId: store.orderIdVal
      })
        .then(res => {
          let result = res.data;
          if (result.status === "pending") {
            initWidget(result.confirmation_token);
            setProgress(false);
          }
        })
        .catch(err => {
        })

        .finally(() => {
        });
    } else {
      if (store.cartTotalVal === 0) {
        navigate('/');
      } else {
        navigate('/cart');
      }
    }
  }, [store.orderIdVal]);

  return (
    <>
      {progress ? (<LinearProgress color="primary" />) : (
        <>
          <Typography variant="h4" component="h2" m={2}>
            Оплата заказа
          </Typography>
          <Grid container p={1} textAlign={'center'}>
            <Grid item xs={12} p={2}>
              <Box id="payment-form"></Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
});
export default Payment;