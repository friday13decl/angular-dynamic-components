import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BorComponent} from './bor.component';

@NgModule({
    declarations: [BorComponent],
    imports: [
        BrowserModule //should be excluded for remote module loading case
    ],
    bootstrap: [BorComponent]
})
export class BorModule {}
