import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DatepickerComponentComponent } from "./datepicker-component/datepicker-component.component";
import { CalendarComponent } from "./calendar/calendar.component";

@NgModule({
  declarations: [AppComponent, DatepickerComponentComponent, CalendarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  minimalDate: string;
  maximalDate: string;
}
