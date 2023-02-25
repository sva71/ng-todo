import { Component, OnInit } from '@angular/core';
import { TodoListService } from "../todo-list.service";
import { Articles } from "../interfaces";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    public articles: Articles = [];

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

}
