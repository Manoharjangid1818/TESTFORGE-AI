import { v4 as uuidv4 } from 'uuid';

/**
 * Smart QA Assistant Service
 * Helps QA engineers generate test cases, find potential bugs, and suggest tests to run
 */
class SmartQAAssistant {
  /**
   * Generate comprehensive test cases for a given feature/component
   * @param {string} feature - Feature name (e.g., "login", "dashboard", "form")
   * @param {object} options - Additional options (componentType, complexity, etc.)
   * @returns {array} Array of structured test cases
   */
  static generateTestCases(feature, options = {}) {
    const testCases = [];
    const componentType = options.componentType || 'general';
    const complexity = options.complexity || 'medium';

    // Route to specific test case generator based on feature
    switch (feature.toLowerCase()) {
      case 'login':
      case 'authentication':
      case 'auth':
        return this.generateAuthenticationTestCases(complexity);

      case 'form':
      case 'form-submission':
      case 'input-forms':
        return this.generateFormTestCases(options.fields || [], complexity);

      case 'dashboard':
      case 'dashboard-page':
        return this.generateDashboardTestCases(complexity);

      case 'navigation':
      case 'menu':
        return this.generateNavigationTestCases(complexity);

      case 'search':
      case 'filter':
      case 'search-filter':
        return this.generateSearchFilterTestCases(complexity);

      case 'file-upload':
      case 'upload':
        return this.generateFileUploadTestCases(complexity);

      case 'api':
      case 'api-integration':
        return this.generateAPITestCases(options.endpoints || [], complexity);

      case 'responsive':
      case 'responsive-design':
      case 'mobile':
        return this.generateResponsiveTestCases(complexity);

      default:
        return this.generateGeneralTestCases(feature, complexity);
    }
  }

