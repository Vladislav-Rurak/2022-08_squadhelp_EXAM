CREATE TABLE Messages (
  id SERIAL PRIMARY KEY,
  sender INTEGER NOT NULL,
  body TEXT NOT NULL,
  conversation_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES "Conversations"(id)
);