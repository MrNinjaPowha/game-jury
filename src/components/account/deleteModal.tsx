import { useRef, useState } from 'react';
import Modal from '../modal';
import LoadingButton from '../loadingButton';

export default function DeleteModal(props: { visible: boolean; onClose: () => void }) {
  const confirmRef = useRef<HTMLInputElement>(null);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string>();

  function onClose() {
    setDeleteEnabled(false);
    props.onClose();
  }

  function onChange() {
    if (confirmRef.current?.value === 'Confirm') {
      setDeleteEnabled(true);
    } else {
      setDeleteEnabled(false);
    }
  }

  async function confirmDelete() {
    const token = localStorage.getItem('token');

    if (!token) {
      return setError('You are currently not recognized as logged in, please try to log in again.');
    }

    setDeleting(true);

    try {
      await fetch('/api/users/delete', {
        method: 'DELETE',
        body: JSON.stringify(token),
      });

      setDeleting(false);
      localStorage.removeItem('token');
      window.location.assign('/');
    } catch (err) {
      setDeleting(false);
      setError('Something went wrong, please try again later!');
    }
  }

  return (
    <Modal title="Delete Account?" visible={props.visible} onClose={onClose}>
      <p className="p-1">
        Are you sure you want to delete your account? After deletion it can not be recovered.
      </p>
      <p className="p-1">
        To confirm deletion, type <strong>Confirm</strong> in the box below.
      </p>
      <input
        className="rounded-sm p-1 dark:bg-slate-700"
        type="text"
        placeholder="Confirm"
        ref={confirmRef}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2 py-2">
        <LoadingButton
          className="btn enabled:btn-red bg-red-900 text-white"
          disabled={!deleteEnabled}
          loading={deleting}
          onClick={confirmDelete}
        >
          Delete
        </LoadingButton>
        <button className="btn btn-default" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
