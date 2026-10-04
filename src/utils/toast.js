import { toast } from 'sonner';

export class ToastUtils {
  /**
   * Shows a success toast notification.
   *
   * @param {{ message: string, title?: string }} params
   */
  static successToast = ({ message, title }) => {
    toast.success(title ?? '', {
      description: message,
      closeButton: true,
      id: title ?? message,
    });
  };

  /**
   * Shows an error toast notification. Uses the message as a dedup ID.
   *
   * @param {{ message: string }} params
   */
  static errorToast = ({ message }) => {
    toast.error('', {
      description: message,
      closeButton: true,
      id: message,
    });
  };

  /**
   * Shows a neutral informational toast notification.
   *
   * @param {{ message: string }} params
   */
  static infoToast = ({ message }) => {
    toast('', {
      description: message,
      closeButton: true,
      id: message,
    });
  };
}
