# Design Document: Smart Campus Placement & Skill Gap Analyzer

## Overview

The Smart Campus Placement & Skill Gap Analyzer is a comprehensive web-based platform designed to connect students with placement opportunities while bridging the gap between academic learning and industry requirements. The system consists of three main portals: Student Portal, Recruiter Portal, and Admin Dashboard.

The architecture follows a client-server model with a responsive frontend built with modern web technologies. The frontend communicates with a backend API to manage data persistence, business logic, and complex computations such as skill gap analysis and opportunity matching.

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ Student      │ Recruiter    │ Admin                    │ │
│  │ Portal       │ Portal       │ Dashboard                │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
│         ↓              ↓                 ↓                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         Authentication & Session Management             │ │
│  └─────────────────────────────────────────────────────────┘ │
│         ↓              ↓                 ↓                   │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ State        │ Component    │ Service Layer            │ │
│  │ Management   │ Library      │ (HTTP Client)            │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         ↓                ↓                 ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend API Layer                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Authentication | Profiles | Assessments | Matching     │ │
│  │ Opportunities  | Analytics | Notifications             │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         ↓                ↓                 ↓
┌─────────────────────────────────────────────────────────────┐
│              Database Layer                                 │
│  ┌──────┬──────────┬───────────┬────────┬────────────────┐ │
│  │Users │ Profiles │ Skills    │ Opps   │ Applications   │ │
│  └──────┴──────────┴───────────┴────────┴────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Technology Stack

- **Framework**: React or Vue.js with TypeScript
- **State Management**: Redux or Vuex for centralized state
- **HTTP Client**: Axios or Fetch API with interceptors for authentication
- **UI Components**: Material-UI, Bootstrap, or Tailwind CSS
- **Charts/Visualization**: Chart.js, D3.js, or Apache ECharts
- **Form Handling**: React Hook Form or Formik with Zod validation
- **Routing**: React Router or Vue Router for SPA navigation
- **Build Tool**: Vite or Webpack for bundling and optimization

## Components and Interfaces

### Core Component Structure

#### 1. Authentication Components
- `LoginForm`: Handles user login with email/password
- `RegisterForm`: Guides new users through registration
- `SessionManager`: Manages authentication tokens and session state
- `ProtectedRoute`: Guards routes based on user role and authentication status

#### 2. Student Portal Components
- `StudentProfileForm`: Edit student profile information
- `SkillAssessmentUI`: Interface for taking skill assessments
- `SkillGapVisualization`: Charts showing skill gaps vs. industry requirements
- `OpportunitySearch`: Search and filter job opportunities
- `OpportunityCard`: Display individual opportunity details
- `ApplicationHistory`: List of student applications and their statuses
- `NotificationCenter`: Display and manage student notifications

#### 3. Recruiter Portal Components
- `JobPostingForm`: Create and edit job opportunities
- `ApplicantCard`: Display individual student profiles
- `ApplicantFiltering`: Filter applicants by skills and qualifications
- `PostingManagement`: Manage active and archived job postings
- `RecruiterNotifications`: Display recruiter-specific notifications

#### 4. Admin Dashboard Components
- `MetricsWidget`: Display KPIs (total students, opportunities, placements)
- `AnalyticsChart`: Render various analytics visualizations
- `PlacementTracker`: Track applications and placement status
- `ReportGenerator`: Generate and export reports
- `DataExport`: Export data in CSV/Excel format

#### 5. Shared Components
- `Navigation`: Main navigation bar with role-based menu items
- `Header`: Application header with user profile and logout
- `Footer`: Application footer with links and information
- `Modal`: Reusable modal dialog component
- `Toast`: Toast notifications for user feedback
- `Loading`: Loading indicators and spinners
- `ErrorBoundary`: Error handling and fallback UI
- `FilterPanel`: Reusable filtering UI for search results

### API Interface Specification

#### Authentication Endpoints
```typescript
// POST /api/auth/login
Request: { email: string, password: string }
Response: { token: string, user: User, role: string }

// POST /api/auth/register
Request: { email: string, password: string, name: string, role: string }
Response: { success: boolean, userId: string }

// POST /api/auth/logout
Response: { success: boolean }

// GET /api/auth/validate
Response: { valid: boolean, user: User }
```

#### Student Profile Endpoints
```typescript
// GET /api/students/:id/profile
Response: StudentProfile

// PUT /api/students/:id/profile
Request: Partial<StudentProfile>
Response: StudentProfile

// POST /api/students/:id/documents
Request: FormData (file upload)
Response: { fileId: string, url: string }

// DELETE /api/students/:id/documents/:fileId
Response: { success: boolean }
```

