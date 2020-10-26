import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Compiler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

export function createJitCompiler() {
  // @ts-ignore
  return new JitCompilerFactory([]).createCompiler();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: Compiler,
      useFactory: createJitCompiler
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
