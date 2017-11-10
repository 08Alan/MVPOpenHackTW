import { Record } from 'immutable';
import { navigateActions } from './actions';

export const NavigateState = new Record({
  isCollapsed: false,
  process: 0,
});

export function navigateReducer(state = new NavigateState(), {payload, type}) {
  switch (type) {
    case navigateActions.CHANGE_LAYOUT_COLLAPSED:
      return state.set('isCollapsed', payload.collapsed);

    case navigateActions.UPDATE_PROCESS:
      return state.set('process', payload.process);

    default:
      return state;
  }
}
