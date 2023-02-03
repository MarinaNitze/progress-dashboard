import React, { Dispatch, SetStateAction } from 'react';

type CompareHideCardTogglesProps = {
  hideAll: boolean | undefined;
  setHideAll: Dispatch<SetStateAction<boolean | undefined>>;
};
export default function CompareHideCardToggles({
  hideAll,
  setHideAll,
}: CompareHideCardTogglesProps) {
  return (
    <div className="flex-start mobile-col">
      <p className="show-hide-title">Implemented Recommendations</p>
      <div className="flex-start">
        <button
          className={`${hideAll === false ? 'active' : ''}`}
          onClick={() => setHideAll(false)}
        >
          Show all
        </button>
        <hr />
        <button
          className={`${hideAll === true ? 'active' : ''}`}
          onClick={() => setHideAll(true)}
        >
          Hide all
        </button>
      </div>
    </div>
  );
}
