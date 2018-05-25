import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class EspserviceService {
  url: string;
  public tempValues: Array<any> = [];
  public tempLabels: Array<any> = [];
  constructor(private http: Http) {
    //DEV
    this.url = "http://192.168.1.134:8080";
    //PRD
    //this.url = "";
  }

  getDevices() {
    return this.http.get(this.url + '/api/esp/devices').map((response: Response) => response.json())
  }
  getIRCodes() {
    return this.http.get(this.url + '/api/ir/codes').map((response: Response) => response.json())
  }
  sendIRCodes(deviceID, codeID) {
    return this.http.post(this.url + '/api/ir/sender/send', { _id: codeID, deviceID: deviceID }).map((response: Response) => response.json())
  }
  getDHTInfo(deviceID) {
    return this.http.get(this.url + '/api/dht/' + deviceID).map((response: Response) => response.json())
  }
  getLuzInfo(deviceID) {
    return this.http.get(this.url + '/api/luz/' + deviceID).map((response: Response) => response.json())
  }
  getHistorialSensor(deviceID, dateFrom, dateTo) {
    return this.http.get(this.url + '/api/dht/historial/' + deviceID + "?from=" + dateFrom + "&to=" + dateTo).map((response: Response) => response.json())
  }
  switchRelay(deviceID, value) {
    if (value) {
      return this.http.get(this.url + '/api/relay/on/' + deviceID).map((response: Response) => response.json())
    } else {
      return this.http.get(this.url + '/api/relay/off/' + deviceID).map((response: Response) => response.json())
    }
  }
}
