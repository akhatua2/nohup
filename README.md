# Chrome Extension with Backend

A Chrome extension that allows users to add comments to any webpage, with a FastAPI backend for storing and managing comments.

## Project Structure

```
.
├── backend/                 # FastAPI backend
│   ├── app/                # Application code
│   │   ├── main.py        # FastAPI application
│   │   ├── models.py      # Database models
│   │   ├── schemas.py     # Pydantic schemas
│   │   └── database.py    # Database operations
│   ├── Dockerfile         # Backend container config
│   └── docker-compose.yml # Docker compose config
│
├── src/                    # Chrome extension source
│   ├── components/        # UI components
│   │   └── comment/       # Comment-related components
│   ├── utils/            # Utility functions
│   └── manifest.json     # Extension manifest
│
└── README.md             # This file
```

## Prerequisites

- Docker and Docker Compose
- Chrome browser
- Git
- Python 3.8+ (for local development)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Database Setup

#### Option A: Using PostgreSQL (Recommended for Production)

The backend is configured to use PostgreSQL by default. The database will be automatically created when you start the Docker containers.

#### Option B: Using SQLite (For Local Development)

To use SQLite instead of PostgreSQL:

1. Edit `backend/app/database.py`:
```python
# Change the database URL to use SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./comments.db"
```

2. Update `backend/app/models.py` to handle SQLite:
```python
from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine

# Add this after creating the engine
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
```

3. Create the database:
```bash
cd backend
python -c "from app.database import engine; from app.models import Base; Base.metadata.create_all(bind=engine)"
```

### 3. Docker Setup

#### Option A: Using Docker Compose (Recommended)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Start the services:
```bash
docker-compose up -d
```

This will:
- Build and start the FastAPI container
- Start a PostgreSQL container
- Create necessary database tables
- Expose the API on http://localhost:8000

#### Option B: Running Without Docker

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `src` directory
4. The extension icon should appear in your Chrome toolbar

## Docker Configuration

### Container Structure

The project uses two containers:
1. **API Container** (`backend-api`):
   - Runs FastAPI application
   - Exposes port 8000
   - Hot reload enabled for development
   - Connected to database container

2. **Database Container** (`backend-db`):
   - Runs PostgreSQL 15
   - Exposes port 5432
   - Persistent volume for data storage
   - Environment variables for configuration

### Docker Compose Configuration

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres

volumes:
  postgres_data:
```

### Docker Commands

Common Docker commands for development:

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Access database
docker-compose exec db psql -U postgres

# Access API container
docker-compose exec api bash
```

## Development

### Backend Development

The backend uses:
- FastAPI for the web framework
- SQLAlchemy for database ORM
- PostgreSQL for the database
- Pydantic for data validation

To modify the backend:
1. Edit files in `backend/app/`
2. Changes are automatically reloaded thanks to uvicorn's hot reload
3. View logs: `docker-compose logs -f api`

### Frontend Development

The Chrome extension is built with vanilla JavaScript and CSS.

Key components:
- `comment.js`: Main comment functionality
- `anchor.js`: Handles comment positioning
- `component-marker.js`: Identifies target components
- `comment-loader.js`: Loads saved comments
- `api.js`: Backend communication

To modify the extension:
1. Edit files in `src/`
2. Reload the extension in `chrome://extensions/`
3. Refresh the target webpage

## API Endpoints

- `POST /comments/`: Create a new comment
- `GET /comments/`: Get all comments (filter by URL)
- `PATCH /comments/{id}/position`: Update comment position
- `DELETE /comments/{id}`: Delete a comment

## Database Schema

Comments are stored with:
- URL of the webpage
- Component information (tag, ID, classes, path)
- Position coordinates (x, y)
- Comment text
- Creation and update timestamps

## Troubleshooting

### Backend Issues

1. Check if containers are running:
   ```bash
   docker-compose ps
   ```

2. View API logs:
   ```bash
   docker-compose logs api
   ```

3. Check database connection:
   ```bash
   docker-compose exec db psql -U postgres
   ```

### Extension Issues

1. Check Chrome console for errors
2. Verify extension is loaded in `chrome://extensions/`
3. Ensure backend is running and accessible
4. Check network tab for API requests

## Common Problems

1. **API Connection Failed**
   - Verify backend is running: `docker-compose ps`
   - Check API logs: `docker-compose logs api`
   - Ensure no firewall blocking port 8000

2. **Comments Not Saving**
   - Check browser console for errors
   - Verify database connection
   - Check API response in network tab

3. **Comments Not Loading**
   - Verify URL matches exactly
   - Check component paths are correct
   - Look for console errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Your License Here]

## Database Management

### PostgreSQL

1. Access the database:
```bash
docker-compose exec db psql -U postgres
```

2. Common PostgreSQL commands:
```sql
-- List all tables
\dt

-- Describe table
\d comments

-- View data
SELECT * FROM comments;
```

### SQLite

1. Access the database:
```bash
sqlite3 backend/comments.db
```

2. Common SQLite commands:
```sql
-- List all tables
.tables

-- Describe table
.schema comments

-- View data
SELECT * FROM comments;
``` 