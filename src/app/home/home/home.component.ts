import { Component, OnInit } from '@angular/core';

import { 
   EspserviceService 
} from '../../espservice.service';  
import { 
   Device 
} from '../../_models/Device';  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
devices: any[];
irCodes: any[];
checked: boolean;
   constructor(private espserviceService: EspserviceService) {
    }


  ngOnInit() {
  	this.irCodes = []
  	this.devices = []
  	this.checked = false
  	this.refreshData()
  	setInterval (() => {
      this.refreshData();
    }, 15000)
  	
  }
  switchRelay(device){
  	this.checked = !this.checked
  	this.espserviceService.switchRelay(device._id, this.checked).subscribe(resp => { 
  		return
  	})
  }
  sendIRCode(device,code, event: Event){
  	event.preventDefault();
  	console.log(this.irCodes)
  	this.espserviceService.sendIRCodes(device._id, code._id).subscribe(resp => { 
  		return
  	})
  	
  	
  }
  onSubmit (event: Event) {
  	console.log("sub")
  	
  	event.preventDefault();
  	return
  }
  refreshData(){
  	var espserviceService = this.espserviceService ;
	this.espserviceService.getDevices().subscribe(devices => { 
		//this.devices = devices; 
		for(var i = 0; i < devices.length; i++){

			for(var j = 0; j < devices[i].modulos.length; j++){

				var modulo = devices[i].modulos[j];
				if (modulo == "DHT"){
					if (!devices[i].modulosInfo) devices[i].modulosInfo = {  }
					if (!devices[i].modulosInfo.DHT) devices[i].modulosInfo.DHT = {  }
					var that = this;
					var thatI = i
					espserviceService.getDHTInfo(devices[i]._id).subscribe(tempInf => { 
						if (this.devices[thatI]) this.devices[thatI].modulosInfo.DHT = tempInf;
					})
				}

				if (modulo == "RELAY"){
					if (!devices[i].modulosInfo) devices[i].modulosInfo = {  }
					if (!devices[i].modulosInfo.RELAY) devices[i].modulosInfo.RELAY = {  }
					if (this.devices[thatI]) devices[i].modulosInfo.RELAY = { }
				}

				if((modulo == "IRSender") && (this.irCodes.length == 0)){
					if (!devices[i].modulosInfo) devices[i].modulosInfo = {  }
					if (!devices[i].modulosInfo.IRSender) devices[i].modulosInfo.IRSender = {  }
					if (this.devices[thatI]) devices[i].modulosInfo.IRSender = { }
					espserviceService.getIRCodes().subscribe(irCodes => { 
						this.irCodes = irCodes
					})
				}
			}
      console.log(devices[i])
			if (!this.devices[i]){
				this.devices.push(devices[i])
			}else{
				//this.devices[i] = devices[i]
			}
			
		}

	});
  }
}
