import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";

// Client-facing pages, reached only by a link sent in a proposal. Split out so
// a recruiter loading / never downloads the sales copy.
const Hire = lazy(() => import("./components/hire"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hire/dev" element={<Hire slug="dev" />} />
        <Route path="/hire/va" element={<Hire slug="va" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
