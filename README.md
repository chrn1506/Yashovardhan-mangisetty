# DPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


##  build and deploy
npx angular-cli-ghpages --dir=dist/browser/browser
ng build --configuration production --base-href /Yashovardhan-mangisetty/


## fire base setup
npm install firebase @angular/fire
## Website Overview

This is a pulmonology doctor portfolio and clinic website with appointment and contact workflows.

## Core Features

- Multi-language support: English, Hindi, Telugu.
- booking section with doctor profile and quick booking CTA.
- About section with qualifications and clinical specialties.
- View Clinic section with hospital-wise schedules, call links, directions, and map embeds.
- Treatments section with modal-based detailed content.
- Testimonials carousel with responsive layout.
- Contact section with direct Email, Call, and WhatsApp actions.
- Floating contact bubble, WhatsApp sidebar, and scroll-to-top utility.
- Appointment modal form with validation and slot selection.

## Centralized Settings

- Single source for doctor/contact details:
  - `src/app/core/app-profile.ts`
- Update once to reflect across Home, Footer, Contact Bubble, and app-level WhatsApp link.

## Theming

- Sky-blue theme is active.
- Theme color tokens are centralized in:
  - `src/styles.scss`
- Update CSS variables there to change the full application palette.
