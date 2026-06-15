import { Loader2 } from "lucide-react";

// Shown briefly while a server-rendered (dynamic) page loads.
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-teal" size={32} />
    </div>
  );
}
