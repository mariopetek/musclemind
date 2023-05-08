INSERT INTO vidljivost (naziv_vidljivost) VALUES
                                              ('Javno'),
                                              ('Privatno') ON CONFLICT DO NOTHING ;