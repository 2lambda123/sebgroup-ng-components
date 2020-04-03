import { Component, Input, forwardRef, Provider } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgClass } from "@angular/common";

export interface RadioGroupItem {
    /** The label or text to be displayed in the list */
    label: string;
    /** optional description to be displayed next to the label */
    description?: string;
    /** any value which should be tied to the item */
    value: any;
    /** optional disabled flag. Will show the item grayed out and disabled */
    disabled?: boolean;
    /** The id or the unique key of the item */
    key: string;
}

interface UniqueItem {
    id: string;
    optionItem: RadioGroupItem;
    selected: boolean;
}

interface DisplayItem extends UniqueItem {
    className: string;
}

const CUSTOM_RADIOGROUP_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true,
};

@Component({
    selector: "sebng-radio-group",
    templateUrl: "./radio-group.component.html",
    styleUrls: ["./radio-group.component.scss"],
    providers: [CUSTOM_RADIOGROUP_CONTROL_VALUE_ACCESSOR],
})
export class RadioGroupComponent implements ControlValueAccessor {
    // TODO: Add support for custom html as well as string labels?
    @Input("list")
    set list(value: RadioGroupItem[]) {
        this._list = value;
        this._generateHelperArrays();
    }
    get list(): RadioGroupItem[] {
        return this._list;
    }
    private _list: RadioGroupItem[];

    @Input() id?: string;
    @Input() label?: string;
    @Input("className")
    set className(value: string) {
        if (value) {
            this._classList = ["radio-group", value];
        }
    }
    private _classList: NgClass["ngClass"] = "radio-group";

    @Input() disabled?: boolean = false;
    @Input() condensed?: boolean = false;
    @Input() inline?: boolean = false;

    get classList(): NgClass["ngClass"] {
        return this._classList;
    }

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    private _selectedValue: RadioGroupItem = null;
    public allSelected = null;

    set selectedValue(state: RadioGroupItem) {
        if (state !== this._selectedValue) {
            this._selectedValue = state;
            this.onChangeCallback && this.onChangeCallback(state);
            this.onTouchedCallback && this.onTouchedCallback();

            this._generateHelperArrays();
        }
    }

    get selectedValue() {
        return this._selectedValue;
    }

    // HELPER ARRAYS
    /** array of dropdown item elements with a unique id, the original optionItem and calculated selected property */
    public uniqueList: Array<UniqueItem> = [];
    /** Array of dropdown item elements which should be displayed in the current render cycle */
    public displayList: Array<DisplayItem> = [];
    /** Array of all dropdown item which are currently selected */
    public selectedList: Array<RadioGroupItem> = [];

    /** internal generate helper array function. Should be run on every change where the helper arrays need to be regenerated */
    private _generateHelperArrays(): void {
        this.uniqueList =
            this.list &&
            this.list
                .filter((e: RadioGroupItem) => e && e.hasOwnProperty("key") && e.hasOwnProperty("value") && e.hasOwnProperty("label"))
                .map((e: RadioGroupItem, i: number) => {
                    const id: string = `${e.key}-${i}`;
                    let selected: boolean = false;

                    if ((this.selectedValue as RadioGroupItem) && e.key === (this.selectedValue as RadioGroupItem).key) {
                        selected = true;
                    }

                    return { optionItem: e, id, selected };
                });

        this.displayList =
            this.uniqueList &&
            this.uniqueList.map((e: UniqueItem) => {
                return {
                    ...e,
                    className: `custom-control custom-radio${e.selected ? " selected" : ""}`,
                };
            });

        this.selectedList = this.uniqueList && this.uniqueList.filter((e: UniqueItem) => e.selected).map((e: UniqueItem) => e.optionItem);
        this.allSelected = this.selectedList && this.uniqueList ? this.selectedList.length === this.uniqueList.length : false;
    }

    /** Function which handles the logic of setting the non-native onChange prop (and sets the internal selected value as well) */
    handleOnChange(value: RadioGroupItem): void {
        this.selectedValue = value;
    }

    /** Function containing the select dropdown item logic */
    optionItemSelected(item: RadioGroupItem): void {
        const newItem: RadioGroupItem = { ...item };
        this.handleOnChange(newItem);
    }

    // HELPERS ================================
    handleItemOnClick(item: DisplayItem): void {
        // event.preventDefault();
        this.optionItemSelected(item.optionItem);
    }

    writeValue(value: any): void {
        this.selectedValue = value;
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
