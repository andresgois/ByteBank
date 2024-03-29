# App Byte Bank

## Versões do *Angular*
- Vê a versão: *ng version*
- Instalar uma nova versão: *npm i @angular/cli@13.2.6*

- **Instalar exatamente a mesma versão do package.json:** - *npm ci*
- Rodar a aplicação: *ng serve --open*
- *Necessário instalar o json-server*
  - Verifica sessão *Mokando dados*

## Telas
- Cadastro das transferências

![Cadastro](./imagens/nova.png)

- Tabelas com todas as transferências feitas

![Transferências](./imagens/transferencia.png)

### Demostrativo

![Funcionamento](./imagens/bytebank.gif)

## Instalação
- npm install -g @angular/cli
- ng new bytebank
- cd bytebank
- ng serve --open
- [Acessar local](http://localhost:4200)

- *Desativando o Strict Mode*
    - Fazer algumas modificações no arquivo tsconfig.json
    - O arquivo ficará assim:
```
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2017",
    "module": "es2020",
    "lib": [
      "es2020",
      "dom"
    ]
  }
}
```
- Estrutura de pastas
    - /.angular
    - /.vscode
    - /node_modules
    - /src
        - /app
        - /assets
        - /enviroments
        - favicon.ico
        - index.html
        - main.ts
        - polyfills.ts
        - styles.scss
        - test.ts
    - .browserslistrc
    - .editorconfig
    - angular.json
    - karma.config.js
    - package-lock.json
    - package.json
    - README.md
    - tsconfig.app.json
    - tsconfig.json
    - tsconfig.spec.json


## Exportando dados com output
- Enviando do componente filho para o pai


## Data no angular
- Adicionar  ao app.module
```
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');


providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: 'BRL',
    },
],
```
- https://angular.io/api/common/DatePipe
- https://angular.io/api/core/LOCALE_ID

## Montagem da página
```mermaid
  graph TB;
    
    id3([ app-root ])==>| Monta estrutura |id4([app.component.ts])
    subgraph id1[HTML]
        id3([ app-root ])
    end 

    subgraph id2[TS]
        direction BT
        id4([app.component.ts])-->id5([selector])
        id4([app.component.ts])-->id6([templateUrl])
        id4([app.component.ts])-->id7([styleUrls])
    end

    style id1 fill:#ffffde,stroke:#333,stroke-width:4px,color: #400080
    style id2 fill:#00ffff,stroke:#333,stroke-width:4px,color: #400080
```
> Todos os componentes criados devem esta no **app.module.ts**
```
@NgModule({
  declarations: [
    AppComponent,
    NovaTransferenciaComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: 'BRL',
    },
],
  bootstrap: [AppComponent]
})
```

## FormModule
- [ForModule](https://v13.angular.io/api/forms/FormsModule)
- Importar FormModule no *app.module.ts*
### Ações do formulário
```mermaid
    graph TB;
      id1{{Ao clicar no botão ele dispara o evento de submit}}
      id3([ ngSubmit ])==>| Invoca |id4([ método: *transferir* ])
```

- *Event Biding*
    - Passa um Binding do evento para uma propriedade do angular
```
// No arquivo HTML
(ngSubmit)="transferir()"

// No component TS
    transferir(){
        console.log("Transferir")
    }

```

```mermaid
graph TD;
    A[No arquivo HTML]-->B[No component TS];
```
### Data Binding
- Event binding permite que um evento do DOM seja atribuído a um método do componente.

#### *property bind*
    - Passa um valor do template para minha classe
```
// No HTML
[ngModel]="valor"

// Component .TS
valor!: number;
```

#### Two-way binding
  - [(ngModel)]="valor"
    - **Transmite do componente para o template e vice versa**
    - Two-way data binding garante uma comunicação bidirecional entre o componente e o DOM.
- Property binding
  - [ngModel]="destino"
    - **Apenas valor do componente par o template, não reflete alterações**
    - Property binding permite que um valor de uma variável seja atribuído ao elemento HTML.

```mermaid
graph TD;
    A[Valor do template]-->B[Valor da classe];
```

## Exportando dados do componente

#### @Output()
- Propaga os dados
```
// component.ts
@Output() aoTransferir = new EventEmitter<any>();

const valorEmitir = { valor: this.valor, destino: this.destino };
this.aoTransferir.emit(valorEmitir);

// HTML
<app-nova-transferencia (aoTransferir)="transferir($event)"></app-nova-transferencia>
```

### Utilizar o metadata @Input() para receber valores em um componente;
```
- Extrato.component.ts
@Input() transferencias: any[] = [];

- html
 <app-extrato [transferencias]="transferencias"></app-extrato> 
```

## Transferência
### Exibir uma lista de dados através da diretiva *ngFor;
```
- Extrato.component.html
<tbody *ngIf="!!transferencias; else listaVazia">
    <tr class="tabela__linha" *ngFor="let transferencia of transferencias">
        <td class="tabela__conteudo">
            {{ transferencia.data | date: "short" }}
        </td>
        <td class="tabela__conteudo">{{ transferencia.valor | currency }}</td>
        <td class="tabela__conteudo">{{ transferencia.destino }}</td>
    </tr>
</tbody>
```
### Configurar o formato de horas na aplicação.
```
- Extrato.component.html
<td class="tabela__conteudo">{{ transferencia.valor | currency }}</td>

- app.module.ts
import { LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';

providers: [
  {provide: LOCALE_ID, useValue: 'pt' },
  {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
  },
],
```
## Services
### Utilizar a diretiva *ngIf;
- Caso a lista de transferência esteja vazia ele vai acionat o ng-template através do *#listaVazia*
```
<tbody *ngIf="!!transferencias; else listaVazia"></tbody>

<ng-template #listaVazia>
    <p>Nenhuma operação cadastrada</p>
</ng-template>
```
### Trabalhar com Service
- faz com que a classe service possa ser injetada no construtor de qualquer classe dentro de *root*
```
@Injectable({
  providedIn: 'root'
})
```
## Comunicação HTTP

### Mokando os dados
- https://www.npmjs.com/package/json-server
- npm install -g json-server
- Cria arquivo **db.json**
- Iniciar o json
```
json-server --watch .\data\db.json
```
- com base em um json ele monta a interface para o angular
- https://jsontots.pages.dev/
### Trabalhando com requisições 
- Adicionar ao construtor do service
- Ela provê métodos de acessoa uma API Rest (GET, POST, DELETE, PUT ...)
```
private httpClient: HttpClient
```

```
// Adicionar ao app.module nos imports
import { HttpClientModule } from '@angular/common/http';

// imports
HttpClientModule
```
#### Observable
- Padrão Observador
- Retorna a resposta em um momento futuro
- Assincrono
- Retorna todas as tranferências
- *TransferenciaService*
```
todas(): Observable<Transferencia[]> {
  return this.httpClient.get<Transferencia[]>(this.url);
}
```
- *ExtratoComponent*
- **subscribe** se inscreve na resposta do método, significa que quando existir uma resposta ele captura.
```
ngOnInit(): void {
  //this.transferencias = this.service.transferencias;
  this.service.todas().subscribe(
      (transferencias: Transferencia[]) => {
          console.table(transferencias);
          this.transferencias = transferencias;
      }
  )
}
```
- O método subscribe recebe opcionalmente 3 parâmetros, o primeiro é a função a ser executada quando tudo estiver correto, o segundo é a função a ser executada quando houver algum erro de qualquer gênero durante a execução e por fim o terceiro parâmetro é invocado quando todo o fluxo estiver sido concluído.
- **ExtratoComponent**
```
ngOnInit(): void {
  //this.transferencias = this.service.transferencias;
  this.service.todas().subscribe(
      (transferencias: Transferencia[]) => {
          console.table(transferencias);
          this.transferencias = transferencias;
      }
  )
}
```

## Tranalhando com Rotas
- Criar arquivo **app-routing.module.ts**
- Módulo principal *forRoot()*
- Módulo interno *forChild()*
- Snippet *a-rout*
- Descrição das propriedades
  - **path**: caminho da url
  - **component**: componente que será chamado
  - **redirectTo**: redirecionar para uma url
  - **pathMatch**: redirecionar página por completo
```
export const routes: Routes = [
    {path: '', redirectTo: 'extrato', pathMatch: 'full' },
    {path: 'extrato', component: ExtratoComponent},
    {path: 'nova-transferencia', component: NovaTransferenciaComponent},
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutingModule{}
```
- Importa em imports de **app.module**
- Remove os componentes de **app.componente.html** e coloca isso
```
<router-outlet></router-outlet>
```
- **app.component.html**
- *routerLink* renderiza apenas a parte necessária
- *href* renderiza toda a página, assim perde o conceita de SPA
```
<header>
    <a routerLink="/">Bytebank</a>
    <a routerLink="/nova-transferencia" routerLinkActive="ativo">Nova transferência</a>
</header>
<main>
    <router-outlet></router-outlet>
</main>
```
- **NovaTransferenciaComponent**
- Redireciona a página assim que faz uma transferência
```
constructor(private service: TransferenciaService, private router: Router) { }

this.router.navigateByUrl('extrato')
```
- **app.component.html**
- Ocultar link
- Ativa uma classe CSS, para esse caso o comportamento seria o seguinte: 
  - Quando esativer nessa url, não será mostrado o link para nova-tranferencia.
```
<a routerLink="/nova-transferencia" routerLinkActive="ativo">Nova transferência</a>
```
