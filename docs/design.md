# Design Documentation

## CrudiMobile UI/UX Design

### 1. Design Principles

#### 1.1 Core Principles

- **Simplicity**: Clean, uncluttered interface focused on core tasks
- **Efficiency**: Minimize steps to accomplish common tasks
- **Clarity**: Clear visual hierarchy and obvious interaction patterns
- **Consistency**: Consistent patterns across all screens
- **Feedback**: Immediate feedback for all user actions
- **Accessibility**: Support for screen readers, font scaling, and high contrast

#### 1.2 Material Design

Following Material Design 3 (Material You) guidelines for Android

### 2. Color Palette

```typescript
const colors = {
  primary: '#1976D2', // Blue
  primaryDark: '#004BA0',
  primaryLight: '#63A4FF',

  secondary: '#FF6F00', // Orange
  secondaryDark: '#C43E00',
  secondaryLight: '#FFA040',

  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',

  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },

  divider: '#BDBDBD',
};
```

### 3. Typography

```typescript
const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  h5: { fontSize: 16, fontWeight: '600', lineHeight: 24 },

  body1: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },

  button: { fontSize: 14, fontWeight: '600', lineHeight: 20, textTransform: 'uppercase' },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  overline: { fontSize: 10, fontWeight: '600', lineHeight: 16, textTransform: 'uppercase' },
};
```

### 4. Spacing System

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### 5. Screen Designs

#### 5.1 Authentication Screen

**Purpose**: User login

**Components**:

- App logo and title
- Email input field
- Password input field
- "Login" button
- "Forgot password?" link
- Loading indicator during authentication

**Layout**:

```
┌─────────────────────────┐
│                         │
│      [App Logo]         │
│                         │
│      CrudiMobile        │
│                         │
│  ┌─────────────────┐   │
│  │ Email           │   │
│  └─────────────────┘   │
│                         │
│  ┌─────────────────┐   │
│  │ Password        │   │
│  └─────────────────┘   │
│                         │
│  ┌─────────────────┐   │
│  │     LOGIN       │   │
│  └─────────────────┘   │
│                         │
│   Forgot password?      │
│                         │
└─────────────────────────┘
```

#### 5.2 Search Screen

**Purpose**: Search wikibase entities

**Components**:

- Search bar with clear button
- Search results list
- Loading skeleton while searching
- Empty state when no results
- Error message for failures
- "Add to collection" button on each result

**Layout**:

```
┌─────────────────────────┐
│ ┌───────────────────┐ × │ ← Search bar
│ │ Search wikibase... │  │
│ └───────────────────┘   │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ Result Item 1       │ │
│ │ Description...      │ │
│ │           [+ Add]   │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Result Item 2       │ │
│ │ Description...      │ │
│ │           [+ Add]   │ │
│ └─────────────────────┘ │
│                         │
│         ...             │
│                         │
└─────────────────────────┘
```

#### 5.3 Collections Screen

**Purpose**: View and manage collections

**Components**:

- "New Collection" floating action button
- Collections list with thumbnails
- Item count badge
- Swipe actions (delete)

**Layout**:

```
┌─────────────────────────┐
│  My Collections         │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ [img] Collection 1  │ │
│ │       12 items      │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ [img] Collection 2  │ │
│ │       5 items       │ │
│ └─────────────────────┘ │
│                         │
│         ...             │
│                    [+]  │ ← FAB
└─────────────────────────┘
```

#### 5.4 Collection Detail Screen

**Purpose**: View items in a collection, add notes and photos

**Components**:

- Collection name (editable)
- Notes section with add button
- Photos section with camera button
- Sensor data section
- Items list
- Options menu (delete collection)

**Layout**:

```
┌─────────────────────────┐
│ ← Collection Name    ⋮  │
├─────────────────────────┤
│ 📝 Notes                │
│ ┌─────────────────────┐ │
│ │ Note 1 text...      │ │
│ │ 2 hours ago         │ │
│ └─────────────────────┘ │
│               [+ Add]   │
├─────────────────────────┤
│ 📷 Photos               │
│ [img] [img] [img] [📷]  │
├─────────────────────────┤
│ 📍 Sensor Data          │
│ Location: 40.7°N, ...   │
│ Temperature: 22°C       │
│ Pressure: 1013 hPa      │
│ WiFi: 3 networks        │
├─────────────────────────┤
│ 📚 Items                │
│ ┌─────────────────────┐ │
│ │ Item 1              │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Item 2              │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

#### 5.5 Settings Screen

**Purpose**: App configuration

**Components**:

- Account information
- Sensor settings (enable/disable each sensor)
- Cache settings
- About section
- Logout button

**Layout**:

```
┌─────────────────────────┐
│  Settings               │
├─────────────────────────┤
│ Account                 │
│  user@example.com       │
│                         │
│ Sensors                 │
│  GPS Location      [✓]  │
│  Temperature       [✓]  │
│  Pressure          [✓]  │
│  WiFi Scanning     [✓]  │
│                         │
│ Storage                 │
│  Clear Cache            │
│                         │
│ About                   │
│  Version 1.0.0          │
│  API: Connected         │
│                         │
│ [     Logout     ]      │
└─────────────────────────┘
```

### 6. Navigation Structure

```
Bottom Tab Navigation:
┌─────────────────────────────────┐
│                                 │
│         Screen Content          │
│                                 │
├─────────────────────────────────┤
│  🔍      📚      ⚙️              │
│ Search  Collections  Settings  │
└─────────────────────────────────┘

