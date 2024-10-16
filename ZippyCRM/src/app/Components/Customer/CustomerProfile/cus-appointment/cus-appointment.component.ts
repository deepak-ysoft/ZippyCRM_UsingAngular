import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
  
} from '@fullcalendar/angular'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // FullCalendar plugins
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cus-appointment',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './cus-appointment.component.html',
  styleUrl: './cus-appointment.component.css',
})
export class CusAppointmentComponent implements OnInit {
  @ViewChild('calendar') calendarComponent?: FullCalendarComponent; // Access to the calendar instance
  @Input() customerId: any;
  // Define calendar options
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    events: this.fetchEvents.bind(this), // Load events via a function
    eventDrop: this.handleEventDrop.bind(this), // Handle event drop
    eventResize: this.handleEventResize.bind(this), // Handle event resize
    eventClick: this.handleEventClick.bind(this), // Handle event click
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      events: this.fetchEvents.bind(this), // Binding `fetchEvents` for event fetching
      eventDrop: this.handleEventDrop.bind(this), // Handle event drop
      eventResize: this.handleEventResize.bind(this), // Handle event resize
      eventClick: this.handleEventClick.bind(this), // Handle event click
    };
  }

  // Method to fetch events from the backend
  fetchEvents(
    fetchInfo: any,
    successCallback: any,
    failureCallback: any
  ): void {
    this.http
      .get(
        `https://localhost:7269/api/Customer/GetAppointments/${this.customerId}`
      )
      .subscribe(
        (data: any) => {
          const events = data.map(
            (appointment: {
              appointmentid: any;
              subject: any;
              start: any;
              end: any;
              description: any;
            }) => ({
              id: appointment.appointmentid,
              title: appointment.subject,
              start: appointment.start,
              end: appointment.end,
              description: appointment.description,
            })
          );
          successCallback(events);
        },
        (error) => {
          console.error('Error loading events', error);
          failureCallback(error);
        }
      );
  }

  // Handle event drop (move event)
  handleEventDrop(eventDropInfo: { event: any; revert: () => void }): void {
    const event = eventDropInfo.event;
    const newStart = event.start.toISOString();
    const newEnd = event.end ? event.end.toISOString() : newStart;

    this.http
      .post('/api/UpdateAppointment', {
        id: event.id,
        newStart,
        newEnd,
      })
      .subscribe(
        (response) => {
          console.log('Event updated successfully');
        },
        (error) => {
          console.error('Error updating event', error);
          eventDropInfo.revert(); // Revert the changes if failed
        }
      );
  }

  // Handle event resize
  handleEventResize(eventResizeInfo: { event: any; revert: () => void }): void {
    const event = eventResizeInfo.event;
    const newStart = event.start.toISOString();
    const newEnd = event.end ? event.end.toISOString() : newStart;

    this.http
      .post('/api/UpdateAppointment', {
        id: event.id,
        newStart,
        newEnd,
      })
      .subscribe(
        (response) => {
          console.log('Event resized successfully');
        },
        (error) => {
          console.error('Error resizing event', error);
          eventResizeInfo.revert(); // Revert changes if failed
        }
      );
  }

  // Handle event click
  handleEventClick(clickInfo: { event: { id: any } }): void {
    const eventId = clickInfo.event.id;

    this.http
      .get(
        `https://localhost:7269/api/Customer/GetAppointmentDetails/${eventId}`
      )
      .subscribe(
        (data: any) => {
          // Show appointment details (can integrate with a modal)
          alert('Appointment Details: ' + JSON.stringify(data));
        },
        (error) => {
          console.error('Error fetching appointment details', error);
        }
      );
  }
}
