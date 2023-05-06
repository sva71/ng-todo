import { Component } from '@angular/core';
import { HeaderComponent } from "./header.component";
import { ListComponent } from "./list.component";

@Component({
    selector: 'app-root',
    template: `
        <div class="w-100 min-vh-100 max-vh-100 p-4 d-flex flex-column justify-content-start align-items-center p-2">
            <app-header></app-header>
            <app-list></app-list>
        </div>
    `,
    imports: [
        HeaderComponent,
        ListComponent
    ],
    standalone: true
})
export class AppComponent {
}
