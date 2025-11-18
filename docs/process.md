# Development Process

## CrudiMobile Development Process

### 1. Development Methodology

#### 1.1 Test-Driven Development (TDD)

We follow strict TDD practices with the Red-Green-Refactor cycle:

**Red-Green-Refactor Cycle**:

1. **Red**: Write a failing test first
   - Think about the API/interface
   - Write the simplest test that fails
   - Run the test to verify it fails

2. **Green**: Write minimal code to make the test pass
   - Write just enough code to pass the test
   - Don't worry about perfection
   - Run the test to verify it passes

3. **Refactor**: Improve the code
   - Remove duplication
   - Improve naming
   - Extract methods/components
   - Run tests to ensure they still pass

**Example TDD Workflow**:

```typescript
// 1. RED: Write failing test
describe('LoginUseCase', () => {
  it('should return auth token on successful login', async () => {
    const useCase = new LoginUseCase(mockAuthService);
    const result = await useCase.execute('user@example.com', 'password');

    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});

// Test fails (LoginUseCase doesn't exist yet)

// 2. GREEN: Implement minimal code
class LoginUseCase {
  constructor(private authService: AuthService) {}

  async execute(email: string, password: string) {
    const token = await this.authService.login(email, password);
    return { success: true, token };
  }
}

// Test passes

// 3. REFACTOR: Improve the code
class LoginUseCase {
  constructor(private authService: AuthService) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      const token = await this.authService.login(credentials);
      return LoginResult.success(token);
    } catch (error) {
      return LoginResult.failure(error.message);
    }
  }
}

// Tests still pass
```

#### 1.2 Agile Principles

- **Iterative Development**: Build features incrementally
- **Continuous Integration**: Integrate and test frequently
- **Working Software**: Focus on delivering working features
- **Respond to Change**: Adapt to new requirements
- **Collaboration**: Regular communication

### 2. Git Workflow

#### 2.1 Branch Strategy

We use a feature branch workflow:

```
main (or master)
  ↑
  └── claude/create-android-app-01RLxx8hT13jhLXu2koKGsqB (development branch)
       ↑
       └── feature branches (if needed)
```

**Branch Naming Convention**:

- Feature: `feature/search-wikibase`
- Bugfix: `bugfix/fix-login-crash`
- Refactor: `refactor/clean-architecture`

#### 2.2 Commit Guidelines

**Commit Message Format**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

**Example Commit Messages**:

```
feat(auth): implement login functionality

- Add LoginUseCase with email/password validation
- Integrate with AuthService for API calls
- Store auth token in secure storage
- Add comprehensive unit tests

Closes #123
```

```
test(collections): add tests for CreateCollectionUseCase

- Test successful collection creation
- Test validation errors
- Test API error handling
- Achieve 100% code coverage for use case
```

```
refactor(domain): extract validation to value objects

- Move email validation to Email value object
- Move password validation to Password value object
- Update tests to use new value objects
- Improve type safety
```

#### 2.3 Commit Frequency

- Commit after each Red-Green-Refactor cycle
- Commit when a logical unit of work is complete
- Commit before switching tasks
- Minimum: 1 commit per feature/test pair

### 3. Code Quality Standards

#### 3.1 Pre-Commit Checks

All commits must pass the following checks:

1. **Format**: Code is automatically formatted with Prettier
2. **Lint**: ESLint rules pass with no errors or warnings
3. **Build**: TypeScript compiles without errors
4. **Tests**: All tests pass
5. **Coverage**: Test coverage doesn't decrease

**Pre-Commit Hook** (`.husky/pre-commit`):

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Format code
npm run format

# Lint code
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Type check
npm run type-check

# Run tests
npm run test

