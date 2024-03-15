import React, { createContext, useReducer, useContext, useEffect } from "react";
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
  return !!obs?.stories?.[pad(reference.story)]?.frames[reference.frame + 1];
}

function doesNextStoryExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story + 1)];
}

function doesPrevFrameExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story)]?.frames[reference.frame - 1];
}

function doesPrevStoryExist(obs, reference) {
  return !!obs?.stories?.[pad(reference.story - 1)];
}

function obtainLastFrame(obs, reference) {
  return (
    Object.keys(obs?.stories?.[pad(reference.story - 1)]?.frames).length - 1
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

useEffect(() => {
  //setear el item del asyngStorage cada que cambie la referencia de la aplicacion

}, [reference]);

useEffect(() => {
  //setear la referencia una unica vez 
  //TODO usar funcion gotoFrame
}, []);

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
  const setSrc = () => {
    getStories("es-419_gl", "xsu").then((obs) => {
      setOBState({ type: "SET_OBS", payload: obs });
    });
  };
  return { source, setSrc };
}
