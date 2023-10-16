CREATE TABLE Catalog {
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  catalog_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
}

CREATE TABLE CatalogChat{
  id SERIAL PRIMARY KEY,
  catalog_id INT NOT NULL,
  chat_id INT NOT NULL,
  FOREIGN KEY (catalog_id) REFERENCES Catalog(id),
  FOREIGN KEY (chat_id) REFERENCES Conversation(id)
} 