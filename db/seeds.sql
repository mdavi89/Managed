INSERT INTO departments (name)
VALUES ('Front Office'),
       ('Head Coach'),
       ('Offensive Coaches'),
       ('Defensive Coaches'),
       ('Special Teams Coaches'),
       ('Strength and Conditioning');

INSERT INTO roles (title, salary, department)
VALUES ('CEO', 10000000, 1),
       ('General Manager', 500000, 1),
       ('Assistant GM', 250000, 1),
       ('Head Coach', 5000000, 2),
       ('Associate Head Coach', 200000, 2),
       ('Assistant Head Coach', 100000, 2),
       ('Offensive Coordinator', 500000, 3),
       ('Quarterbacks Coach', 180000, 3),
       ('Offensive Line Coach', 230000, 3),
       ('Defensive Coordinator', 500000, 4),
       ('Linebackers Coach', 120000, 4),
       ('Cornerbacks Coach', 140000, 4),
       ('Special Teams coordinator', 210000,5),
       ('Assistant Special Teams coordinator', 150000, 5),
       ('Special Teams Assistant', 130000, 5),
       ('Head Athletic Trainer', 200000, 6);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES  ('Jeff', 'Lurie', NULL , 1),
        ('Howie', 'Roseman', 1 , 2),
        ('Alec', 'Halaby', 2 , 3),
        ('Nick', 'Sirianni', 1 , 4),
        ('Kevin', 'Patullo', 4 , 5),
        ('Jemal', 'Singleton', 4 , 6),
        ('Kellen', 'Moore', 4 , 7),
        ('Doug', 'Nussmeier', 7 , 8),
        ('Jeff', 'Stoutland', 7 , 9),
        ('Vic', 'Fangio', 4 , 10),
        ('Bobby', 'King', 10 , 11),
        ('Roy', 'Anderson', 10 , 12),
        ('Michael', 'Clay', 4 , 13),
        ('Joe', 'Pannunzio', 13 , 14),
        ('Tyler', 'Brown', 13 , 15),
        ('Tom', 'Hunkele', 4 , 16);