#### Assessment Endpoints
```typescript
// GET /api/assessments
Response: Assessment[]

// GET /api/assessments/:id
Response: Assessment

// POST /api/assessments/:id/start
Response: { sessionId: string, questions: Question[] }

// PUT /api/assessments/:id/submit
Request: { sessionId: string, answers: Answer[] }
Response: { score: number, results: AssessmentResult }

// GET /api/assessments/:id/resume
Response: { sessionId: string, currentQuestion: number, questions: Question[] }
```

#### Opportunity Endpoints
```typescript
// GET /api/opportunities
Query: { search?, location?, company?, skip?, limit? }
Response: { opportunities: Opportunity[], total: number }

// GET /api/opportunities/:id
Response: Opportunity

// POST /api/opportunities
Request: Opportunity (recruiter only)
Response: Opportunity

// PUT /api/opportunities/:id
Request: Partial<Opportunity> (recruiter only)
Response: Opportunity

// POST /api/opportunities/:id/apply
Request: { studentId: string }
Response: { applicationId: string, status: string }

// GET /api/opportunities/:id/applicants
Response: StudentProfile[] (recruiter only)
```

#### Analytics Endpoints
```typescript
// GET /api/analytics/dashboard
Response: DashboardMetrics

// GET /api/analytics/reports/:type
Query: { startDate?, endDate?, departmentFilter? }
Response: ReportData

// POST /api/analytics/export
Request: { format: 'csv' | 'xlsx', reportType: string }
Response: { downloadUrl: string }
```

## Data Models

### Core Data Structures

