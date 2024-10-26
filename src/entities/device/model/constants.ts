import { Device } from './types';

export const mockDevices: Device[] = [
    {
        id: 1,
        name: 'Сервер хранения данных',
        nodes: [
            { id: 1, name: 'Жесткий диск 1' },
            { id: 2, name: 'Жесткий диск 2' },
            { id: 3, name: 'RAID контроллер' },
        ],
    },
    {
        id: 2,
        name: 'Маршрутизатор Cisco',
        nodes: [
            { id: 1, name: 'Ethernet порт 1' },
            { id: 2, name: 'Ethernet порт 2' },
            { id: 3, name: 'Процессор управления трафиком' },
            { id: 4, name: 'Модуль резервного питания' },
        ],
    },
    {
        id: 3,
        name: 'Коммутатор Juniper',
        nodes: [
            { id: 1, name: 'Порт 10 Гбит/с' },
            { id: 2, name: 'Порт 1 Гбит/с' },
            { id: 3, name: 'Консольный порт' },
        ],
    },
    {
        id: 4,
        name: 'Система видео-наблюдения',
        nodes: [
            { id: 1, name: 'Камера наружного наблюдения' },
            { id: 2, name: 'Камера внутреннего наблюдения' },
            { id: 3, name: 'Записывающее устройство' },
            { id: 4, name: 'Сенсор движения' },
        ],
    },
];
