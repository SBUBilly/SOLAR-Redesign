# Redesigning Stony Brook University's SOLAR System: A Heuristics-Based Approach

A comprehensive redesign of Stony Brook University's Student Online Administrative Resources (SOLAR) system, applying Jakob Nielsen's 10 usability heuristics and the 6 Gestalt laws of visual perception to transform user experience. This project addresses critical usability violations in both legacy and modern SOLAR implementations through systematic application of human centered design principles.

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Build and run the project:

```bash
npm run dev
```

This will start the server at `http://localhost:5173`

## HCI Principles Implemented

This redesign systematically applies established usability frameworks:

- **Nielsen's 10 Usability Heuristics**: Visibility of system status, match between system and real world, user control and freedom, consistency and standards, error prevention, recognition rather than recall, flexibility and efficiency of use, aesthetic and minimalist design, error recovery, and help documentation
- **Gestalt Laws of Visual Perception**: Proximity, similarity, closure, continuity, focal point, and symmetry to create intuitive visual organization
- **Fitt's Law**: Optimized click target sizes and spatial organization for efficient interaction
- **User Customization**: Dismissible dashboard widgets and customizable interfaces linked to perceived ease of use

## Project Structure

```
SOLAR-Redesign/
├── src/
│   ├── App.jsx                       # Main application component with routing
│   ├── main.jsx                      # React entry point
│   ├── index.css                     # Global styles
│   ├── database.json                 # Simulated data for prototype
│   ├── components/
│   │   ├── Navbar.jsx                # Persistent navigation bar
│   │   └── ui/                       # Reusable UI components
│   │       ├── button.jsx            # Standardized button component
│   │       ├── card.jsx              # Information card containers
│   │       ├── navigation-menu.jsx   # Navigation patterns
│   │       └── switch.jsx            # Toggle controls
│   ├── pages/
│   │   ├── HomePage.jsx              # Dashboard with quick actions
│   │   ├── AcademicRecordsPage.jsx   # Grades and transcripts
│   │   ├── ClassEnrollmentPage.jsx   # Course search and enrollment
│   │   ├── FinancialServicesPage.jsx # Integrated billing and financial aid
│   │   └── SettingsPage.jsx          # User preferences
│   └── lib/
│       └── utils.js                  # Utility functions
├── components.json                   # Shadcn UI configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── vite.config.js                    # Vite build configuration
└── package.json                      # Project dependencies
```

## Technologies Used

- **React** - Component-based UI library for consistent, reusable interface elements
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility first CSS framework for responsive design
- **Shadcn UI** - Accessible component primitives