  static generateAuthenticationTestCases(complexity) {
    const baseCases = [
      {
        testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Valid Login with Correct Credentials',
        description: 'Verify user can login with valid credentials',
        category: 'Authentication',
        testType: 'Positive',
        priority: 'Critical',
        preconditions: ['User has valid credentials', 'Login page is accessible'],
        steps: [
          'Navigate to login page',
          'Enter valid username/email in the username field',
          'Enter valid password in the password field',
          'Click the Login button',
          'Wait for page redirect'
        ],
        expectedResult: 'User is successfully logged in and redirected to the dashboard. Session token is created.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          username: 'testuser@example.com',
          password: 'Test@1234'
        },
        tags: ['login', 'authentication', 'smoke-test'],
        severityIfFail: 'Critical'
      },
      {
        testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Login with Invalid Credentials',
        description: 'Verify appropriate error message when login fails',
        category: 'Authentication',
        testType: 'Negative',
        priority: 'High',
        preconditions: ['User is on login page'],
        steps: [
          'Enter invalid username/email',
          'Enter invalid password',
          'Click Login button',
          'Observe error message'
        ],
        expectedResult: 'Error message "Invalid credentials" is displayed. User remains on login page.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          username: 'invalid@example.com',
          password: 'WrongPassword123'
        },
        tags: ['login', 'authentication', 'error-handling'],
        severityIfFail: 'High'
      },
      {
        testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Login with Empty Username',
        description: 'Verify validation when username field is empty',
        category: 'Authentication',
        testType: 'Edge Case',
        priority: 'High',
        preconditions: ['User is on login page'],
        steps: [
          'Leave username field empty',
          'Enter valid password',
          'Click Login button'
        ],
        expectedResult: 'Error message "Username/Email is required" displayed. Form is not submitted.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          username: '',
          password: 'Test@1234'
        },
        tags: ['validation', 'input-validation'],
        severityIfFail: 'Medium'
      },
      {
        testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Login with Empty Password',
        description: 'Verify validation when password field is empty',
        category: 'Authentication',
        testType: 'Edge Case',
        priority: 'High',
        preconditions: ['User is on login page'],
        steps: [
          'Enter valid username/email',
          'Leave password field empty',
          'Click Login button'
        ],
        expectedResult: 'Error message "Password is required" displayed. Form is not submitted.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          username: 'testuser@example.com',
          password: ''
        },
        tags: ['validation', 'input-validation'],
        severityIfFail: 'Medium'
      },
      {
        testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'SQL Injection Attack Prevention',
        description: 'Verify application prevents SQL injection via login form',
        category: 'Authentication',
        testType: 'Security',
        priority: 'Critical',
        preconditions: ['User is on login page'],
        steps: [
          "Enter username: admin' --",
          "Enter password: ' or '1'='1",
          'Click Login button',
          'Check server logs and application behavior'
        ],
        expectedResult: 'Login fails. Malicious query is not executed. No unauthorized access granted.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          username: "admin' --",
          password: "' or '1'='1"
        },
        tags: ['security', 'injection-attack'],
        severityIfFail: 'Critical'
      }
    ];

    // Add additional test cases for higher complexity
    if (complexity === 'high') {
      baseCases.push(
        {
          testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: 'Session Timeout After Inactivity',
          description: 'Verify user session expires after defined timeout period',
          category: 'Authentication',
          testType: 'Performance',
          priority: 'Medium',
          preconditions: ['User is logged in'],
          steps: [
            'User logs in successfully',
            'Wait for session timeout period (e.g., 30 minutes)',
            'Try to access protected resource',
            'Check if user is redirected to login'
          ],
          expectedResult: 'User session expires and user is logged out. Redirect to login page occurs.',
          actualResult: null,
          status: 'Not Executed',
          testData: {
            timeoutMinutes: 30
          },
          tags: ['session-management', 'security'],
          severityIfFail: 'Medium'
        },
        {
          testCaseId: `TF-AUTH-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: 'XSS Prevention in Login Form',
          description: 'Verify application prevents XSS attacks via login fields',
          category: 'Authentication',
          testType: 'Security',
          priority: 'Critical',
          preconditions: ['User is on login page'],
          steps: [
            "Enter username: <script>alert('XSS')</script>",
            'Enter password: testpass',
            'Click Login button',
            'Check if alert dialog appears'
          ],
          expectedResult: 'No alert dialog appears. Script is escaped and not executed.',
          actualResult: null,
          status: 'Not Executed',
          testData: {
            username: "<script>alert('XSS')</script>",
            password: 'testpass'
          },
          tags: ['security', 'xss-prevention'],
          severityIfFail: 'Critical'
        }
      );
    }

    return baseCases;
  }

  static generateFormTestCases(fields, complexity) {
    const testCases = [];

    // Generate test cases for each field
    if (fields.length > 0) {
      fields.forEach(field => {
        testCases.push({
          testCaseId: `TF-FORM-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: `Submit Form with Valid ${field.name || 'Field'} Data`,
          description: `Verify form accepts valid data in ${field.name || 'field'}`,
          category: 'Form Validation',
          testType: 'Positive',
          priority: 'High',
          preconditions: ['Form is displayed'],
          steps: [
            `Enter valid data in ${field.name || 'field'}`,
            'Fill all required fields',
            'Click Submit button'
          ],
          expectedResult: 'Form is submitted successfully. Success message displayed.',
          actualResult: null,
          status: 'Not Executed',
          testData: {
            fieldName: field.name,
            fieldType: field.type,
            placeholderValue: 'Valid data'
          },
          tags: ['form', 'validation'],
          severityIfFail: 'High'
        });

        testCases.push({
          testCaseId: `TF-FORM-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: `Submit Form with Empty ${field.name || 'Field'}`,
          description: `Verify form validation when ${field.name || 'field'} is empty`,
          category: 'Form Validation',
          testType: 'Negative',
          priority: 'High',
          preconditions: ['Form is displayed'],
          steps: [
            `Leave ${field.name || 'field'} empty`,
            'Fill other required fields',
            'Click Submit button'
          ],
          expectedResult: 'Form is not submitted. Error message: "This field is required"',
          actualResult: null,
          status: 'Not Executed',
          testData: {
            fieldName: field.name,
            fieldType: field.type,
            placeholderValue: ''
          },
          tags: ['form', 'validation', 'input-validation'],
          severityIfFail: 'Medium'
        });
      });
    } else {
      // Generic form test cases
      testCases.push({
        testCaseId: `TF-FORM-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Submit Form with Valid Data',
        description: 'Verify form submission with all valid data',
        category: 'Form Validation',
        testType: 'Positive',
        priority: 'High',
        preconditions: ['Form is displayed and accessible'],
        steps: [
          'Fill all required fields with valid data',
          'Verify all fields are filled correctly',
          'Click Submit button',
          'Wait for form processing'
        ],
        expectedResult: 'Form is submitted successfully. Success message is displayed.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['form', 'submission', 'functional'],
        severityIfFail: 'High'
      });

      testCases.push({
        testCaseId: `TF-FORM-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Submit Form with Missing Required Fields',
        description: 'Verify form validation for missing required fields',
        category: 'Form Validation',
        testType: 'Negative',
        priority: 'High',
        preconditions: ['Form is displayed'],
        steps: [
          'Leave one or more required fields empty',
          'Click Submit button',
          'Observe validation errors'
        ],
        expectedResult: 'Form is not submitted. Error messages appear for missing fields.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['form', 'validation', 'error-handling'],
        severityIfFail: 'Medium'
      });
    }

    return testCases;
  }

  static generateDashboardTestCases(complexity) {
    return [
      {
        testCaseId: `TF-DASH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Dashboard Loads Successfully',
        description: 'Verify dashboard page loads without errors',
        category: 'UI/Page Load',
        testType: 'Positive',
        priority: 'Critical',
        preconditions: ['User is logged in'],
        steps: [
          'Navigate to dashboard',
          'Wait for page to fully load',
          'Observe all elements'
        ],
        expectedResult: 'Dashboard loads successfully within 3 seconds. All widgets display correctly.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['dashboard', 'ui', 'smoke-test'],
        severityIfFail: 'Critical'
      },
      {
        testCaseId: `TF-DASH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Dashboard Displays Correct User Information',
        description: 'Verify dashboard shows correct user profile data',
        category: 'Data Display',
        testType: 'Functional',
        priority: 'High',
        preconditions: ['User is logged in'],
        steps: [
          'Navigate to dashboard',
          'Check user information display (name, email, avatar)',
          'Compare with user profile'
        ],
        expectedResult: 'User information is displayed correctly and matches user profile data.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['dashboard', 'data-display'],
        severityIfFail: 'Medium'
      },
      {
        testCaseId: `TF-DASH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Dashboard Widgets are Interactive',
        description: 'Verify all dashboard widgets respond to user interactions',
        category: 'UI/Interactivity',
        testType: 'Functional',
        priority: 'High',
        preconditions: ['User is on dashboard'],
        steps: [
          'Click on each widget',
          'Verify widgets respond to clicks',
          'Test expand/collapse functionality',
          'Verify data loads when interacting'
        ],
        expectedResult: 'All widgets respond correctly to user interactions. Data loads dynamically.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['dashboard', 'interactivity', 'ui'],
        severityIfFail: 'Medium'
      }
    ];
  }

  static generateNavigationTestCases(complexity) {
    return [
      {
        testCaseId: `TF-NAV-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'All Navigation Links Are Accessible',
        description: 'Verify all navigation menu items are clickable and functional',
        category: 'Navigation',
        testType: 'Functional',
        priority: 'High',
        preconditions: ['Application is loaded'],
        steps: [
          'Identify all navigation links in menu',
          'Click each link one by one',
          'Verify correct page/section loads'
        ],
        expectedResult: 'All links navigate to correct pages. No 404 errors or broken links.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['navigation', 'links', 'functional'],
        severityIfFail: 'High'
      },
      {
        testCaseId: `TF-NAV-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Breadcrumb Navigation Works Correctly',
        description: 'Verify breadcrumb navigation allows users to go back',
        category: 'Navigation',
        testType: 'Functional',
        priority: 'Medium',
        preconditions: ['User is on a nested page'],
        steps: [
          'Navigate to nested page',
          'Verify breadcrumb is displayed',
          'Click on parent breadcrumb link',
          'Verify navigation back works'
        ],
        expectedResult: 'Breadcrumb navigation works. User returns to parent page correctly.',
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['navigation', 'breadcrumb'],
        severityIfFail: 'Medium'
      }
    ];
  }

  static generateSearchFilterTestCases(complexity) {
    return [
      {
        testCaseId: `TF-SEARCH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Search Returns Relevant Results',
        description: 'Verify search functionality returns matching results',
        category: 'Search/Filter',
        testType: 'Functional',
        priority: 'High',
        preconditions: ['Search feature is available', 'Data exists in system'],
        steps: [
          'Click on search field',
          'Enter search keyword',
          'Press Enter or click Search button',
          'Observe results'
        ],
        expectedResult: 'Results matching search keyword are displayed within 2 seconds.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          searchKeyword: 'test'
        },
        tags: ['search', 'functionality'],
        severityIfFail: 'High'
      },
      {
        testCaseId: `TF-SEARCH-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Search with Empty Query',
        description: 'Verify behavior when search text is empty',
        category: 'Search/Filter',
        testType: 'Edge Case',
        priority: 'Medium',
        preconditions: ['Search feature is available'],
        steps: [
          'Click on search field',
          'Leave search field empty',
          'Click Search button'
        ],
        expectedResult: 'Either all results are shown or appropriate message "Please enter search term" appears.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          searchKeyword: ''
        },
        tags: ['search', 'validation'],
        severityIfFail: 'Low'
      },
      {
        testCaseId: `TF-FILTER-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Filters Work Correctly',
        description: 'Verify filter functionality filters results accurately',
        category: 'Search/Filter',
        testType: 'Functional',
        priority: 'High',
        preconditions: ['Filter options are available', 'Data exists in system'],
        steps: [
          'Click on filter/dropdown',
          'Select filter criteria',
          'Observe filtered results',
          'Verify results match filter'
        ],
        expectedResult: 'Results are filtered correctly according to selected criteria.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          filterCriteria: 'category'
        },
        tags: ['filter', 'functionality'],
        severityIfFail: 'High'
      }
    ];
  }

  static generateFileUploadTestCases(complexity) {
    return [
      {
        testCaseId: `TF-UPLOAD-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Upload Valid File',
        description: 'Verify file upload functionality with valid file',
        category: 'File Handling',
        testType: 'Positive',
        priority: 'High',
        preconditions: ['Upload feature is available', 'Valid file exists'],
        steps: [
          'Click Upload button',
          'Select valid file (e.g., PDF, CSV)',
          'Click Open',
          'Wait for upload completion'
        ],
        expectedResult: 'File is uploaded successfully. Success message displayed. File appears in list.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          fileSize: '< 10MB',
          fileType: 'PDF, CSV, XLS'
        },
        tags: ['file-upload', 'functionality'],
        severityIfFail: 'High'
      },
      {
        testCaseId: `TF-UPLOAD-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Upload Oversized File',
        description: 'Verify file upload validation for oversized files',
        category: 'File Handling',
        testType: 'Edge Case',
        priority: 'Medium',
        preconditions: ['Upload feature is available'],
        steps: [
          'Click Upload button',
          'Select file larger than size limit',
          'Click Open',
          'Observe error'
        ],
        expectedResult: 'Upload is rejected. Error message: "File size exceeds maximum limit of X MB"',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          fileSize: '> 100MB'
        },
        tags: ['file-upload', 'validation'],
        severityIfFail: 'Medium'
      },
      {
        testCaseId: `TF-UPLOAD-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Upload Invalid File Type',
        description: 'Verify file upload rejects invalid file types',
        category: 'File Handling',
        testType: 'Negative',
        priority: 'High',
        preconditions: ['Upload feature is available'],
        steps: [
          'Click Upload button',
          'Select invalid file type (e.g., .exe, .bat)',
          'Click Open'
        ],
        expectedResult: 'Upload is rejected. Error message: "File type not allowed"',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          fileType: 'executable, script'
        },
        tags: ['file-upload', 'validation', 'security'],
        severityIfFail: 'High'
      }
    ];
  }

  static generateAPITestCases(endpoints, complexity) {
    const baseCases = [];

    if (endpoints.length > 0) {
      endpoints.forEach(endpoint => {
        baseCases.push({
          testCaseId: `TF-API-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: `Test ${endpoint.method} ${endpoint.path} - Success Case`,
          description: `Verify ${endpoint.method} endpoint returns correct response`,
          category: 'API Testing',
          testType: 'Positive',
          priority: 'High',
          preconditions: ['API server is running'],
          steps: [
            `Make ${endpoint.method} request to ${endpoint.path}`,
            'Send valid request payload',
            'Verify response status code',
            'Validate response structure'
          ],
          expectedResult: `Response status is 200. Response body contains expected fields. Data is valid.`,
          actualResult: null,
          status: 'Not Executed',
          testData: {
            endpoint: endpoint.path,
            method: endpoint.method,
            expectedStatus: 200
          },
          tags: ['api', 'integration'],
          severityIfFail: 'High'
        });
      });
    }

    return baseCases;
  }

  static generateResponsiveTestCases(complexity) {
    return [
      {
        testCaseId: `TF-RESPONSIVE-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Desktop View (1920x1080)',
        description: 'Verify application displays correctly on desktop resolution',
        category: 'Responsive Design',
        testType: 'Positive',
        priority: 'High',
        preconditions: ['Application is loaded'],
        steps: [
          'Set browser viewport to 1920x1080',
          'Load application',
          'Verify layout, spacing, and alignment',
          'Check button visibility and alignment'
        ],
        expectedResult: 'All elements display correctly. No horizontal scrolling. Layout is properly aligned.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          resolution: '1920x1080',
          device: 'Desktop'
        },
        tags: ['responsive', 'ui'],
        severityIfFail: 'Medium'
      },
      {
        testCaseId: `TF-RESPONSIVE-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Tablet View (768x1024)',
        description: 'Verify application displays correctly on tablet resolution',
        category: 'Responsive Design',
        testType: 'Positive',
        priority: 'High',
        preconditions: ['Application is loaded'],
        steps: [
          'Set browser viewport to 768x1024',
          'Load application',
          'Verify layout adapts to tablet size',
          'Test touch interactions'
        ],
        expectedResult: 'Application adapts to tablet resolution. All content is accessible. Touch interactions work.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          resolution: '768x1024',
          device: 'Tablet'
        },
        tags: ['responsive', 'tablet'],
        severityIfFail: 'High'
      },
      {
        testCaseId: `TF-RESPONSIVE-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: 'Mobile View (375x667)',
        description: 'Verify application displays correctly on mobile resolution',
        category: 'Responsive Design',
        testType: 'Positive',
        priority: 'High',
        preconditions: ['Application is loaded'],
        steps: [
          'Set browser viewport to 375x667 (iPhone size)',
          'Load application',
          'Verify layout stacks vertically',
          'Test mobile menu functionality'
        ],
        expectedResult: 'Application adapts to mobile resolution. All content accessible without scrolling excessively.',
        actualResult: null,
        status: 'Not Executed',
        testData: {
          resolution: '375x667',
          device: 'Mobile (iPhone)'
        },
        tags: ['responsive', 'mobile'],
        severityIfFail: 'High'
      }
    ];
  }

  static generateGeneralTestCases(feature, complexity) {
    return [
      {
        testCaseId: `TF-GEN-${uuidv4().substring(0, 8).toUpperCase()}`,
        title: `${feature} - Basic Functionality`,
        description: `Verify ${feature} works as expected`,
        category: 'Functional Testing',
        testType: 'Positive',
        priority: 'High',
        preconditions: [`${feature} feature is available`],
        steps: [
          `Access ${feature}`,
          'Perform basic operation',
          'Verify expected behavior',
          'Check for errors'
        ],
        expectedResult: `${feature} operates correctly without errors`,
        actualResult: null,
        status: 'Not Executed',
        testData: {},
        tags: ['functional', feature.toLowerCase()],
        severityIfFail: 'High'
      }
    ];
  }

  /**
   * Identify potential bugs in application
   * @param {string} area - Application area to check (e.g., "login", "dashboard", "forms")
   * @param {array} codeSnippets - Optional code snippets to analyze
   * @returns {array} Array of potential bugs with severity
   */
  static identifyPotentialBugs(area, codeSnippets = []) {
    const bugs = [];

    // Common vulnerability patterns
    const vulnerabilityPatterns = [
      {
        pattern: /innerHTML\s*=/i,
        issue: 'Potential XSS vulnerability',
        severity: 'Critical',
        suggestion: 'Use textContent or DOM manipulation methods instead of innerHTML'
      },
      {
        pattern: /eval\(/i,
        issue: 'Using eval() - security risk',
        severity: 'Critical',
        suggestion: 'Avoid eval(). Use JSON.parse() or Function() constructor carefully'
      },
      {
        pattern: /password|pwd/i,
        issue: 'Password logged or exposed in console',
        severity: 'Critical',
        suggestion: 'Remove sensitive data from logs. Never log passwords or tokens'
      },
      {
        pattern: /\$\{|template|backtick.*\${/i,
        issue: 'SQL Injection risk via template literals',
        severity: 'High',
        suggestion: 'Use parameterized queries or prepared statements'
      },
      {
        pattern: /setTimeout.*0\s*\)|setInterval/i,
        issue: 'Polling or performance issue detected',
        severity: 'Medium',
        suggestion: 'Consider using WebSockets or event listeners instead of polling'
      }
    ];

    // Check code snippets for vulnerabilities
    codeSnippets.forEach(snippet => {
      vulnerabilityPatterns.forEach(vulnPattern => {
        if (vulnPattern.pattern.test(snippet)) {
          bugs.push({
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: vulnPattern.issue,
            issue: vulnPattern.issue,
            area: area,
            severity: vulnPattern.severity,
            type: 'Code Quality',
            description: `Detected potential issue: ${vulnPattern.issue}`,
            suggestion: vulnPattern.suggestion,
            affectedCode: snippet.substring(0, 100),
            status: 'Identified',
            dateFound: new Date().toISOString()
          });
        }
      });
    });

    // Area-specific bugs
    switch (area.toLowerCase()) {
      case 'login':
      case 'authentication':
        bugs.push(
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Missing CSRF Token Validation',
            issue: 'CSRF protection not implemented on login form',
            area: 'Authentication',
            severity: 'High',
            type: 'Security',
            description: 'Login form does not include CSRF token validation, making it vulnerable to cross-site request forgery attacks',
            suggestion: 'Implement CSRF token generation and validation on login form submission',
            status: 'Identified',
            dateFound: new Date().toISOString()
          },
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Password Stored in Plain Text',
            issue: 'Passwords might be stored without hashing',
            area: 'Authentication',
            severity: 'Critical',
            type: 'Security',
            description: 'If passwords are stored in plain text, it violates basic security practices',
            suggestion: 'Use bcrypt, argon2, or scrypt to hash passwords. Never store passwords in plain text',
            status: 'Identified',
            dateFound: new Date().toISOString()
          }
        );
        break;

      case 'dashboard':
        bugs.push(
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Dashboard Widgets Not Responsive',
            issue: 'Dashboard widgets overflow on mobile screens',
            area: 'Dashboard',
            severity: 'Medium',
            type: 'UI/UX',
            description: 'Dashboard widgets are not responsive and may cause horizontal scrolling on mobile devices',
            suggestion: 'Use CSS Grid or Flexbox with media queries to make widgets responsive',
            status: 'Identified',
            dateFound: new Date().toISOString()
          },
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Memory Leak in Widget Updates',
            issue: 'Dashboard widgets accumulate memory over time',
            area: 'Dashboard',
            severity: 'Medium',
            type: 'Performance',
            description: 'If widgets are updated frequently without proper cleanup, memory leaks may occur',
            suggestion: 'Ensure proper cleanup of event listeners and timers. Use React useEffect cleanup functions',
            status: 'Identified',
            dateFound: new Date().toISOString()
          }
        );
        break;

      case 'forms':
      case 'form':
        bugs.push(
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Missing Form Validation',
            issue: 'Form fields are not validated before submission',
            area: 'Forms',
            severity: 'High',
            type: 'Functional',
            description: 'Forms accept invalid data which may cause backend errors or data corruption',
            suggestion: 'Implement client-side validation for email, phone numbers, and required fields',
            status: 'Identified',
            dateFound: new Date().toISOString()
          }
        );
        break;

      case 'api':
        bugs.push(
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'Missing API Rate Limiting',
            issue: 'API endpoints are not rate limited',
            area: 'API',
            severity: 'High',
            type: 'Security/Performance',
            description: 'Without rate limiting, API can be abused for DDoS attacks or resource exhaustion',
            suggestion: 'Implement rate limiting middleware (e.g., express-rate-limit)',
            status: 'Identified',
            dateFound: new Date().toISOString()
          },
          {
            bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
            title: 'API Response Not Paginated',
            issue: 'Large API responses can cause performance issues',
            area: 'API',
            severity: 'Medium',
            type: 'Performance',
            description: 'API endpoints returning large datasets without pagination cause slow response times',
            suggestion: 'Implement offset/limit pagination or cursor-based pagination for large datasets',
            status: 'Identified',
            dateFound: new Date().toISOString()
          }
        );
        break;

      default:
        bugs.push({
          bugId: `BUG-${uuidv4().substring(0, 8).toUpperCase()}`,
          title: 'General Code Quality Issue',
          issue: 'Potential code quality improvement needed',
          area: area,
          severity: 'Low',
          type: 'Code Quality',
          description: 'Review code for common issues',
          suggestion: 'Run linters and perform code review',
          status: 'Identified',
          dateFound: new Date().toISOString()
        });
    }

    return bugs;
  }

  /**
   * Recommend which tests to run based on code changes
   * @param {array} changedFiles - List of changed files
   * @param {array} testCategories - Available test categories
   * @returns {object} Recommended tests and reasoning
   */
  static recommendTestsForChanges(changedFiles, testCategories = []) {
    const recommendations = {
      recommendationId: `REC-${uuidv4().substring(0, 8).toUpperCase()}`,
      analysis: {
        totalChangedFiles: changedFiles.length,
        changesByType: {},
        impactedAreas: [],
        recommendedTests: [],
        priority: 'Medium'
      },
      reasoning: []
    };

    const areaTestMapping = {
      auth: ['Authentication', 'Login', 'Session Management', 'Security'],
      dashboard: ['UI/Page Load', 'Data Display', 'Interactivity', 'Responsive Design'],
      form: ['Form Validation', 'Input Validation', 'Error Handling'],
      api: ['API Testing', 'Integration', 'Response Validation'],
      navigation: ['Navigation', 'Links', 'Breadcrumb'],
      styles: ['UI/UX', 'Responsive Design', 'Cross-browser'],
      security: ['Security', 'XSS Prevention', 'SQL Injection', 'CSRF Protection'],
      performance: ['Performance', 'Load Time', 'Memory Leaks']
    };

    changedFiles.forEach(file => {
      const fileName = file.toLowerCase();
      let detectedAreas = [];

      // Detect impacted areas based on file path
      if (fileName.includes('auth') || fileName.includes('login')) {
        detectedAreas = areaTestMapping.auth;
        recommendations.analysis.priority = 'Critical';
      } else if (fileName.includes('dashboard')) {
        detectedAreas = areaTestMapping.dashboard;
      } else if (fileName.includes('form')) {
        detectedAreas = areaTestMapping.form;
      } else if (fileName.includes('route') || fileName.includes('api')) {
        detectedAreas = areaTestMapping.api;
      } else if (fileName.includes('style') || fileName.includes('css')) {
        detectedAreas = areaTestMapping.styles;
      } else if (fileName.includes('nav')) {
        detectedAreas = areaTestMapping.navigation;
      } else if (fileName.includes('security')) {
        detectedAreas = areaTestMapping.security;
      } else if (fileName.includes('performance') || fileName.includes('service')) {
        detectedAreas = areaTestMapping.performance;
      }

      if (detectedAreas.length > 0) {
        recommendations.analysis.impactedAreas.push(...detectedAreas);
        recommendations.analysis.recommendedTests.push(...detectedAreas);
        recommendations.reasoning.push(
          `Changes in ${file} likely affect: ${detectedAreas.join(', ')}`
        );
      }

      // Count change types
      if (fileName.includes('.js')) {
        recommendations.analysis.changesByType['JavaScript'] = (recommendations.analysis.changesByType['JavaScript'] || 0) + 1;
      } else if (fileName.includes('.css')) {
        recommendations.analysis.changesByType['CSS/Styling'] = (recommendations.analysis.changesByType['CSS/Styling'] || 0) + 1;
      } else if (fileName.includes('.json')) {
        recommendations.analysis.changesByType['Configuration'] = (recommendations.analysis.changesByType['Configuration'] || 0) + 1;
      }
    });

    // Remove duplicates and sort by priority
    recommendations.analysis.recommendedTests = [...new Set(recommendations.analysis.recommendedTests)];
    recommendations.analysis.recommendedTests.sort();

    // Add comprehensive testing recommendation
    if (recommendations.analysis.totalChangedFiles > 5) {
      recommendations.reasoning.push('Large number of changes detected - recommend running full test suite');
      recommendations.analysis.priority = 'Critical';
    }

    // Add specific test recommendations
    recommendations.analysis.recommendedTests = recommendations.analysis.recommendedTests.map(test => ({
      testName: test,
      priority: recommendations.analysis.priority === 'Critical' ? 'High' : 'Medium',
      estimatedDuration: 'Medium',
      reason: `Impacted by changes in: ${recommendations.analysis.impactedAreas.join(', ')}`
    }));

    return recommendations;
  }

  /**
   * Generate test execution plan
   * @param {array} testCases - Test cases to execute
   * @param {object} options - Execution options
   * @returns {object} Test execution plan
   */
  static generateExecutionPlan(testCases, options = {}) {
    const executionOrder = [];
    const plan = {
      planId: `PLAN-${uuidv4().substring(0, 8).toUpperCase()}`,
      totalTests: testCases.length,
      estimatedDuration: 0,
      executionOrder: [],
      smokeTests: [],
      regressionTests: [],
      newFeatureTests: []
    };

    // Categorize and sort tests
    testCases.forEach(test => {
      if (test.priority === 'Critical') {
        plan.smokeTests.push(test);
      } else if (test.testType === 'Positive') {
        plan.regressionTests.push(test);
      } else {
        plan.newFeatureTests.push(test);
      }
    });

    // Execution order: Critical/Smoke -> Regression -> New Features
    plan.executionOrder = [
      ...plan.smokeTests,
      ...plan.regressionTests,
      ...plan.newFeatureTests
    ];

    // Estimate duration (assume 5 minutes per test on average)
    plan.estimatedDuration = `${plan.totalTests * 5} minutes`;

    return plan;
  }

  /**
   * Generate test cases WITH mentoring and educational explanations
   * Perfect for teaching junior QA engineers
   * @param {string} feature - Feature to teach about
   * @param {object} options - Additional options
   * @returns {object} Test cases with learning tips and explanations
   */
  static generateTeachingTestCases(feature, options = {}) {
    const complexity = options.complexity || 'medium';
    const testCases = this.generateTestCases(feature, { ...options, complexity });

    // Generate comprehensive learning content
    const mentorContent = this.generateMentorContent(feature, complexity, testCases);

    return {
      feature,
      complexity,
      totalTestCases: testCases.length,
      testCases,
      learningTips: mentorContent
    };
  }

  /**
   * Generate mentor content explaining test strategy
   * @param {string} feature - Feature being tested
   * @param {string} complexity - Complexity level
   * @param {array} testCases - Generated test cases
   * @returns {object} Comprehensive learning material
   */
  static generateMentorContent(feature, complexity, testCases) {
    const content = {
      overview: this.getFeatureOverview(feature),
      testingStrategy: this.getTestingStrategy(feature),
      eachStepExplanation: this.explainTestSteps(testCases),
      edgeCases: this.suggestEdgeCases(feature),
      negativeCases: this.suggestNegativeCases(feature),
      coverageGaps: this.identifyCoverageGaps(feature, testCases),
      bestPractices: this.getBestPractices(feature),
      commonMistakes: this.getCommonMistakes(feature),
      learningResources: this.getLearningResources(feature)
    };

    return content;
  }

  /**
   * Provide overview of what the feature does and why it matters
   */
  static getFeatureOverview(feature) {
    const overviews = {
      'auth': {
        title: 'Authentication (Login) Testing',
        description: 'Authentication is the process of verifying a user\'s identity. It\'s critical because it controls access to the entire application.',
        importance: 'Critical - Without proper auth testing, unauthorized users could gain access to sensitive data.',
        whyItMatters: 'Every application needs secure login. A broken login can expose user accounts and data.'
      },
      'form': {
        title: 'Form Validation & Submission Testing',
        description: 'Forms are the primary way users interact with applications. Testing ensures data is correctly captured, validated, and processed.',
        importance: 'High - Forms collect user data. Invalid data can cause errors in backend processing.',
        whyItMatters: 'Poor form testing leads to invalid data, user frustration, and potential data corruption.'
      },
      'dashboard': {
        title: 'Dashboard & UI Testing',
        description: 'Dashboards display critical information to users. Testing ensures data is accurate, layouts are responsive, and interactions work.',
        importance: 'High - Users rely on dashboards for key information.',
        whyItMatters: 'A broken dashboard gives users wrong information and provides poor user experience.'
      },
      'navigation': {
        title: 'Navigation & Menu Testing',
        description: 'Navigation is how users move through the application. Testing ensures all links work and users can reach intended destinations.',
        importance: 'High - Broken navigation prevents users from accessing features.',
        whyItMatters: 'If users can\'t navigate, they can\'t use the application effectively.'
      },
      'search': {
        title: 'Search & Filter Functionality Testing',
        description: 'Search helps users find information quickly. Testing ensures results are accurate and filters work as expected.',
        importance: 'Medium-High - Search quality affects user satisfaction.',
        whyItMatters: 'Poor search leads to users not finding data and increased support requests.'
      },
      'upload': {
        title: 'File Upload Testing',
        description: 'File uploads allow users to submit documents, images, etc. Testing ensures files are processed correctly and securely.',
        importance: 'High - Security risk if not tested properly.',
        whyItMatters: 'Unvalidated uploads can lead to security vulnerabilities, virus uploads, or data corruption.'
      },
      'api': {
        title: 'API Integration Testing',
        description: 'APIs are the backbone of modern applications. Testing ensures endpoints return correct data and handle errors properly.',
        importance: 'Critical - All application functionality depends on APIs.',
        whyItMatters: 'Broken APIs break entire features. API testing is essential for application stability.'
      }
    };

    return overviews[feature.toLowerCase()] || {
      title: `${feature} Testing`,
      description: `Testing the ${feature} feature to ensure it works as expected.`,
      importance: 'Medium',
      whyItMatters: `Proper testing of ${feature} ensures users have a good experience.`
    };
  }

  /**
   * Explain the overall testing strategy for a feature
   */
  static getTestingStrategy(feature) {
    const features = feature.toLowerCase();
    
    const strategies = {
      'auth': {
        approach: 'Test authentication in layers: valid login, invalid inputs, security attacks',
        layers: [
          'Layer 1: Happy Path - User can login with valid credentials',
          'Layer 2: Input Validation - System rejects invalid/empty inputs',
          'Layer 3: Security - System prevents SQL injection, XSS, brute force',
          'Layer 4: Account Management - Password reset, 2FA, session management'
        ],
        sequence: 'Always test happy path first, then validation, then security'
      },
      'form': {
        approach: 'Test form in order: submission, validation, error handling, data processing',
        layers: [
          'Layer 1: Basic Submission - Form submits with valid data',
          'Layer 2: Field Validation - Each field validates input correctly',
          'Layer 3: Error Messages - Clear error messages for invalid input',
          'Layer 4: Data Integrity - Submitted data is correct in database'
        ],
        sequence: 'Test each field individually, then combinations, then edge cases'
      },
      'dashboard': {
        approach: 'Test dashboard data accuracy, responsiveness, and interactivity',
        layers: [
          'Layer 1: Page Load - Dashboard loads within acceptable time',
          'Layer 2: Data Display - All data displays correctly and is current',
          'Layer 3: Responsiveness - Layout works on all screen sizes',
          'Layer 4: Interactivity - Charts, filters, and widgets respond to user actions'
        ],
        sequence: 'Test on multiple devices, verify data accuracy, check performance'
      }
    };

    return strategies[features] || {
      approach: `Develop a comprehensive testing strategy for ${feature}`,
      layers: ['Test basic functionality', 'Test edge cases', 'Test error handling'],
      sequence: 'Organize tests from basic to complex'
    };
  }

  /**
   * Explain WHY each test step is necessary
   */
  static explainTestSteps(testCases) {
    const explanations = {};

    testCases.forEach((testCase, idx) => {
      explanations[testCase.testCaseId] = {
        testName: testCase.title,
        stepsWithReasoning: testCase.steps.map((step, stepIdx) => ({
          stepNumber: stepIdx + 1,
          action: step,
          whyWeDoThis: this.explainStep(step, testCase.title),
          whatWeCheckFor: this.getCheckPoint(step, testCase.title)
        })),
        overallReasoning: `Testing "${testCase.title}" ensures that ${this.getTestReasonings(testCase.title)}.`,
        commonFailurePoints: this.getCommonFailures(testCase.title)
      };
    });

    return explanations;
  }

  /**
   * Explain why a specific test step is necessary
   */
  static explainStep(step, testName) {
    const stepLower = step.toLowerCase();

    if (stepLower.includes('navigate')) {
      return 'We must first access the feature being tested. This verifies the page/feature is accessible.';
    }
    if (stepLower.includes('enter') || stepLower.includes('input')) {
      return 'We input test data to simulate how real users interact with the feature.';
    }
    if (stepLower.includes('click') || stepLower.includes('submit')) {
      return 'We trigger the action to execute the feature logic and observe the response.';
    }
    if (stepLower.includes('wait') || stepLower.includes('load')) {
      return 'We allow time for the system to process the request. Some systems need time to fetch data or process requests.';
    }
    if (stepLower.includes('verify') || stepLower.includes('check') || stepLower.includes('observe')) {
      return 'We validate that the system behved as expected. This step confirms the test result.';
    }

    return 'This step is necessary to move the test forward.';
  }

  /**
   * Get what we check for in each step
   */
  static getCheckPoint(step, testName) {
    const stepLower = step.toLowerCase();

    if (stepLower.includes('navigate')) {
      return 'Check: Page loads without errors, all elements are visible';
    }
    if (stepLower.includes('enter') || stepLower.includes('input')) {
      return 'Check: Input field accepts the data, displays it correctly';
    }
    if (stepLower.includes('click') || stepLower.includes('submit')) {
      return 'Check: Button is clickable, action is triggered, page responds';
    }
    if (stepLower.includes('wait') || stepLower.includes('load')) {
      return 'Check: Page loads within acceptable time (usually < 3 seconds)';
    }

    return 'Check: Expected behavior occurs';
  }

  /**
   * Get reasoning for test
   */
  static getTestReasonings(testName) {
    const testLower = testName.toLowerCase();

    if (testLower.includes('valid')) {
      return 'the happy path works - users with correct data can successfully complete the action';
    }
    if (testLower.includes('invalid') || testLower.includes('empty')) {
      return 'the system validates input and prevents invalid data from being processed';
    }
    if (testLower.includes('injection') || testLower.includes('xss') || testLower.includes('security')) {
      return 'the system is protected from malicious attacks and injection attempts';
    }
    if (testLower.includes('responsive')) {
      return 'the application works correctly on all device sizes and screen sizes';
    }

    return 'the feature works correctly';
  }

  /**
   * Get common failure points for a test
   */
  static getCommonFailures(testName) {
    const testLower = testName.toLowerCase();

    if (testLower.includes('login') || testLower.includes('valid')) {
      return [
        'Button doesn\'t respond (JavaScript not loaded)',
        'Error message displays instead of success',
        'User is not actually logged in (token not created)',
        'Page doesn\'t redirect after login'
      ];
    }
    if (testLower.includes('empty') || testLower.includes('validation')) {
      return [
        'Form submits despite empty required field',
        'Error message is unclear or missing',
        'Wrong field is highlighted as the error',
        'Error message disappears before user reads it'
      ];
    }

    return [
      'Feature doesn\'t work as expected',
      'Inconsistent behavior across browsers',
      'Performance is slower than acceptable'
    ];
  }

  /**
   * Suggest edge cases that should be tested
   */
  static suggestEdgeCases(feature) {
    const edgeCases = {
      'auth': [
        'Username with special characters (@ . - _)',
        'Extremely long password (1000+ characters)',
        'Password with all special characters (!@#$%^&*)',
        'Case sensitivity of username (TEST vs test)',
        'Leading/trailing spaces in username or password',
        'Username that is exactly at max length',
        'Multiple login attempts in quick succession (rate limiting)'
      ],
      'form': [
        'Form submitted without touching any field',
        'Form submitted multiple times rapidly (double-click)',
        'Form with all optional fields left empty',
        'Input with maximum allowed characters',
        'Input with unicode characters (emoji, Chinese, etc.)',
        'Form submission while network is slow',
        'Page refresh while form submission is in progress'
      ],
      'dashboard': [
        'Dashboard with zero data to display',
        'Dashboard with extremely large datasets (1M+ records)',
        'Dashboard accessed by user with minimal permissions',
        'Dashboard loading on a very slow network',
        'Dashboard with extreme screen zoom (200%)',
        'Simultaneous updates to dashboard data'
      ],
      'search': [
        'Search with single character',
        'Search with special characters only (!@#$%)',
        'Search that matches nothing in database',
        'Search with wildcard characters',
        'Accented characters (é, ñ, ü)',
        'Search with leading/trailing spaces',
        'Very large search result set (10,000+ items)'
      ],
      'upload': [
        'File with very long filename (255+ characters)',
        'File with no extension',
        'File with double extension (.jpg.exe)',
        'File with special characters in name',
        'Zero-byte file (empty file)',
        'Uploading same file multiple times',
        'Upload interrupted mid-process'
      ]
    };

    return edgeCases[feature.toLowerCase()] || [
      'Empty/zero state',
      'Extreme values (very large, very small)',
      'Special characters',
      'Maximum allowed input',
      'Boundary conditions'
    ];
  }

  /**
   * Suggest negative test cases
   */
  static suggestNegativeCases(feature) {
    const negativeCases = {
      'auth': [
        'Login with non-existent user account',
        'Login with correct username but wrong password (off by 1)',
        'Login with SQL injection payload in password',
        'Login with XSS payload in username',
        'Account lockout after multiple failed attempts',
        'Accessing protected page without logging in',
        'Using expired session token',
        'Logging in from multiple locations simultaneously'
      ],
      'form': [
        'Submit form with negative numbers in age field',
        'Submit form with HTML/script tags in text fields',
        'Submit form with impossibly long email address',
        'Submit past dates in date fields where future is required',
        'Submit duplicate data (duplicate email in registration)',
        'Submit form after navigating away and back',
        'Submit form with fields auto-populated with wrong values'
      ],
      'dashboard': [
        'Access dashboard without proper permissions',
        'Dashboard with missing or corrupted data',
        'Dashboard displaying cached data that is stale',
        'Dashboard failing to load due to API timeout',
        'Dashboard for deleted user account',
        'Concurrent dashboard updates causing conflicts'
      ],
      'search': [
        'Search returns irrelevant results',
        'Search is case-sensitive when it shouldn\'t be',
        'Search doesn\'t support phrase search (quoted strings)',
        'Search filters don\'t work together (AND vs OR logic)',
        'Pagination doesn\'t work correctly with search results',
        'Search timeout on very complex queries'
      ]
    };

    return negativeCases[feature.toLowerCase()] || [
      'Invalid input',
      'Missing required fields',
      'Unauthorized access',
      'System errors and timeouts'
    ];
  }

  /**
   * Identify gaps in test coverage
   */
  static identifyCoverageGaps(feature, testCases) {
    const gaps = {
      'auth': [
        '❌ MISSING: Password reset flow (if applicable)',
        '❌ MISSING: Two-factor authentication (if implemented)',
        '❌ MISSING: Remember me / Keep me logged in functionality',
        '❌ MISSING: Account lockout after failed attempts',
        '❌ MISSING: Session expiration behavior',
        '⚠️  WEAK: API response time testing (how long does login take)',
        '⚠️  WEAK: Concurrent login attempts from different devices'
      ],
      'form': [
        '❌ MISSING: File upload validation (if form includes upload)',
        '❌ MISSING: Progress indication for large form submissions',
        '❌ MISSING: Auto-save functionality (if implemented)',
        '❌ MISSING: Form reset/clear button testing',
        '⚠️  WEAK: Cross-browser form validation differences',
        '⚠️  WEAK: Accessibility testing (keyboard navigation, screen readers)'
      ],
      'dashboard': [
        '❌ MISSING: Real-time data update testing',
        '❌ MISSING: Widget customization (if users can rearrange)',
        '❌ MISSING: Export/Download data functionality',
        '❌ MISSING: Dark mode / Light mode testing',
        '⚠️  WEAK: Performance with large datasets',
        '⚠️  WEAK: Accessibility compliance (WCAG standards)'
      ]
    };

    return gaps[feature.toLowerCase()] || [
      '❌ Edge cases may not be covered',
      '❌ Security scenarios may be incomplete',
      '⚠️  Performance testing may be weak',
      '⚠️  Accessibility testing may be incomplete'
    ];
  }

  /**
   * Provide best practices for testing
   */
  static getBestPractices(feature) {
    return {
      general: [
        '✅ Test one thing at a time - each test should verify one behavior',
        '✅ Use descriptive test names - someone should understand what you\'re testing from the name',
        '✅ Test happy path first, then edge cases, then negative cases',
        '✅ Automate repetitive test cases - manual testing gets boring and error-prone',
        '✅ Test on actual devices/browsers - emulators don\'t catch everything',
        '✅ Test with real data - production data might have special cases'
      ],
      specific: {
        'auth': [
          '🔒 Always test security scenarios - this is a critical feature',
          '🔒 Test password strength validation',
          '🔒 Verify passwords are never logged or displayed in responses',
          '🔒 Test HTTPS/SSL is enforced',
          '🔒 Test rate limiting on failed attempts'
        ],
        'form': [
          '✍️  Test field validation independently first',
          '✍️  Then test validation combinations (e.g., first name + last name)',
          '✍️  Test with minimum, typical, and maximum data lengths',
          '✍️  Verify error messages are helpful and specific',
          '✍️  Test form works after page refresh'
        ],
        'dashboard': [
          '📊 Verify data accuracy - compare with source database',
          '📊 Test with different user permission levels',
          '📊 Test dashboard performance - measure load times',
          '📊 Test responsiveness across all common screen sizes',
          '📊 Verify no sensitive data is exposed'
        ]
      }
    };
  }

  /**
   * Explain common mistakes junior QA engineers make
   */
  static getCommonMistakes(feature) {
    return [
      {
        mistake: '❌ Testing only the happy path',
        explanation: 'Many junior QAs test only when everything goes right. But most bugs occur when things go WRONG.',
        example: 'Only testing login with valid credentials, not testing with invalid passwords or empty fields.',
        solution: '✅ Always test: valid input, invalid input, empty input, and malicious input'
      },
      {
        mistake: '❌ Writing vague test steps',
        explanation: 'Step like "Enter username" doesn\'t specify WHAT username to enter.',
        example: 'Step says "Enter username" but doesn\'t say testuser@example.com',
        solution: '✅ Always be specific: "Enter testuser@example.com in the username field"'
      },
      {
        mistake: '❌ Not understanding the feature before testing',
        explanation: 'You can\'t test what you don\'t understand. Understanding requirements is step 1.',
        example: 'Testing age validation without knowing if system accepts negative numbers',
        solution: '✅ Read requirements, ask questions, understand the feature first'
      },
      {
        mistake: '❌ Assuming functionality works without verification',
        explanation: 'Never assume - always verify. An action might appear to work but have side effects.',
        example: 'Assuming password was changed without checking email confirmation was sent',
        solution: '✅ Always verify all aspects: UI response, database state, emails sent, etc.'
      },
      {
        mistake: '❌ Not testing edge cases',
        explanation: 'Edge cases are where bugs hide. They\'re not obvious but they\'re critical.',
        example: 'Not testing email with 100+ characters, missing the max length bug',
        solution: '✅ Always think about boundaries, special characters, and extreme values'
      },
      {
        mistake: '❌ Forgetting to test on various devices/browsers',
        explanation: 'Features work differently on different browsers and devices.',
        example: 'Tested on Chrome but form doesn\'t work on Firefox',
        solution: '✅ Always test on multiple browsers (Chrome, Firefox, Safari, Edge) and devices'
      }
    ];
  }

  /**
   * Provide learning resources for junior QA
   */
  static getLearningResources(feature) {
    return {
      concepts: [
        '📚 Equivalence Partitioning - Dividing inputs into valid/invalid groups',
        '📚 Boundary Value Analysis - Testing at the extremes of valid ranges',
        '📚 State Transition Testing - Testing different states and transitions',
        '📚 Error Guessing - Using experience to find likely bugs',
        '📚 Cause-Effect Graphing - Understanding relationships between inputs'
      ],
      skills: [
        '🎯 Create clear, reproducible test steps',
        '🎯 Identify and document expected vs actual results',
        '🎯 Write effective bug reports with steps to reproduce',
        '🎯 Understand test types: positive, negative, edge cases',
        '🎯 Design tests for different user roles and permissions'
      ],
      practice: [
        '🏋️ Practice writing test cases for YOUR OWN projects',
        '🏋️ Review test cases written by senior QA engineers',
        '🏋️ Get feedback on your test design',
        '🏋️ Join quality assurance communities and forums',
        '🏋️ Take online courses on test case design'
      ]
    };
  }
}

export default SmartQAAssistant;
