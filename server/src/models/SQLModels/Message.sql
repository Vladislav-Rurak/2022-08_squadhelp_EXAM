CREATE TABLE Message{
  id SERIAL PRIMARY KEY,
  sender INTEGER NOT NULL REFERENCES "User"(id),
  conversaton VARCHAR(255) NOT NULL REFERENCES "Conversation"(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
}