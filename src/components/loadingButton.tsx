import { ButtonHTMLAttributes, HTMLProps, PropsWithChildren } from 'react';

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  spinnerClass?: string;
};

export default function LoadingButton(props: LoadingButtonProps) {
  const { loading, spinnerClass, ...attributes } = props;
  return (
    <button {...attributes}>
      {loading && (
        <div className="dark m-auto h-6 w-6">
          <div className={`loading-spinner ${spinnerClass}`}></div>
        </div>
      )}
      <div className="overflow-hidden data-[loading=true]:h-0" data-loading={loading}>
        {attributes.children}
      </div>
    </button>
  );
}
