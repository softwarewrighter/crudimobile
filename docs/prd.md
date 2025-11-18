# Product Requirements Document (PRD)

## CrudiMobile - Mobile Frontend for Crudibase

### 1. Overview

CrudiMobile is a React Native mobile application that provides a mobile interface for the Crudibase project, enabling users to search wikibase, manage collections, and capture contextual information through device sensors and camera.

### 2. Product Vision

Create a powerful, user-friendly mobile application that allows users to search, organize, and enrich wikibase data with notes, photos, and contextual sensor data from their mobile devices.

### 3. Target Platform

- **Primary**: Android (API Level 35)
- **Future**: iOS support

### 4. Core Features

#### 4.1 Wikibase Search

- **Description**: Search functionality to query wikibase through the Crudibase API
- **User Story**: As a user, I want to search wikibase so that I can find relevant entities and data
- **Acceptance Criteria**:
  - User can enter search queries
  - Results are displayed in a scrollable list
  - Search results show entity labels and descriptions
  - Loading states are clearly indicated
  - Errors are handled gracefully with user feedback

#### 4.2 Collections Management

- **Description**: Create, view, and manage named collections of search results
- **User Story**: As a user, I want to organize search results into named collections so that I can group related items
- **Acceptance Criteria**:
  - User can create new collections with custom names
  - User can add search results to collections
  - User can view all collections
  - User can view items within a collection
  - User can remove items from collections
  - User can delete collections

#### 4.3 Notes

- **Description**: Add textual notes to collections and items
- **User Story**: As a user, I want to add notes to my collections so that I can capture my thoughts and context
- **Acceptance Criteria**:
  - User can add notes to collections
  - User can add notes to individual items
  - Notes are timestamped
  - Notes can be edited and deleted
  - Notes are persisted locally and synced to backend

#### 4.4 Camera Integration

- **Description**: Capture and attach photos to collections
- **User Story**: As a user, I want to take photos and attach them to collections so that I can capture visual information
- **Acceptance Criteria**:
  - User can launch camera from collection view
  - Photos are captured and stored
  - Photos are associated with collections/items
  - Thumbnails are displayed in collection view
  - Full-size images can be viewed
  - Photos are uploaded to backend

#### 4.5 Sensor Data Collection

- **Description**: Capture contextual information from device sensors
- **User Story**: As a user, I want to automatically capture location and environmental data so that I can enrich my collections with context
- **Acceptance Criteria**:
  - GPS location (latitude, longitude, altitude, accuracy)
  - Device temperature (if available)
  - Atmospheric pressure (if available)
  - Nearby WiFi access points
  - Sensor data is timestamped
  - User can enable/disable sensor data collection
  - Sensor data is displayed with collections/items
  - Sensor data is synced to backend

#### 4.6 Authentication

- **Description**: Secure authentication with Crudibase backend
- **User Story**: As a user, I want to securely log in so that my data is protected
- **Acceptance Criteria**:
  - User can log in with credentials
  - HTTPS communication with backend
  - Authentication tokens are securely stored
  - Session management
  - Logout functionality

### 5. Non-Functional Requirements

#### 5.1 Performance

- App launch time < 3 seconds
- Search results display < 2 seconds
- Smooth scrolling (60 fps)
- Responsive UI interactions

#### 5.2 Security

- HTTPS only for all API communication
- Secure credential storage
- No sensitive data in logs
- Certificate pinning for production

#### 5.3 Reliability

- Offline functionality with local caching
- Graceful degradation when sensors unavailable
- Automatic sync when connection restored
- Error recovery mechanisms

#### 5.4 Usability

- Intuitive, modern UI
- Clear error messages
- Loading indicators for async operations
- Accessibility support (screen readers, font scaling)

#### 5.5 Testability

- Comprehensive unit test coverage (>80%)
- Integration tests for API interactions
- E2E tests for critical user flows
- TDD approach for all features

### 6. Technical Constraints

- React Native with TypeScript
- Java 17 for Android
- Gradle 8.x
- Android SDK 35
- Target API: https://crudibase.codingtech.info/

### 7. Success Metrics

- Successful search queries
- Number of collections created
- Photos captured and uploaded
- Sensor data points collected
- User retention rate
- App crash rate < 1%

### 8. Future Enhancements

- iOS support
- Offline-first architecture with sync
- Advanced search filters
- Collection sharing
- Export functionality
- Voice notes
- AR features for location-based collections
