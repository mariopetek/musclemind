INSERT INTO tezina (naziv_tezina) VALUES
                                      ('Lagano'),
                                      ('Srednje'),
                                      ('Teško'),
                                      ('Vrlo teško') ON CONFLICT DO NOTHING;