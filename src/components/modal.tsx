import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export type ModalProps = PropsWithChildren & {
  visible: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal(props: ModalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById('modal-root'));
  }, []);

  if (!root || !props.visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75">
      <dialog className="max-w-[90%] rounded p-6 py-2 shadow" open={props.visible}>
        <div className="max-w-container">
          {props.title ? (
            <div className="flex items-center justify-between gap-12 border-b py-2">
              <span className="text-2xl">{props.title}</span>
              <button className="btn-icon h-10 w-10 text-2xl" onClick={props.onClose}>
                x
              </button>
            </div>
          ) : null}
          <div>{props.children}</div>
        </div>
      </dialog>
    </div>,
    root
  );
}
