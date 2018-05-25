import { Component, OnInit, Input } from '@angular/core';

import {
	EspserviceService
} from '../../espservice.service';
import {
	Device
} from '../../_models/Device';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-graficos',
	templateUrl: './graficos.component.html',
	styles: []
})
export class GraficosComponent {
	devices: any[];
	irCodes: any[];
	checked: boolean;
	@Input() tempValues: any[] = [{ data: []}];
	@Input() tempLabels: Array<any> = [];
	@Input() lValues: any[] = [{ data: []}];
	@Input() lLabels: Array<any> = [];
	@Input() hValues: any[] = [{ data: []}];
	@Input() hLabels: Array<any> = [];
	public lineChartOptions: any = {
		responsive: true,
		maintainAspectRatio: true,
		elements: { point: { radius: 0 } }
	};

	public lineChartColors: Array<any> = [
		{ // grey
			backgroundColor: 'rgba(255, 147, 5, 0.2)',
			borderColor: 'orange',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: 'orange',
			pointHoverBorderColor: 'orange'
		}
	];
	public lineChartLegend: boolean = false;
	public lineChartType: string = 'line';
	dateFromV = new FormControl(new Date());
	dateToV = new FormControl(new Date());
	constructor(private espserviceService: EspserviceService, private adapter: DateAdapter<any>) {
		this.adapter.setLocale('es');
		this.refreshData(this.formatDate(new Date()), this.formatDate(new Date()))
	}
	formatDateTime(date) {
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return day + '/' + (monthIndex + 1) + '/' + year + "-" + date.getHours() + ':' + date.getMinutes();
	}

	public formatDate = function (date) {
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return day + ' ' + (monthIndex + 1) + ' ' + year;
	}
	refreshData(from, to) {
		this.tempLabels = []
		this.tempValues = [{ data: [] }]
		this.lLabels = []
		this.lValues = [{ data: [] }]
		this.hLabels = []
		this.hValues = [{ data: [] }]
		var tempT = []
		var tempH = []
		var tempL = []
		this.espserviceService.getHistorialSensor("Test", from, to).subscribe(data => {
			this.tempValues = [{ data: [] }]
			this.tempLabels = []
			for (var idx = 0; idx < data.length; idx++) {
				if (data[idx]._id == "T") {
					tempT = [{ data: data[idx].valores, label: data[idx]._id }]
					for (var i = 0; i < data[idx].date.length; i++) {
						this.tempLabels.push(this.formatDateTime(new Date(data[idx].date[i])))
					}
				}
			}

			this.lValues = [{ data: [] }]
			this.lLabels = []
			for (var idx = 0; idx < data.length; idx++) {
				if (data[idx]._id == "L") {
					tempL = [{ data: data[idx].valores, label: data[idx]._id }]
					for (var i = 0; i < data[idx].date.length; i++) {
						this.lLabels.push(this.formatDateTime(new Date(data[idx].date[i])))
					}
				}
			}

			this.hValues = [{ data: [] }]
			this.hLabels = []
			for (var idx = 0; idx < data.length; idx++) {
				if (data[idx]._id == "H") {
					tempH = [{ data: data[idx].valores, label: data[idx]._id }]
					for (var i = 0; i < data[idx].date.length; i++) {
						this.hLabels.push(this.formatDateTime(new Date(data[idx].date[i])))
					}
				}
			}
			setTimeout(() => {
				this.tempValues = []
				this.tempValues = tempT
				this.hValues = []
				this.hValues = tempH
				this.lValues = []
				this.lValues = tempL
			}, 50);
		})
	}
}
