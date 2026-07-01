import { NextResponse } from "next/server";
import { buildSystemPrompt, getFallbackReply } from "@/lib/chatbot-knowledge";
import type { ClientProfile } from "@/lib/chatbot-intake";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = (body.messages ?? []) as ChatMessage[];
    const clientProfile = (body.clientProfile ?? null) as ClientProfile | null;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.content?.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiMessages = messages.slice(-12).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: buildSystemPrompt(clientProfile) }] },
              contents: geminiMessages,
              generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

          if (reply) {
            return NextResponse.json({ reply, source: "gemini" });
          }
        }
      } catch {
        /* fall through to Aria knowledge base */
      }
    }

    const reply = getFallbackReply(lastUser.content, messages);
    return NextResponse.json({ reply, source: "aria" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
