CREATE TABLE Catalog {
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  catalog_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  uodated_at TIMESTAMP NOT NULL
}