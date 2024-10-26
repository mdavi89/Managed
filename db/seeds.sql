INSERT INTO departments (department_name)
VALUES ('Front Office'),
       ('Head Coach'),
       ('Offensive Coaches'),
       ('Defensive Coaches'),
       ('Special Teams Coaches'),
       ('Strength and Conditioning');

INSERT INTO roles (role_name, salary, department_name, department_id)
VALUES ('CEO', 10000000,'Front Office', 1),
       ('General Manager', 500000,'Front Office', 1),
       ('Assistant GM', 250000,'Front Office', 1),
       ('Head Coach', 5000000,'Head Coach', 2),
       ('Associate Head Coach', 200000,'Head Coach', 2),
       ('Assistant Head Coach', 100000,'Head Coach', 2),
       ('Offensive Coordinator', 500000,'Offensive Coaches', 3),
       ('Quarterbacks Coach', 180000,'Offensive Coaches', 3),
       ('Offensive Line Coach', 230000,'Offensive Coaches', 3),
       ('Defensive Coordinator', 500000,'Defensive Coaches', 4),
       ('Linebackers Coach', 120000,'Defensive Coaches', 4),
       ('Cornerbacks Coach', 140000,'Defensive Coaches', 4),
       ('Special Teams coordinator', 200000,'Special Teams Coaches', 5),
       ('Assistant Special Teams coordinator', 150000,'Special Teams Coaches', 5),
       ('Special Teams Assistant', 130000,'Special Teams Coaches', 5),
       ('Head Athletic Trainer', 200000,'Strength and Conditioning', 6);

INSERT INTO employees (first_name, last_name, role_name, manager, role_id)
VALUES  ('Jeff', 'Lurie','CEO','None', 1),
        ('Howie', 'Roseman','General Manager','Jeff Lurie', 2),
        ('Alec', 'Halaby','Assitant GM','Howie Roseman', 3),
        ('Nick', 'Sirianni','Head Coach','Jeff Lurie', 4),
        ('Kevin', 'Patullo','Associate Head Coach','Nick Sirianni', 5),
        ('Jemal', 'Singleton','Assistant Head Coach','Nick Sirianni', 6),
        ('Kellen', 'Moore','Offensive Coordinator','Nick Sirianni', 7),
        ('Doug', 'Nussmeier','Quarterbacks Coach','Kellen Moore', 8),
        ('Jeff', 'Stoutland','Offensive Line Coach','Kellen Moore', 9),
        ('Vic', 'Fangio','Defensive Coordinator','Nick Sirianni', 10),
        ('Bobby', 'King','Linebackers Coach','Vic Fangio', 11),
        ('Roy', 'Anderson','Cornerbacks Coach','Vic Fangio', 12),
        ('Michael', 'Clay','Special Teams coordinator','Nick Sirianni', 13),
        ('Joe', 'Pannunzio','Assistant Special Teams coordinator','Michael Clay', 14),
        ('Tyler', 'Brown','Special Teams Assistant','Michael Clay', 15),
        ('Tom', 'Hunkele','Head Athletic Trainer','Nick Sirianni', 16);
