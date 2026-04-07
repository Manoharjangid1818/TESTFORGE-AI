import { chromium } from 'playwright';
import { v4 as uuidv4 } from 'uuid';

/**
 * TestForge QA Scanner - Automated QA Testing Engine
 * Performs comprehensive QA checks on websites using Playwright
 */
class TestForgeQAScanner {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.bugs = [];
    this.consoleLogs = [];
    this.networkIssues = [];
  }

  async initialize() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
  }

  async scanURL(url) {
    try {
      this.page = await this.context.newPage();
      
      // Capture console messages
      this.page.on('console', msg => {
        this.consoleLogs.push({
          type: msg.type(),
          text: msg.text()
        });
      });

      // Capture network failures
      this.page.on('requestfailed', request => {
        this.networkIssues.push({
          url: request.url(),
          reason: request.failure().errorText
        });
      });

      // Navigate to URL
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Run various checks
      await Promise.all([
        this.checkPageLoad(),
        this.checkBrokenLinks(),
        this.checkForms(),
        this.checkConsoleErrors(),
        this.checkAccessibility()
      ]);

      return {
        success: true,
        bugs: this.bugs,
        consoleLogs: this.consoleLogs.filter(log => log.type === 'error'),
        networkIssues: this.networkIssues
      };
    } catch (error) {
      this.bugs.push({
        id: uuidv4(),
        title: 'Page Load Error',
        module: 'Page Navigation',
        stepsToReproduce: `Navigate to ${url}`,
        expectedResult: 'Page should load successfully',
        actualResult: error.message,
        priority: 'Critical',
        severity: 'critical',
        timestamp: new Date()
      });

      return {
        success: false,
        error: error.message,
        bugs: this.bugs
      };
    }
  }

  async checkPageLoad() {
    try {
      const pageTitle = await this.page.title();
      const pageContent = await this.page.content();
      
      if (!pageTitle || pageContent.length < 100) {
        this.bugs.push({
          id: uuidv4(),
          title: 'Page Title Missing or Empty Content',
          module: 'Page Metadata',
          stepsToReproduce: 'Load the website',
          expectedResult: 'Page should have a meaningful title and content',
          actualResult: `Title: "${pageTitle}" | Content length: ${pageContent.length}`,
          priority: 'Medium',
          severity: 'medium',
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('TestForge: Error checking page load:', error);
    }
  }

  async checkBrokenLinks() {
    try {
      const links = await this.page.$$eval('a', elements => 
        elements.slice(0, 20).map(el => ({
          text: el.textContent,
          href: el.href
        }))
      );

      for (const link of links) {
        if (!link.href || link.href === 'javascript:void(0)' || link.href.startsWith('#')) {
          continue;
        }

        try {
          const response = await this.page.goto(link.href, { 
            waitUntil: 'domcontentloaded',
            timeout: 5000 
          });

          if (response && response.status() >= 400) {
            this.bugs.push({
              id: uuidv4(),
              title: `Broken Link: ${link.text || 'Unnamed Link'}`,
              module: 'Navigation',
              stepsToReproduce: `Click on link: "${link.text}"`,
              expectedResult: 'Link should navigate to valid page',
              actualResult: `HTTP Status: ${response.status()} at ${link.href}`,
              priority: 'High',
              severity: 'high',
              timestamp: new Date()
            });
          }
        } catch (error) {
          if (!error.message.includes('net::ERR_ABORTED')) {
            this.bugs.push({
              id: uuidv4(),
              title: `Link Error: ${link.text || 'Unnamed Link'}`,
              module: 'Navigation',
              stepsToReproduce: `Click on link: "${link.text}"`,
              expectedResult: 'Link should be accessible',
              actualResult: error.message,
              priority: 'Medium',
              severity: 'medium',
              timestamp: new Date()
            });
          }
        }
      }
    } catch (error) {
      console.error('TestForge: Error checking broken links:', error);
    }
  }

  async checkForms() {
    try {
      const forms = await this.page.$$('form');

      for (let i = 0; i < Math.min(forms.length, 3); i++) {
        const form = forms[i];
        
        // Test empty form submission
        try {
          await form.evaluate(f => f.submit());
          this.bugs.push({
            id: uuidv4(),
            title: 'Form Accepts Empty Submission',
            module: 'Form Validation',
            stepsToReproduce: 'Submit form without filling required fields',
            expectedResult: 'Form should display validation errors',
            actualResult: 'Form was submitted without validation',
            priority: 'High',
            severity: 'high',
            timestamp: new Date()
          });
        } catch (error) {
          // Form submission rejected - good
        }

        // Check input fields
        const inputs = await form.$$('input[type="text"], input[type="email"], input[type="password"]');
        
        for (const input of inputs) {
          const placeholder = await input.getAttribute('placeholder');
          const hasLabel = await input.evaluate(el => {
            const id = el.getAttribute('id');
            return id ? document.querySelector(`label[for="${id}"]`) : false;
          });

          if (!placeholder && !hasLabel) {
            this.bugs.push({
              id: uuidv4(),
              title: 'Input Field Missing Label or Placeholder',
              module: 'Form Accessibility',
              stepsToReproduce: 'Inspect form field',
              expectedResult: 'All input fields should have labels or placeholders',
              actualResult: 'Input field found without label or placeholder',
              priority: 'Low',
              severity: 'low',
              timestamp: new Date()
            });
          }
        }
      }
    } catch (error) {
      console.error('TestForge: Error checking forms:', error);
    }
  }

  async checkConsoleErrors() {
    const errors = this.consoleLogs.filter(log => log.type === 'error');
    
    if (errors.length > 0) {
      errors.forEach(error => {
        this.bugs.push({
          id: uuidv4(),
          title: 'Console Error Detected',
          module: 'Browser Console',
          stepsToReproduce: 'Open browser console',
          expectedResult: 'No console errors should exist',
          actualResult: error.text,
          priority: 'Medium',
          severity: 'medium',
          timestamp: new Date()
        });
      });
    }
  }

  async checkAccessibility() {
    try {
      const images = await this.page.$$('img');
      
      for (const img of images.slice(0, 10)) {
        const alt = await img.getAttribute('alt');
        
        if (!alt || alt.trim() === '') {
          this.bugs.push({
            id: uuidv4(),
            title: 'Image Missing Alt Text',
            module: 'Accessibility',
            stepsToReproduce: 'Inspect image elements',
            expectedResult: 'All images should have alt text',
            actualResult: 'Image found without alt attribute',
            priority: 'Low',
            severity: 'low',
            timestamp: new Date()
          });
        }
      }

      const headings = await this.page.$$('h1, h2, h3');
      if (headings.length === 0) {
        this.bugs.push({
          id: uuidv4(),
          title: 'No Heading Elements Found',
          module: 'Accessibility',
          stepsToReproduce: 'Check page structure',
          expectedResult: 'Page should have proper heading hierarchy',
          actualResult: 'No h1, h2, or h3 elements found',
          priority: 'Low',
          severity: 'low',
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('TestForge: Error checking accessibility:', error);
    }
  }

  async captureScreenshot(filename) {
    if (this.page) {
      await this.page.screenshot({ path: filename });
    }
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

export default TestForgeQAScanner;
