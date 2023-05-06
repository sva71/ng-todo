import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ArticleItem } from "./interfaces";
import { TodoListService } from "./todo-list.service";
import { ItemEditDialogComponent } from "./item-edit-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";

interface ItemEditForm {
    done: FormControl<boolean>;
    text: FormControl<string>;
}

interface ArticleEditForm {
    id: FormControl<number>;
    title: FormControl<string>;
    list: FormArray<FormGroup<ItemEditForm>>;
}

@Component({
    selector: 'app-article-edit-dialog',
    templateUrl: './article-edit-dialog.component.html',
    styleUrls: ['./article-edit-dialog.component.scss'],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule
    ],
    standalone: true
})
export class ArticleEditDialogComponent implements OnInit {

    articleForm: FormGroup = null;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ArticleItem, private todoService: TodoListService,
                private itemEditDialog: MatDialog, public dialogRef: MatDialogRef<ArticleEditDialogComponent>) { }

    ngOnInit() {
        const list = new FormArray(this.data.list.map(item => new FormGroup<ItemEditForm>({
            done: new FormControl(item.done),
            text: new FormControl(item.text)
        })));
        this.articleForm = new FormGroup<ArticleEditForm>({
            id: new FormControl(this.data.id),
            title: new FormControl(this.data.title),
            list
        });
    }

    get list() {
        return this.articleForm.controls['list'] as FormArray;
    }

    getItemGroup = (item: AbstractControl): FormGroup => item as FormGroup;

    onSubmit() {
        this.dialogRef.close(this.articleForm.value);
    }

    deleteItem(index: number) {
        (this.articleForm.get('list') as FormArray).removeAt(index);
    }

    addTodoItem() {
        const dialogRef: MatDialogRef<ItemEditDialogComponent> = this.itemEditDialog.open(ItemEditDialogComponent, {
            width: '500px',
            data: {
                text: null
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newItem = new FormGroup<ItemEditForm>({
                    done: new FormControl(false),
                    text: new FormControl(result.text)
                });
                (this.articleForm.get('list') as FormArray).push(newItem);
            }
        })
    }

    moveTodoItem(index: number, direction: number) {
        let secondIndex = direction > 0 ? index - 1 : index + 1;
        const arr: FormArray = (this.articleForm.get('list') as FormArray);
        const buf = arr.at(index);
        arr.setControl(index, arr.at(secondIndex));
        arr.setControl(secondIndex, buf);
    }
}
