--roles
INSERT INTO roles (id, role_name, description, created_at)
VALUES
  (gen_random_uuid(), 'admin', 'Administrador del sistema', NOW()),
  (gen_random_uuid(), 'user', 'Usuario regular', NOW()),
  (gen_random_uuid(), 'doctor', 'Rol de doctor', NOW())
ON CONFLICT (role_name) DO NOTHING;
