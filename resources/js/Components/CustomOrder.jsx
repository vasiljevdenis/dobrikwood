import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import appState from "../store/appState";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from "react-autosize-textarea";
import ReactInputMask from "react-input-mask";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";

const CustomOrder = observer(() => {

  const [store] = React.useState(appState);
  const [order, setOrder] = React.useState({
    name: '',
    phone: '',
    type: '',
    material: '',
    color: '',
    size: '',
    other: '',
    file: null
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const openCustomOrderModal = () => {
    store.openCustomOrderModal();
  }

  const closeCustomOrderModal = () => {
    store.closeCustomOrderModal();
  }

  const changeName = (val) => {
    setOrder({ ...order, name: val });
  }
  const changePhone = (val) => {
    setOrder({ ...order, phone: val });
  }
  const changeType = (val) => {
    setOrder({ ...order, type: val });
  }
  const changeMaterial = (val) => {
    setOrder({ ...order, material: val });
  }
  const changeColor = (val) => {
    setOrder({ ...order, color: val });
  }
  const changeSize = (val) => {
    setOrder({ ...order, size: val });
  }
  const changeOther = (val) => {
    setOrder({ ...order, other: val });
  }
  const changeFile = (file) => {
    setOrder({ ...order, file: file });
  }

  const notify = (severity, text) => {
    store.openSnackbar(severity, text);;
}

  const sendOrder = () => {
    let isValid = true;
    if (!order.name) {
      isValid = false;
    }
    if (!order.phone) {
      isValid = false;
    }
    if (!order.type) {
      isValid = false;
    }
    if (isValid) {
      let data = new FormData();
      data.append('name', order.name);
      data.append('phone', order.phone.replace(/[^\d+]/g, ""));
      data.append('other', order.other);
      data.append('type', order.type);
      data.append('material', order.material);
      data.append('color', order.color);
      data.append('size', order.size);
      data.append('file', order.file);
      axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/customorder/new', data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(res => {
          let result = res.data;
          if (result.status) {
            closeCustomOrderModal();
            notify('success', 'Успешно отправлено!');
          } else {
            notify('error', 'Ошибка сервера!');
          }
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
    <Dialog
      fullScreen={fullScreen}
      open={store.customOrderModalVal}
      onClose={store.closeCustomOrderModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" textAlign={'center'}>
        <span>Мастерская Добрик-wood</span> <CloseIcon sx={{ float: 'right', cursor: 'pointer' }} onClick={closeCustomOrderModal} />
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', px: 2 }}>
        <DialogContentText>
          Принимает заказы на изготовление мебели.
        </DialogContentText>
        <DialogContentText>
          Изготавливаем не только детскую, но и "взрослую" мебель из массива дерева, фанеры, ЛДСП
          по индивидуальным параметрам
        </DialogContentText>
        <DialogContentText variant="h5" my={1}>
          Заполните заявку и мы рассчитаем стоимость
        </DialogContentText>
        <DialogContentText variant="h5" my={1}>
          <ArrowDownwardIcon /><ArrowDownwardIcon /><ArrowDownwardIcon />
        </DialogContentText>
        <TextField
          label="Вид изделия"
          value={order.type}
          onChange={(event) => changeType(event.target.value)}
          variant="outlined"
          required
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          label="Материал"
          value={order.material}
          onChange={(event) => changeMaterial(event.target.value)}
          variant="outlined"
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          label="Расцветка"
          value={order.color}
          onChange={(event) => changeColor(event.target.value)}
          variant="outlined"
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          label="Размеры"
          helperText="Ширина, высота, глубина"
          value={order.size}
          onChange={(event) => changeSize(event.target.value)}
          variant="outlined"
          fullWidth
          sx={{ my: 1 }}
        />
        <TextareaAutosize
          rows={1}
          placeholder='Дополнительные характеристики'
          value={order.other}
          onChange={(event) => changeOther(event.target.value)}
          style={{
            width: '100%',
            lineHeight: '1.5',
            padding: '16.5px 14px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '1rem',
            margin: '8px 0'
          }}
        />
        <DialogContentText>
          {"Прикрепите фото: (Если у Вас есть эскиз или фото с примером)"}
        </DialogContentText>
        <MuiFileInput
          value={order.file}
          onChange={changeFile}
          placeholder="Выбрать файл"
          fullWidth
          sx={{ my: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachFileIcon />
              </InputAdornment>
            )
          }} />
        <TextField
          label="Имя"
          value={order.name}
          onChange={(event) => changeName(event.target.value)}
          variant="outlined"
          required
          fullWidth
          sx={{ my: 1 }}
        />
        <ReactInputMask mask="+7 (999) 999-99-99" value={order.phone} onChange={(event) => changePhone(event.target.value)}>
          <TextField
            label="Телефон для связи"
            variant="outlined"
            required
            fullWidth
            sx={{
              my: 1
            }}
          />
        </ReactInputMask>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="outlined" onClick={sendOrder}>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
});
export default CustomOrder;