import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ɵdetectChanges, ɵmarkDirty
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent implements OnChanges, OnDestroy {

  _num: any;

  @Input() set num(value: any) {
    this._num = value;
    // ɵdetectChanges(this);
    ɵmarkDirty(this);
  }
  get num() {
    return this._num;
  }

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  someId: number;

  destroy$: ReplaySubject<any> = new ReplaySubject(1);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.someId.currentValue !== changes.someId.previousValue) {
      this.someId = changes.someId.currentValue;
      ɵdetectChanges(this);
      // ɵmarkDirty(this);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
class LazyComponentModule {}
