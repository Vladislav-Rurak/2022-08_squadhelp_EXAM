CREATE TABLE Conversation{
  id SERIAL PRIMARY KEY,
  participants INT[] NOT NULL,
  blackList BOOLEAN[] NOT NULL,
  favoriteList BOOLEAN[] NOT NULL,
  created_at TIMESTAMP NOT NULL,
  uodated_at TIMESTAMP NOT NULL
}