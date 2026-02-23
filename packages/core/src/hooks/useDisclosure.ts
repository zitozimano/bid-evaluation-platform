import { useState } from "react";

export const useDisclosure = (initial = false) => {
  const [open, setOpen] = useState(initial);

  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen((v) => !v)
  };
};
