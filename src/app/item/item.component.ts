import { Component } from '@angular/core';
import { articlesSelector } from "../store/store.selectors";
import { TodoStore } from "../store/store.reducer";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent {

    constructor(private store: Store<TodoStore>) {  }

    public articles$ = this.store.pipe(select(articlesSelector), tap(console.log));

}
