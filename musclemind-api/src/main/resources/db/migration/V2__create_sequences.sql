CREATE SEQUENCE IF NOT EXISTS kategorija_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY kategorija.id_kategorija;
CREATE SEQUENCE IF NOT EXISTS uloga_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY uloga.id_uloga;
CREATE SEQUENCE IF NOT EXISTS vidljivost_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY vidljivost.id_vidljivost;
CREATE SEQUENCE IF NOT EXISTS tezina_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY tezina.id_tezina;
CREATE SEQUENCE IF NOT EXISTS korisnik_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY korisnik.id_korisnik;
CREATE SEQUENCE IF NOT EXISTS trening_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY trening.id_trening;
CREATE SEQUENCE IF NOT EXISTS vjezba_seq AS BIGINT INCREMENT 1 MINVALUE 1 START 1 OWNED BY vjezba.id_vjezba;
