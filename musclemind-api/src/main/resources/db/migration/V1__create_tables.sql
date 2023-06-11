CREATE TABLE IF NOT EXISTS kategorija
(
    id_kategorija BIGINT NOT NULL PRIMARY KEY,
    naziv_kategorija VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS uloga
(
    id_uloga INT NOT NULL PRIMARY KEY,
    naziv_uloga VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vidljivost
(
    id_vidljivost BIGINT NOT NULL PRIMARY KEY,
    naziv_vidljivost VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tezina
(
    id_tezina BIGINT NOT NULL PRIMARY KEY,
    naziv_tezina VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS korisnik
(
    id_korisnik BIGINT NOT NULL PRIMARY KEY,
    korisnicko_ime VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    lozinka VARCHAR(80) NOT NULL,
    ime VARCHAR(50),
    opis VARCHAR(500),
    id_uloga INT NOT NULL,
    FOREIGN KEY (id_uloga) REFERENCES uloga(id_uloga)
);

CREATE TABLE IF NOT EXISTS trening
(
    id_trening BIGINT NOT NULL PRIMARY KEY,
    uk_broj_serija INT NOT NULL,
    naziv_trening VARCHAR(50) NOT NULL,
    opis_trening VARCHAR(500),
    vrijeme_objava TIMESTAMP NOT NULL,
    id_korisnik BIGINT NOT NULL,
    id_vidljivost BIGINT NOT NULL,
    id_tezina BIGINT NOT NULL,
    FOREIGN KEY (id_korisnik) REFERENCES korisnik(id_korisnik),
    FOREIGN KEY (id_vidljivost) REFERENCES vidljivost(id_vidljivost),
    FOREIGN KEY (id_tezina) REFERENCES tezina(id_tezina)
);

CREATE TABLE IF NOT EXISTS vjezba
(
    id_vjezba BIGINT NOT NULL PRIMARY KEY,
    naziv_vjezba VARCHAR(255) NOT NULL,
    id_kategorija BIGINT NOT NULL,
    FOREIGN KEY (id_kategorija) REFERENCES kategorija(id_kategorija)
);

CREATE TABLE IF NOT EXISTS trening_vjezba
(
    broj_serija INT NOT NULL,
    broj_ponavljanja INT NOT NULL,
    odmor VARCHAR(5) NOT NULL,
    id_trening BIGINT NOT NULL,
    id_vjezba BIGINT NOT NULL,
    PRIMARY KEY (id_trening, id_vjezba),
    FOREIGN KEY (id_trening) REFERENCES trening(id_trening),
    FOREIGN KEY (id_vjezba) REFERENCES vjezba(id_vjezba)
);

CREATE TABLE IF NOT EXISTS svidjanje
(
    vrijeme_svidjanje TIMESTAMP NOT NULL,
    id_korisnik BIGINT NOT NULL,
    id_trening BIGINT NOT NULL,
    PRIMARY KEY (id_korisnik, id_trening),
    FOREIGN KEY (id_korisnik) REFERENCES korisnik(id_korisnik),
    FOREIGN KEY (id_trening) REFERENCES trening(id_trening)
);

CREATE TABLE IF NOT EXISTS spremanje
(
    vrijeme_spremanje TIMESTAMP NOT NULL,
    id_korisnik BIGINT NOT NULL,
    id_trening BIGINT NOT NULL,
    PRIMARY KEY (id_korisnik, id_trening),
    FOREIGN KEY (id_korisnik) REFERENCES korisnik(id_korisnik),
    FOREIGN KEY (id_trening) REFERENCES trening(id_trening)
);

CREATE TABLE IF NOT EXISTS pracenje
(
    id_korisnik_prati BIGINT NOT NULL,
    id_korisnik_pracen BIGINT NOT NULL,
    PRIMARY KEY (id_korisnik_prati, id_korisnik_pracen),
    FOREIGN KEY (id_korisnik_prati) REFERENCES korisnik(id_korisnik),
    FOREIGN KEY (id_korisnik_pracen) REFERENCES korisnik(id_korisnik)
);

CREATE TABLE IF NOT EXISTS vjezbanje
(
    vrijeme_zapoceto TIMESTAMP NOT NULL,
    vrijeme_zavrseno TIMESTAMP,
    id_korisnik BIGINT NOT NULL,
    id_trening BIGINT NOT NULL,
    PRIMARY KEY (vrijeme_zapoceto, id_korisnik, id_trening),
    FOREIGN KEY (id_korisnik) REFERENCES korisnik(id_korisnik),
    FOREIGN KEY (id_trening) REFERENCES trening(id_trening)
);
