import { Component, inject, Input, OnInit } from '@angular/core';
import { CustomerTask } from '../../../../Models/cusTask.model';
import { TaskService } from '../../../../Services/customerService/task.service';
import { number } from 'echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cus-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cus-task.component.html',
  styleUrl: './cus-task.component.css',
})
export class CusTaskComponent implements OnInit {
  taskList: CustomerTask[] = [];
  service = inject(TaskService);
  @Input() customerId!: any;
  ngOnInit(): void {
    this.getTaskList(this.customerId);
  }
  getTaskList(cId: any) {
    debugger;
    this.service.getTask(cId).subscribe((res: any) => {
      this.taskList = res;
    });
  }
}
