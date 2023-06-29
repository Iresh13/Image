import {combineReducers} from 'redux';

import {EAPP_REDUCERS} from '../app/app.constant';
import {IImage, IReducer, TReducers} from '../app/app.types';

const initialState: IImage[] = [];

export const appReducer = (state = initialState, action: IReducer) => {
  switch (action.type) {
    case EAPP_REDUCERS.UPDATE_IMAGES:
      return action.payload;

    default:
      return initialState;
  }
};

const reducers = combineReducers({
  app: appReducer,
});

export default reducers as TReducers;
