import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable()
export class DestroyService extends ReplaySubject<boolean> implements OnDestroy {

    constructor() {
      super(1);
    }

    ngOnDestroy(): void {
        this.next(true);
        this.complete();
    }


}
