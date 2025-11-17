# Contributing to True Valence Mapper

Thank you for your interest in contributing to True Valence Mapper! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Security Guidelines](#security-guidelines)
- [Submitting Changes](#submitting-changes)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Be respectful, constructive, and professional in all interactions. We're building a tool to help people understand and improve relationships - let's model good collaboration ourselves.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control
- GitHub account
- Basic knowledge of HTML, JavaScript, CSS, and SVG

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/true-valence-mapper.git
   cd true-valence-mapper
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/rhart696/true-valence-mapper.git
   ```
4. **Open in browser**: Simply open `index.html` in your browser (no build step required)

### Project Structure

```
true-valence-mapper/
├── index.html              # Main application
├── styles.css              # Core styles
├── cloud-storage.js        # Supabase integration
├── input-validation.js     # Security validation
├── toast-notifications.js  # User notifications
├── version-history.js      # Version control system
├── accessibility-improvements.js # A11y features
├── .github/               # GitHub templates and workflows
├── docs/                  # Documentation
│   ├── security/         # Security docs
│   ├── implementation/   # Feature implementation guides
│   ├── planning/         # Planning and architecture
│   └── reports/          # Status reports
├── LICENSE               # MIT license
└── README.md            # Project overview
```

## Development Workflow

We follow **GitHub Flow**, a lightweight, branch-based workflow:

### 1. Create a Feature Branch

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `security/` - Security improvements

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Test your changes thoroughly

### 3. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add feature: Brief description

Detailed explanation of what changed and why.

Fixes #issue-number"
```

Commit message format:
- First line: Brief summary (50 chars or less)
- Blank line
- Detailed description (wrap at 72 chars)
- Reference relevant issues

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub using the PR template.

## Coding Standards

### JavaScript

- Use ES6+ features (const/let, arrow functions, template literals)
- Avoid `var` declarations
- Use meaningful variable names
- Keep functions small and focused
- Add JSDoc comments for complex functions

### HTML

- Use semantic HTML5 elements
- Include ARIA attributes for accessibility
- Keep markup clean and properly indented
- Validate with W3C validator

### CSS

- Use CSS variables for theming
- Keep specificity low
- Group related styles together
- Use mobile-first responsive design

### File Size

- Keep JavaScript files under 500 lines
- Extract reusable functions to modules
- Minimize external dependencies

## Security Guidelines

Security is critical for this application. **All contributions must follow these guidelines:**

### Input Validation

- **Always use `InputValidator`** for any user input
- Sanitize before storage, validate on load
- Never trust user data

Example:
```javascript
const validation = InputValidator.validatePersonName(rawInput);
if (!validation.isValid) {
    alert(validation.error);
    return;
}
const safeName = validation.sanitized;
```

### Output Encoding

- Use `textContent` instead of `innerHTML` for user data
- HTML-encode data before insertion: `InputValidator.htmlEncode(data)`
- Context-specific encoding (HTML vs SVG vs URL)

### Database Security

- All Supabase queries rely on Row Level Security (RLS)
- Never disable RLS policies
- Test data isolation thoroughly

### Dangerous Patterns to Avoid

❌ **Never do this:**
```javascript
element.innerHTML = userInput;  // XSS vulnerability
eval(userCode);                // Code injection
new Function(userCode)();      // Code injection
element.setAttribute('onclick', userCode);  // Event handler injection
```

✅ **Do this instead:**
```javascript
element.textContent = InputValidator.htmlEncode(userInput);
// Use predefined functions, not user code
```

### Security Checklist for PRs

- [ ] All user input validated with `InputValidator`
- [ ] No use of `innerHTML` with user data
- [ ] No `eval()` or `new Function()` with user data
- [ ] SQL queries parameterized (if backend changes)
- [ ] Tested with malicious inputs (XSS, injection attempts)
- [ ] No hardcoded secrets or credentials

See [.github/SECURITY.md](.github/SECURITY.md) for detailed security documentation.

## Submitting Changes

### Pull Request Process

1. **Fill out the PR template** completely
2. **Link related issues** (e.g., "Closes #123")
3. **Describe your changes** clearly
4. **Include test results** (screenshots, browser tested, etc.)
5. **Check security implications**
6. **Wait for review** - the maintainer will review your PR

### Review Process

- PRs require at least one approval
- Address review feedback promptly
- Keep PR scope focused (one feature/fix per PR)
- Be responsive to questions

### After Merge

- Delete your feature branch
- Pull latest main: `git pull upstream main`
- Your contribution will deploy automatically via GitHub Actions

## Testing

### Manual Testing Checklist

Before submitting your PR, test:

- [ ] **Functionality**: Does the feature work as intended?
- [ ] **Browser compatibility**: Test in Chrome, Firefox, Safari
- [ ] **Mobile responsiveness**: Test on small screens
- [ ] **Edge cases**: Empty inputs, special characters, very long names
- [ ] **Performance**: No significant slowdowns with large maps
- [ ] **Accessibility**: Keyboard navigation, screen reader compatibility
- [ ] **Console errors**: Check browser console for errors/warnings

### Security Testing

Test your changes with malicious inputs:

```javascript
// Try these in name fields:
"<script>alert('XSS')</script>"
"<img src=x onerror='alert(1)'>"
"'; DROP TABLE users; --"
"../../../../etc/passwd"
```

All should be safely sanitized.

### Testing Tools

- **Browser DevTools**: Inspect, debug, check console
- **Lighthouse**: Test performance and accessibility
- **WAVE**: Web accessibility evaluation

## Documentation

### When to Update Documentation

Update documentation when you:

- Add a new feature
- Change existing behavior
- Fix a security issue
- Modify APIs or data structures
- Add configuration options

### Documentation Locations

- **README.md**: High-level overview, quick start
- **docs/implementation/**: Feature implementation guides
- **docs/security/**: Security documentation
- **Code comments**: Complex logic explanations
- **PR description**: Change rationale

### Writing Good Documentation

- Be clear and concise
- Include code examples
- Add screenshots for UI changes
- Explain the "why", not just the "what"
- Keep it up-to-date

## Project Philosophy: "Ship, Don't Infrastructure"

When contributing, keep in mind our core principle:

✅ **Do:**
- Add user value quickly
- Keep it simple
- Use existing tools (Supabase, GitHub Pages)
- Incremental improvements

❌ **Don't:**
- Add unnecessary complexity
- Introduce heavy frameworks
- Create elaborate build systems
- Over-engineer solutions

## Questions or Problems?

- **Bug**: [Open a bug report](https://github.com/rhart696/true-valence-mapper/issues/new?template=bug_report.md)
- **Feature idea**: [Open a feature request](https://github.com/rhart696/true-valence-mapper/issues/new?template=feature_request.md)
- **Security issue**: See [.github/SECURITY.md](.github/SECURITY.md) - **do not** open a public issue
- **General question**: Open a discussion or issue

## Recognition

Contributors will be acknowledged in release notes and project documentation. Thank you for helping make True Valence Mapper better!

---

**By contributing, you agree that your contributions will be licensed under the MIT License.**
