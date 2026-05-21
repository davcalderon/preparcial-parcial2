CREATE TABLE IF NOT EXISTS roles (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(50)   NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users_roles (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS citas (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  id_user    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_doctor  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  datetime   TIMESTAMP   NOT NULL,
  reason     TEXT        NOT NULL,
  status     cita_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP   NOT NULL DEFAULT NOW()
);

INSERT INTO roles (name, description) VALUES
  ('admin',   'Administrador'),
  ('doctor',  'Doctor'),
  ('patient', 'Paciente')
ON CONFLICT (name) DO NOTHING;