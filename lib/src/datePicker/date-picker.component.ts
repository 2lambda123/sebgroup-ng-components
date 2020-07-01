import { Component, Input, forwardRef, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true,
};

@Component({
    selector: "sebng-date-picker",
    templateUrl: "./date-picker.component.html",
    styleUrls: ["./date-picker.component.scss"],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements ControlValueAccessor {
    @Input() placeholder: string = "yyyy-mm-dd";
    @Input() className?: string;
    @Input() readonly?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() min?: NgbDateStruct;
    @Input() max?: NgbDateStruct;
    @Input() id?: string;

    icon: string = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 448 512"><path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"/></svg>`;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private innerValue: string | NgbDateStruct = null;
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    // get and set accessor----------------------
    get value(): string | NgbDateStruct {
        return this.innerValue;
    }
    set value(v: string | NgbDateStruct) {
        this.innerValue = v;
        this.onTouchedCallback && this.onTouchedCallback();
        this.onChangeCallback && this.onChangeCallback(v);
    }

    // From ControlValueAccessor interfaces--------------
    writeValue(value: any) {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
