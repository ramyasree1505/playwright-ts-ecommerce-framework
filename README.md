# playwright-ts-ecommerce-framework
Scalable Playwright TypeScript automation framework with UI and API testing for ecommerce applications using Page Object Model, fixtures, CI/CD, and reporting.

## 📋 Table of Contents
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)

## 🏗️ Project Architecture

This framework follows a **Page Object Model (POM)** architecture pattern combined with a modular testing structure. It separates test concerns into distinct layers:

### Architecture Layers

```
┌─────────────────────────────────────────┐
│          Test Specifications             │
│    (UI Tests & API Tests)                │
├─────────────────────────────────────────┤
│      Page Objects & API Utils            │
│   (Business Logic Abstraction)           │
├─────────────────────────────────────────┤
│        Locators & Test Data              │
│    (UI Elements & Test Fixtures)         │
├─────────────────────────────────────────┤
│    Utilities & Configuration             │
│  (Helpers, Env Configs, Fixtures)        │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
playwright-ts-ecommerce-framework/
│
├── src/                          # Source code directory
│   ├── locators/                # UI element locators (selectors)
│   │   ├── Home.locators.ts     # Homepage element selectors
│   │   └── login.locators.ts    # Login page element selectors
│   │
│   ├── pages/                   # Page Object Models
│   │   ├── Homepage.ts          # Homepage POM - Handles all homepage interactions
│   │   └── loginpage.ts         # LoginPage POM - Handles login workflows
│   │
│   ├── testData/                # Test data files
│   │   └── [Test fixtures and data files for tests]
│   │
│   └── utils/                   # Utility functions and helpers
│       └── APiutils.ts          # API utilities for API testing and requests
│
├── tests/                        # Test specifications
│   ├── UI/                      # UI test cases
│   │   └── login.spec.ts        # Login functionality tests
│   │
│   └── API/                     # API test cases
│       └── loginApi.spec.ts     # Login API endpoint tests
│
├── config/                       # Configuration files
│   ├── env.qa                   # QA environment variables
│   └── env.ts                   # Environment configuration module
│
├── playwright.config.ts          # Playwright test runner configuration
├── playwright.service.config.ts  # Playwright service configuration
├── tsconfig.json                # TypeScript compiler options
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## 🔧 Component Descriptions

### 1. **Locators** (`src/locators/`)
   - **Purpose**: Stores CSS selectors, XPath, and other UI element locators
   - **Use Case**: Centralized management of web element selectors for maintainability
   - **Files**:
     - `Home.locators.ts` - All Homepage selectors
     - `login.locators.ts` - All Login page selectors
   - **Benefits**: Easy updates when UI changes without modifying test logic

### 2. **Page Objects** (`src/pages/`)
   - **Purpose**: Implements the Page Object Model pattern for abstraction
   - **Use Case**: Encapsulates page-specific interactions and business logic
   - **Files**:
     - `Homepage.ts` - Homepage actions (navigation, element interaction)
     - `loginpage.ts` - Login actions (enter credentials, click buttons)
   - **Benefits**: Reusable, maintainable, and readable test code

### 3. **Test Data** (`src/testData/`)
   - **Purpose**: Stores test data, fixtures, and test parameters
   - **Use Case**: Externalize test data for better test management
   - **Benefits**: Easy data updates without changing test logic

### 4. **Utilities** (`src/utils/`)
   - **Purpose**: Common helper functions and reusable logic
   - **Use Case**: API utilities for making HTTP requests and API assertions
   - **Files**:
     - `APiutils.ts` - API request helpers, response parsing, validations
   - **Benefits**: DRY principle, code reuse across tests

### 5. **UI Tests** (`tests/UI/`)
   - **Purpose**: End-to-end and functional UI test cases
   - **Use Case**: Test user workflows and UI interactions
   - **Files**:
     - `login.spec.ts` - Login page tests (valid/invalid credentials, navigation)

### 6. **API Tests** (`tests/API/`)
   - **Purpose**: API endpoint testing and validation
   - **Use Case**: Test backend APIs directly without UI
   - **Files**:
     - `loginApi.spec.ts` - Login API endpoint tests

### 7. **Configuration** (`config/`)
   - **Purpose**: Environment and application configuration
   - **Files**:
     - `env.qa` - QA environment variables
     - `env.ts` - Environment configuration module
   - **Use Case**: Multi-environment support (local, QA, staging, prod)

### 8. **Playwright Config** (`playwright.config.ts`)
   - **Purpose**: Test runner configuration
   - **Includes**: Browser settings, timeouts, reporters, parallel execution

### 9. **Reporting** (`allure-report/`)
   - **Purpose**: HTML report generation and visualization
   - **Use Case**: Detailed test execution reports with screenshots and logs

## 💻 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Test Framework** | Playwright (v1.59.1) |
| **Language** | TypeScript (with Node.js types) |
| **Reporting** | Allure Playwright |
| **Configuration** | dotenv |
| **Cloud** | Azure Playwright |
| **Package Manager** | npm |
| **CI/CD** | GitHub Actions |
| **Cloud Storage** | Azure Blob Storage |

## 🚀 CI/CD Pipeline (GitHub Actions)

### Workflow Overview

The project includes a fully automated CI/CD pipeline that runs on every `push` and `pull_request` to the `main` branch.

**Workflow File**: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

### CI/CD Pipeline Stages

```
┌─────────────────────────────────────────────────┐
│  Trigger: Push/Pull Request to Main Branch      │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  1. Checkout Repository                         │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  2. Setup Node.js v20                           │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  3. Install npm Dependencies                    │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  4. Install Allure CLI                          │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  5. Azure Authentication                        │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  6. Run Tests on Multiple Browsers              │
│     (Chromium & Firefox) - Parallel             │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  7. Generate Allure Report                      │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  8. Upload Report as Artifact                   │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  9. Upload to Azure Blob Storage                │
└─────────────────────────────────────────────────┘
```

### Pipeline Configuration

#### **Triggers**
- **On Push**: Runs when code is pushed to the `main` branch
- **On Pull Request**: Runs when a PR is created against the `main` branch

#### **Test Execution Strategy**
- **Matrix Testing**: Tests run on multiple browsers in parallel
  - **Chromium**
  - **Firefox**
- **Parallel Workers**: 2 concurrent workers per browser
- **Retry Policy**: Tests retry up to 2 times on failure

#### **Environment Variables**
```yaml
CI: true                                          # CI flag for test conditions
BROWSER: ${{ matrix.browser }}                    # Chromium or Firefox
RETRIES: 2                                        # Retry failed tests
PARALLEL_THREAD: 2                                # Parallel execution threads
BASE_URL: https://rahulshettyacademy.com/client/#/auth/login
REST_API_BASE_URL: https://rahulshettyacademy.com/client
Timeout: 30000                                    # Test timeout in ms
PLAYWRIGHT_SERVICE_URL: ${{ vars.PLAYWRIGHT_SERVICE_URL }}  # Azure service endpoint
```

### Pipeline Steps Explained

| Step | Action | Purpose |
|------|--------|---------|
| **1. Checkout** | `actions/checkout@v4` | Fetch the latest code from repository |
| **2. Setup Node** | `actions/setup-node@v4` | Install Node.js v20 runtime |
| **3. Install Deps** | `npm install` | Install all project dependencies |
| **4. Install Allure** | `npm install -g allure-commandline` | Setup Allure CLI for reporting |
| **5. Azure Login** | `azure/login@v2` | Authenticate with Azure using credentials secret |
| **6. Run Tests** | `npx playwright test` | Execute tests on Playwright Service with 2 workers |
| **7. Generate Report** | `allure generate` | Create Allure HTML report (runs even if tests fail) |
| **8. Upload Artifact** | `actions/upload-artifact@v4` | Store report as GitHub artifact |
| **9. Upload to Azure** | `az storage blob upload-batch` | Push report to Azure Blob Storage |

### Running Tests Locally (Same Config as CI)

To run tests locally with the same Playwright Service configuration as CI:

```bash
# Install dependencies
npm install

