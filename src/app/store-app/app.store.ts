import { EntityState } from '@ngrx/entity';

export interface Course {
  id: number;
  description: string;
  iconUrl?: string;
  courseListIcon?: string;
  longDescription?: string;
  category: string;
  seqNo: number;
  lessonsCount?: number;
  promo?: boolean;
}

export interface Lesson {
  id: number | string;
  description: string;
  duration: string;
  seqNo: number;
  courseId?: number;
  videoId?: string;
}

export interface CoursesState {
  ids: number[] | string[];
  entities: { [key: number]: Course };
}

export interface LessonsState extends EntityState<Lesson> {
  ids: number[] | string[];
  entities: { [id: string ]: Lesson };
}

export interface StoreState {
  courses: CoursesState;
  lessons: LessonsState;
}
