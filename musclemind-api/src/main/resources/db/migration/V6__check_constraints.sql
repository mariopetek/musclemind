ALTER TABLE kategorija ADD CHECK (
        LENGTH(naziv_kategorija) BETWEEN 1 AND 50
    );

ALTER TABLE uloga ADD CHECK (
        LENGTH(naziv_uloga) BETWEEN 1 AND 50
    );

ALTER TABLE vidljivost ADD CHECK (
        LENGTH(naziv_vidljivost) BETWEEN 1 AND 50
    );

ALTER TABLE tezina ADD CHECK (
        LENGTH(naziv_tezina) BETWEEN 1 AND 50
    );

ALTER TABLE korisnik ADD CHECK (
        LENGTH(korisnicko_ime) BETWEEN 3 AND 30 AND
        LENGTH(email) BETWEEN 5 AND 254 AND
        LENGTH(lozinka) = 60
    );

ALTER TABLE trening ADD CHECK (
        uk_broj_serija BETWEEN 1 AND 100 AND
        LENGTH(naziv_trening) BETWEEN 1 AND 50 AND
        vrijeme_objava <= NOW()
    );

ALTER TABLE vjezba ADD CHECK (
        LENGTH(naziv_vjezba) BETWEEN 1 AND 255
    );

ALTER TABLE trening_vjezba ADD CHECK (
        broj_serija BETWEEN 1 AND 100 AND
        broj_ponavljanja BETWEEN 1 AND 100 AND
        LENGTH(odmor) BETWEEN 3 AND 5
    );

ALTER TABLE svidjanje ADD CHECK (
        vrijeme_svidjanje <= NOW()
    );

ALTER TABLE spremanje ADD CHECK (
        vrijeme_spremanje <= NOW()
    );

ALTER TABLE pracenje ADD CHECK (
        vrijeme_pracenje <= NOW()
    );

ALTER TABLE vjezbanje ADD CHECK (
        vrijeme_zapoceto <= NOW() AND
        vrijeme_zavrseno >= vrijeme_zapoceto AND
        vrijeme_zavrseno <= NOW()
    );
