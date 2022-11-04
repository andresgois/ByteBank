import { Component, EventEmitter, Output } from '@angular/core';
import { error } from 'console';
import { Transferencia } from '../models/transferencia.model';
import { TransferenciaService } from '../services/transferencia.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nova-transferencia',
    templateUrl: './nova-transferencia.component.html',
    styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent {

    @Output() aoTransferir = new EventEmitter<any>();

    valor!: number;
    destino!: number;

    constructor(private service: TransferenciaService, private router: Router) { }

    transferir() {
        console.log("Transferir")
        const valorEmitir: Transferencia = { valor: this.valor, destino: this.destino };
        //this.aoTransferir.emit(valorEmitir);
        this.service.adicionar(valorEmitir).subscribe(
            (res) => { 
                console.log(res) 
                this.limpaCampos()
                this.router.navigateByUrl('extrato')
            },
            (error) => {
                console.error(error)
            }
        );
    }

    limpaCampos() {
        this.valor = 0;
        this.destino = 0;
    }

}
