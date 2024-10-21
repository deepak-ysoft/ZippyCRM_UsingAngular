import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CustomerNotes } from '../../../../Models/cusNotes.model';
import { NotesService } from '../../../../Services/customerService/notes.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import Quill from 'quill';
declare var bootstrap: any;

@Component({
  selector: 'app-cus-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cus-notes.component.html',
  styleUrl: './cus-notes.component.css',
})
export class CusNotesComponent implements OnInit {
  @Input() customerId: any;
  notesList: CustomerNotes[] = [];
  notes: CustomerNotes;
  modalPopupAndMsg = 'Add Contact';
  service = inject(NotesService);
  @ViewChild('addNotesModal', { static: false }) addNotesModal!: ElementRef;
  @ViewChild('quillEditor', { static: false }) quillEditor!: ElementRef;
  quill!: Quill;
  notesForm: FormGroup;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    this.notes = new CustomerNotes();
    this.notesForm = this.fb.group({
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getNotesList(this.customerId);
  }
  getNotesList(id: any) {
    this.service.getNotes(id).subscribe((res: any) => {
      this.notesList = res;
    });
  }

  ngAfterViewInit() {
    debugger;
    if (isPlatformBrowser(this.platformId) && this.quillEditor) {
      import('quill')
        .then((module) => {
          const Quill = module.default as any; // Type assertion
          this.quill = new Quill(this.quillEditor.nativeElement, {
            theme: 'snow',
          });
          this.populateQuillEditor();
        })
        .catch((error) => console.error('Error loading Quill:', error));
    }
  }
  // If you want to populate Quill with initial content (from the form control)

  // Function to populate Quill editor with form field content
  populateQuillEditor() {
    const description = this.notesForm.get('description')?.value;
    if (description) {
      this.quill.root.innerHTML = description;
    }
  }

  // Function to update the hidden input field (Angular form control) with Quill content
  updateHiddenInput() {
    const quillContent = this.quill.root.innerHTML;
    this.notesForm.patchValue({
      description: quillContent,
    });
  }

  onAdd() {
    this.clearForm();
    this.notes = new CustomerNotes();
  }

  onEdit(notes: CustomerNotes) {
    // Populate the Angular form with the note data
    this.notesForm.patchValue({
      description: notes.description,
    });
    this.notes = notes;
    this.modalPopupAndMsg = 'Edit Contact';
    // Once the form is patched, populate the Quill editor with the description
    this.populateQuillEditor();
  }

  // Handle form submission
  onSubmit() {
    this.updateHiddenInput(); // Ensure the Quill content is updated in the form before submitting

    // Transfer the form control values into the CustomerNotes object
    const formValues = this.notesForm.value;

    // Copy the description from the form into the notes object
    this.notes.description = formValues.description;

    this.notes.userId = 5;
    this.notes.customerId = this.customerId;
    // Proceed with the API call
    this.service.inserNotes(this.notes).subscribe((res: any) => {
      if (res) {
        this.notes = new CustomerNotes();
        this.clearForm();
        const modal = bootstrap.Modal.getInstance(
          this.addNotesModal.nativeElement
        );
        modal.hide();
        this.getNotesList(this.customerId);
      }
    });
  }

  clearForm() {
    // Clear the Quill editor content
    this.quill.root.innerHTML = '';

    // Clear the form controls, particularly the description
    this.notesForm.reset(); // Optionally reset the entire form
  }

  notesDetails(notes: CustomerNotes) {
    this.notes = notes;
    this.modalPopupAndMsg = 'Notes Details';
  }
}
export default {
  build: {
    rollupOptions: {
      external: ['quill'],
    },
  },
};
