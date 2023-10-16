SELECT
    SUM(CASE WHEN "role" = 'creator' THEN 1 ELSE 0 END) AS creator,
    SUM(CASE WHEN "role" = 'customer' THEN 1 ELSE 0 END) AS customer
FROM "Users"