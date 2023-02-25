export interface TodoItem {
    text: string;
    done: boolean;
}

export type TodoList = Array<TodoItem>;

export interface ArticleItem {
    id: number;
    title: string;
    list: TodoList
}

export type Articles = Array<ArticleItem>;

export interface Statistics {
    totalArticles: number;
    totalItems: number;
    totalDone: number;
    donePercent: number;
}
