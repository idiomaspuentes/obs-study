import React, { createContext, useReducer, useContext } from "react";
import getStories from "./src/core";
import { pad } from "./src/core/utils";

export const OBSContext = createContext();

const initialState = {
  reference: {
    story: 1,
    frame: 1,
  },
  OBS: null,
};

function doesNextFrameExist(obs, reference) {
  return !!obs?.stories?.allStories[pad(reference.story)]?.textosArr[
    reference.frame + 1
  ];
}

function doesNextStoryExist(obs, reference) {
  return !!obs?.stories?.allStories[pad(reference.story + 1)];
}

function doesPrevFrameExist(obs, reference) {
  return !!obs?.stories?.allStories[pad(reference.story)]?.textosArr[
    reference.frame - 1
  ];
}

function doesPrevStoryExist(obs, reference) {
  return !!obs?.stories?.allStories[pad(reference.story - 1)];
}

function obtainLastFrame(obs, reference) {
  return (
    Object.keys(obs?.stories?.allStories[pad(reference.story - 1)]?.textosArr)
      .length - 1
  );
}

const OBSReducer = (state, action) => {
  switch (action.type) {
    case "GO_NEXT":
      if (doesNextFrameExist(state.OBS, state.reference)) {
        return {
          ...state,
          reference: {
            story: state.reference.story,
            frame: state.reference.frame + 1,
          },
        };
      } else if (doesNextStoryExist(state.OBS, state.reference)) {
        return {
          ...state,
          reference: { story: state.reference.story + 1, frame: 1 },
        };
      } else {
        return state;
      }
    case "NAV_TO":
      if (action.payload > 0 && action.payload < 51) {
        return {
          ...state,
          reference: { story: action.payload, frame: 1 },
        };
      } else {
        return state;
      }
    case "GO_PREV":
      if (
        doesPrevFrameExist(state.OBS, state.reference) &&
        state.reference.frame !== 1
      ) {
        return {
          ...state,
          reference: {
            story: state.reference.story,
            frame: state.reference.frame - 1,
          },
        };
      } else if (doesPrevStoryExist(state.OBS, state.reference)) {
        return {
          ...state,
          reference: {
            story: state.reference.story - 1,
            frame: obtainLastFrame(state.OBS, state.reference),
          },
        };
      } else {
        return state;
      }
    case "SET_OBS":
      return {
        ...state,
        OBS: action.payload,
      };

    default:
      return state;
  }
};

export const OBSContextProvider = (props) => {
  const [OBSState, setOBState] = useReducer(OBSReducer, initialState);

  return (
    <OBSContext.Provider value={{ OBSState, setOBState }}>
      {props.children}
    </OBSContext.Provider>
  );
};

export function useObsNav() {
  const { OBSState, setOBState } = useContext(OBSContext);

  const { reference } = OBSState;

  const goTo = (story) => {
    setOBState({ type: "NAV_TO", payload: story });
  };

  const goNext = () => {
    setOBState({ type: "GO_NEXT" });
  };

  const goPrev = () => {
    setOBState({ type: "GO_PREV" });
  };

  return { reference, goTo, goNext, goPrev };
}

export function useObs() {
  const { OBSState, setOBState } = useContext(OBSContext);

  const { OBS: source } = OBSState;
  const setSrc = (url) => {
    getStories(url).then((stories) => {
      setOBState({ type: "SET_OBS", payload: stories });
    });
  };
  return { source, setSrc };
}
