import { LessonActions, LessonActionTypes } from './app.actions';
import { LessonsState, Lesson } from './app.store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

export const sortBySeqNo = (l1: Lesson, l2: Lesson) => {
  return l2.seqNo - l1.seqNo;
};

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortBySeqNo
});

export const getLessonsState = createFeatureSelector<LessonsState>('items');

export const initialLessonsState: LessonsState = adapter.getInitialState();
export function createReducers(
  state = initialLessonsState,
  action: LessonActions
): LessonsState {
  switch (action.type) {

    case LessonActionTypes.LoadLessons: {
      return adapter.addAll(
        action.payload.lessons, {
          ...state,
          allCoursesLoaded: true
        }
      );
    }

    case LessonActionTypes.AddLesson: {
      return adapter.addOne(action.payload.lesson, {
        ...state,
        allCoursesLoaded: false
      });
    }


    default: return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectAllLesson = createSelector(
  getLessonsState,
  selectAll
);

export const totalLesson = createSelector(
  getLessonsState,
  selectTotal
);
