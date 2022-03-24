# Simple Media Social API - Friday Task

Project ini adalah project REST API Simple Media Sosial dan sudah menerapkan 2 jenis Authorization (API Key & Bearer).

# Cara Menjalankan

## Skema Database

Buat database dengan skema di bawah sebelum menjalankan project.

### Tabel 'users'

| Column        | Type         | Constraint  |
| ------------- | ------------ | ----------- |
| id            | serial       | PRIMARY KEY |
| username      | varchar(255) | -           |
| fullname      | varchar(255) | -           |
| email         | varchar(255) | -           |
| refresh_token | varchar(255) | -           |
| user_picture  | varchar(255) | -           |
| refresh_Token | varchar(255) | -           |

**Query**

```
CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR(255),
	fullname VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	user_picture VARCHAR(255),
	refresh_token TEXT
);
```

### Tabel 'posts'

| Column        | Type         | Constraint  |
| ------------- | ------------ | ----------- |
| post_id       | serial       | PRIMARY KEY |
| user_id       | integer      | -           |
| picture_post  | varchar(255) | -           |
| picture_title | varchar(255) | -           |
| createt_at    | timestamp    | -           |
| updated_at    | timestamp    | -           |

**Query**

```
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE posts (
	post_id serial PRIMARY KEY,
	user_id INTEGER,
	picture_post VARCHAR(255),
	picture_title VARCHAR(255),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
```

## Environment Variable

Buat file `.env` mengikuti format yang ada di file [env.example](./.env.example).

## Menjalankan

Jalankan perintah berikut di terminal

```
npm install
```

```
npm install nodemon -g
```

```
npm start
```

# Dokumentasi API

Silahkan import file [postman_collection.json](./simple-media-social.postman_collection.json) di Postman.
