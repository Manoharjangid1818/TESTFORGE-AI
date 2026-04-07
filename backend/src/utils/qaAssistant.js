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
}

export default SmartQAAssistant;
