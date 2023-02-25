import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ListComponent } from './list/list.component';
import { ArticleComponent } from './list/article/article.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { ItemEditDialogComponent } from './list/article/item-edit-dialog/item-edit-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ArticleEditDialogComponent } from './list/article/article-edit-dialog/article-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ArticleComponent,
    ConfirmDialogComponent,
    ItemEditDialogComponent,
    ArticleEditDialogComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        MatListModule,
        MatCheckboxModule,
        MatMenuModule,
        MatExpansionModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
