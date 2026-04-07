# Smart QA Assistant - Quick Start Guide

## 🚀 Getting Started

### Installation

The Smart QA Assistant is already integrated into TestForge AI v2.0.0. No additional installation needed!

### Start Using

1. **Start Backend Server**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend runs on: `http://localhost:5000`

2. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on: `http://localhost:3000`

3. **Open QA Assistant**
   - Navigate to the application
   - Click "🧪 QA Assistant" in the sidebar
   - Select the tab you want to use

---

## 📋 Quick Examples

### Generate Test Cases in 3 Steps

1. Click "Generate Test Cases" tab
2. Select "Authentication/Login" from feature dropdown
3. Click "Generate Test Cases"

✅ You now have 15+ test cases ready to use!

### Find Bugs in 3 Steps

1. Click "Find Bugs" tab
2. Select "Login" as area to analyze
3. Click "Analyze for Bugs"

✅ Get instant bug report with severity levels and fixes!

### Get Test Recommendations in 3 Steps

1. Click "Recommend Tests" tab
2. Paste your changed file paths
3. Click "Recommend Tests"

✅ Get prioritized list of tests to run!

### Ask a Question in 3 Steps

1. Click "Ask Assistant" tab
2. Type: "Generate test cases for login"
3. Click "Ask Assistant" or press Enter

✅ Get instant response with specific recommendations!

---

## 🎯 Use Cases

### Use Case 1: Sprint Planning
**Scenario**: Start of sprint, need test cases for all features

**Steps**:
1. Go to Generate Test Cases
2. For each feature (auth, forms, dashboard), generate high-complexity tests
3. Export all as CSV
4. Share with team

**Result**: Comprehensive test plan ready for sprint

### Use Case 2: Code Review
**Scenario**: Developer submitted PR with changes

**Steps**:
1. Go to Recommend Tests
2. Enter changed file paths from PR
3. Run recommended tests
4. Review coverage

**Result**: Ensure adequate testing before merge

### Use Case 3: Security Audit
**Scenario**: Periodic security testing needed

**Steps**:
1. Go to Find Bugs
2. Check: Login, API, Forms
3. Review critical/high severity issues
4. Fix identified vulnerabilities

**Result**: Improved security posture

### Use Case 4: New QA Engineer Onboarding
**Scenario**: New team member needs to understand testing

**Steps**:
1. Generate test cases for different features
2. Review test structure and naming
3. Export and study test scenarios
4. Understand testing patterns

**Result**: Faster onboarding with better knowledge

---

## 📊 Sample Test Case Structure

```
Test Case ID: TF-AUTH-001
Title: Valid Login with Correct Credentials
Description: Verify user can login with valid credentials
Category: Authentication
Test Type: Positive
Priority: Critical

Preconditions:
- User has valid credentials
- Login page is accessible

Steps:
1. Navigate to login page
2. Enter valid username/email
3. Enter valid password
4. Click Login button
5. Wait for page redirect

Expected Result:
- User is logged in successfully
- User is redirected to dashboard
- Session token is created
- Welcome message appears

Test Data:
- Username: testuser@example.com
- Password: Test@1234
```

---

## 🐛 Sample Bug Report Format

```
Bug ID: BUG-AUTH-001
Title: Missing CSRF Token Validation
Severity: High
Type: Security
Area: Authentication

Description:
Login form does not include CSRF token validation, making it 
vulnerable to cross-site request forgery attacks.

Suggestion:
Implement CSRF token generation and validation on login form 
submission. Store token in session and verify on server-side.

Impact: High - Potential account takeover
```

---

## 📈 Test Recommendation Format

```
Recommendation ID: REC-123ABC

Analysis:
- Total Changed Files: 3
- Impacted Areas: Authentication, UI/UX
- Priority Level: High

Changed Files:
- src/components/LoginForm.js (JavaScript)
- src/utils/auth.js (JavaScript)
- src/styles/login.css (CSS/Styling)

Recommended Tests:
1. Authentication (High Priority)
   - Reason: Impacted by changes in auth.js
   - Duration: Medium
   
2. UI/Responsive Tests (Medium Priority)
   - Reason: CSS changes in login.css
   - Duration: Small

Reasoning:
- Changes in auth.js affect login logic - run auth tests
- CSS changes affect responsive design - run UI tests
- Multiple critical files changed - recommend smoke tests

Execute Tests In Order:
1. Authentication tests (most critical)
2. UI/Responsive tests
3. E2E login flow tests
```

