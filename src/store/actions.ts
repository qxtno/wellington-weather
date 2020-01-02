import {
  AddLocationActionPayload,
  StateAction,
  StateActionType
} from '../types';

export class AddLocationAction implements StateAction {
  public type: StateActionType = 'ADD_LOCATION';
  constructor(public payload: AddLocationActionPayload) {}
}
