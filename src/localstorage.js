// import {Record} from 'immutable';

export const loadState = () => {
  try {
      const serializedState = localStorage.getItem('state');

      if (serializedState === null) {
          return undefined;
      }

      // const loadedState = JSON.parse(serializedState);

      return JSON.parse(serializedState);
  }  catch (err) {
        return undefined;
  }
};

export const saveState = (state) => {
   // console.log('----- saveState', state.toJS());
  try {
      const serializedState = JSON.stringify(state);
      // console.log('----- saveState, serializedState', serializedState);

      localStorage.setItem('state', serializedState);
      // debugger
  } catch (err) {
      // console.log('----- saveStateError', state);

  }
};