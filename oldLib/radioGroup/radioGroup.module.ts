import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RadioGroupComponent } from "./radioGroup.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [RadioGroupComponent],
    exports: [RadioGroupComponent]
})
export class RadioGroupModule { }