---

## 🔧 API Testing Guide

### Test Generate Test Cases Endpoint

```bash
curl -X POST http://localhost:5000/api/qa/generate-test-cases \
  -H "Content-Type: application/json" \
  -d '{
    "feature": "auth",
    "options": {
      "complexity": "high"
    }
  }'
```

**Expected Response**: 200 OK with test cases array

### Test Find Bugs Endpoint

```bash
curl -X POST http://localhost:5000/api/qa/identify-bugs \
  -H "Content-Type: application/json" \
  -d '{
    "area": "login",
    "codeSnippets": []
  }'
```

**Expected Response**: 200 OK with bugs array

### Test Recommendations Endpoint

```bash
curl -X POST http://localhost:5000/api/qa/recommend-tests \
  -H "Content-Type: application/json" \
  -d '{
    "changedFiles": [
      "src/components/LoginForm.js",
      "src/utils/auth.js"
    ]
  }'
```

**Expected Response**: 200 OK with recommendations

### Get Supported Features

```bash
curl -X GET http://localhost:5000/api/qa/supported-features
```

**Expected Response**: 200 OK with features list

---

## 📱 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Tab 1-4 | Switch between tabs |
| Enter | Submit query/form |
| Cmd+C | Copy selected text |
| Ctrl+E | Export as JSON |

---

## 🎨 Features Checklist

- [x] Generate test cases for 8+ features
- [x] Identify bugs by area
- [x] Recommend tests by changed files
- [x] Natural language query support
- [x] Export to JSON
- [x] Export to CSV
- [x] Export to HTML
- [x] Responsive design
- [x] Severity-based filtering
- [x] Test execution planning

---

## ⚡ Performance Tips

1. **Limit Test Generation**: Medium complexity for general use, High for critical features
2. **Batch Operations**: Generate tests for multiple features at once
3. **Filter Results**: Focus on Critical/High severity bugs first
4. **Cache Results**: Export and reuse test cases where possible

---

## 🆘 Troubleshooting

### Problem: "Generate Test Cases" button doesn't work
**Solution**: 
- Verify backend is running on port 5000
- Check browser console for errors
- Try refreshing the page

### Problem: No results returned
**Solution**:
- Ensure you've entered required fields
- Check API response in browser DevTools
- Verify feature name is correct

### Problem: Export button not working
**Solution**:
- Check browser popup blockers
- Try different export format
- Check available disk space

### Problem: Slow performance
**Solution**:
- Close other tabs
- Reduce complexity level
- Clear browser cache
- Restart browser

---

## 📚 Learn More

- [Full QA Assistant Documentation](./QA-ASSISTANT.md)
- [API Documentation](./API.md)
- [Architecture Guide](./ARCHITECTURE.md)

---

## 🎓 Training Resources

### Beginner
1. Start with "Generate Test Cases" for authentication
2. Review the generated test structure
3. Understand test types (Positive, Negative, Edge Case)

### Intermediate
1. Explore "Find Bugs" for different areas
2. Understand severity levels
3. Learn to interpret recommendations

### Advanced
1. Use natural language queries creatively
2. Implement recommendations in automation
3. Integrate with CI/CD pipelines

---

## 💡 Tips & Tricks

**Tip 1**: Generate high-complexity tests for critical features (auth, payments)

**Tip 2**: Use "Find Bugs" after each major release to catch regression issues

**Tip 3**: Share exported test cases with team for code review

**Tip 4**: Run recommended tests before each PR merge

**Tip 5**: Export JSON format for programmatic processing

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend server running on port 5000
- [ ] Frontend accessible at localhost:3000
- [ ] QA Assistant tab visible in sidebar
- [ ] All 4 tabs load without errors
- [ ] Generate test cases works
- [ ] Find bugs works
- [ ] Recommendations work
- [ ] Export buttons work
- [ ] Natural language queries work
- [ ] No console errors

---

**Version**: 2.0.0  
**Last Updated**: April 2026  
**Status**: ✅ Ready for Production
