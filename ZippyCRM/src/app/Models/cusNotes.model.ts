export class CustomerNotes {
    notesId: number;
    title: string;
    description: string;
    customerId: number;
    userId: number;
    username?: string;
    createDate?: Date;
    updateDate?: Date;
  
    constructor(
      notesId: number,
      title: string,
      description: string,
      customerId: number,
      userId: number,
      username?: string,
      createDate?: Date,
      updateDate?: Date
    ) {
      this.notesId = notesId;
      this.title = title;
      this.description = description;
      this.customerId = customerId;
      this.userId = userId;
      this.username = username;
      this.createDate = createDate;
      this.updateDate = updateDate;
    }
  }
  