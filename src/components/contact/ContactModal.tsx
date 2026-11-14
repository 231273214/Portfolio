import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useContactStore } from "../../store/useContactStore";
import { useSound } from "../../hooks/useSound";
import { playSound } from "../../lib/sounds";

const CONTACT_EMAIL = "sarangel@uniboyaca.edu.co";
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const row = "flex items-center gap-3 border-b border-white/15 px-5 py-3 lg:px-8";
const input = "min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-40";

export default function ContactModal() {
  const isOpen = useContactStore((s) => s.isOpen);
  const open = useContactStore((s) => s.open);
  const close = useContactStore((s) => s.close);
  const location = useLocation();
  const { onHover, onClick } = useSound();

  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); 
  const [status, setStatus] = useState<Status>("idle");
  const firstRef = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Se cierra al cambiar de página; /work-with-me llega con state para abrirlo
  useEffect(() => {
    const wants = (location.state as { openContact?: boolean } | null)?.openContact;
    if (wants) open();
    else close();
  }, [location.key, location.state, open, close]);

  // Escape, bloqueo de scroll y foco
  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement as HTMLElement | null;
    setStatus((s) => (s === "sent" || s === "mailto" ? "idle" : s));
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstRef.current?.focus(), 350);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      opener.current?.focus();
    };
  }, [isOpen, close]);

  const valid = /^\S+@\S+\.\S+$/.test(from.trim()) && message.trim().length >= 10;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    if (trap) {
      setStatus("sent"); // Finge éxito y no envía nada
      return;
    }
    const subj = subject.trim() || "Contacto desde el portafolio";

    // Abre la app de correo con el mensaje listo
    if (!FORM_ID) {
      const body = `${message.trim()}\n\n— ${from.trim()}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: from.trim(), _subject: subj, message: message.trim() }),
      });
      if (!res.ok) throw new Error("send failed");
      playSound("click");
      setStatus("sent");
      setFrom("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const done = status === "sent" || status === "mailto";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact"
          className="fixed inset-0 z-[45] flex items-start justify-center overflow-y-auto bg-black/30 px-4 pb-8 pt-36 backdrop-blur-sm md:pt-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="glass w-full max-w-[1100px] rounded-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-3 lg:px-8">
              <h2 id="contact-title" className="text-lg">
                Nuevo mensaje
              </h2>
              <button
                onClick={() => {
                  close();
                  onClick();
                }}
                onMouseEnter={onHover}
                aria-label="Cerrar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition hover:bg-white/15"
              >
                ✕
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-4 px-6 py-16 text-center" role="status">
                <motion.svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  <motion.path d="m7 12.5 3.2 3.2L17 9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                </motion.svg>
                <p className="text-2xl">{status === "sent" ? "¡Mensaje enviado!" : "Casi listo"}</p>
                <p className="max-w-md text-sm opacity-70">
                  {status === "sent"
                    ? "Gracias por escribirme. Te responderé lo antes posible."
                    : "Se abrió tu aplicación de correo con el mensaje listo. Solo falta que le des a enviar."}
                </p>
                <button onClick={close} onMouseEnter={onHover} className="relief mt-2 rounded-xl px-6 py-2.5 text-sm">
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label className={row}>
                  <span className="w-16 shrink-0 text-sm opacity-60">De:</span>
                  <input
                    ref={firstRef}
                    type="email"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className={input}
                  />
                </label>
                <div className={row}>
                  <span className="w-16 shrink-0 text-sm opacity-60">Para:</span>
                  <span className="min-w-0 flex-1 truncate">{CONTACT_EMAIL}</span>
                </div>
                <label className={row}>
                  <span className="w-16 shrink-0 text-sm opacity-60">Asunto:</span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Escribe tu asunto"
                    maxLength={120}
                    className={input}
                  />
                </label>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntame sobre tu proyecto, tu equipo o tu idea…"
                  maxLength={2000}
                  aria-label="Mensaje"
                  className="block min-h-[220px] w-full resize-none bg-transparent px-5 py-4 outline-none placeholder:opacity-40 lg:min-h-[300px] lg:px-8"
                />
                <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
                  <p className="text-xs opacity-60" role="status" aria-live="polite">
                    {status === "error"
                      ? "No se pudo enviar. Inténtalo de nuevo o escríbeme directamente al correo."
                      : `${message.length} / 2000`}
                  </p>
                  <button
                    type="submit"
                    disabled={!valid || status === "sending"}
                    onMouseEnter={onHover}
                    className="relief rounded-xl px-6 py-2.5 text-sm transition disabled:opacity-40"
                  >
                    {status === "sending" ? "Enviando…" : "Enviar"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}