Stack Navigation:
- Auth Stack
  └─ Login Screen

- Main Stack
  ├─ Search Screen
  ├─ Collections Screen
  │  └─ Collection Detail Screen
  │     ├─ Add Note Modal
  │     ├─ Camera Screen
  │     └─ Photo Viewer Screen
  └─ Settings Screen
```

### 7. Component Library

#### 7.1 Common Components

**Button**

- Primary button (filled)
- Secondary button (outlined)
- Text button
- Icon button
- Floating action button (FAB)

**Input**

- Text input
- Search input
- Text area
- Dropdown/Select

**Card**

- Standard card
- Outlined card
- Elevated card

**List**

- Simple list item
- Two-line list item
- Three-line list item
- List item with avatar
- List item with icon
- Swipeable list item

**Feedback**

- Loading spinner
- Loading skeleton
- Toast/Snackbar
- Alert dialog
- Error message
- Empty state

**Media**

- Image with loading state
- Image gallery
- Avatar
- Thumbnail

#### 7.2 Feature Components

**SearchBar**

- Input field with search icon
- Clear button
- Loading indicator
- Recent searches (optional)

**CollectionCard**

- Thumbnail image
- Collection name
- Item count
- Last updated timestamp
- Quick actions menu

**NoteCard**

- Note text
- Timestamp
- Edit/delete buttons
- Author info (optional)

**SensorDataDisplay**

- Icon for each sensor type
- Formatted value with unit
- Timestamp
- Status indicator (available/unavailable)

**PhotoGallery**

- Grid layout
- Lazy loading
- Zoom capability
- Delete action

### 8. Interaction Patterns

#### 8.1 Gestures

- **Tap**: Primary action
- **Long press**: Show context menu
- **Swipe left**: Delete action
- **Swipe right**: Edit/favorite action
- **Pull to refresh**: Reload data
- **Pinch to zoom**: Photo viewing

#### 8.2 Animations

- **Screen transitions**: Slide animation (300ms)
- **List items**: Fade in (200ms)
- **Button press**: Scale down (100ms)
- **Loading**: Pulse animation
- **Success**: Check mark animation
- **Error**: Shake animation

#### 8.3 Feedback

- **Button press**: Visual highlight + haptic feedback
- **Success action**: Green toast + haptic
- **Error**: Red toast + error haptic
- **Loading**: Progress indicator
- **Pull to refresh**: Animated spinner

### 9. Responsive Design

#### 9.1 Screen Sizes

- Small phones: 320dp width
- Medium phones: 360dp width
- Large phones: 414dp width
- Tablets: 600dp+ width

#### 9.2 Breakpoints

```typescript
const breakpoints = {
  small: 360,
  medium: 414,
  large: 600,
  xlarge: 960,
};
```

#### 9.3 Adaptive Layouts

- Single column on phones
- Two columns on tablets (collections, items)
- Larger touch targets on phones
- More content density on tablets

### 10. Accessibility

#### 10.1 Requirements

- All interactive elements have minimum 48dp touch target
- Sufficient color contrast (WCAG AA)
- Screen reader support for all content
- Keyboard navigation (external keyboard)
- Dynamic type support (font scaling)
- Reduced motion option

#### 10.2 Implementation

- Use semantic HTML/native components
- Provide text alternatives for images
- Label all form inputs
- Use ARIA labels where needed
- Test with TalkBack screen reader

### 11. Error States

#### 11.1 Network Errors

- Offline mode indicator
- Retry button
- Cached data display
- Clear error message

#### 11.2 Validation Errors

- Inline error messages
- Red border on invalid fields
- Clear error text
- Disable submit until valid

#### 11.3 App Errors

- Error boundary screen
- Error details (dev mode)
- Reload button
- Contact support option

### 12. Loading States

#### 12.1 Patterns

- **Initial load**: Full screen spinner
- **Content load**: Skeleton screens
- **Action load**: Button spinner
- **Pull refresh**: Header spinner
- **Infinite scroll**: Footer spinner

#### 12.2 Skeleton Screens

Use for:

- Search results
- Collections list
- Collection details
- Notes list

### 13. Design Tokens

```typescript
export const designTokens = {
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: 9999,
  },

  elevation: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
    xlarge: 16,
  },

  opacity: {
    disabled: 0.38,
    hint: 0.6,
    divider: 0.12,
  },

  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
  },
};
```
