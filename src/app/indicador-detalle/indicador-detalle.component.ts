import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from '../indicador.service';
import { formatDate } from '@angular/common';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-indicador-detalle',
  templateUrl: './indicador-detalle.component.html',
  styleUrls: ['./indicador-detalle.component.css']
})
export class IndicadorDetalleComponent implements OnInit {
  codigo: string;
  title: string;
  date: string;
  valor: string;
  unity: string;
  indicadores: any;

  // chartData: ChartDataSets[] = [{ data: [], label: 'Indicador' }];
  // chartLabels: Label[] = [];
  // chartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // chartColors: Color[] = [
  //   {
  //     borderColor: '#0077cc',
  //     backgroundColor: 'rgba(0, 119, 204, 0.3)',
  //   },
  // ];
  // chartLegend = true;
  // chartPlugins = [];
  // chartType = 'line';

  /**
   Se debe mostrar un gráfico 
   (el tipo queda a elección del desarrollador)
    con los valores de los 10 últimos días para el dólar, 
    euro y la UF, mientras que para el IPC y la UTM 
    se deben mostrar los datos de los últimos 12 meses.
   */

  constructor(private location: Location,
    private route: ActivatedRoute,
    private indicadorService: IndicadorService) {}

  ngOnInit() {
    this.codigo = this.route.snapshot.queryParams['codigo'];
    this.title = this.route.snapshot.queryParams['title'];
    this.date = this.route.snapshot.queryParams['date'];
    this.valor = this.route.snapshot.queryParams['valor'];
    this.unity = this.route.snapshot.queryParams['unity'];

    this.title = this.codigo

    console.log('Código recibido:', this.codigo);
    console.log('Código title:', this.title);
    console.log('Código date:', this.date);
    console.log('Código valor:', this.valor);
    console.log('Código unity:', this.unity);

    switch ( this.codigo ) {
      case "ipc":
        this.loadDataServiceIndicador12Meses(this.codigo)
        break;
      case "utm":
        this.loadDataServiceIndicador12Meses(this.codigo)
          break;
      case "dolar":
        this.loadDataService10Dias(this.codigo)
          break;
      case "uf":
        this.loadDataService10Dias(this.codigo)
          break;
      case "euro":
        this.loadDataService10Dias(this.codigo)
        break;
      default: 
         this.loadDataService10Dias(this.codigo)
          break;
   }
    
  }
  goBack() {
    this.location.back();
  }

  loadDataService10Dias(codigo: string): void {
    this.indicadorService.getIndicadoresSolo(codigo)
      .subscribe(
        (data: any) => {
          const now = new Date();
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(now.getDate() - 10);
          this.indicadores = data.serie.filter((item: any) => {
            const itemDate = new Date(item.fecha);
            return itemDate >= tenDaysAgo && itemDate <= now;
          });
          console.log(this.indicadores);

          // this.chartData[0].data = this.indicadores.map((item: any) => item.valor);
          // this.chartLabels = this.indicadores.map((item: any) => item.fecha);
        },
        (error: any) => {
          console.error('Error al cargar indicadores:', error);
        }
      );
  }

  loadDataService12Meses(codigo: string): void {
    this.indicadorService.getIndicadoresSolo(codigo)
      .subscribe(
        (data: any) => {
          const now = new Date();
          const twelveMonthsAgo = new Date();
          twelveMonthsAgo.setMonth(now.getMonth() - 12);
          this.indicadores = data.serie.filter((item: any) => {
            const itemDate = new Date(item.fecha);
            return itemDate >= twelveMonthsAgo && itemDate <= now;
          });
          console.log(this.indicadores);
          // this.chartData[0].data = this.indicadores.map((item: any) => item.valor);
          // this.chartLabels = this.indicadores.map((item: any) => item.fecha);
        },
        (error: any) => {
          console.error('Error al cargar indicadores:', error);
        }
      );
  }

  loadDataServiceIndicador12Meses(codigo: string): void {
    this.indicadorService.getIndicadoresSolo(codigo)
      .subscribe(
        (data: any) => {
          const now = new Date();
          const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

          this.indicadores = data.serie.filter((item: any) => {
            const itemDate = new Date(item.fecha);
            return itemDate >= lastYear;
          });

          console.log(this.indicadores);

          // this.chartData[0].data = this.indicadores.map((item: any) => item.valor);
          // this.chartLabels = this.indicadores.map((item: any) => item.fecha);
        },
        (error: any) => {
          console.error('Error al cargar indicadores:', error);
        }
      );
  }

  formatearFechas(fechas: string): string {
    const fecha = new Date(fechas); 
    return formatDate(fecha, 'yyyy-MM-dd', 'en-US'); 
  }

}
