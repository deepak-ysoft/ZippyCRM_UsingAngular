export class CustomerTask {
    taskId: number;
    activityType: string;
    summary: string;
    dueDate: Date;
    comments: string;
    customerId: number;
    userId: number;
    username?: string;
    createDate?: Date;
    updateDate?: Date;
  
    constructor(
      taskId: number,
      activityType: string,
      summary: string,
      dueDate: Date,
      comments: string,
      customerId: number,
      userId: number,
      username?: string,
      createDate?: Date,
      updateDate?: Date
    ) {
      this.taskId = taskId;
      this.activityType = activityType;
      this.summary = summary;
      this.dueDate = dueDate;
      this.comments = comments;
      this.customerId = customerId;
      this.userId = userId;
      this.username = username;
      this.createDate = createDate;
      this.updateDate = updateDate;
    }
  }
  