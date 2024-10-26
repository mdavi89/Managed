INSERT INTO departments (department_name)
VALUES ('Front Office'),
       ('Head Coach'),
       ('Offensive Coaches'),
       ('Defensive Coaches'),
       ('Special Teams Coaches'),
       ('Strength and Conditioning');

INSERT INTO roles (role_name, salary, department_id)
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

INSERT INTO employees (first_name, last_name, manager, role_id)
VALUES  ('Jeff', 'Lurie','None', 1),
        ('Howie', 'Roseman','Jeff Lurie', 2),
        ('Alec', 'Halaby','Howie Roseman', 3),
        ('Nick', 'Sirianni','Jeff Lurie', 4),
        ('Kevin', 'Patullo','Nick Sirianni', 5),
        ('Jemal', 'Singleton','Nick Sirianni', 6),
        ('Kellen', 'Moore','Nick Sirianni', 7),
        ('Doug', 'Nussmeier','Kellen Moore', 8),
        ('Jeff', 'Stoutland','Kellen Moore', 9),
        ('Vic', 'Fangio','Nick Sirianni', 10),
        ('Bobby', 'King','Vic Fangio', 11),
        ('Roy', 'Anderson','Vic Fangio', 12),
        ('Michael', 'Clay','Nick Sirianni', 13),
        ('Joe', 'Pannunzio','Michael Clay', 14),
        ('Tyler', 'Brown','Michael Clay', 15),
        ('Tom', 'Hunkele','Nick Sirianni', 16);
