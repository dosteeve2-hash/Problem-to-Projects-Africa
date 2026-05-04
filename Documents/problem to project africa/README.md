# Problem to Project Africa 🌍

**The AI-powered platform connecting Africans to transformative projects.**

Empowering people in Burkina Faso to discover, learn, and contribute to projects that matter.

---

## 🎯 What We Do

Users answer a 3-minute diagnostic about their skills, ideas, or problems. Our AI-powered system recommends the perfect projects and provides a clear next-steps roadmap.

**Current Focus**: Burkina Faso (v0.1)

---

## ✨ Features

### ✅ Implemented
- [x] 3-mode intake (Skills / Idea / Problem)
- [x] AI recommendation engine (local)
- [x] 8 curated projects with details
- [x] User authentication (Supabase ready)
- [x] Responsive design (mobile-first)
- [x] Project details pages
- [x] Dashboard skeleton
- [x] Type-safe codebase (TypeScript 100%)

### 🔄 In Progress (v0.2)
- [ ] Supabase auth integration
- [ ] Database persistence
- [ ] Real AI engine (Ollama)
- [ ] User dashboard
- [ ] Project history & analytics

---

## 📊 Current Status

**Build**: ✅ Passing (0 errors)  
**Deploy**: 🚨 Investigating (404 error on Vercel - fixing now)  
**Database**: ✅ Configured (Supabase ready)  
**Documentation**: ✅ Complete

See [DEPLOYMENT.md](./DEPLOYMENT.md) for live status.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 + App Router
- **Language**: TypeScript (100% type-safe)
- **Styling**: Tailwind CSS v4
- **Frontend**: React 19
- **Backend**: Node.js API routes
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase JWT
- **Deployment**: Vercel
- **AI**: Ollama (local)

---

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase keys

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
src/
├── app/               # Next.js 16 App Router pages
│   ├── (public)/      # Public pages (home, auth)
│   ├── (protected)/   # Protected pages (dashboard)
│   └── api/           # API routes
├── components/        # React components
├── lib/               # Utilities & logic
│   ├── ai/            # AI recommendation engine
│   ├── supabase/      # Database clients
│   └── types.ts       # TypeScript types
└── cache/             # Static data & projects
```

---

## 🎮 How to Use

1. **Visit homepage** → Click "Commencer le diagnostic"
2. **Select mode**: Skills / Idea / Problem
3. **Fill intake form** → Be specific!
4. **Get AI recommendation** → See top projects matched
5. **View details** → Click project for full info
6. **Save projects** → (Coming in v0.2)

---

## 🔧 Development

### Add a New Project
Edit `src/cache/projects.json` and add to the array.

### Customize AI Recommendations
Edit `src/lib/ai/recommendation-engine.ts`

### Update Styles
Use Tailwind CSS classes in components. Config in `tailwind.config.ts`

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Current Task Board
See [AGENT_TASKS_DISPATCH.md](./AGENT_TASKS_DISPATCH.md) for active work items.

---

## 📅 Roadmap

**v0.1** (April 2026) ✅  
- MVP web app
- Local recommendation engine
- 8 curated projects

**v0.2** (May 2026) 🔄  
- User auth & accounts
- Data persistence
- Real AI engine
- User dashboard

**v0.3** (June 2026) 📋  
- Analytics & insights
- Performance metrics
- Export reports

**v0.4+** (July+)  
- Community features
- Project showcase
- Collaboration tools

See [ROADMAP.md](./ROADMAP.md) for detailed timeline.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/problem-to-project-africa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/problem-to-project-africa/discussions)
- **Documentation**: See `/docs` folder

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by AI-powered development system.

**Current Phase**: Orchestrated development (v0.2)

---

## 🎯 Mission

**Empowering Africans to transform their communities through technology and innovation.**

One recommendation at a time. 🌟
