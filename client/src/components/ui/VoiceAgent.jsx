import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function VoiceAgent({ onCallEnd }) {
  const vapiRef = useRef(null);
  const transcriptRef = useRef(null);
  const initializedRef = useRef(false);

  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [conversation, setConversation] = useState([]);

  // ✅ Initialize ONLY once
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    vapiRef.current = new Vapi("7880e820-9e0a-4d8c-ba90-93aeda97c06d");

    vapiRef.current.on("call-start", () => {
      setIsCalling(true);
      setStatus("Connected to Reception...");
      setConversation([]);
    });

    vapiRef.current.on("call-end", () => {
      setIsCalling(false);
      setStatus("Conversation ended.");

      setTimeout(() => {
        setConversation([]);
        setStatus("Idle");
      }, 1000);

      if (onCallEnd) {
        setTimeout(() => {
          onCallEnd();
        }, 800);
      }
    });

    vapiRef.current.on("message", (msg) => {
      if (!msg || msg.type !== "transcript" || !msg.transcript) return;

      setConversation((prev) => {
        const last = prev[prev.length - 1];

        if (last && last.role === msg.role) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...last,
            text: msg.transcript
          };
          return updated;
        }

        return [
          ...prev,
          {
            role: msg.role,
            text: msg.transcript
          }
        ];
      });
    });

    vapiRef.current.on("error", (e) => {
      console.error("Vapi Error:", e);
      setStatus("Connection error.");
      setIsCalling(false);
    });

  }, []); // ✅ EMPTY dependency

  // Auto scroll
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop =
        transcriptRef.current.scrollHeight;
    }
  }, [conversation]);

  const startCall = async () => {
    try {
      setStatus("Connecting...");
      await vapiRef.current.start("05152a0e-0815-45aa-b39d-8f33a1af0aa8");
    } catch (err) {
      console.error(err);
      setStatus("Failed to start call");
    }
  };

  const endCall = async () => {
    try {
      await vapiRef.current.stop();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">
        Talk to Reception
      </h2>

      <p className="text-sm text-gray-500">{status}</p>

      {!isCalling ? (
        <button
          onClick={startCall}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
        >
          🎤 Start Call
        </button>
      ) : (
        <button
          onClick={endCall}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
        >
          ❌ End Call
        </button>
      )}

      <div
        ref={transcriptRef}
        className="h-80 w-full overflow-y-auto bg-gray-100 p-4 rounded-xl border"
      >
        {conversation.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Live transcript will appear here...
          </p>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.role === "assistant"
                  ? "text-blue-600"
                  : "text-black text-right"
              }`}
            >
              <span className="inline-block bg-white px-3 py-2 rounded shadow">
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}