# Check .gitignore is valid
git check-ignore -v node_modules/.gitkeep >/dev/null 2>&1 || {
  echo "Error: .gitignore is not properly configured"
  exit 1
}
```

**DO NOT BYPASS PRE-COMMIT CHECKS**:

- Never use `--no-verify` flag
- If checks fail, fix the issues
- If checks are broken, fix the checks

#### 3.2 Code Style

**TypeScript/JavaScript**:

- Use TypeScript for all code
- Prefer `const` over `let`
- Use arrow functions for inline functions
- Use async/await over promises
- Avoid `any` type
- Use strict mode
- Prefer composition over inheritance

**React/React Native**:

- Use functional components with hooks
- Use TypeScript for prop types
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use memo for expensive components
- Avoid inline object/array creation in render

**Testing**:

- One test file per source file
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test behavior, not implementation

**Naming Conventions**:

- Files: `camelCase.ts` or `PascalCase.tsx` for components
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Private members: `_privateField`
- Interfaces: `IPascalCase` or `PascalCase`
- Types: `PascalCase`

#### 3.3 Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests are written and passing
- [ ] Code coverage is adequate (>80%)
- [ ] No linting errors or warnings
- [ ] No console.log statements (use logger)
- [ ] Error handling is implemented
- [ ] Edge cases are considered
- [ ] Performance is acceptable
- [ ] Security best practices followed
- [ ] Documentation is updated
- [ ] Commit messages are descriptive

### 4. Testing Standards

#### 4.1 Test Coverage Requirements

| Layer                   | Minimum Coverage | Target Coverage |
| ----------------------- | ---------------- | --------------- |
| Domain                  | 100%             | 100%            |
| Application (Use Cases) | 90%              | 95%             |
| Infrastructure          | 80%              | 85%             |
| Presentation (Logic)    | 80%              | 85%             |
| Overall                 | 80%              | 85%             |

#### 4.2 Test Types

**Unit Tests**:

- Test individual functions/methods
- Mock all dependencies
- Fast execution (<1ms per test)
- No network calls, no file I/O

**Integration Tests**:

- Test integration between modules
- May use real implementations
- Test API integration with mock server
- Test state management integration

**E2E Tests**:

- Test complete user flows
- Run on real/emulator device
- Test critical paths only
- Slower execution acceptable

#### 4.3 Test Organization

```
src/
├── domain/
│   ├── entities/
│   │   ├── Collection.ts
│   │   └── __tests__/
│   │       └── Collection.test.ts
├── application/
│   ├── usecases/
│   │   ├── collections/
│   │   │   ├── CreateCollectionUseCase.ts
│   │   │   └── __tests__/
│   │   │       └── CreateCollectionUseCase.test.ts
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
        ├── login.e2e.ts
        └── collections.e2e.ts
```

#### 4.4 Test Naming Convention

```typescript
// Pattern: should <expected behavior> when <condition>

describe('LoginUseCase', () => {
  describe('execute', () => {
    it('should return success when credentials are valid', () => {
      // ...
    });

    it('should return error when email is invalid', () => {
      // ...
    });

    it('should return error when password is incorrect', () => {
      // ...
    });

    it('should handle network errors gracefully', () => {
      // ...
    });
  });
});
```

### 5. Logging Standards

#### 5.1 Log Levels

| Level | Usage                      | Example                              |
| ----- | -------------------------- | ------------------------------------ |
| ERROR | Errors that need attention | API call failed, unhandled exception |
| WARN  | Potential issues           | Deprecated API used, slow operation  |
| INFO  | Important events           | User logged in, collection created   |
| DEBUG | Detailed information       | Request/response data, state changes |
| TRACE | Very detailed information  | Function entry/exit, variable values |

#### 5.2 Logging Best Practices

**DO**:

- Log all API requests/responses
- Log all errors with stack traces
- Log important state changes
- Log user actions (for analytics)
- Use structured logging (JSON)
- Include context (user ID, session ID)

**DON'T**:

- Log sensitive data (passwords, tokens)
- Log in production (use logger service)
- Log excessively in loops
- Log without context

**Example**:

```typescript
// Good
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
});

// Bad
console.log('User logged in');
```

### 6. Error Handling Standards

#### 6.1 Error Types

Define custom error types:

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(
    message: string,
    public field: string
  ) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

class NetworkError extends AppError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}
```

#### 6.2 Error Handling Pattern

```typescript
// Use Case
async execute(input: Input): Promise<Result<Output, Error>> {
  try {
    // Validate input
    const validatedInput = this.validateInput(input);

    // Execute business logic
    const output = await this.performOperation(validatedInput);

    // Return success
    return Result.success(output);
  } catch (error) {
    // Log error
    logger.error('Operation failed', { error, input });

    // Return failure
    return Result.failure(error);
  }
}

// Presentation
const handleSubmit = async () => {
  try {
    setLoading(true);
    const result = await useCase.execute(input);

    if (result.isSuccess()) {
      // Handle success
      showSuccess('Operation completed');
    } else {
      // Handle failure
      showError(result.error.message);
    }
  } catch (error) {
    // Handle unexpected errors
    logger.error('Unexpected error', { error });
    showError('An unexpected error occurred');
  } finally {
    setLoading(false);
  }
};
```

