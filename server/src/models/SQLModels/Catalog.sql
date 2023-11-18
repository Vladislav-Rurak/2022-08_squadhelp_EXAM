CREATE TABLE Catalogs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  catalog_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "Users"(id),
  FOREIGN KEY (chat_id) REFERENCES "Conversations"(id)
)

CREATE TABLE CatalogChats(
  id SERIAL PRIMARY KEY,
  catalog_id INT NOT NULL,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (catalog_id) REFERENCES "Catalogs"(id),
  FOREIGN KEY (chat_id) REFERENCES "Conversations"(id)
)