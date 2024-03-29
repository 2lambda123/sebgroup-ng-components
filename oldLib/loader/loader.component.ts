import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Size } from "./loader.def";

@Component({
    selector: "ac-loader",
    styleUrls: ["./loader.component.scss"],
    templateUrl: "loader.component.html",
    encapsulation: ViewEncapsulation.None
})

export class LoaderComponent {
    private _size?: Size;
    private _className?: string;
    private _sizeClassName?: string;
    private _toggle = false;
    private _fullScreen = false;

    @Input()
    get size(): Size {
        return this._size;
    }
    set size(value: Size) {
        if (this._size !== value) {
            this._size = value;
        }
    }

    @Input()
    get className(): string {
        return this._className;
    }
    set className(value: string) {
        if (this._className !== value) {
            this._className = value;
        }
    }

    @Input()
    get sizeClassName(): string {
        return this._sizeClassName;
    }
    set sizeClassName(value: string) {
        if (this._sizeClassName !== value) {
            this._sizeClassName = value;
        }
    }

    @Input()
    get toggle(): boolean {
        return this._toggle;
    }
    set toggle(value: boolean) {
        if (this._toggle !== value) {
            this._toggle = value;
        }
    }

    @Input()
    get fullScreen(): boolean {
        return this._fullScreen;
    }
    set fullScreen(value: boolean) {
        if (this._fullScreen !== value) {
            this._fullScreen = value;
        }
    }
}
