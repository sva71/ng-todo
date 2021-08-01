import { createAction, props } from "@ngrx/store";
import { ArticleItem } from "./store.reducer";

export const addArticle = createAction('[Article] Add', props<{ newArticle: ArticleItem }>());
export const updateArticle = createAction('[Article] Update', props<{ Article: ArticleItem }>());
export const deleteArticle = createAction('[Article] Delete', props<{ ArticleId: number }>());
