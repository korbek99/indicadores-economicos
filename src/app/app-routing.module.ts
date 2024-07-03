import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndicadorListaComponent } from './indicador-lista/indicador-lista.component';
import { IndicadorDetalleComponent } from './indicador-detalle/indicador-detalle.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'otra-pagina', component: IndicadorListaComponent }, 
  { path: 'otra-detalle', component: IndicadorDetalleComponent }, 
  { path: '**', redirectTo: '' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
