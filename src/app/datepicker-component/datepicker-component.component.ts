import { Component, OnInit, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-datepicker-component",
  templateUrl: "./datepicker-component.component.html",
  styleUrls: ["./datepicker-component.component.less"],
  host: {
    "(document:click)": "onClick($event)"
  }
})
export class DatepickerComponentComponent implements OnInit {
  focus: boolean;

  minimalRangeSelected: number;
  maximalRangeSelected: number;

  @Input() minimalDate: string;
  @Input() maximalDate: string;

  constructor(private _el: ElementRef) {}

  selectRange({minimalRangeSelected, maximalRangeSelected}) {
    this.minimalRangeSelected = minimalRangeSelected;
    this.maximalRangeSelected = maximalRangeSelected;
  }

  ngOnInit() {}

  onInputClick(event: Event) {
    event.preventDefault();
  }

  onClick(event: Event) {
    if (!this._el.nativeElement.contains(event.target)) this.focus = false;
    else this.focus = true;
  }
}
