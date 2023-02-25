import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss']
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
