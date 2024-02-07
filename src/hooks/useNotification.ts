import { useEffect, useState } from "react";

export function useNotification() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const unmount = () => {};
    const mount = () => {};
    if (isOpen) {
      mount();
    } else {
      unmount();
    }
  }, [isOpen]);

  return {};
}
