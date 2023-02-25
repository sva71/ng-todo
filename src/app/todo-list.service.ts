import {Injectable} from '@angular/core';
import {ArticleItem, Articles, Statistics} from "./interfaces";
import {BehaviorSubject, Subject} from "rxjs";

const DEFAULT_ARTICLES: Articles = [
    {
        id: 1,
        title: 'Утренний моцион',
        list: [
            {
                text: 'Проснуться',
                done: true,
            },
            {
                text: 'Умыться',
                done: false,
            },
            {
                text: 'Приготовить завтрак',
                done: false,
            },
            {
                text: 'Позавтракать',
                done: false,
            },
            {
                text: 'Переодеться',
                done: false,
            },
            {
                text: 'Уехать на работу',
                done: false,
            }
        ]
    },
    {
        id: 2,
        title: 'На работе',
        list: [
            {
                text: 'Проверить почту',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Написать компонент',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Почитать новости',
                done: false,
            },
            {
                text: 'Протестировать компонент',
                done: false,
            },
            {
                text: 'Выпить кофе',
                done: false,
            },
            {
                text: 'Уехать домой',
                done: false,
            },
        ]
    }
];

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
    private _articles: Articles = JSON.parse(localStorage.getItem('sv_todo')) || DEFAULT_ARTICLES;

    public articlesChanged$ = new BehaviorSubject<Articles>(this._articles);
    public articleItemsChanged$ = new Subject<ArticleItem>();

    get articles(): Articles {
        return this._articles;
    }

    set articles(value: Articles) {
        this._articles = [...value];
        this.articlesChanged$.next(value);
    }

    constructor() {
        this.articlesChanged$.subscribe(newArticles =>
            localStorage.setItem('sv_todo', JSON.stringify(newArticles)));
        this.articleItemsChanged$.subscribe(() => localStorage.setItem('sv_todo', JSON.stringify(this.articles)));
    }

    changeItemStatus(articleId: number, itemIndex: number) {
        const article: ArticleItem = this.articles.find(item => item.id === articleId);
        article.list[itemIndex].done = !article.list[itemIndex].done;
        this.articleItemsChanged$.next(article);
    }

    updateTodoItem(articleId: number, itemIndex: number, text: string) {
        const article: ArticleItem = this.articles.find(item => item.id === articleId);
        article.list[itemIndex].text = text;
        this.articleItemsChanged$.next(article);
    }

    deleteTodoItem(articleId: number, itemIndex: number) {
        const article: ArticleItem = this.articles.find(item => item.id === articleId);
        article.list.splice(itemIndex, 1);
        this.articleItemsChanged$.next(article);
    }

    createArticle(articleData: ArticleItem) {
        articleData.id = this.articles[this.articles.length - 1].id + 1;
        this.articles.push(articleData);
        this.articlesChanged$.next(this.articles);
    }

    updateArticle(articleData: ArticleItem) {
        const i = this.articles.findIndex(item => item.id === articleData.id)
        this.articles[i] = articleData;
        this.articleItemsChanged$.next(articleData);
    }

    deleteArticle(articleId: number) {
        const index = this.articles.findIndex(item => item.id === articleId);
        index != -1 && this.articles.splice(index, 1);
        this.articlesChanged$.next(this.articles);
    }

    clearLocalStorage() {
        localStorage.clear();
        this.articles = DEFAULT_ARTICLES;
    }

    getStatistics(): Statistics {
        const totalItems = this.articles.reduce((sum, current) => sum + current.list.length, 0);
        const totalDone = this.articles.reduce((sumArticles, currentArticle) => sumArticles + currentArticle.list.reduce(
            (sumItems, currentItem) => currentItem.done ? ++sumItems : sumItems, 0), 0);
        const donePercent = Math.ceil(totalDone * 100 / totalItems);
        return {
            totalArticles: this.articles.length,
            totalItems,
            totalDone,
            donePercent
        }
    }

}
