import { Box, Typography } from "@mui/material";
import * as React from "react";
import aboutus from '../../images/aboutus.jpg';

const About = () => {
  return (
    <>
      <Typography variant="h4" component="h2" m={2}>
        Контакты
      </Typography>
      <Box sx={{
        maxWidth: '500px',
        width: '100%',
        float: { xs: 'none', md: 'right' },
        my: 1,
        mx: {xs: 0, md: 1}
      }}>
        <img src={aboutus} alt="О нас" style={{
          width: '100%'
        }} />
      </Box>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        В городе на Волге - Чебоксарах есть <b>семейная мастерская "Добрик-wood"</b>, где делают <b>изделия из дерева с любовью.</b>
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        <b>В 2017 году</b> была создана первая лошадка-качалка для дочери, с неё и <b>началась история нашей мастерской.</b>
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Начиналось всё как "хобби после работы" в самом обычном гараже.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Но, когда мы увидели какой отклик и какая поддержка идёт от людей - наших клиентов, мы поняли что то, что мы делаем <b>нужно людям</b>, и это вдохновило нас на дальнейший рост и развитие.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Сейчас у нас есть полноценная мастерская по дереву, мы активно расширяем ассортимент нашей продукции.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Для изготовления мебели, лошадок-качалок мы стараемся выбирать только <b>безопасные, экологичные материалы</b>, такие как: бук, дуб, берёза, березовая фанера высшего сорта.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Как правило, такие изделия <b>не найти в обычном магазине.</b>
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Над каждым заказом работаем индивидуально, стараемся учесть все пожелания клиента.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Так как мы сами воспитываем двоих детей, мы хорошо понимаем, что <b>важно каждому заботливому родителю.</b>
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        В первую очередь, всё то что предназначено для детей должно быть <b>безопасным.</b>
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Все контактные места деталей <b>сглаженные</b> - нет острых углов, об которые ребенок может больно удариться.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        <b>Тщательная шлифовка</b>, чтобы не было шершавых краёв и зазубрин.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Лако-красочные материалы на водной основе, без запаха.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Стараемся делать на совесть, при аккуратном использовании наши изделия будут служить долго, не только для одного ребёнка.
      </Typography>
      <Typography variant="body1" component="p" mx={2} gutterBottom>
        Так же мы считаем что мебель для детей должна быть эстетичной, стильной, чтобы в детской комнате было уютно и красиво, а так же чтобы с детства привить ребенку хороший вкус и чувство стиля.
      </Typography>
    </>
  )
};

export default About;