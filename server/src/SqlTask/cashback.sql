UPDATE "Users" u
SET
  "balance" = "balance" + (0.10 * no.total_amount)
FROM (
  SELECT
    u.id AS user_id,
    SUM(c."prize") AS total_amount
  FROM
    "Users" u
  JOIN
    "Contests" c ON u.id = c."userId" 
  WHERE
    u."role" = 'customer'
    AND c."createdAt" BETWEEN '2023-07-13' AND '2023-08-29'
  GROUP BY
    u.id
) AS no
WHERE
  u.id = no.user_id;