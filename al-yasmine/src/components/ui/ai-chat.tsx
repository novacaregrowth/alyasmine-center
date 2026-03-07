"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SYSTEM_PROMPT = `You are a warm, professional coaching assistant for Al Yasmine Center — a women's personal development and life coaching center based in the UAE, founded by Aliyah Al Bahari (علياء البحري), a CBT (Cognitive Behavioural Therapy) specialist and certified life coach.

Your role is to help potential and existing clients understand the center's services, answer questions, and guide them toward booking a session. You speak in a warm, encouraging, professional tone. You may respond in English or Arabic depending on what language the user writes in.

Al Yasmine Center serves women exclusively. All clients are women, and the coaching environment is designed to be a safe, supportive space for women.

About Al Yasmine Center:
- Founded by Aliyah Al Bahari (علياء البحري), CBT Specialist & Certified Life Coach
- Women-only coaching center based in the UAE
- Services: 1-on-1 Coaching (AED 350 / 60 min), Group Sessions (AED 150 / 90 min), Intensive 8-Week Program (AED 1800), Workshops (AED 200 / half-day)
- Monthly Bloom package: AED 1200/month (4 sessions + messaging support)
- Intensive package: AED 3200 / 8 weeks (8 deep-dive sessions + full support)
- Pre-session welcome guide shared with every client after booking
- Sessions available online (Zoom) and in-person
- Contact: hello@alyasminecenter.com | +971 52 441 7078
- Instagram: @alyasmine_center

Guidelines:
- Keep answers concise and warm — 2-4 sentences max unless the user asks for detail
- Always refer to clients as "she", "her", or "women" — never "he", "him", or gender-neutral "they" when referring to a specific client
- Always end with a gentle nudge toward booking a free discovery call when relevant
- Never make up services, prices, or facts not listed above
- If asked something you don't know, say so honestly and invite them to email or call
- Do not discuss topics unrelated to coaching, personal development, or Al Yasmine Center`;

interface Message {
  role: "assistant" | "user";
  content: string;
}

export default function AIChatCard({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role:    "assistant",
      content: "✦ Hello! I'm Aliyah's assistant at Al Yasmine Center. How can I help you today?",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model:      "claude-sonnet-4-20250514",
          max_tokens: 300,
          system:     SYSTEM_PROMPT,
          messages:   newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data?.content?.[0]?.text ?? "I'm not sure about that — please email us at hello@alyasminecenter.com and we'll get back to you shortly. ✦";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong on my end. Please reach out to us directly at hello@alyasminecenter.com ✦" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("relative w-full max-w-[380px] h-[500px] rounded-3xl overflow-hidden", className)}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ background: "linear-gradient(135deg, #035A60, #ECA200, #7FB0B4, #035A60)", backgroundSize: "300% 300%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner card */}
      <div className="absolute inset-[2px] rounded-3xl flex flex-col overflow-hidden bg-white/97 backdrop-blur-xl">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-cream bg-white">
          <div className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-charcoal font-display">Coaching Assistant</p>
            <p className="text-xs text-brand-teal-light">Al Yasmine Center ✦ Powered by AI</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-brand-charcoal/40">online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 flex flex-col">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "px-4 py-3 rounded-2xl max-w-[88%] text-sm leading-relaxed shadow-sm",
                  msg.role === "assistant"
                    ? "bg-brand-cream text-brand-charcoal self-start rounded-tl-sm"
                    : "bg-brand-teal text-brand-cream self-end rounded-tr-sm"
                )}
              >
                {msg.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-brand-cream self-start"
            >
              {[0, 0.18, 0.36].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-brand-teal/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay }}
                />
              ))}
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-brand-cream bg-white">
          <input
            className="flex-1 px-4 py-2.5 text-sm bg-brand-cream/60 rounded-full border border-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-teal/20 text-brand-charcoal placeholder:text-brand-charcoal/35"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-full bg-brand-teal text-brand-cream hover:bg-brand-teal/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
