import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  days: Array<Object> = new Array(31).fill(0);

  @Output() selectRange = new EventEmitter();

  @Input() minimalDate: string;
  @Input() maximalDate: string;

  @Input() minimalRangeSelected: any;
  @Input() maximalRangeSelected: any;

  minRange: number;
  maxRange: number;

  constructor() {}

  parseDate = (date: string): number =>
    date ? parseInt(date.split("-")[2]) : null;

  parseRange = (value: string): number | null =>
    value ? parseInt(value) : null;

  unsetDays() {
    this.days = this.days.map((_, index) => ({
      id: index + 1,
      inRange:
        index + 1 >= (this.minRange || 31) && index + 1 <= (this.maxRange || 0),
      disabled:
        index + 1 <= (this.parseDate(this.minimalDate) || 0) ||
        index + 1 >= (this.parseDate(this.maximalDate) || 32)
    }));
  }

  sendDataToParent(event: Event) {
    if (!this.minimalRangeSelected)
      this.minimalRangeSelected = parseInt((event.target as any).id);
    else if (!this.maximalRangeSelected)
      this.maximalRangeSelected = parseInt((event.target as any).id);
    else {
      this.maximalRangeSelected = undefined;
      this.minimalRangeSelected = undefined;
    }
    this.selectRange.emit({
      minimalRangeSelected: this.minimalRangeSelected,
      maximalRangeSelected: this.maximalRangeSelected
    });
  }

  swapRanges() {
    let tmp = this.minRange;
    this.minRange = this.maxRange;
    this.maxRange = tmp;
  }

  ngOnInit() {

    console.log(this.minimalDate, this.maximalDate);
    this.minRange = this.parseRange(this.minimalRangeSelected);
    this.maxRange = this.parseRange(this.maximalRangeSelected);

    if ((this.minRange || 0) > (this.maxRange || 31)) this.swapRanges();
    this.unsetDays();
  }
}
