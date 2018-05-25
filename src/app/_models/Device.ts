export class Device {
    _id: string;
    descripcion: string;
    host: string;
    puerto: number;
    __v: number;
    modulos: string[];
    modulosInfo: { DHT: { temp: number } };
}
