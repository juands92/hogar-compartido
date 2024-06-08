import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as ProfileSelectors from '../../store/selectors/profile.selectors';
import { AppState, ProfileState } from '../../store/state/state';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { EventService } from '../../services/events.service';
import { EventBody, ProfileResponse } from '../../models/general-types';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { UserService } from '../../services/user.service';
import * as ProfileActions from '../../store/actions/profile.actions';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [],
})
export class CalendarComponent implements OnInit {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);
  userId: string = '';
  homeId?: string = '';
  public invalidCredentials: boolean;
  public errorMessage: string = '';
  public successMessageVisible: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private store: Store<AppState>,
    private eventService: EventService,
    private _userService: UserService
  ) {
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        this.homeId = profile.home?.id;
        const calendarEvents: EventInput[] =
          profile.home?.events.map((event) => ({
            id: event.id.toString(),
            title: event.title,
            start: moment(event.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            allDay: true,
          })) || [];

        this.calendarOptions.update((options) => ({
          ...options,
          events: calendarEvents,
        }));
      });

    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Por favor introduce un nuevo evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent: EventBody = {
        title,
        date: moment(selectInfo.startStr).format('DD/MM/YYYY'),
        home: { id: this.homeId! },
      };

      this.eventService.createEvent(newEvent).subscribe({
        next: (event) => {
          calendarApi.addEvent({
            id: event.id.toString(),
            title: event.title,
            start: moment(event.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            allDay: true,
          });
          this.handleSuccess();
        },
        error: this.handleError.bind(this),
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(`Estás seguro de eliminar el evento '${clickInfo.event.title}'`)
    ) {
      this.eventService.deleteEvent(clickInfo.event.id).subscribe(() => {
        clickInfo.event.remove();
        this.handleSuccess();
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  private updateProfileState() {
    this._userService.getUser(this.userId).subscribe({
      next: (response: ProfileResponse) => {
        this.store.dispatch(
          ProfileActions.updateHome({
            home: response.home,
          })
        );
      },
      error: this.handleError.bind(this),
    });
  }

  private handleError(error: { status: HttpStatusCode; error: string }) {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.invalidCredentials = true;
    }

    this.errorMessage = '!Algo ha salido mal!';
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  private handleSuccess() {
    this.successMessageVisible = true;
    this.updateProfileState();
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 4000);
  }
}