```typescript
// User Authentication Model
interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'recruiter' | 'admin'
  createdAt: Date
  lastLogin: Date
}

// Student Profile Model
interface StudentProfile {
  id: string
  userId: string
  education: {
    degree: string
    college: string
    cgpa: number
    graduationYear: number
  }
  skills: {
    name: string
    proficiency: 'beginner' | 'intermediate' | 'advanced'
    endorsements: number
  }[]
  experience: {
    company: string
    role: string
    duration: string
    description: string
  }[]
  projects: {
    name: string
    description: string
    technologies: string[]
    link?: string
  }[]
  documents: {
    fileId: string
    fileName: string
    type: 'resume' | 'certificate' | 'other'
    uploadedAt: Date
  }[]
  preferences: {
    preferredLocations: string[]
    preferredRoles: string[]
    preferredCompanies: string[]
  }
  appliedOpportunities: string[]
}

// Job Opportunity Model
interface JobOpportunity {
  id: string
  recruiterId: string
  title: string
  company: string
  description: string
  requiredSkills: {
    skill: string
    level: 'beginner' | 'intermediate' | 'advanced'
  }[]
  location: string
  salary?: {
    min: number
    max: number
    currency: string
  }
  deadline: Date
  applicants: string[]
  status: 'open' | 'closed' | 'filled'
  postedAt: Date
}

// Skill Assessment Model
interface SkillAssessment {
  id: string
  title: string
  description: string
  skillArea: string
  questions: {
    id: string
    text: string
    type: 'mcq' | 'coding' | 'essay'
    options?: string[]
    rubric?: string
  }[]
  duration: number // in minutes
  passingScore: number
}

// Assessment Result Model
interface AssessmentResult {
  id: string
  studentId: string
  assessmentId: string
  score: number
  percentage: number
  answers: {
    questionId: string
    answer: string
    isCorrect: boolean
  }[]
  completedAt: Date
  timeTaken: number
}

// Skill Gap Analysis Model
interface SkillGapAnalysis {
  studentId: string
  currentSkills: {
    skill: string
    proficiency: number // 0-100
    assessmentScore?: number
  }[]
  requiredSkillsByRole: {
    role: string
    skills: {
      skill: string
      requiredLevel: number // 0-100
    }[]
  }[]
  gaps: {
    skill: string
    current: number
    required: number
    gap: number
    priority: 'high' | 'medium' | 'low'
  }[]
  recommendations: {
    skill: string
    recommendedResources: string[]
    estimatedTimeToClose: string
  }[]
}

// Application Model
interface Application {
  id: string
  studentId: string
  opportunityId: string
  status: 'applied' | 'reviewed' | 'shortlisted' | 'rejected' | 'selected'
  appliedAt: Date
  skillMatchPercentage: number
  notes?: string
  lastUpdated: Date
}

// Notification Model
interface Notification {
  id: string
  userId: string
  type: 'opportunity_match' | 'status_update' | 'new_application' | 'message'
  title: string
  message: string
  relatedId?: string
  read: boolean
  createdAt: Date
}

// Analytics Dashboard Model
interface DashboardMetrics {
  totalStudents: number
  totalOpportunities: number
  placedStudents: number
  placementRate: number
  averageSkillScore: number
  topSkills: { skill: string; count: number }[]
  applicationTrends: { date: Date; count: number }[]
  departmentStats: {
    department: string
    students: number
    placements: number
  }[]
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Profile Round-trip Consistency
*For any* student profile data, when stored and then retrieved, the retrieved data SHALL be identical to the stored data, ensuring no data corruption or loss during persistence.

**Validates: Requirements 1.2, 1.3, 1.6**

### Property 2: Required Field Validation
*For any* profile submission with empty required fields, the system SHALL reject the submission and prevent persistence, maintaining data integrity.

**Validates: Requirements 1.4**

### Property 3: File Upload Persistence
*For any* document uploaded by a student, querying the student profile's documents collection SHALL return the uploaded file with matching metadata.

**Validates: Requirements 1.5, 1.7**

### Property 4: Assessment Score Determinism
*For any* given set of answers to an assessment, the scoring algorithm SHALL produce the same score consistently, ensuring fair and reliable assessment results.

**Validates: Requirements 2.3**

### Property 5: Incomplete Assessment Recovery
*For any* assessment interrupted before completion, resuming that assessment SHALL restore the exact state including current question, time remaining, and answered questions.

**Validates: Requirements 2.4**

### Property 6: Assessment Result Completeness
*For any* completed assessment, the result record SHALL contain all required fields including score, percentage, answers, and timestamp.

**Validates: Requirements 2.5**

### Property 7: Skill Gap Aggregation
*For any* student with multiple assessment results, the skill gap analysis SHALL incorporate all assessment scores into the current skill proficiency levels.

**Validates: Requirements 2.6, 3.1, 3.4**

### Property 8: Filter Combination Logic
*For any* combination of applied filters (location, company, role type), the system SHALL return opportunities that match ALL filter criteria.

**Validates: Requirements 4.2, 7.2**

### Property 9: Duplicate Application Prevention
*For any* student-opportunity pair, submitting a second application after the first SHALL not create a duplicate record and SHALL return an error or existing application status.

**Validates: Requirements 4.4**

### Property 10: Opportunity Details Completeness
*For any* job opportunity displayed, all required fields (title, description, skills, deadline) SHALL be present and readable to students.

**Validates: Requirements 4.5**

### Property 11: Job Posting Round-trip
*For any* job posting submitted by a recruiter, querying the opportunities list with appropriate filters SHALL return that posting within one second.

**Validates: Requirements 5.2**

### Property 12: Posting Update Propagation
*For any* updates to a job posting, those updates SHALL be visible to all users within the subsequent page load or refresh.

**Validates: Requirements 5.4**

### Property 13: Applicant Filtering Accuracy
*For any* recruiter viewing applicants for a posting, all returned student profiles SHALL match the skill requirements of that posting at the specified proficiency levels.

**Validates: Requirements 5.5**

### Property 14: Report Data Accuracy
*For any* generated analytics report, the computed metrics (placement rate, average scores, department stats) SHALL be consistent with the underlying data in the database.

**Validates: Requirements 6.3, 6.4**

### Property 15: Data Export Integrity
*For any* exported data in CSV or Excel format, parsing the exported file SHALL yield the same data that was exported.

**Validates: Requirements 6.5**

### Property 16: Search Keyword Matching
*For any* search query, the system SHALL return only opportunities whose title, description, or skills contain or match the search keywords.

**Validates: Requirements 7.1**

### Property 17: Pagination Correctness
*For any* result set with pagination, requesting page N SHALL return exactly N*pageSize to (N+1)*pageSize records, with no overlaps or gaps.

**Validates: Requirements 7.3**

### Property 18: Notification Trigger Accuracy
*For any* opportunity matching a student's profile criteria (skills, location preferences), the system SHALL send a notification within 5 minutes of the opportunity being posted.

**Validates: Requirements 8.1**

### Property 19: Application Status Update Notifications
*For any* change in application status, the student SHALL receive a notification reflecting that status change within 1 minute.

**Validates: Requirements 8.2**

### Property 20: Notification Preference Enforcement
*For any* user with specific notification preferences, only notifications matching those preferences SHALL be sent to that user.

**Validates: Requirements 8.4**

### Property 21: Notification Persistence
*For any* notification sent to a user, that notification SHALL appear in the user's notification center until explicitly dismissed or marked as read.

**Validates: Requirements 8.5**

### Property 22: Authentication State Consistency
*For any* valid credentials provided at login, the system SHALL create a session and subsequent requests with that session token SHALL be authenticated.

**Validates: Requirements 9.1, 9.3**

### Property 23: Invalid Credential Rejection
*For any* invalid credentials (wrong password or non-existent user), the login attempt SHALL fail and return a generic error without revealing which field is incorrect.

**Validates: Requirements 9.2**

### Property 24: Authorization Enforcement
*For any* authenticated user, they SHALL only be able to access resources and data appropriate to their role (student, recruiter, admin).

**Validates: Requirements 9.4**

### Property 25: Session Timeout Logout
*For any* user session inactive for more than the configured timeout duration, the next request SHALL return an authentication error and the user SHALL be automatically logged out.

**Validates: Requirements 9.5**

### Property 26: Responsive Viewport Adaptation
*For any* viewport width, the UI SHALL render without horizontal scroll and maintain readability with font sizes and spacing adjusted appropriately.

**Validates: Requirements 10.3, 10.5**

### Property 27: Design Pattern Consistency
*For any* page in the application, navigation, buttons, form elements, and color scheme SHALL follow the established design system.

**Validates: Requirements 10.4**

### Property 28: Large Dataset Pagination
*For any* view displaying more than 50 items (opportunities, students, applications), the system SHALL implement pagination or lazy loading to prevent UI blocking.

**Validates: Requirements 11.4**

### Property 29: Sensitive Data Protection
*For any* sensitive user data (passwords, phone numbers, financial information) stored in the system, that data SHALL not be exposed in logs, API responses, or error messages.

**Validates: Requirements 12.2, 12.3**

### Property 30: Data Deletion Completeness
*For any* user requesting account deletion, all associated personal data SHALL be removed from the database and no traces SHALL remain in active records after the deletion request.

**Validates: Requirements 12.4**

## Error Handling

### Error Handling Strategy

1. **Client-Side Validation**: Form inputs validated before submission
2. **Server-Side Validation**: All inputs re-validated on backend
3. **Error Display**: User-friendly error messages shown in modals or toast notifications
4. **Logging**: All errors logged with context for debugging
5. **Graceful Degradation**: System continues functioning even if non-critical features fail

### Common Error Scenarios

| Error Type | Handling |
|-----------|----------|
| Network Timeout | Show retry dialog, implement exponential backoff |
| Invalid Token | Redirect to login, clear session |
| Permission Denied | Show informative message, redirect to appropriate page |
| Data Validation | Show field-level errors, highlight invalid fields |
| Server Error | Show generic error message, log details for support |
| File Upload Failed | Show upload error, allow retry |
| Assessment Timeout | Save progress, allow resumption |

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing for comprehensive coverage:

**Unit Testing**: Validates specific examples, edge cases, and error conditions
- Test individual components in isolation
- Test error scenarios and boundary conditions
- Test integration between related components
- Focus on concrete examples and edge cases

**Property-Based Testing**: Validates universal properties across many generated inputs
- Generate random valid inputs according to constraints
- Run each property test minimum 100 iterations
- Each property test targets one correctness property
- Verify properties hold across diverse input space

### Property-Based Testing Implementation

**Framework**: Fast-check (JavaScript/TypeScript), Hypothesis (Python), or QuickCheck (Haskell)

**Configuration**:
- Minimum 100 iterations per test
- Seed value for reproducibility
- Custom generators for domain-specific data (emails, dates, etc.)
- Shrinking enabled to find minimal failing examples

**Test Tagging**: Each property test includes comments referencing the design property:
```typescript
// Feature: smart-campus-placement-analyzer, Property 1: Profile round-trip consistency
test('Property 1: Any student profile persisted and retrieved should be identical', () => {
  fc.assert(
    fc.property(studentProfileArbitrary, (profile) => {
      const stored = storeProfile(profile)
      const retrieved = retrieveProfile(stored.id)
      expect(retrieved).toEqual(profile)
    }),
    { numRuns: 100 }
  )
})
```

### Testing Scope

**Implemented Tests** (Core functionality):
- All Properties 1-30 covered by property-based tests
- Form validation and error handling
- API response validation
- Navigation and routing
- Authentication and authorization flows
- Data persistence operations

**Optional Tests** (Can be implemented based on capacity):
- UI component snapshot tests
- Performance and load testing
- Visual regression testing
- E2E tests with Playwright or Cypress
- Accessibility testing with axe-core

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── hooks/
├── properties/
│   ├── profiles.spec.ts
│   ├── assessments.spec.ts
│   ├── opportunities.spec.ts
│   ├── auth.spec.ts
│   ├── notifications.spec.ts
│   └── ui.spec.ts
├── fixtures/
│   ├── users.fixture.ts
│   ├── profiles.fixture.ts
│   └── opportunities.fixture.ts
└── integration/
    ├── auth.flow.spec.ts
    └── placement.flow.spec.ts
```

