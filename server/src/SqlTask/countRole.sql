SELECT role, COUNT(*) AS user_count
FROM "Users"
GROUP BY role;