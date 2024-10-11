export class Appointment {
  appointmentId?: number;
  subject: string;
  description: string;
  startDate: Date;
  endDate: Date;
  cId: number;

  constructor(
    appointmentId: number | undefined,
    subject: string,
    description: string,
    startDate: Date,
    endDate: Date,
    cId: number
  ) {
    this.appointmentId = appointmentId;
    this.subject = subject;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cId = cId;
  }
}
