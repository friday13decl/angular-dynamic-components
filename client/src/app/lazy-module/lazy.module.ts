import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ExampleComponent} from './example/example.component';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class LazyModule {
  // static root = ExampleComponent;
}
