import React, { createContext, useReducer, useContext } from "react";
import { pad } from "./src/core/utils";
import { getStories } from "./src/core/getStories";

export const OBSContext = createContext();

const initialState = {
  reference: {
    story: 1,
    frame: 1,
  },
  OBS: null,
};

function doesNextFrameExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story)]?.frames[reference.frame];
}

function doesNextStoryExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story + 1)];
}

function doesPrevFrameExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story)]?.frames[reference.frame - 2];
}

function doesPrevStoryExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story - 1)];
}

function obtainLastFrame(obs, reference) {
  return (
    Object.keys(obs?.stories?.[pad(reference.story - 1)]?.frames).length
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
      const {story, frame} = action.payload;
      if (!story) {console.error('No se envió un story'); return state;}
      if (!state.OBS?.stories?.[pad(story)]) {console.error('No se encontró el story especificado'); return state;}
      if (frame && (!state.OBS?.stories?.[pad(story)]?.frames[frame - 1])){console.error('No se encontró el frame especificado'); return state;}
      if (!frame){
      return {
        ...state,
        reference: { story, frame: 1 },
      }} else
      return {
      ...state,
        reference: { story, frame },
      };
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

  const goTo = (story, frame) => {
    setOBState({ type: "NAV_TO", payload: {story, frame} });
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
  const setSrc = () => {
    getStories("es-419_gl", "xsu").then((obs) => {
      setOBState({ type: "SET_OBS", payload: obs });
    });
  };
  return { source, setSrc };
}
