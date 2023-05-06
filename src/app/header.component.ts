import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TodoListService } from "./todo-list.service";
import { ArticleEditDialogComponent } from "./article-edit-dialog.component";
import { Statistics } from "./interfaces";
import { takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import {DestroyService} from "./destroy.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    standalone: true
})
export class HeaderComponent implements OnInit {

    stat: Statistics;
    constructor(private dialog: MatDialog, private todoService: TodoListService, private destroy$: DestroyService) { }

    ngOnInit() {
        this.initStat();
        this.todoService.articlesChanged$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initStat());
        this.todoService.articleItemChanged$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initStat());
    }

    initStat() {
        this.stat = this.todoService.getStatistics();
    }

    clearLocalStorage() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                message: 'Очистить локальное хранилище?',
                cancelButton: 'Отмена',
                submitButton: 'Очистить',
                submitButtonColor: 'warn'
            }
        });
        dialogRef.afterClosed().subscribe(result => result && this.todoService.clearLocalStorage())
    }

    createArticle() {
        const dialogRef: MatDialogRef<ArticleEditDialogComponent> = this.dialog.open(ArticleEditDialogComponent, {
            width: '600px',
            data: {
                id: 0,
                title: '',
                list: []
            }
        });
        dialogRef.afterClosed().subscribe(result => this.todoService.createArticle(result).subscribe({
            next: () => {},
            error: err => console.error(err)
        }));
    }

}
