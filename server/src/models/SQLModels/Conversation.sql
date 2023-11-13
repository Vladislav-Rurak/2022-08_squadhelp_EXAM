CREATE TABLE Conversations(
  id SERIAL PRIMARY KEY,
  participants INT[] NOT NULL,
  blackList BOOLEAN[] NOT NULL,
  favoriteList BOOLEAN[] NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (participants) REFERENCES "Users"(id),
  FOREIGN KEY (conversation_id) REFERENCES "Messages"(id),
  FOREIGN KEY (catalog_id) REFERENCES "Catalogs"(id)
)