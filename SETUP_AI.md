# AI-Powered Posting Setup Guide

## 🚀 Quick Setup

### 1. Install OpenAI Package
```bash
cd backend-new
pip install openai==1.3.0
```

### 2. Set Environment Variable
Create a `.env` file in the `backend-new` directory:
```bash
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Restart Backend Server
```bash
python manage.py runserver
```

## 🔧 Features

### ✅ AI Content Generation
- Generate climate-focused content with one click
- AI-powered hashtag suggestions
- Real-time content analysis

### ✅ Content Filtering
- Climate/environment focus validation
- Bad word detection
- Link prevention
- Content appropriateness checking

### ✅ Modern UI
- Beautiful, responsive design
- Real-time validation feedback
- Image preview and upload
- Character counter and limits

## 🎯 How It Works

### Without OpenAI API Key:
- Uses fallback content generation
- Basic content validation
- Still provides modern UI experience

### With OpenAI API Key:
- Full AI content generation
- Advanced content analysis
- Smart hashtag suggestions
- Climate-focused content filtering

## 🛠️ Troubleshooting

### Error: "AI service not configured"
- Make sure `OPENAI_API_KEY` is set in your environment
- Restart the backend server after setting the key

### Error: "Failed to generate content"
- Check your OpenAI API key is valid
- Ensure you have OpenAI credits available
- The system will fallback to basic content generation

### Content Analysis Not Working
- The system includes fallback validation
- Basic checks for content length, links, and climate keywords
- Works even without OpenAI API key

## 📱 Usage

1. **Toggle Interface**: Use the toggle button to switch between simple and AI-powered creator
2. **AI Generate**: Click "AI Generate" to create climate-focused content
3. **Content Analysis**: Real-time analysis as you type
4. **Hashtag Suggestions**: Click suggested hashtags to add them
5. **Image Upload**: Drag & drop or click to upload images
6. **Post Content**: Submit with automatic validation

## 🌱 Climate Focus

The AI system is specifically trained to:
- Generate climate and environment-focused content
- Suggest relevant sustainability hashtags
- Filter out non-climate related content
- Ensure all posts align with the platform's mission

## 🔒 Content Safety

- Automatic bad word filtering
- Link detection and prevention
- Content appropriateness checking
- Climate relevance validation
- Real-time feedback and suggestions




