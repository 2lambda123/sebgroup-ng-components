import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToggleComponent } from "./toggle.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ToggleComponent],
    declarations: [ToggleComponent]
})
export class ToggleModule { }
