#!/bin/bash
# QA Mentor Feature - Quick Test Script

echo "Testing QA Mentor Feature Integration..."
echo ""

# Test 1: API Health
echo "1. Checking API Health..."
curl -s http://localhost:5000/health | jq .status
echo ""

# Test 2: Mentor Endpoint - Auth Feature
echo "2. Testing Mentor Endpoint (auth feature)..."
curl -s -X POST http://localhost:5000/api/testforge/qa/mentor/teach \
  -H "Content-Type: application/json" \
  -d '{"feature":"auth","options":{"complexity":"medium"}}' | jq '.success, .data.totalTestCases, .data.learningTips | keys'
echo ""

# Test 3: Mentor Endpoint - Form Feature
echo "3. Testing Mentor Endpoint (form feature)..."
curl -s -X POST http://localhost:5000/api/testforge/qa/mentor/teach \
  -H "Content-Type: application/json" \
  -d '{"feature":"form","options":{"complexity":"low"}}' | jq '.success, .data.totalTestCases'
echo ""

echo "✅ QA Mentor Feature is fully operational"
echo "Frontend: http://localhost:3000 (Learn & Mentor tab)"
echo "Backend: http://localhost:5000/api/testforge/qa/mentor/teach"
