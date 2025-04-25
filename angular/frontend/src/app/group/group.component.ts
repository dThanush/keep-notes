import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './group.component.html',
})
export class GroupComponent {
  groups: any[] = [];
  showNoteForm = false;
  activeNote: any = null;
  selectedGroup: any = null;
  newGroup = { name: '', code: '', status: '' };
  newNote = { title: '', notes: '', status: '' };
  // editNote: any = null;
  
  constructor(private http: HttpClient) {
    this.getGroups();
  }

  getGroups() {
    this.http.get('http://localhost:8000/groups/').subscribe((data: any) => {
      this.groups = data;
    });
  }

  getGroupsAndReselect() {
    const selectedId = this.selectedGroup?.id;
    this.http.get('http://localhost:8000/groups/').subscribe((data: any) => {
      this.groups = data;
      this.selectedGroup = data.find((g: any) => g.id === selectedId) || null;
    });
  }
  selectGroup(group: any) {
    this.selectedGroup = group;
  }

  createGroup() {
    this.http.post('http://localhost:8000/groups/', this.newGroup).subscribe(() => {
      this.getGroups();
      this.newGroup = { name: '', code: '', status: '' };
    });
  }

  createNote() {
    const notePayload = { ...this.newNote, group: this.selectedGroup.id };
    this.http.post('http://localhost:8000/notes/', notePayload).subscribe(() => {
      this.newNote = { title: '', notes: '', status: '' };
      this.getGroupsAndReselect();
    });
  }

  // startEditNote(note: any) {
  //   this.editNote = { ...note };
  // }

  // cancelEditNote() {
  //   this.editNote = null;
  // }

  // updateNote() {
  //   this.http.put(`http://localhost:8000/notes/${this.editNote.id}/`, this.editNote).subscribe(() => {
  //     this.editNote = null;
  //     this.getGroupsAndReselect();
  //   });
  // }

  deleteNote(noteId: number) {
    this.http.delete(`http://localhost:8000/notes/${noteId}/`).subscribe(() => {
      this.activeNote = null;
      this.getGroupsAndReselect();
    });
  }

  duplicateNote(note: any) {
    const copy = {
      ...note,
      title: note.title ,
      group: this.selectedGroup.id,
    };
    
    this.http.post('http://localhost:8000/notes/', copy).subscribe(() => {
      this.getGroupsAndReselect();
    });
  }
  selectNote(note: any) {
    this.activeNote = note;
  }
}