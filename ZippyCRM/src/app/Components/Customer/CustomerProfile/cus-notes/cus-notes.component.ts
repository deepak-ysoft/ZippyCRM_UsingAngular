import { Component, inject, Input, OnInit } from '@angular/core';
import { CustomerNotes } from '../../../../Models/cusNotes.model';
import { NotesService } from '../../../../Services/customerService/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cus-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cus-notes.component.html',
  styleUrl: './cus-notes.component.css',
})
export class CusNotesComponent implements OnInit {
  @Input() customerId: any;
  notesList: CustomerNotes[] = [];
  service = inject(NotesService);
  ngOnInit(): void {
    this.getNotesList(this.customerId);
  }
  getNotesList(id: any) {
    debugger;
    this.service.getNotes(id).subscribe((res: any) => {
      this.notesList = res;
    });
  }
}
