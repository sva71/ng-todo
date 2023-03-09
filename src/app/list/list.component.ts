import {Component, OnDestroy, OnInit} from '@angular/core';
import { TodoListService } from "../todo-list.service";
import { Articles } from "../interfaces";
import {Subject} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    public articles: Articles = [];

    private destroy$ = new Subject<void>();

    constructor(private todoService: TodoListService) {
    }

    ngOnInit() {
        this.articles = this.todoService.articles;
        this.todoService.articlesChanged$.subscribe(newArticles => this.articles = newArticles);
        this.todoService.articleItemsChanged$.subscribe(newArticle => {
            let i = this.articles.findIndex(item => item.id === newArticle.id);
            if (i >= 0) this.articles[i] = newArticle;
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
