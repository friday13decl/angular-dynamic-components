import {
  Compiler,
  Component,
  ComponentFactoryResolver, INJECTOR,
  Injector,
  SimpleChange,
  ViewChild,
  ViewContainerRef, ɵrenderComponent, ɵɵdirectiveInject
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscriber} from './unsubscriber.hoc';
import {Subscription} from 'rxjs';

// import no lazy path
// import {NoLazyComponent} from './no-lazy/no-lazy.component';

@Unsubscriber(['testSub'])
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sameModuleDynamicComponents', {read: ViewContainerRef}) sameModule: ViewContainerRef;
  @ViewChild('lazyDynamicComponents', {read: ViewContainerRef}) lazyComponent: ViewContainerRef;
  @ViewChild('lazyModuleDynamicComponents', {read: ViewContainerRef}) lazyModule: ViewContainerRef;
  @ViewChild('remoteDynamicComponents', {read: ViewContainerRef}) remoteModule: ViewContainerRef;
  count = 0;

  private testSub: Subscription;

  constructor(private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private compiler: Compiler) {
  }

  noLazySameModuleLoad() {
    // const factory = this.cfr.resolveComponentFactory(NoLazyComponent);
    // create component path 1
    // this.sameModule.createComponent(factory);
    // the same but with injector
    // this.sameModule.createComponent(factory, null, this.injector);
  }

  async lazySameModuleLoad() {
    // import lazy path
    const {NoLazyComponent} = await import('./no-lazy/no-lazy.component');
    const factory = this.cfr.resolveComponentFactory(NoLazyComponent);
    // create component path 2
    // const componentRef = factory.create(this.injector);
    // this.sameModule.insert(componentRef.hostView);

    const {instance} = this.sameModule.createComponent(factory, null, this.injector);
    instance.num = this.count++;
  }

  async lazyComponentLoad() {
    /*
      import component from another module, works only if component doesn't have specified dependencies
      otherwise it needs to put module declaration in the component's file or load module
     */
    const {LazyComponent} = await import('./lazy-component/lazy.component');
    const factory = this.cfr.resolveComponentFactory(LazyComponent);
    const {instance} = this.lazyComponent.createComponent(factory, null, this.injector);
    instance.num = this.count++;

    // /*
    //   ngOnChanges should be called manually for dynamic component
    // */
    instance.ngOnChanges({
      someId: new SimpleChange(null, 999, true)
    });
    this.testSub = instance.clicked.pipe(takeUntil(instance.destroy$))
      .subscribe(value => {
        console.log(value);
        instance.num = this.count++;
      });
  }

  async lazyComponentRender() {
    const {LazyComponent} = await import('./lazy-component/lazy.component');
    // const injector = ɵɵdirectiveInject(INJECTOR);
    const instance = ɵrenderComponent(LazyComponent, {host: 'my-host', injector: this.injector});
    instance.num = this.count++;
    instance.ngOnChanges({
      someId: new SimpleChange(null, 999, true)
    });
    setTimeout(() => {
      instance.num = this.count++;
    }, 1500);
    setTimeout(() => {
      instance.num = this.count++;
    }, 3000);
  }

  async lazyModuleLoad() {
    const {LazyModule} = await import('./lazy-module/lazy.module');
    this.compiler.compileModuleAndAllComponentsAsync(LazyModule).then(compiled => {
      // const module = compiled.ngModuleFactory.create(this.injector);
      // const factory = module.componentFactoryResolver.resolveComponentFactory(LazyModule.root);
      // this.lazyModule.createComponent(factory);

      const factory = compiled.componentFactories[0];
      const {instance} = this.lazyModule.createComponent(factory);
      instance.bam = this.count++;

      // const component = factory.create(this.injector, [], null, module);
      // this.lazyModule.insert(component.hostView);
    });
  }

  async remoteModuleLoad() {
    globalThis.System.import('http://localhost:3000/bundle.js').then(module => {
      this.compiler.compileModuleAndAllComponentsAsync(module.default).then(compiled => {
        const factory = compiled.componentFactories[0];
        const {instance} = this.remoteModule.createComponent(factory);
      });
    });
  }

  async loadRemoteApp() {
    // const module = await this.loadScript('http://localhost:3000/remote.js');
  }

  private loadScript(url: string) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => resolve()
      script.onerror = () => reject()
      document.body.appendChild(script);
    });
  }

}
