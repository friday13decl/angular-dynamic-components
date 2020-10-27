import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

import {BorComponent} from './bor.component';

@NgModule({
    declarations: [
        BorComponent
    ],
    imports: [
        BrowserModule //should be excluded for remote module loading case
    ]
})
export class BorModule {

    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const appElement = createCustomElement(BorComponent, {injector: this.injector});
        customElements.define('bor-root', appElement);
    }
}
