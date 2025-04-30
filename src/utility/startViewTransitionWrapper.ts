import { flushSync } from "react-dom";

// Creates a smooth transition effect when updating the state of a component
export const startViewTransitionWrapper = (stateSetFunc: () => void) => {
  document.startViewTransition
    ? document.startViewTransition(() => {
        flushSync(() => {
          stateSetFunc();
        });
      })
    : // Not supported by all browsers (specifically Firefox), so it falls back to a normal state update
      stateSetFunc();
};

export default startViewTransitionWrapper;
