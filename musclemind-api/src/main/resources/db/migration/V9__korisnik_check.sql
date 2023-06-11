ALTER TABLE korisnik ADD CHECK (
        LENGTH(ime) BETWEEN 2 AND 50 AND
        LENGTH(prezime) BETWEEN 2 AND 50 AND
        LENGTH(opis) <= 500
    );
