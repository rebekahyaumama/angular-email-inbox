import { IEmail } from '../services/email.service';
import * as fromRoot from './app.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { state } from '@angular/animations';

export interface AppState {
  inbox: Record<string, IEmail>;
  tags: string[];
}
export const EMAIL_TAGS = ['inbox', 'travel', 'work'];
export const initialState: AppState = { inbox: {}, tags: EMAIL_TAGS };
const _appReducer = createReducer(
  initialState,
  on(fromRoot.FetchEmailsSuccessAction, (state: AppState, action) => {
    return {
      ...state, 
      inbox: action.emails, 
    };
  }),
  on(fromRoot.RemoveEmailFromStateAction, (state: AppState, action) => {
    return {
      ...state,
      inbox: {
        ...state.inbox,
        [action.id]: {
          ...state.inbox[action.id],
          deleted: true,
        },
      },
    };
  }),
  on(fromRoot.TagsSelectionChangedAction, (state: AppState, action) => {
    return {
       ...state,
      inbox: {
        ...state.inbox,
        [action.id]: {
          ...state.inbox[action.id],
          tags: action.checked ? state.inbox[action.id].tags.concat(action.tag) : state.inbox[action.id].tags.filter(tag => tag !== action.tag),
        }
      }
    };  
  }),
  on(fromRoot.AddNewTagToStateAction, (state: AppState, action) => {
    return {
      ...state,
      tags: state.tags.concat(action.tag),
    };
  })
);

export function appReducer(state: AppState = initialState, action: Action): AppState {
  return _appReducer(state, action);
}
