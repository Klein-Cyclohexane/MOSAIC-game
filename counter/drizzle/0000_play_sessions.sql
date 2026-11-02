CREATE TABLE play_sessions (
  scope TEXT NOT NULL CHECK (scope IN ('plays', 'test')),
  session_id TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  PRIMARY KEY (scope, session_id)
);
