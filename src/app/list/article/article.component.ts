import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleItem, TodoItem } from "../../interfaces";
import { TodoListService } from "../../todo-list.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { ItemEditDialogComponent } from "./item-edit-dialog/item-edit-dialog.component";
import { ArticleEditDialogComponent } from "./article-edit-dialog/article-edit-dialog.component";
import { take } from "rxjs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatCheckboxModule,
        MatDialogModule
    ],
    providers: [MatDialog]
})
export class ArticleComponent implements OnInit {

    @Input() article: ArticleItem = null;
    @Output() updated = new EventEmitter<ArticleItem>();

    list2: Array<TodoItem> = [];

    constructor(private todoService: TodoListService, private dialog: MatDialog) { }

    ngOnInit() {
        this.init1stArray();
    }

    init1stArray() {
        this.list2 = this.article.list.slice(0, 2);
    }

    changeItemStatus(index: number) {
        const item = this.article.list[index];
        this.todoService.updateTodoItem(this.article.id, index, { ...item, done: !item.done })
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.article = response;
                    this.updated.emit(this.article);
                    this.init1stArray();
                },
                error: err => console.error(err)
            });
    }

    edit(index: number) {
        if (index >= 0) {
            const item = this.article.list[index];
            const dialogRef: MatDialogRef<ItemEditDialogComponent> = this.dialog.open(ItemEditDialogComponent, {
                width: '500px',
                data: {
                    text: this.article.list[index].text
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.updateTodoItem(this.article.id, index, { ...item, text: result.text })
                        .pipe(take(1))
                        .subscribe({
                            next: response => {
                                this.article = response;
                                this.updated.emit(this.article);
                                this.init1stArray();
                            },
                            error: err => console.error(err)
                        });
                }
            })
        } else {
            const dialogRef: MatDialogRef<ArticleEditDialogComponent> = this.dialog.open(ArticleEditDialogComponent, {
                width: '600px',
                data: {...this.article}
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.updateArticle(result)
                        .pipe(take(1))
                        .subscribe({
                            next: response => {
                                this.article = response;
                                this.updated.emit(this.article);
                                this.init1stArray();
                            },
                            error: err => console.error(err)
                        })
                }
            });
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
                        .pipe(take(1))
                        .subscribe({
                            next: response => {
                                this.article = response;
                                this.updated.emit(this.article);
                                this.init1stArray();
                            },
                            error: err => console.error(err)
                        })
                } else {
                    this.todoService.deleteArticle(this.article.id)
                        .pipe(take(1))
                        .subscribe({
                            next: () => {},
                            error: err => console.error(err)
                        })
                }
            }
        })
    }

}
