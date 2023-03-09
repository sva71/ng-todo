import {Component, Input, OnInit} from '@angular/core';
import {ArticleItem, TodoItem} from "../../interfaces";
import {TodoListService} from "../../todo-list.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {ItemEditDialogComponent} from "./item-edit-dialog/item-edit-dialog.component";
import {ArticleEditDialogComponent} from "./article-edit-dialog/article-edit-dialog.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    @Input() article: ArticleItem = null;

    list2: Array<TodoItem> = [];

    constructor(private todoService: TodoListService, private dialog: MatDialog) { }

    ngOnInit() {
        this.init1stArray();
    }

    init1stArray() {
        this.list2 = this.article.list.slice(0, 2);
    }

    changeItemStatus(index: number) {
        this.todoService.changeItemStatus(this.article.id, index);
    }

    edit(index: number) {
        if (index >= 0) {
            const dialogRef: MatDialogRef<ItemEditDialogComponent> = this.dialog.open(ItemEditDialogComponent, {
                width: '500px',
                data: {
                    text: this.article.list[index].text
                }
            });
            dialogRef.afterClosed().subscribe(result =>
                result && this.todoService.updateTodoItem(this.article.id, index, result.text))
        } else {
            const dialogRef: MatDialogRef<ArticleEditDialogComponent> = this.dialog.open(ArticleEditDialogComponent, {
                width: '600px',
                data: {...this.article}
            });
            dialogRef.afterClosed().subscribe(result => this.todoService.updateArticle(result));
        }
    }

    delete(index: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                message: index >= 0 ? 'Вы действительно хотите удалить этот пункт?' : 'Вы действительно хотите удалить эту заметку?',
                cancelButton: 'Отмена',
                submitButton: 'Удалить',
                submitButtonColor: 'warn'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (index >= 0) {
                    this.todoService.deleteTodoItem(this.article.id, index)
                } else {
                    this.todoService.deleteArticle(this.article.id)
                }
            }
        })
    }

}
