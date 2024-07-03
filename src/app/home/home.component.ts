import { Component, OnInit } from '@angular/core';
import { IndicadorService } from '../indicador.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Home';
  indicadores: any;

  constructor(private indicadorService: IndicadorService,
    private router: Router,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDatosService()
  }

  navigateToOtraPagina(codigo: string) {
    this.router.navigate(['/otra-pagina'], { queryParams: { codigo: codigo } });
  }

  navigateToOtraPaginaDetalle(codigo: string,title: string,
    date: string,
    valor: string,
    unity: string) {
    this.router.navigate(['/otra-detalle'], { queryParams: { codigo: codigo,
      date: date,
      valor: valor,
      unity: unity
    } });
  }
  loadDatosService(): void {
    this.indicadorService.getIndicadores()
      .subscribe(
        (data: any) => {
          this.indicadores = data;
          console.log(this.indicadores); 
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Error al cargar indicadores:', error);
        }
      );
  }
}
