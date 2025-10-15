import { StrictMode } from "react";
import { SongLibrary } from "../SongLibrary/SongLibrary";
import { AppLayout, ErrorBoundary } from "@ui";

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
