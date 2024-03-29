
import { DropDownComponent, DropdownItem } from "./dropDown.component";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Component, ViewChild, DebugElement } from "@angular/core";

@Component({
    selector: "tac-dropdown",
    template: `
    <ac-dropdown
        name="myDropdown"
        [list]="list"
        [label]="label"
        [error]="error"
        [placeHolder]="placeHolder"
        [className]="className"
        [disabled]="disabled"
        [native]="native"
        [multi]="multi"
        [clearable]="clearable"
        [searchable]="searchable"
        [handleChange]="handleChange"
        [(ngModel)]="selectedItem"
    ></ac-dropdown>`,
})
class CustomTestClass {
    @ViewChild(DropDownComponent) dropDownComponent: DropDownComponent;
    list: Array<DropdownItem>;
    label?: string;
    error?: string;
    placeHolder?: string;
    className?: string;
    disabled?: boolean = false;
    native?: boolean = false;
    multi?: boolean;
    clearable?: boolean = false;
    searchable?: boolean = false;
    ellipsisMode?: boolean = false;
    handleChange?: (event: DropdownItem | Array<DropdownItem> | UIEvent) => void;

    selectedItem: DropdownItem | Array<DropdownItem>;

    constructor() {
        this.list = [
            { text: "Nigeria", value: "NG" },
            { text: "Malaysia", value: "MY" }
        ];
    }
}

describe("Component: DropDownComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule, NgbModule],
            declarations: [DropDownComponent, CustomTestClass]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    });

    it("Should render and be defined", () => expect(component).toBeTruthy());

    it("Should render label and error", async(() => {
        component.label = "Country";
        component.error = "Some error";
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.css(".dropdown-label"));
        const error = fixture.debugElement.query(By.css(".alert"));
        expect(label).not.toBeNull();
        expect(label.nativeElement.innerHTML).toEqual("Country");
        expect(error).not.toBeNull();
        expect(error.nativeElement.innerHTML).toEqual("Some error");
    }));

    it("Should pass custom className prop to component", async(() => {
        component.className = "custom-class";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".custom-class"))).toBeTruthy();
    }));

    it("Should allow searchable and clearable when enabled", async(() => {
        component.clearable = true;
        component.searchable = true;
        component.selectedItem = component.list[0];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".search-input"))).not.toBeNull();
    }));

    it("Testing two-way data binding", async () => {
        const ngModelChange = spyOn(component.dropDownComponent, "writeValue");
        component.selectedItem = component.list[1];
        fixture.detectChanges();
        await fixture.whenStable().then(() => expect(ngModelChange).toHaveBeenCalled());
    });

    it("Should render native select element when selected", async(() => {
        component.native = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("select.form-control"))).toBeDefined();
    }));

    it("Should render placeholder when passed", async(() => {
        component.placeHolder = "Some placeholder";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".title"))).toBeDefined();
        /** Testing placeholder in native */
        component.native = true;
        component.selectedItem = null;
        fixture.detectChanges();

        const options = fixture.debugElement.queryAll(By.css("option"));
        expect(options.length).toEqual(3);
        expect(options[0].nativeElement.innerHTML).toEqual("Some placeholder");

    }));

    it("Should display label \"Select ...\" when no placeholder is defined and no item is selected", async(() => {
        component.placeHolder = null;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".title")).nativeElement.innerHTML.trim()).toEqual("Select ...");
    }));

    it("Should enable more button when ellipsisMode set to true", async(() => {
        component.ellipsisMode = true;
        fixture.detectChanges();
        const moreIcon = fixture.debugElement.query(By.css(".dropdown-more-icon"));
        expect(moreIcon).toBeDefined();
    }));

    it("Should disable the element when disabled prop is set to true", async(() => {
        component.disabled = true;
        fixture.detectChanges();
        const ngSelect = fixture.debugElement.query(By.css(".disabled"));
        expect(ngSelect).toBeDefined();
        /** Testing disabled in native */
        component.native = true;
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css("select"));
        expect(select.nativeElement.disabled).toBeTruthy();
    }));

    it("Should enable multi-select when enabled", async(() => {
        component.multi = true;
        fixture.detectChanges();
        const ngSelect: DebugElement = fixture.debugElement.query(By.css(".custom-control"));
        expect(ngSelect).toBeTruthy();
        /** Testing multiple in native */
        component.native = true;
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css("select"));
        expect(select.nativeElement.multiple).toBeTruthy();
    }));

    it("Should fire onChange callback when change is detected (native only)", async(() => {
        component.native = true;
        component.handleChange = () => "test";
        const handleChangeSpy = spyOn(component, "handleChange");
        fixture.detectChanges();
        fixture.debugElement.query(By.css("select.form-control")).nativeElement.dispatchEvent(new Event("change"));
        expect(handleChangeSpy).toHaveBeenCalled();
    }));

    it("Should open menu when clicked on trigger", async(() => {
        fixture.debugElement.query(By.css(".custom-dropdown-toggle")).nativeElement.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        const menu: DebugElement = fixture.debugElement.query(By.css(".show"));
        expect(menu).toBeTruthy();
    }));

});
