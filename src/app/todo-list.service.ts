import {Injectable} from '@angular/core';
import {ArticleItem, Articles, Statistics, TodoItem} from "./interfaces";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

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

    articles: Articles = JSON.parse(localStorage.getItem('sv_todo')) || DEFAULT_ARTICLES;

    public articlesChanged$: BehaviorSubject<Articles> = new BehaviorSubject<Articles>(this.articles);
    public articleItemChanged$: Subject<ArticleItem> = new Subject<ArticleItem>();

    constructor() {
        this.articlesChanged$.subscribe(newArticles=>
            localStorage.setItem('sv_todo', JSON.stringify(newArticles)));
        this.articleItemChanged$.subscribe(() =>
            localStorage.setItem('sv_todo', JSON.stringify(this.articles)));
    }

    getArticles = (): Observable<Articles> => of(this.articles);

    updateTodoItem(articleId: number, itemIndex: number, payload: TodoItem): Observable<ArticleItem> {
        const index = this.articles.findIndex(item => item.id === articleId);
        this.articles[index].list[itemIndex] = payload;
        this.articleItemChanged$.next(this.articles[index]);
        return of(this.articles[index]);
    }

    deleteTodoItem(articleId: number, itemIndex: number): Observable<ArticleItem> {
        const index = this.articles.findIndex(item => item.id === articleId);
        this.articles[index].list.splice(itemIndex, 1);
        this.articleItemChanged$.next(this.articles[index]);
        return of(this.articles[index]);
    }

    createArticle(articleData: ArticleItem): Observable<Articles> {
        articleData.id = this.articles[this.articles.length - 1].id + 1;
        this.articles.push(articleData);
        this.articlesChanged$.next(this.articles);
        return of(this.articles);
    }

    updateArticle(articleData: ArticleItem): Observable<ArticleItem> {
        const index = this.articles.findIndex(item => item.id === articleData.id);
        this.articles[index] = articleData;
        this.articleItemChanged$.next(this.articles[index]);
        return of(this.articles[index]);
    }

    deleteArticle(articleId: number): Observable<Articles> {
        const index = this.articles.findIndex(item => item.id === articleId);
        index != -1 && this.articles.splice(index, 1);
        this.articlesChanged$.next(this.articles);
        return of(this.articles);
    }

    clearLocalStorage() {
        localStorage.clear();
        this.articles = DEFAULT_ARTICLES;
        this.articlesChanged$.next(this.articles);
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