# Run tests with Playwright Service
npx playwright test --config=playwright.service.config.ts --workers=2

# Generate Allure report
allure generate allure-results --clean -o allure-report

# Open report
allure open allure-report
```

### Accessing Test Reports

#### **GitHub Artifacts**
1. Go to your GitHub repository
2. Click **Actions** → Select the workflow run
3. Scroll down to **Artifacts** section
4. Download `allure-report-<browser>` zip file

#### **Azure Blob Storage**
- Reports are automatically uploaded to Azure Blob Storage
- Access via Azure Portal → Storage Account → reports container
- Provides centralized report archive

### Secrets & Environment Variables Required

| Secret/Variable | Description |
|---|---|
| `AZURE_CREDENTIALS` | Azure service principal credentials for authentication |
| `PLAYWRIGHT_SERVICE_URL` | Azure Playwright Service endpoint URL |

### Key Features

✅ **Multi-Browser Testing** - Runs on Chromium and Firefox simultaneously  
✅ **Parallel Execution** - 2 worker threads for faster test runs  
✅ **Automatic Retry** - Failed tests automatically retry up to 2 times  
✅ **Azure Integration** - Uses Playwright Service for cloud-based execution  
✅ **Report Generation** - Automatically generates Allure reports  
✅ **Artifact Storage** - Reports stored in GitHub and Azure  
✅ **Always Runs** - Report generation and uploads happen even if tests fail  
✅ **Environment Variables** - Configurable via GitHub Actions vars/secrets

## 🚀 Key Design Patterns

1. **Page Object Model (POM)**: Separates test logic from page interactions
2. **Modular Architecture**: Clear separation of concerns (locators, pages, tests)
3. **Configuration Management**: Environment-based configurations
4. **Utility Layer**: Reusable functions for common operations
5. **Allure Reporting**: Rich HTML reports with test metadata

## 📊 Test Execution Flow

```
Test Specification
    ↓
Page Object / API Utils
    ↓
Locators / API Endpoints
    ↓
Playwright / HTTP Client
    ↓
Application Under Test
    ↓
Allure Report Generation
```
