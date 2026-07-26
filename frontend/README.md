# EcoVia

EcoVia is an intelligent route planning application that helps users discover routes based on travel preferences, environmental conditions, and accessibility requirements. The application combines mapping, weather information, and personalized recommendations to provide a more informed travel experience than traditional navigation systems.

## Features

- User authentication with secure login and registration
- Interactive map with route visualization
- Search locations using OpenStreetMap Nominatim
- Route generation using OpenRouteService
- Multiple travel modes:
  - Walking
  - Cycling
  - Driving
- Personalized traveller profiles:
  - Senior Friendly
  - Wheelchair Accessible
  - Student Safe
  - Fitness Route
  - Office Fast
- Live weather information for the selected route
- Estimated travel duration and arrival time
- Route summary with distance and travel insights
- Save and reuse frequently visited locations
- AI-generated travel recommendations based on traveller preferences

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Leaflet
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

### External APIs

- OpenRouteService API
- OpenStreetMap Nominatim API
- Open-Meteo Weather API

---

## Project Structure

```
EcoVia/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/laasya2607/EcoVia.git
cd EcoVia
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## Environment Variables

### Frontend (.env)

```
VITE_ROUTE_API_KEY=YOUR_OPENROUTESERVICE_API_KEY
```

### Backend (.env)

```
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=ecovia
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret_key
```

---

## Future Enhancements

- Air Quality Index integration
- Traffic-aware route optimization
- Safety score based on location data
- Multi-stop route planning
- Route history and analytics
- AI-powered comfort scoring
- Mobile-responsive enhancements

---

## Screenshots

Screenshots of the application can be added here to demonstrate the dashboard, route visualization, weather information, and recommendations.

---

## Author

**Laasya Sri**

GitHub: https://github.com/laasya2607

LinkedIn: https://www.linkedin.com/in/laasya-sri-lingala/