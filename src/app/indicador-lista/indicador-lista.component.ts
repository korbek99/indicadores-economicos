import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from '../indicador.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-indicador-lista',
  templateUrl: './indicador-lista.component.html',
  styleUrls: ['./indicador-lista.component.css']
})

export class IndicadorListaComponent implements OnInit {
  codigo: string;
  indicadores: any;
  title: string;
  constructor(private location: Location,
    private route: ActivatedRoute,
    private indicadorService: IndicadorService) {}

  ngOnInit() {
    this.codigo = this.route.snapshot.queryParams['codigo'];
    this.title = this.codigo
    this.loadDataServiceIndicador(this.codigo)
    console.log('Código recibido:', this.codigo);

    this.loadDataServiceSetting(this.codigo)

  }

  loadDataServiceSetting(codigo: string): void {

    switch ( this.codigo ) {
      
      case "ipc":
        this.loadDataServiceIndicador12Meses(this.codigo)
        break;
      case "utm":
        this.loadDataServiceIndicador12Meses(this.codigo)
          break;
      case "dolar":
        this.loadDataServiceIndicador(codigo)
          break;
      case "uf":
        this.loadDataServiceIndicador(codigo)
          break;
      case "euro":
        this.loadDataServiceIndicador(codigo)
        break;
      default: 
      this.loadDataServiceIndicador(codigo)
          break;
   }
    
  }

  loadDataServiceIndicador(codigo: string): void {
    this.indicadorService.getIndicadoresSolo(codigo)
      .subscribe(
        (data: any) => {
          this.indicadores = data.serie;
          console.log(this.indicadores); 
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
        },
        (error: any) => {
          console.error('Error al cargar indicadores:', error);
        }
      );
  }

  goBack() {
    this.location.back();
  }
  formatearFechas(fechas: string): string {
    const fecha = new Date(fechas); 
    return formatDate(fecha, 'yyyy-MM-dd', 'en-US'); 
  }
}
