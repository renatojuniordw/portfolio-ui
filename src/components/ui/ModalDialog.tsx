"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalDialogProps {
  open: boolean;
  /** Pedido de fechamento pelo usuário (Esc, botão fechar ou backdrop). */
  onClose: () => void;
  /** Título visível que nomeia o diálogo. */
  title: ReactNode;
  closeLabel: string;
  /** Elemento que recebe foco ao abrir; padrão: primeiro focável (botão fechar). */
  initialFocusRef?: RefObject<HTMLElement | null>;
  id?: string;
  className?: string;
  headerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Diálogo modal sobre `<dialog>` nativo com `showModal()`: top layer, fundo
 * inerte e papel/nome acessíveis ficam a cargo do navegador. Este componente
 * acrescenta o que falta para um ciclo completo:
 *
 * - Tab/Shift+Tab circulam dentro do diálogo;
 * - Esc, botão fechar e clique real no backdrop chamam `onClose`;
 * - a rolagem do documento é travada enquanto aberto e restaurada ao fechar;
 * - o foco volta ao acionador quando o próprio usuário fecha. Quando o pai
 *   fecha por conta própria (navegação, resize), o foco não é forçado.
 */
export function ModalDialog({
  open,
  onClose,
  title,
  closeLabel,
  initialFocusRef,
  id,
  className,
  headerClassName,
  style,
  children,
}: ModalDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  const openRef = useRef(open);
  const restoreFocusRef = useRef(false);
  const pointerDownOnBackdrop = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
    openRef.current = open;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;

    const trigger =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    restoreFocusRef.current = false;
    if (!dialog.open) dialog.showModal();
    initialFocusRef?.current?.focus();

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      openRef.current = false;
      html.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (restoreFocusRef.current && trigger?.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [open, initialFocusRef]);

  const requestClose = useCallback(() => {
    restoreFocusRef.current = true;
    onCloseRef.current();
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose();
    };
    // Alguns navegadores fecham o diálogo sem "cancel" (ex.: Esc repetido).
    const handleClose = () => {
      if (openRef.current) requestClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [requestClose]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusables = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      className={cn("modal p-0 text-text", className)}
      style={style}
      onKeyDown={handleKeyDown}
      onPointerDown={(e) => {
        pointerDownOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && pointerDownOnBackdrop.current) {
          requestClose();
        }
        pointerDownOnBackdrop.current = false;
      }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-2",
          headerClassName,
        )}
      >
        <h2 id={titleId} className="min-w-0 text-sm font-medium text-text">
          {title}
        </h2>
        <button
          type="button"
          onClick={requestClose}
          aria-label={closeLabel}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-1"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
