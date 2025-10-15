import { StrictMode } from "react";
import { SongLibrary } from "../SongLibrary/SongLibrary";
import { ErrorBoundary } from "@chems/ErrorBoundary/ErrorBoundary";
import { AppLayout } from "@chems/elements";

export function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <AppLayout>
          <SongLibrary />
        </AppLayout>
      </ErrorBoundary>
    </StrictMode>
  );
}
