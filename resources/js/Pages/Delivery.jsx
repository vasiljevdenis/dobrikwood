import { Box, Typography } from "@mui/material";
import * as React from "react";
import dostavka from '../../images/dostavka.jpg';

const Delivery = () => {
    return (
        <>
            <Typography variant="h4" component="h2" m={2}>
                Условия доставки
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Доставка по России осуществляется <b>Почтой России</b> или транспортной компанией <b>СДЭК</b> на выбор
                заказчика.
                Возможна доставка курьером до двери.
                Также, по желанию клиента, отправляем транспортными компаниями: DPD, Boxberry, ПЭК и другими.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Лошадки-качалки, мебель отправляются В РАЗОБРАННОМ ВИДЕ в комплекте с инструкцией по сборке и крепежом. Сроки и стоимость доставки рассчитываются индивидуально, т.к. зависит от местоположения города.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                <b>Самовывоз</b> доступен в городе Чебоксары.
            </Typography>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <img src={dostavka} alt="О нас" style={{
                    maxWidth: '500px',
                    width: '100%',
                    margin: 1
                }} />
            </Box>
            <Typography variant="h4" component="h2" m={2}>
                Условия оплаты
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Для товаров в наличии заказ принимается по предоплате 100%.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Отправка осуществляется в течении 1-2 рабочих дней (пн-пт) с момента оплаты.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Если изделие изготавливается по предзаказу, то 50 % стоимости оплачивается при оформлении заказа.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                С момента внесения оплаты клиентом заказ считается принятым. Остальная часть оплачивается по готовности, мы высылаем заказчику фото готового изделия.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Срок изготовления занимает ориентировочно 5-7 дней (лучше уточнить дополнительно при оформлении заказа). Отправляем посылку по факту полной оплаты клиентом.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Оплата за доставку: Почтой - в день отправки посылки, СДЭКом – при получении посылки. Отправка осуществляется из города Чебоксары.
            </Typography>
            <Typography variant="h5" component="h3" m={2}>
                Возврат товара
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Что делать, если Вы получили бракованный товар? Тут следует сразу оговорить, что считается браком:
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Брак – это значительное повреждение/дефект явно заметный глазу, делающий невозможной дальнейшую эксплуатацию изделия.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Если сразу после получения и осмотра товара, вы обнаружите такой дефект – свяжитесь с нами через форму для обратной связи или WhatsApp 89196628330, прислав фотографию, на которой отчетливо виден брак.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Если факт недоброкачественности товара действительно подтвердится, возможен обмен товара или полный возврат его стоимости – на выбор, а также возмещение всех расходов, связанных с его как прямой, так и обратной доставкой – в течении 7 дней после возврата.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                ВНИМАНИЕ! Браком не могут являться мелкие эстетические несовершенства, естественные особенности строения древесины, такие как сучки, смоляные карманы, микротрещины и мелкие сколы.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Если дефект малозначительный, не влияющий на эксплуатационные характеристики – не зависимо от того, при каких условиях произошло повреждение изделия – возможна выплата денежной компенсации.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Размер компенсации устанавливается индивидуально, в зависимости от степени повреждения изделия.
            </Typography>
            <Typography variant="h5" component="h3" m={2}>
                Возврат качественного товара
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                Если наше изделие не устроило вас по одной из причин — не подошел размер, не устроил цвет, дизайн или Вы просто хотите отменить покупку, Вы можете в течение 7 дней после получения посылки возвратить товар любым удобным для Вас способом.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                При этом, изделие не должно иметь видимых следов эксплуатации, сохранять первоначальный товарный вид, а так же должно быть надёжно упаковано для защиты от повреждений при транспортировке.
            </Typography>
            <Typography variant="body1" component="p" mx={2} gutterBottom>
                При соблюдении этого условия - мы вернем деньги в течение 3-х рабочих дней после его возврата. Транспортные расходы в этом случае оплачивает покупатель.
            </Typography>
        </>
    )
};

export default Delivery;