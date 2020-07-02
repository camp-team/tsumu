import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NoteComponent } from '../note/note/note.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<NoteComponent> {
  canDeactivate(
    component: NoteComponent,
  ): Observable<boolean> | boolean {
    console.log(component.form);
    if (component.form.pristine || component.isComplete) {
      return true;
    }
    const confirmation = window.confirm('作業中の内容が失われますがよろしいですか?');
    return of(confirmation);
  }
}
