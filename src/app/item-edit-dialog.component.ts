import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-item-edit-dialog',
    templateUrl: './item-edit-dialog.component.html',
    imports: [
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ],
    standalone: true
})
export class ItemEditDialogComponent implements OnInit {

    editForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ItemEditDialogComponent>,
                public formBuilder: FormBuilder) {}

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            text: [{value: null}, Validators.required]
        });
        this.editForm.patchValue(this.data);
    }

    onSubmit() {
        this.dialogRef.close(this.editForm.value);
    }
}
