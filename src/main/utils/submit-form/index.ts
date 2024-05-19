/* eslint-disable @typescript-eslint/no-explicit-any */
interface submitFormProps {
  event: any;
  handleSubmit: any;
  onSubmit: any;
}

export const submitForm = ({ event, handleSubmit, onSubmit }: submitFormProps): void => {
  event.preventDefault();
  event.stopPropagation();
  handleSubmit(onSubmit)(event);
};
