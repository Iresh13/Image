import {Reducer} from 'react';
import {store} from '../redux/redux.store';

export type TReducers = Reducer<unknown, any>;

export interface IReducer {
  type: string;
  [key: string]: any;
}

export type TDispatch = typeof store.dispatch;

export interface IStyles {
  [key: string]: any;
}

export interface IImage {
  id: number;
  data: null;
  mime: string;
  path: string;
  size: number;
  width: number;
  height: number;
  cropRect: object;
  filename: string;
  sourceURL: string;
  exif: null | string;
  creationDate: string;
  isSelected?: boolean;
  duration: null | string;
  localIdentifier: string;
  modificationDate: null | string;
}

export interface IReducerState {
  app: IImage[];
}
