#!/usr/bin/env python3
"""
Simple test script for AI endpoints
Run this to test if the AI endpoints are working correctly
"""

import requests
import json
import os

# Configuration
BASE_URL = "http://localhost:8000"
AI_ENDPOINTS = {
    "generate_content": "/api/v1/ai/generate-content/",
    "analyze_content": "/api/v1/ai/analyze-content/",
    "generate_hashtags": "/api/v1/ai/generate-hashtags/"
}

def test_endpoint(endpoint, data, description):
    """Test a single endpoint"""
    print(f"\n🧪 Testing {description}...")
    print(f"Endpoint: {endpoint}")
    print(f"Data: {data}")
    
    try:
        response = requests.post(
            f"{BASE_URL}{endpoint}",
            json=data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Success: {result}")
            return True
        elif response.status_code == 503:
            print("⚠️  AI service not configured (expected if no OpenAI API key)")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Testing AI Endpoints")
    print("=" * 50)
    
    # Test 1: Generate Content
    test_endpoint(
        AI_ENDPOINTS["generate_content"],
        {
            "topic": "climate action, sustainability, environment",
            "type": "social_media_post"
        },
        "Content Generation"
    )
    
    # Test 2: Analyze Content
    test_endpoint(
        AI_ENDPOINTS["analyze_content"],
        {
            "content": "Climate change is a serious issue that affects our planet. We need to take action now!"
        },
        "Content Analysis"
    )
    
    # Test 3: Generate Hashtags
    test_endpoint(
        AI_ENDPOINTS["generate_hashtags"],
        {
            "content": "Climate change is a serious issue that affects our planet. We need to take action now!"
        },
        "Hashtag Generation"
    )
    
    print("\n" + "=" * 50)
    print("🏁 Testing Complete!")
    print("\n📝 Notes:")
    print("- If you see 503 errors, set OPENAI_API_KEY environment variable")
    print("- If you see 401 errors, the endpoints require authentication")
    print("- If you see 404 errors, make sure the backend is running")

if __name__ == "__main__":
    main()




