import { useToastContext } from '../context/ToastContext';

/**
 * Hook to dispatch toast notifications from any component.
 * Returns { success, error, info, warning } helpers.
 */
export function useToast() {
  const { success, error, info, warning } = useToastContext();
  return { success, error, info, warning };
}
