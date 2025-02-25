import React, { PropsWithChildren } from 'react';

export interface WarningDialogProps extends PropsWithChildren {
  title: string;
  acceptLabel: string;
  cancelLabel: string;
  onAccept: () => void;
}

export function WarningDialog({ title, acceptLabel, cancelLabel, onAccept, children }: WarningDialogProps) {
  return (
    <div className="modal fade" id="warning-dialog" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger" id="exampleModalLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          { children }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{cancelLabel}</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onAccept}>{acceptLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}