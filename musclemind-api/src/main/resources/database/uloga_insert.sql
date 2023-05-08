INSERT INTO uloga (naziv_uloga) VALUES
                                    ('ROLE_ADMIN'),
                                    ('ROLE_USER') ON CONFLICT DO NOTHING;