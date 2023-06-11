INSERT INTO tezina (id_tezina, naziv_tezina) VALUES
                                      (nextval('tezina_seq'), 'Lagano'),
                                      (nextval('tezina_seq'), 'Srednje'),
                                      (nextval('tezina_seq'), 'Teško'),
                                      (nextval('tezina_seq'), 'Vrlo teško') ON CONFLICT DO NOTHING;

INSERT INTO uloga (id_uloga, naziv_uloga) VALUES
                                    (nextVal('uloga_seq'), 'ROLE_ADMIN'),
                                    (nextval('uloga_seq'), 'ROLE_USER') ON CONFLICT DO NOTHING;

INSERT INTO vidljivost (id_vidljivost, naziv_vidljivost) VALUES
                                              (nextVal('vidljivost_seq'), 'Privatno'),
                                              (nextVal('vidljivost_seq'), 'Javno') ON CONFLICT DO NOTHING ;

INSERT INTO kategorija (id_kategorija, naziv_kategorija) VALUES
                                                     (nextVal('kategorija_seq'), 'Prsa'),
                                                     (nextVal('kategorija_seq'), 'Triceps'),
                                                     (nextVal('kategorija_seq'), 'Prsa-Triceps'),
                                                     (nextVal('kategorija_seq'), 'Leđa'),
                                                     (nextVal('kategorija_seq'), 'Biceps'),
                                                     (nextVal('kategorija_seq'), 'Leđa-Biceps'),
                                                     (nextVal('kategorija_seq'), 'Ramena'),
                                                     (nextVal('kategorija_seq'), 'Abdomen'),
                                                     (nextVal('kategorija_seq'), 'Kvadriceps'),
                                                     (nextVal('kategorija_seq'), 'Zadnja loža'),
                                                     (nextVal('kategorija_seq'), 'Kvadriceps-Zadnja loža'),
                                                     (nextVal('kategorija_seq'), 'Listovi') ON CONFLICT DO NOTHING;
