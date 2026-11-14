import { useState, type FormEvent } from "react";
import PageTransition from "../components/layout/PageTransition";
import { useSound } from "../hooks/useSound";

const CONTACT_EMAIL = "sarangel@uniboyaca.edu.co";
type Status = "idle" | "sending" | "sent" | "error";

const row = "flex items-center gap-3 border-b border-white/15 px-5 py-3 lg:px-8";
const input = "min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-40";

export default function WorkWithMe() {
  const { onHover, onClick } = useSound();

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(from.trim()) && message.trim().length >= 10;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    
    // Honeypot anti-spam
    if (trap) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: from.trim(), 
          subject: subject.trim(), 
          message: message.trim() 
        }),
      });

      if (!res.ok) throw new Error("Error al enviar");
      
      setStatus("sent");
      setName("");
      setFrom("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center px-6 py-32">
        <h1 className="text-4xl font-bold md:text-5xl">Trabajemos juntos</h1>
        <p className="mt-4 max-w-lg opacity-70">
          Cuéntame sobre tu proyecto, tu equipo o tu idea. Te responderé lo antes posible.
        </p>

        <div className="glass mt-10 w-full overflow-hidden rounded-2xl">
          {status === "sent" ? (
            <div className="flex flex-col items-center gap-4 px-6 py-16 text-center" role="status">
              <p className="text-2xl font-bold">¡Mensaje enviado!</p>
              <p className="max-w-md text-sm opacity-70">
                Gracias por escribirme. Me pondré en contacto contigo muy pronto.
              </p>
              <button
                onClick={() => setStatus("idle")}
                onMouseEnter={onHover}
                className="relief mt-2 rounded-xl px-6 py-2.5 text-sm transition"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label className={row}>
                <span className="w-16 shrink-0 text-sm opacity-60">Nombre:</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={input}
                />
              </label>

              <label className={row}>
                <span className="w-16 shrink-0 text-sm opacity-60">De:</span>
                <input
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
                <span className="min-w-0 flex-1 truncate opacity-80">{CONTACT_EMAIL}</span>
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

              {/* Honeypot anti-spam */}
              <input
                type="text" tabIndex={-1} autoComplete="off" aria-hidden
                className="hidden" value={trap} onChange={(e) => setTrap(e.target.value)}
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
                    ? "No se pudo enviar. Inténtalo de nuevo o escríbeme directamente."
                    : `${message.length} / 2000`}
                </p>
                <button
                  type="submit"
                  disabled={!valid || status === "sending"}
                  onMouseEnter={onHover}
                  onClick={onClick}
                  className="relief rounded-xl px-6 py-2.5 text-sm transition disabled:opacity-40"
                >
                  {status === "sending" ? "Enviando…" : "Enviar"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  );
}