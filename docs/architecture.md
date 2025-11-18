# Architecture Documentation

## CrudiMobile Architecture

### 1. System Overview

CrudiMobile is a React Native mobile application following Clean Architecture principles with a clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  (React Native Components, Screens, UI Logic)            │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                   Application Layer                      │
│  (Business Logic, Use Cases, State Management)           │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                    Domain Layer                          │
│  (Entities, Domain Models, Business Rules)               │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                 Infrastructure Layer                     │
│  (API Client, Storage, Sensors, Camera)                  │
└─────────────────────────────────────────────────────────┘
```

### 2. Layer Descriptions

#### 2.1 Presentation Layer

**Responsibility**: User interface and user interaction

**Components**:

- **Screens**: Main navigation screens (Search, Collections, Settings)
- **Components**: Reusable UI components (SearchBar, CollectionCard, etc.)
- **Navigation**: React Navigation setup
- **Hooks**: Custom hooks for UI logic

**Technologies**:

- React Native
- TypeScript
- React Navigation
- Styled Components / React Native Paper

#### 2.2 Application Layer

**Responsibility**: Application-specific business logic and orchestration

**Components**:

- **Use Cases**: Single-purpose application operations
  - SearchWikibase
  - CreateCollection
  - AddNote
  - CapturePhoto
  - CollectSensorData
- **State Management**: Redux Toolkit or Zustand
- **Services**: Coordination between domain and infrastructure

**Technologies**:

- Redux Toolkit / Zustand
- TypeScript
- RxJS (for reactive streams)

#### 2.3 Domain Layer

**Responsibility**: Core business logic and rules

**Components**:

- **Entities**:
  - WikibaseEntity
  - Collection
  - Note
  - Photo
  - SensorData
- **Value Objects**: Immutable domain objects
- **Business Rules**: Domain validation and logic

**Technologies**:

- Pure TypeScript
- No external dependencies

#### 2.4 Infrastructure Layer

**Responsibility**: External systems and frameworks

**Components**:

- **API Client**: HTTP client for Crudibase API
  - Authentication
  - Search endpoints
  - Collections sync
  - File upload
- **Storage**: Local persistence
  - AsyncStorage for app data
  - SQLite for structured data
  - File system for photos
- **Sensors**: Device sensor access
  - Geolocation
  - Barometer
  - Thermometer
  - WiFi scanner
- **Camera**: Camera integration
  - React Native Camera or Vision Camera

**Technologies**:

- Axios / Fetch API
- AsyncStorage
- React Native SQLite Storage
- React Native Geolocation
- React Native Vision Camera
- React Native Sensors

### 3. Data Flow

#### 3.1 Read Flow

```
User Action → Screen → Use Case → Domain Logic → Infrastructure → API/Storage
                ↓                                                      │
            UI Update ← State Update ← Domain Entity ← Response ←─────┘
```

#### 3.2 Write Flow

```
User Input → Validation → Use Case → Domain Entity → Infrastructure → API/Storage
                                                            │
                                                       Confirmation
                                                            │
                                                    State Update → UI Update
```

### 4. Module Structure

```
src/
├── presentation/
│   ├── screens/
│   │   ├── auth/
│   │   ├── search/
│   │   ├── collections/
│   │   └── settings/
│   ├── components/
│   │   ├── common/
│   │   └── features/
│   ├── navigation/
│   └── hooks/
├── application/
│   ├── usecases/
│   ├── state/
│   └── services/
├── domain/
│   ├── entities/
│   ├── valueObjects/
│   └── rules/
├── infrastructure/
│   ├── api/
│   ├── storage/
│   ├── sensors/
│   └── camera/
├── shared/
│   ├── types/
│   ├── utils/
│   └── constants/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

### 5. Cross-Cutting Concerns

#### 5.1 Logging

- **Strategy**: Structured logging with levels (debug, info, warn, error)
- **Implementation**: Custom logger service
- **Outputs**: Console (development), File + Remote (production)
- **Libraries**: react-native-logs, Sentry

#### 5.2 Error Handling

- **Strategy**: Centralized error handling with custom error types
- **Implementation**: Error boundaries for React components, try-catch with proper error propagation
- **User Feedback**: Toast messages, error screens

#### 5.3 Security

- **Authentication**: JWT tokens stored in secure storage
- **API Communication**: HTTPS only, certificate pinning
- **Data Storage**: Encrypted storage for sensitive data
- **Libraries**: react-native-keychain, react-native-ssl-pinning

#### 5.4 Testing

- **Unit Tests**: Jest for business logic
- **Component Tests**: React Native Testing Library
- **Integration Tests**: API mocking with MSW
- **E2E Tests**: Detox for critical flows

### 6. External Dependencies

#### 6.1 Backend API

- **Endpoint**: https://crudibase.codingtech.info/
- **Protocol**: HTTPS
- **Authentication**: Token-based
- **Documentation**: https://github.com/softwarewrighter/crudibase

#### 6.2 Third-Party Services

- None (self-hosted backend)

### 7. Deployment Architecture

```
┌──────────────────┐
│  Developer       │
│  Machine         │
└────────┬─────────┘
         │
         │ Build
         ▼
┌──────────────────┐
│  Android Studio  │
│  Gradle Build    │
└────────┬─────────┘
         │
         │ APK/AAB
         ▼
┌──────────────────┐
│  Android Device  │
│  or Emulator     │
└────────┬─────────┘
         │
         │ HTTPS
         ▼
┌──────────────────┐
│  Crudibase API   │
│  (Digital Ocean) │
└──────────────────┘
```

### 8. Scalability Considerations

#### 8.1 Performance

- Virtual lists for large data sets
- Image optimization and caching
- Lazy loading of components
- Debounced search queries

#### 8.2 Storage

- Periodic cleanup of old data
- Configurable cache limits
- Efficient database indexes

#### 8.3 Network

- Request batching
- Retry logic with exponential backoff
- Request cancellation for stale requests
- Offline queue for write operations

### 9. Technology Stack Summary

| Layer            | Technologies                              |
| ---------------- | ----------------------------------------- |
| Framework        | React Native 0.73+                        |
| Language         | TypeScript 5.x                            |
| State Management | Redux Toolkit / Zustand                   |
| Navigation       | React Navigation 6.x                      |
| UI Components    | React Native Paper                        |
| Testing          | Jest, React Native Testing Library, Detox |
| Build            | Gradle 8.x, Java 17                       |
| Target           | Android SDK 35 (API Level 35)             |
| Storage          | AsyncStorage, SQLite                      |
| Networking       | Axios                                     |
| Logging          | react-native-logs                         |
| Error Tracking   | Sentry (future)                           |

### 10. Architectural Decisions

#### ADR-001: Clean Architecture

**Decision**: Use Clean Architecture with clear layer separation
**Rationale**: Maintainability, testability, and independence from frameworks
**Status**: Accepted

#### ADR-002: TypeScript

**Decision**: Use TypeScript for type safety
**Rationale**: Catch errors at compile time, better IDE support, improved maintainability
**Status**: Accepted

#### ADR-003: TDD Approach

**Decision**: Test-Driven Development for all features
**Rationale**: Higher code quality, better design, confidence in refactoring
**Status**: Accepted

#### ADR-004: Redux Toolkit for State Management

**Decision**: Use Redux Toolkit for global state
**Rationale**: Established patterns, great DevTools, middleware support
**Alternative**: Zustand (lighter, simpler API)
**Status**: To be decided during implementation

#### ADR-005: React Native Paper for UI

**Decision**: Use React Native Paper for UI components
**Rationale**: Material Design, accessibility, theming support
**Status**: Accepted
