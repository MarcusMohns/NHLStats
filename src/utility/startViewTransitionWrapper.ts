import { flushSync } from "react-dom";

export const startViewTransitionWrapper = (stateSetFunc: () => void) => {
  document.startViewTransition
    ? document.startViewTransition(() => {
        flushSync(() => {
          stateSetFunc();
        });
      })
    : stateSetFunc();
};

export default startViewTransitionWrapper;
