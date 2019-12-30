import { StateAction, AddLocationActionPayload } from '../types';

export const ADD_LOCATION = 'ADD_LOCATION';

export class AddLocationAction implements StateAction {
  type: string = ADD_LOCATION;
  payload: AddLocationActionPayload;

  constructor(payload: AddLocationActionPayload) {
    this.payload = payload;
  }
}
