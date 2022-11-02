# App Byte Bank

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

##
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
- *property bind*
    - Passa um valor do template para minha classe
```
// No HTML
[(ngModel)]="valor"

// Component .TS
valor!: number;
```

## Exportando dados com output
- Enviando do componente filho para o pai
