import React, { useEffect, useRef } from 'react';
import './AddStation.scss';

const DeleteStation = (props: any) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('open')
      ref.current.showModal();
    }
  }, [])

  return (
    <dialog ref={ref}>
        <h3 className="dialog-title">Delete Station</h3>
        <div className="dialog-content">
          <p>Are you sure you want to delete the station?</p>
        </div>
        <div className="dialog-footer">   
          <button
            type="button"
            onClick={props.deleteFormVisibility}
          >Cancel</button>
          <button 
            type="submit"
            className="submitbutton"
            onClick={props.deleteHandler}
          >Confirm</button>
        </div>
    </dialog>
  )
}

export default DeleteStation