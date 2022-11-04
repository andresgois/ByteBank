import { TransferenciaService } from './services/transferencia.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    //transferencias: any[] = [];

    constructor(private service: TransferenciaService){ }

    // transferir($event: any){
    //     console.log($event);
    //     this.service.adicionar($event);
    // }
    
    // transferi: any[] = [];
  
    // transferir($event: any){
    //     console.log($event)
    //     const transferir = { ...$event, data: new Date()};
    //     this.transferi.push(transferir)
    // }

}
