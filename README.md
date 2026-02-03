# BrainByte 🧠✨

An AI-powered study assistant that transforms your notes into interactive flashcards and quizzes. Built with Claude AI and React.

![BrainByte Banner](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-18.x-61dafb) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 What is BrainByte?

BrainByte is an intelligent study companion that takes your study notes and automatically generates:
- **Interactive Flashcards** - Click to flip between questions and answers
- **Multiple Choice Quizzes** - Test your knowledge with auto-generated questions
- **Instant Feedback** - Get your score and see correct answers immediately

No more spending hours manually creating flashcards. Just paste your notes and let AI do the heavy lifting!

## ✨ Features

- 📝 **Smart Content Analysis** - AI understands your notes and identifies key concepts
- 🎴 **Dynamic Flashcards** - Navigate through cards with smooth interactions
- 📊 **Quiz Mode** - Multiple choice questions with scoring and detailed feedback
- 🎨 **Beautiful UI** - Clean, modern interface built with Tailwind CSS
- ⚡ **Fast Generation** - Get study materials in seconds
- 🔄 **Unlimited Use** - Create as many study sets as you need

## 🚀 How It Works

1. **Paste Your Notes** - Copy any study material (textbook chapters, lecture notes, articles)
2. **Generate Materials** - Click the button and let AI analyze your content
3. **Study Smart** - Use flashcards for memorization or quizzes for testing
4. **Track Progress** - See your quiz scores and identify areas to improve

## 🛠️ Tech Stack

- **Frontend**: React with Hooks
- **AI**: Anthropic Claude API (Claude Sonnet 4)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

To run this project, you'll need:
- A modern web browser
- Access to the Anthropic API (the app uses Claude's API)
- Node.js (if running locally)

## 💻 Installation & Setup

### Option 1: Use in Claude.ai (Easiest)
1. Go to [Claude.ai](https://claude.ai)
2. Upload the `brainbyte.jsx` file
3. Ask Claude to run it as an artifact
4. Start using BrainByte immediately!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/daniya255/BrainByte-AI-study-agent.git

# Navigate to project directory
cd BrainByte-AI-study-agent

# Install dependencies
npm install react react-dom lucide-react

# Run the development server
npm start
```

**Note**: The Anthropic API is already configured to work within Claude's environment. For local deployment, you would need to set up API authentication separately.

## 📖 Usage Example

```
Input Notes:
"Photosynthesis is the process by which plants convert light energy into chemical energy. 
It occurs in the chloroplasts and requires sunlight, water, and carbon dioxide. 
The outputs are glucose and oxygen."

Generated Flashcards:
Q: What is photosynthesis?
A: The process by which plants convert light energy into chemical energy

Q: Where does photosynthesis occur?
A: In the chloroplasts

Generated Quiz:
1. What are the inputs required for photosynthesis?
   A) Glucose and oxygen
   B) Sunlight, water, and carbon dioxide ✓
   C) Nitrogen and hydrogen
   D) Soil and minerals
```

## 🎓 What I Learned

Building BrainByte taught me:
- How to integrate AI APIs into web applications
- Working with async/await and handling API responses
- Parsing and validating JSON from AI outputs
- Creating interactive UI with React state management
- Building practical tools that solve real problems
- The power of human-AI collaboration in development

## 🤝 Built With Claude AI

This project was created in collaboration with Claude AI. I provided the concept, requirements, and creative direction, while Claude helped with:
- React component architecture
- API integration and error handling
- UI/UX design and styling
- Code optimization and best practices

This demonstrates how AI can amplify human creativity and accelerate development without replacing the developer's role.

## 🌟 Future Enhancements

Ideas for future versions:
- [ ] Save study sets locally using browser storage
- [ ] Spaced repetition algorithm for optimal learning
- [ ] Export flashcards to PDF or print format
- [ ] Support for images in notes
- [ ] Multiple study modes (matching, fill-in-the-blank)
- [ ] Progress tracking and learning analytics
- [ ] Mobile app version

## 📝 License

This project is open source and available under the MIT License.

## 🙋‍♂️ About Me

I'm passionate about using AI to build practical tools that improve productivity and learning. BrainByte is my first AI agent project, and I'm excited to explore more applications of AI in education and everyday life.

Connect with me on [LinkedIn](https://www.linkedin.com/in/daniya-ali-b17214282/) to follow my journey in AI development!

## 🙏 Acknowledgments

- Built with [Claude AI](https://claude.ai) by Anthropic
- Icons by [Lucide](https://lucide.dev)
- Inspired by the need for more efficient study methods

---

⭐ If you find BrainByte useful, please star this repository!

💡 Have suggestions or found a bug? Open an issue or submit a pull request!