### 7. Documentation Standards

#### 7.1 Code Documentation

**Functions/Methods**:

````typescript
/**
 * Creates a new collection with the given name.
 *
 * @param name - The name of the collection (3-50 characters)
 * @param userId - The ID of the user creating the collection
 * @returns A Result containing the created Collection or an error
 *
 * @example
 * ```typescript
 * const result = await createCollection('My Collection', 'user123');
 * if (result.isSuccess()) {
 *   console.log(result.value.id);
 * }
 * ```
 */
async createCollection(
  name: string,
  userId: string
): Promise<Result<Collection, Error>> {
  // ...
}
````

**Classes**:

```typescript
/**
 * Manages collection CRUD operations.
 *
 * Responsibilities:
 * - Create new collections
 * - Retrieve collections by ID or user
 * - Update collection metadata
 * - Delete collections
 *
 * Dependencies:
 * - CollectionRepository for data persistence
 * - Logger for operation logging
 */
class CollectionService {
  // ...
}
```

#### 7.2 README Files

Each major module should have a README:

```
src/domain/README.md
src/application/README.md
src/infrastructure/README.md
src/presentation/README.md
```

### 8. Performance Standards

#### 8.1 Performance Metrics

- App launch: < 3 seconds
- Screen transition: < 300ms
- API response handling: < 500ms
- List scrolling: 60 fps
- Image loading: Progressive with placeholders

#### 8.2 Optimization Techniques

- Use FlatList/SectionList for long lists
- Implement virtualization
- Optimize re-renders with React.memo
- Use useCallback and useMemo appropriately
- Lazy load images
- Implement pagination for large datasets
- Debounce user input
- Cache API responses

### 9. Security Standards

#### 9.1 Security Checklist

- [ ] All API calls use HTTPS
- [ ] Credentials stored in secure storage (Keychain)
- [ ] No sensitive data in logs
- [ ] Input validation on all user input
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (proper escaping)
- [ ] Certificate pinning for production
- [ ] No hardcoded secrets
- [ ] Secure random number generation
- [ ] Proper session management

#### 9.2 Data Privacy

- Minimize data collection
- Get user consent for sensors
- Provide opt-out options
- Clear data on logout
- Encrypt sensitive local data

### 10. Continuous Improvement

#### 10.1 Regular Reviews

- Weekly code review sessions
- Monthly architecture reviews
- Quarterly process retrospectives

#### 10.2 Metrics Tracking

- Test coverage trends
- Build time trends
- Code quality metrics
- Performance benchmarks
- User feedback

#### 10.3 Learning

- Document lessons learned
- Share knowledge with team
- Stay updated with React Native best practices
- Contribute to open source

### 11. Definition of Done

A feature is "done" when:

- [ ] Code is written following TDD
- [ ] All tests pass
- [ ] Test coverage meets requirements
- [ ] Code is formatted and linted
- [ ] Code is reviewed
- [ ] Documentation is updated
- [ ] Feature is tested on device/emulator
- [ ] Pre-commit hooks pass
- [ ] Code is committed with descriptive message
- [ ] Code is pushed to remote branch

### 12. Troubleshooting Common Issues

#### 12.1 Build Issues

**Symptom**: Gradle build fails
**Solution**:

- Check Java version (must be 17)
- Clean build: `cd android && ./gradlew clean`
- Invalidate caches in Android Studio

**Symptom**: Metro bundler fails
**Solution**:

- Clear cache: `npm start -- --reset-cache`
- Delete node_modules and reinstall

#### 12.2 Test Issues

**Symptom**: Tests fail on CI but pass locally
**Solution**:

- Check Node version consistency
- Clear Jest cache
- Check for timezone-dependent tests

**Symptom**: E2E tests are flaky
**Solution**:

- Add proper wait conditions
- Increase timeouts
- Check for race conditions

#### 12.3 Pre-Commit Hook Issues

**Symptom**: Pre-commit hook fails
**Solution**:

- Run checks manually to identify issue
- Fix the issue (don't bypass)
- Ensure Husky is properly installed
