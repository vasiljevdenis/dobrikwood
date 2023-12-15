import React, { useEffect, useState } from 'react'

function CdekMap({ cartState, order, setOrder }) {

    const [map, setMap] = useState(null);

    const changeOrder = (type, tariff, address) => {
        console.log(order);
        let courier = false;
        let city = "";
        let street = "";
        let house = "";
        let apartment = "";
        if (type === "door") {
            courier = true;
            address.components.forEach(el => {
                if (el.kind === "locality") city = el.name;
                if (el.kind === "street") street = el.name;
                if (el.kind === "house") house = el.name;
            });
        } else {
            courier = false;
            city = address.city;
            street = address.address.split(',')[0].trim();
            house = address.address.split(',')[1].trim();
        }
        const newOrder = {
            ...order,
            city: city,
            street: street,
            house: house,
            apartment: apartment,
            cdek: {
                code: tariff.tariff_code
            },
            courier: courier,
            delivery_sum: Math.ceil(tariff.delivery_sum * 1.1),
            delivery_days: tariff.period_min === tariff.period_max ? [tariff.period_min] : [tariff.period_min, tariff.period_max]
        };
        setOrder(newOrder);
    }

    useEffect(() => {
        if (!map) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/cdek-it/widget@latest/dist/cdek-widget.umd.js';
            document.head.appendChild(script);
            script.onload = () => {
                const packages = Object.values(cartState.goods).map(item => {
                    const obj = {
                        weight: item.weight,
                        length: item.length,
                        width: item.width,
                        height: item.height
                    };
                    const arr = Array.from({ length: item.count }, () => Object.assign({}, obj));
                    return arr;
                }).flat();
                const newMap = new window.CDEKWidget({
                    from: {
                        country_code: 'RU',
                        city: 'Чебоксары',
                        address: 'ул. Гражданская, 95',
                    },
                    root: 'cdek-map',
                    tariffs: {
                        office: [136, 234],
                        door: [137, 233],
                        pickup: [368, 378]
                    },
                    apiKey: import.meta.env.VITE_APP_YMAPS_API_KEY,
                    servicePath: '/api/cdek/service',
                    goods: packages,
                    defaultLocation: [37.610431, 55.759500],
                    onChoose: changeOrder
                });
                setMap(newMap);
            };
        }
    }, []);
    return (
        <div id="cdek-map" style={{ width: "100%", height: 500 }}></div>
    )
}

export default CdekMap