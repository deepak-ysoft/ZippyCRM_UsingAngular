import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CustomerTask } from '../../../../Models/cusTask.model';
import { TaskService } from '../../../../Services/customerService/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../../Models/Users';
import { UsersService } from '../../../../Services/customerService/users.service';
import { CustomerServiceService } from '../../../../Services/customerService/customer-service.service';

declare var bootstrap: any;
@Component({
  selector: 'app-cus-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cus-task.component.html',
  styleUrl: './cus-task.component.css',
})
export class CusTaskComponent implements OnInit {
  taskList: CustomerTask[] = [];
  users: Users[] = [];
  task: CustomerTask;
  service = inject(TaskService);
  userService = inject(UsersService);
  cusService = inject(CustomerServiceService);
  userOptions: Array<{ value: number; text: string }> = [];
  modalPopupAndMsg = 'Create Task';

  @Input() customerId!: any;
  @ViewChild('addTaskModal', { static: false }) addTaskModal!: ElementRef;

  constructor() {
    this.task = new CustomerTask();
  }

  ngOnInit(): void {
    this.getTaskList(this.customerId);
  }
  getTaskList(cId: any) {
    this.service.getTask(cId).subscribe((res: any) => {
      this.taskList = res;
    });
  }

  onAdd() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.userOptions = this.users.map((user) => ({
        value: user.userId,
        text: user.username,
      }));
    });

    this.task = new CustomerTask();
  }

  editTask(task: CustomerTask) {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.userOptions = this.users.map((user) => ({
        value: user.userId,
        text: user.username,
      }));
    });

    this.task = task;
    this.modalPopupAndMsg = 'Edit Task';
  }
  onSubmit() {
    this.task.customerId = this.customerId;
    debugger;
    this.service.insertTask(this.task).subscribe((res: any) => {
      if (res) {
        this.task = new CustomerTask();
        const modal = bootstrap.Modal.getInstance(
          this.addTaskModal.nativeElement
        );
        modal.hide();
        this.getTaskList(this.customerId);
      } else {
        alert('Not Added!');
      }
    });
  }

  taskDetails(task: CustomerTask) {
    debugger;
    this.task = task;
    this.modalPopupAndMsg = 'Contact Details';
  }

  DeleteTask(id: number) {
    this.cusService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.service.succesDelete(id).subscribe((res: any) => {
          this.getTaskList(this.customerId);
        });
      }
    });
  }
}
