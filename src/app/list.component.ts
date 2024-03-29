import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { ArticleItem, Articles } from "./interfaces";
import { take } from "rxjs";
import { ArticleComponent } from "./article.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-list',
    template: `
        <div class="w-auto p-4 d-flex flex-row justify-content-start align-items-start flex-wrap">
            <div *ngFor="let article of articles">
                <app-article [article]="article" (updated)="articleUpdated($event)"></app-article>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ArticleComponent
    ],
    standalone: true
})
export class ListComponent implements OnInit {

    public articles: Articles = [];

    constructor(private todoService: TodoListService) { }

    ngOnInit() {
        this.todoService.getArticles().pipe(take(1)).subscribe({
            next: response => this.articles = response
        });
        this.todoService.articlesChanged$.subscribe(newArticles => this.articles = newArticles);
    }

    articleUpdated($event: ArticleItem) {
        let i = this.articles.findIndex(item => item.id === $event.id);
        if (i >= 0) this.articles[i] = $event;
    }

}
