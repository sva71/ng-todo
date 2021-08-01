import { ArticleItem, TodoStore } from "./store.reducer";
import { createSelector } from "@ngrx/store";

export const articlesSelector = createSelector(
    (store: TodoStore): TodoStore => store,
    (store: TodoStore): ArticleItem[] => store.articles
);

