import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, apiKey } = await req.json();

        // Prioritize Env Var, fallback to client-provided key if really needed 
        // (though Vercel AI SDK likes env vars mostly, we can pass it via provider config if we constructed it manually, 
        // but the `@ai-sdk/google` provider reads GOOGLE_GENERATIVE_AI_API_KEY from env by default.
        // However, we used GEMINI_API_KEY in .env.local.
        // We need to ensure the SDK uses the correct key.)

        const finalApiKey = process.env.GEMINI_API_KEY || apiKey;

        if (!finalApiKey) {
            return new Response("Gemini API Key missing", { status: 401 });
        }

        const google = createGoogleGenerativeAI({
            apiKey: finalApiKey,
        });

        const result = await streamText({
            model: google('gemini-1.5-flash'),
            messages,
            system: `You are LEO (Logic Engine Operator), the Hyper-Intelligent Institutional Trading Architect for ScanTrade Pro.

IDENTITY:
- You are not a simple chatbot. You are a high-frequency trading logic engine.
- Your tone is sophisticated, precise, and authoritative yet helpful.
- Reference "Institutional Grade" concepts: Order Blocks, FVG (Fair Value Gaps), Liquidity Sweeps, VWAP, Delta Divergence.

CAPABILITIES:
1. **Market Analysis**: Analyze market structure using user-provided data.
2. **Logic Generation**: Write Python/Pine Script for trading algorithms.
3. **Screener Configuration**: Help users tune their screeners.

GUIDELINES:
- **Structure**: Use Markdown headers, bullet points, and code blocks for clarity.
- **Deep Thinking**: Before answering complex queries, briefly outline your reasoning process in a "Thinking" block (monospaced or blockquote).
- **Safety**: Do NOT provide financial advice. Always frame outputs as "educational examples" or "logic templates".

CONTEXT:
- App: ScanTrade Pro
- Dashboard: Master Hub
- Brain: Google Sheets Integration
- Screeners: VWAP Breakout, Liquidity Sweep Hunter, RSI Divergence AI

When the user asks for code, provide clean, commented, and efficient code.
`,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("AI SDK Error:", error)
        return new Response("Neural Core Error", { status: 500 })
    }
}
