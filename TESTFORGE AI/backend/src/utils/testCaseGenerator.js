import { v4 as uuidv4 } from 'uuid';

/**
 * TestForge Test Case Generator
 * Generates comprehensive test cases based on website analysis
 */
class TestForgeTestCaseGenerator {
  static generateFromElements(elements) {
    const testCases = [];

    // Generate login form test cases
    const loginForm = elements.find(el => el.type === 'login_form');
    if (loginForm) {
      testCases.push(...this.generateLoginTestCases());
    }

    // Generate form field test cases
    const formFields = elements.filter(el => el.type === 'form_field');
    formFields.forEach(field => {
      testCases.push(...this.generateFormFieldTestCases(field));
    });

    // Generate navigation test cases
    const links = elements.filter(el => el.type === 'link');
    if (links.length > 0) {
      testCases.push(...this.generateNavigationTestCases(links));
    }

    // Generate search/filter test cases
    const searchElements = elements.filter(el => el.type === 'search');
    if (searchElements.length > 0) {
      testCases.push(...this.generateSearchTestCases());
    }

    return testCases;
  }

  static generateLoginTestCases() {
    return [
      {
        id: uuidv4(),
        title: 'TF-AUTH-001',
        description: 'Valid Login with Correct Credentials',
        module: 'Authentication',
        testType: 'Positive',
        preconditions: 'User has valid credentials',
        steps: [
          '1. Navigate to login page',
          '2. Enter valid username/email',
          '3. Enter valid password',
          '4. Click login button'
        ],
        expectedResult: 'User is logged in successfully and redirected to dashboard',
        priority: 'Critical',
        severity: 'critical'
      },
      {
        id: uuidv4(),
        title: 'TF-AUTH-002',
        description: 'Login with Empty Username',
        module: 'Authentication',
        testType: 'Negative',
        preconditions: 'User is on login page',
        steps: [
          '1. Leave username/email field empty',
          '2. Enter valid password',
          '3. Click login button'
        ],
        expectedResult: 'Error message displayed: "Username is required"',
        priority: 'High',
        severity: 'high'
      },
      {
        id: uuidv4(),
        title: 'TF-AUTH-003',
        description: 'Login with Empty Password',
        module: 'Authentication',
        testType: 'Negative',
        preconditions: 'User is on login page',
        steps: [
          '1. Enter valid username/email',
          '2. Leave password field empty',
          '3. Click login button'
        ],
        expectedResult: 'Error message displayed: "Password is required"',
        priority: 'High',
        severity: 'high'
      },
      {
        id: uuidv4(),
        title: 'TF-AUTH-004',
        description: 'Login with Invalid Credentials',
        module: 'Authentication',
        testType: 'Negative',
        preconditions: 'User has invalid credentials',
        steps: [
          '1. Enter invalid username/email',
          '2. Enter invalid password',
          '3. Click login button'
        ],
        expectedResult: 'Error message displayed: "Invalid credentials"',
        priority: 'High',
        severity: 'high'
      },
      {
        id: uuidv4(),
        title: 'TF-AUTH-005',
        description: 'Login Security - SQL Injection Test',
        module: 'Authentication',
        testType: 'Edge Case',
        preconditions: 'User is on login page',
        steps: [
          "1. Enter username: admin' --",
          "2. Enter password: ' or '1'='1",
          '3. Click login button'
        ],
        expectedResult: 'Login fails with error message. No unauthorized access granted.',
        priority: 'Critical',
        severity: 'critical'
      }
    ];
  }

  static generateFormFieldTestCases(field) {
    const testCases = [];
    const fieldName = field.name || field.label || 'Field';

    testCases.push({
      id: uuidv4(),
      title: `TF-FORM-${fieldName}-001`,
      description: `Valid Input for ${fieldName}`,
      module: 'Form Validation',
      testType: 'Positive',
      steps: [
        `1. Enter valid value in ${fieldName} field`,
        '2. Tab or click outside the field',
        '3. Verify field accepts input'
      ],
      expectedResult: `${fieldName} field accepts the input without errors`,
      priority: 'High',
      severity: 'high'
    });

    testCases.push({
      id: uuidv4(),
      title: `TF-FORM-${fieldName}-002`,
      description: `Empty ${fieldName} Field`,
      module: 'Form Validation',
      testType: 'Negative',
      steps: [
        `1. Leave ${fieldName} field empty`,
        '2. Try to submit form'
      ],
      expectedResult: 'Error message: "This field is required"',
      priority: 'High',
      severity: 'high'
    });

    if (field.type === 'text') {
      testCases.push({
        id: uuidv4(),
        title: `TF-FORM-${fieldName}-003`,
        description: `Special Characters in ${fieldName}`,
        module: 'Form Validation',
        testType: 'Edge Case',
        steps: [
          `1. Enter special characters (<, >, &, ") in ${fieldName}`,
          '2. Submit form'
        ],
        expectedResult: 'Special characters are properly escaped or rejected',
        priority: 'Medium',
        severity: 'medium'
      });
    }

    return testCases;
  }

  static generateNavigationTestCases(links) {
    return [
      {
        id: uuidv4(),
        title: 'TF-NAV-001',
        description: 'Navigate Through Valid Links',
        module: 'Navigation',
        testType: 'Positive',
        steps: [
          '1. Identify all navigation links',
          '2. Click each link',
          '3. Verify correct page loads'
        ],
        expectedResult: 'All links navigate to correct pages with proper status codes',
        priority: 'High',
        severity: 'high'
      },
      {
        id: uuidv4(),
        title: 'TF-NAV-002',
        description: 'Check for Broken Links',
        module: 'Navigation',
        testType: 'Negative',
        steps: [
          '1. Inspect all href attributes',
          '2. Verify all links are valid'
        ],
        expectedResult: 'No broken links (404, 500 errors)',
        priority: 'High',
        severity: 'high'
      }
    ];
  }

  static generateSearchTestCases() {
    return [
      {
        id: uuidv4(),
        title: 'TF-SEARCH-001',
        description: 'Search with Valid Keyword',
        module: 'Search',
        testType: 'Positive',
        steps: [
          '1. Enter valid search keyword',
          '2. Press Enter or click search button',
          '3. Verify results are displayed'
        ],
        expectedResult: 'Relevant search results are displayed',
        priority: 'High',
        severity: 'high'
      },
      {
        id: uuidv4(),
        title: 'TF-SEARCH-002',
        description: 'Search with Empty Query',
        module: 'Search',
        testType: 'Negative',
        steps: [
          '1. Leave search box empty',
          '2. Click search button'
        ],
        expectedResult: 'Error message: "Please enter search term" or no results shown',
        priority: 'Medium',
        severity: 'medium'
      }
    ];
  }
}

export default TestForgeTestCaseGenerator;
