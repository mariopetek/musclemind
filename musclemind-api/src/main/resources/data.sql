/*uloga*/
DELETE FROM uloga;
INSERT INTO uloga (naziv_uloga) VALUES
    ('ROLE_ADMIN'),
    ('ROLE_USER');
/*tezina*/
DELETE FROM tezina;
INSERT INTO tezina (naziv_tezina) VALUES
    ('Lagano'),
    ('Srednje'),
    ('Teško'),
    ('Vrlo teško');
/*vidljivost*/
DELETE FROM vidljivost;
INSERT INTO vidljivost (naziv_vidljivost) VALUES
    ('Javno'),
    ('Privatno');
/*kategorija*/
DELETE FROM kategorija;
INSERT INTO kategorija (naziv_kategorija, slika) VALUES
   ('Prsa', '../assets/categoris/Prsa.png'),
   ('Triceps', '../assets/categoris/Triceps.png'),
   ('Prsa-Triceps', '../assets/categoris/Prsa-Triceps.png'),
   ('Leđa', '../assets/categoris/Leđa.png'),
   ('Biceps', '../assets/categoris/Biceps.png'),
   ('Leđa-Biceps', '../assets/categoris/Leđa-Biceps.png'),
   ('Ramena', '../assets/categoris/Ramena.png'),
   ('Abdomen', '../assets/categoris/Abdomen.png'),
   ('Kvadriceps', '../assets/categoris/Kvadriceps.png'),
   ('Zadnja loža', '../assets/categoris/Zadnja loža.png'),
   ('Kvadriceps-Zadnja loža', '../assets/categoris/Kvadriceps-Zadnja loža.png'),
   ('Listovi', '../assets/categoris/Listovi.png');
