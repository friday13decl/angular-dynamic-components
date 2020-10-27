import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {BorModule} from './bor/bor.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

globalThis.remote_app_bootstrap = () => {
    platformBrowserDynamic().bootstrapModule(BorModule)
        .catch(err => console.error(err));
}
