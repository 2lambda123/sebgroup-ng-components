import { ViewChild, Component, DebugElement, TemplateRef } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RadioGroupComponent, RadioGroupItem } from "./radio-group.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-radio-group",
    template: `
        <ng-template #error><div class="custom-error">Custom error</div></ng-template>
        <sebng-radio-group
            id="myRadioGroup"
            [list]="list"
            [(ngModel)]="selectedItem"
            [label]="label"
            [className]="className"
            [disabled]="disabled"
            [condensed]="condensed"
            [inline]="inline"
            [error]="error"
        ></sebng-radio-group>
    `,
})
class RadioGroupTestComponent {
    @ViewChild(RadioGroupComponent) radioGroupComponent: RadioGroupComponent;
    list: Array<RadioGroupItem>;
    selectedItem: RadioGroupItem;
    label?: string;
    className?: string;
    disabled?: boolean = false;
    condensed?: boolean = false;
    inline?: boolean = false;

    constructor() {
        this.list = [
            { label: "Nigeria", value: "NG" },
            { label: "Malaysia", value: "MY" },
        ];
    }
}

describe("RadioGroupComponent", () => {
    let component: RadioGroupTestComponent;
    let fixture: ComponentFixture<RadioGroupTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, CommonModule],
                declarations: [RadioGroupComponent, RadioGroupTestComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioGroupTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it(
        "Should render label",
        waitForAsync(() => {
            component.label = "Country";
            fixture.detectChanges();
            const label = fixture.debugElement.query(By.css(".radio-group-label > b"));
            expect(label).not.toBeNull();
            expect(label.nativeElement.innerHTML).toEqual("Country");
        })
    );

    it(
        "Should pass custom className prop to component",
        waitForAsync(() => {
            component.className = "custom-class";
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".custom-class"))).toBeTruthy();
        })
    );

    it("Testing two-way data binding", async () => {
        const ngModelChange = spyOn(component.radioGroupComponent, "writeValue");
        component.selectedItem = component.list[1];
        fixture.detectChanges();
        await fixture.whenStable().then(() => expect(ngModelChange).toHaveBeenCalled());
    });

    it(
        "Should disable the element when disabled prop is set to true",
        waitForAsync(() => {
            component.disabled = true;
            fixture.detectChanges();
            const container: DebugElement = fixture.debugElement.query(By.css(".disabled"));
            const elements: DebugElement[] = fixture.debugElement.queryAll(By.css(".custom-control.custom-radio > input:disabled"));
            expect(container).toBeDefined();
            expect(container).not.toBeNull();
            expect(elements).toBeDefined();
            expect(elements).toBeTruthy();
            expect(elements.length).toBe(component.list.length);
        })
    );

    it(
        "Should select the item when clicked on it",
        waitForAsync(() => {
            const elements: DebugElement[] = fixture.debugElement.queryAll(By.css(".custom-control.custom-radio > input"));
            expect(elements).toBeDefined();
            expect(elements).toBeTruthy();
            expect(elements.length).toBe(component.list.length);

            // TODO: simulate a click on first element
            // TODO: check to see if .custom-control.custom-radio.selected > input equals 1
        })
    );

    it("should have the expected error", () => {
        const label: DebugElement = fixture.debugElement.query(By.css(".custom-error"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom error");
    });

    // TODO: check if currently selected element is focused
    // TODO: simulate tab button or arrow buttons and check if element is selected and focused
});
