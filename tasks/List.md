To-Do List for Porosity of Electrode Calculator (Next.js 15, T3 App, Tailwind, ShadCN, TypeScript)

1. Project Setup
   Install Next.js using create-t3-app.
   Add TailwindCSS and configure it for the project.
   Install ShadCN for UI components and set up the theme.
   Set up TypeScript if not enabled by default.
2. Folder Structure & Module Setup
   Organize project into clean modular folders:
   plaintext
   Copy code
   src/
   ├── components/ # UI components
   ├── pages/ # Next.js routes
   ├── hooks/ # Custom hooks if needed
   ├── utils/ # Utility functions and calculations
   ├── types/ # TypeScript types
   ├── lib/ # Database/schema setup
   └── styles/ # Tailwind and custom styles
3. Data Structure & Types
   Create a schema for electrode inputs with a TypeScript interface:
   ts
   Copy code
   // src/types/electrode.ts
   export interface ElectrodeInput {
   thickness: {
   coatedElectrode: number;
   foil: number;
   material: number;
   };
   mass: {
   electrodeWithFoil: number;
   foil: number;
   electrode: number;
   };
   dimensions: {
   length: number;
   breadth: number;
   area: number;
   volume: number;
   };
   materialFractions: {
   activeMaterial: number;
   carbonAdditive: number;
   binder: number;
   };
   densities: {
   activeMaterial: number;
   carbonAdditive: number;
   binder: number;
   };
   massMg: number;
   }
4. Backend & Validation
   Set up Zod for input validation.
   Define backend API routes for calculations under src/pages/api/calculate.ts.
5. UI Design and Layout
   Use ShadCN components to create a clean form UI:
   Layout
   Group inputs into clear sections:
   Thickness Inputs
   Mass Inputs
   Dimensions
   Material Fractions
   Densities
   Fields to Display
   Use input fields for all numerical values.
   Add a Submit Button to calculate the results.
   Display the Porosity of Electrode (%) in a highlighted result card.
6. Logic & Calculations
   Write a calculation utility function in src/utils/calculatePorosity.ts.
   Import the ElectrodeInput type and ensure calculations use proper field references.
7. Integration
   Link the form UI to state management using React useState.
   On form submission, send data to the backend API route.
   Display calculated results on the UI.
8. Testing
   Validate inputs using Zod on both client and server.
   Ensure edge cases like negative values or empty fields are handled.
   Add basic unit tests for the calculation function.
9. Styling & Theme
   Use TailwindCSS and ShadCN to make the UI modern and responsive.
   Implement a clean "Linear" and "Raycast" theme style.
10. Deployment
    Deploy the application on Vercel for easy hosting.
    Test functionality on different devices for responsiveness.

src/
│
├── app/ # Next.js App Router root
│ ├── page.tsx # Main page for the calculator
│ ├── components/ # Shared UI components
│ │ ├── ThicknessCard.tsx
│ │ ├── MassCard.tsx
│ │ ├── DimensionCard.tsx
│ │ ├── MaterialFractionCard.tsx
│ │ ├── DensityCard.tsx
│ │ ├── ResultCard.tsx
│ │ └── FormSubmitButton.tsx
│ │
│ ├── hooks/ # Custom hooks for form management
│ │ └── useElectrodeForm.ts
│ │
│ ├── utils/ # Utility functions
│ │ └── calculatePorosity.ts
│ │
│ ├── types/ # TypeScript interfaces
│ │ └── electrode.ts
│ │
│ ├── lib/ # Optional: Zod schemas or form handling libraries
│ │ └── schemas.ts
│ │
│ ├── styles/ # Tailwind custom styles if needed
│ └── api/ # API routes if backend calculation is needed
│ └── calculate/route.ts
