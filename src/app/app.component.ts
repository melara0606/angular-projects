import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Lesson } from './store-app/app.store';
import { Component, OnInit } from '@angular/core';

import {
  selectAllLesson, totalLesson
} from './store-app/app.reducers';
import { LoadLessons, AddLesson } from './store-app/app.actions';
import { LessonsState } from './store-app/app.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public listLesson$: Observable<Lesson[]>;
  public count$: Observable<number>;

  constructor(
    private store: Store<LessonsState>
  ) {
    this.addInitial();
  }

  ngOnInit() {
    this.listLesson$ = this.store.select(selectAllLesson);
    this.count$ = this.store.select(totalLesson);
  }

  add() {
    const id = Math.round(Math.random() * 1500);
    const lesson: Lesson = {
      id,
      description: 'Unidirectional Data Flow And The Angular Development Mode',
      duration: '7:07',
      seqNo: id,
      courseId: 0
    };
    this.store.dispatch(new AddLesson({ lesson }));
  }

  addInitial() {
    const lessons: Lesson[] = [
      {
        id: 1,
        description: 'Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step',
        duration: '4:17',
        seqNo: 10,
        courseId: 1
      },
      {
        id: 2,
        description: 'Building Your First  Component - Component Composition',
        duration: '2:07',
        seqNo: 2,
        courseId: 1
      }
    ];
    this.store.dispatch(new LoadLessons({ lessons }));
  }
}
