import { Component, OnInit } from '@angular/core';

import {
	EspserviceService
} from '../../espservice.service';
import {
	Device
} from '../../_models/Device';
@Component({
	selector: 'app-dispositivos',
	templateUrl: './dispositivos.component.html',
	styles: []
})
export class DispositivosComponent implements OnInit {
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

	refreshData(){
		var espserviceService = this.espserviceService ;
	  	this.espserviceService.getDevices().subscribe(devices => { 
		  this.devices = devices
	  	})
	}
}
