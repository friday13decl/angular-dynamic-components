import {Component} from '@angular/core';

@Component({
    selector: 'bor-root',
    template: `
      <div>
        <p>I'm remote component!</p>
      </div>
    `,
    styles: [`div {
        background-color: yellow;
        padding: 10px 20px;
        border-radius: 30px;
        display: inline-block;
    }`]
})
export class BorComponent {}
