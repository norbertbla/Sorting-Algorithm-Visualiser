import { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';

const TOAST_PARAMS = {
  autoClose: 100,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};
const CloseButtonSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 460 460" id="close">
    <path
      fill="currentColor"
      d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
            c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
            c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
            c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
            l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
            c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
    />
  </svg>
);

const RestoreButtonSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="restore">
    <path
      fill="currentColor"
      d="M13.25 3c-5.09-.14-9.26 3.94-9.26 9H2.2c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.32-.31.09-.85-.35-.85h-1.8c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.43-.39 1.13.08 1.5 1.52 1.19 3.44 1.9 5.52 1.9 5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.33-.74-.75-.74z"
    />
  </svg>
);

const errorToast = (message: string, handleResetArray?: MouseEventHandler<HTMLButtonElement>) => (
  <div className="alert shadow-sm absolute sm:-top-24 h-15 p-3 z-50 border-2 sm:border-0 border-accent  max-w-xs sm:w-full sm:max-w-none mr-auto ml-auto left-0 right-0 mb-5 ">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="transparent"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h3 className="font-bold">Error</h3>
        <div className="text-xs">{message}</div>
      </div>
    </div>
    <div className="flex-none">
      {!!handleResetArray ? (
        <>
          <button className="btn btn-square">
            <CloseButtonSvg />
          </button>
          <button className="btn btn-square" onClick={handleResetArray}>
            <RestoreButtonSvg />
          </button>
        </>
      ) : (
        <button className="btn btn-square">
          <CloseButtonSvg />
        </button>
      )}
    </div>
  </div>
);

const riseErrorToast = (message: string, handleResetArray?: MouseEventHandler<HTMLButtonElement>) => {
  if (!!handleResetArray) toast(errorToast(message, handleResetArray), TOAST_PARAMS);
  else toast(errorToast(message), TOAST_PARAMS);
};

export default riseErrorToast;
