import {Action, createReducer, on} from "@ngrx/store";
import * as articleActions from './store.actions';

export interface TodoItem {
    text: string,
    done: boolean
}

export interface ArticleItem {
    id: number,
    title: string,
    list: Array<TodoItem>
}

export interface TodoStore {
    articles: Array<ArticleItem>
}

export const defaultArticles: TodoStore = JSON.parse(<string>localStorage.getItem('sv_todo')) || {
    articles: [
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
    ]
}

const articlesReducer = createReducer(
    defaultArticles,
    on(articleActions.addArticle, (store: TodoStore, { newArticle }): TodoStore => {
        const newStore = {...store, articles: [...store.articles, newArticle]};
        localStorage.setItem('sv_todo', JSON.stringify(newStore));
        return newStore;
    }),
    on(articleActions.updateArticle, (store: TodoStore, { Article }): TodoStore => {
        const newStore = {
            ...store,
            articles: store.articles.map((item) => item.id === Article.id ? Article : item)
        };
        localStorage.setItem('sv_todo', JSON.stringify(newStore));
        return newStore;
    }),
    on(articleActions.deleteArticle, (store: TodoStore, { ArticleId }): TodoStore =>{
        const newStore = {
            ...store,
            articles: store.articles.filter(({id}) => id !== ArticleId)
        };
        localStorage.setItem('sv_todo', JSON.stringify(newStore));
        return newStore;
    })
);

export function reducer(state: TodoStore | undefined, action: Action) {
    return articlesReducer(state, action)
}
