import * as angularCore from '@angular/core';
import * as angularCommon from '@angular/common';
import * as angularPlatformBrowser from '@angular/platform-browser';
import * as angularPlatformBrowserDynamic from '@angular/platform-browser-dynamic';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';


const SystemJS = globalThis.System;
SystemJS.set('app:@angular/core', angularCore);
SystemJS.set('app:@angular/common', angularCommon);
SystemJS.set('app:@angular/platform-browser', angularPlatformBrowser);
SystemJS.set('app:@angular/platform-browser-dynamic', angularPlatformBrowserDynamic);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
