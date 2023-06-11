ALTER TABLE pracenje ADD COLUMN vrijeme_pracenje TIMESTAMP;
ALTER TABLE pracenje ALTER COLUMN vrijeme_pracenje SET NOT NULL;
