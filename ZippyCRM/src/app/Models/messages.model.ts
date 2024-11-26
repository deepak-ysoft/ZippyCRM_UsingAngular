export class Messages {
  id: number;
  senderName: string;
  receiverId: number;
  receiverMobileNo: string;
  senderImagePath: string;
  message: string;
  isMarked: boolean;
  sendTime?: Date;
  constructor() {
    this.id = 0;
    this.senderName = '';
    this.receiverId = 0;
    this.receiverMobileNo = '';
    this.senderImagePath = '';
    this.message = '';
    this.isMarked = false;
  }
}
