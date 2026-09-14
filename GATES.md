# Gates: Desktop scroll and 3D cards

Scope: Preserve the desktop deck and soft settling while removing competing scroll animations and reducing rendering work. Preserve mobile and existing user edits.

- [x] G1: Scroll cancellation, settling intent, lifecycle and reduced motion regressions pass
  CHECK: npm run test
  EXPECT: Test Files
  EVIDENCE: 4 test files and 29 tests passed on 2026-09-14.

- [x] G2: TypeScript and the production bundle compile successfully
  CHECK: npm run build
  EXPECT: built in
  EVIDENCE: tsc and Vite production build passed on 2026-09-14.

- [x] G3: Desktop transitions remain readable and interruptible across the interaction matrix, with before/after rendering evidence
  EVIDENCE: Safari 26.5 and the in-app Chromium browser showed the projects/work reading state at full opacity, no transform on settled content, and three visible deck ghosts. Consecutive navigation, project detail expansion, and return to the list were verified. Native Chrome app automation was unavailable because its session was blocked by the environment.

- [x] G4: Mobile behavior and pre-existing user changes are preserved
  EVIDENCE: No mobile component paths were changed. Existing unrelated user edits remain in the working tree untouched.
