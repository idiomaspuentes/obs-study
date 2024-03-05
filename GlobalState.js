import React, { createContext, useReducer, useContext } from 'react';

export const OBSContext = createContext();

const initialState = {
  reference: {
    story: 1,
    frame: 1
  }
};

function doesNextFrameExist() {
  return false;
};

function doesNextStoryExist() {
  return true;
};

function doesPrevFrameExist() {
  return false;
};

function doesPrevStoryExist() {
  return true;
};

function obtainLastFrame() {
  return 10;
};

const OBSReducer = (state, action) => {
  switch (action.type) {
    case 'GO_NEXT':
      if (doesNextFrameExist()) {
        return {
          reference: { story: state.reference.story, frame: state.reference.frame + 1 }
        };
      } else if (doesNextStoryExist()) {
        return {
          reference: { story: state.reference.story + 1, frame: 1 }
       };
      } else {
        return state;
      };
  case 'NAV_TO':
      if (action.payload > 0 && action.payload < 51) {
        return {
          reference: { story: action.payload, frame: 1 }
        };
      } else {
        return state;
      };
    case 'GO_PREV':
      if (doesPrevFrameExist()) {
        return { 
          reference: { story: state.reference.story, frame: state.reference.frame - 1 }
        };
      } else if (doesPrevStoryExist()) {
        return {
          reference: { story: state.reference.story - 1, frame: obtainLastFrame()}
        };
      } else {
        return state;
      };
    default:
      return state;
  }
};

export const OBSContextProvider = props => {
  const [OBSState, dispatch] = useReducer(OBSReducer, initialState);

  return (
    <OBSContext.Provider value={[OBSState, dispatch]}>
      {props.children}
    </OBSContext.Provider>
  );
};

export function useObsNav() {
  const [OBSState, dispatch] = useContext(OBSContext);

  const {reference} = OBSState;

  const goTo = (story) => {dispatch({ type: 'NAV_TO', payload: story})};

  const goNext = () => {dispatch({ type: 'GO_NEXT'})};

  const goPrev = () => {dispatch({ type: 'GO_PREV' })};

  return {reference, goTo, goNext, goPrev};
};


