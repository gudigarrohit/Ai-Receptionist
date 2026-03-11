import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Phone, PhoneOff, Mic } from "lucide-react";
import { Button } from "../components/ui/button";

export default function VoiceAssistantPage() {

  const vapiRef = useRef(null);
  const transcriptRef = useRef(null);
  const initializedRef = useRef(false);

  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState("Inactive");
  const [conversation, setConversation] = useState([]);

  // Initialize Vapi
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    vapiRef.current = new Vapi("7238a542-5ebd-46e6-b376-63d28fe08c9a");

    vapiRef.current.on("call-start", () => {
      setIsCalling(true);
      setStatus("Call Active");
      setConversation([]);
    });

    vapiRef.current.on("call-end", () => {
      setIsCalling(false);
      setStatus("Inactive");

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
      console.error(e);
      setStatus("Connection error");
      setIsCalling(false);
    });

  }, []);

  // Auto scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop =
        transcriptRef.current.scrollHeight;
    }
  }, [conversation]);

  const startCall = async () => {
    try {
      setStatus("Connecting...");
      await vapiRef.current.start("b26be950-877f-468e-891c-ddb449f59f95");
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

  const toggleCall = () => {
    if (!isCalling) startCall();
    else endCall();
  };

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      {/* Header */}
      <section className="gradient-hero py-16 text-primary-foreground text-center">
        <h1 className="text-4xl font-bold">AI Voice Assistant</h1>
        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          Book appointments and get help using our AI-powered receptionist.
        </p>
      </section>

      {/* Voice Assistant */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">

          <div className="rounded-xl border bg-card shadow-card overflow-hidden">

            {/* Status */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isCalling
                      ? "bg-green-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                />

                <span className="text-sm font-medium">
                  {status}
                </span>

              </div>

              <span className="text-xs text-muted-foreground">
                AI Receptionist
              </span>

            </div>

            {/* Transcript */}
            <div
              ref={transcriptRef}
              className="h-96 overflow-y-auto p-5 space-y-4"
            >

              {conversation.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  Start a call to talk with AI
                </p>
              ) : (
                conversation.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >

                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "assistant"
                          ? "bg-secondary text-secondary-foreground"
                          : "gradient-hero text-white"
                      }`}
                    >
                      {msg.text}
                    </div>

                  </div>
                ))
              )}

            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 border-t p-5">

              <Button
                onClick={toggleCall}
                size="lg"
                className={`rounded-full h-16 w-16 ${
                  isCalling
                    ? "bg-red-600 hover:bg-red-700"
                    : "gradient-hero"
                } text-white`}
              >

                {isCalling ? (
                  <PhoneOff className="h-6 w-6" />
                ) : (
                  <Phone className="h-6 w-6" />
                )}

              </Button>

              {isCalling && (
                <div className="relative">

                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-16 w-16"
                  >
                    <Mic className="h-6 w-6" />
                  </Button>

                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

                </div>
              )}

            </div>

            <p className="text-center text-xs text-muted-foreground pb-4">
              {isCalling
                ? "Tap the red button to end the call"
                : "Tap the phone button to start a call"}
            </p>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}