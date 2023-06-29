import {EAPP_REDUCERS} from '../app/app.constant';

export const updateImages = (image: any) => {
  return async function (dispatch: any) {
    dispatch({
      type: EAPP_REDUCERS.UPDATE_IMAGES,
      payload: image,
    });
  };
};
