import { Component, Input, NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { single, horizontal, multiHorizontal } from './data';

@Component({
  selector: 'graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent{

  single!: any[];
  horizontal!:any[];
  multiHorizontal!: any[];
 
  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  // options
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any= {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#AAAAAB']
  };

  constructor() {
    Object.assign(this, { single, horizontal, multiHorizontal });
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
