# AI Planner - MongoDB Backend Setup

This is an AI-powered task planning application with MongoDB backend integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/ai-planner`

3. **Seed the database:**
   ```bash
   npm run seed
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Open your browser and go to `http://localhost:3000`

## Database Schema

### Templates Collection
Each template contains:
- `id`: Unique identifier
- `name`: Template name
- `description`: Template description
- `thumbnail`: Thumbnail identifier
- `category`: Template category
- `tasks`: Array of predefined tasks
- `isActive`: Boolean flag
- `createdAt`/`updatedAt`: Timestamps

### Projects Collection
Each project contains:
- `name`: Project name
- `description`: Project description
- `templateId`: Reference to template
- `templateName`: Template name
- `userId`: User identifier
- `status`: Project status
- `tasks`: Array of project tasks (copied from template)
- `metadata`: Additional project data
- `createdAt`/`updatedAt`: Timestamps

## API Endpoints

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates` - Create new template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### Projects
- `GET /api/projects?userId=:userId` - Get user projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `PUT /api/projects/:id/tasks/:taskId` - Update task status
- `DELETE /api/projects/:id` - Delete project

## Features

- **Template Management**: Predefined templates with associated tasks
- **Project Creation**: Create projects from templates
- **Task Management**: Track task completion and status
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Updates**: MongoDB integration for data persistence

## Development

The application uses:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API design

## File Structure

```
ai-planner/
├── models/           # MongoDB schemas
├── routes/           # API routes
├── scripts/          # Database seeding scripts
├── js/              # Client-side JavaScript
├── server.js        # Main server file
├── config.js        # Configuration
└── package.json     # Dependencies
```

## Troubleshooting

1. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check connection string in `config.js`
   - Verify MongoDB port (default: 27017)

2. **API Errors:**
   - Check server logs
   - Verify API endpoints
   - Ensure proper JSON formatting

3. **Database Issues:**
   - Run `npm run seed` to reset database
   - Check MongoDB logs
   - Verify database permissions