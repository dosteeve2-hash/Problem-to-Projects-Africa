# Problem to Project Africa

## MVP PRD v1

### Status
Draft v1 for execution

### Product scope
This PRD covers the MVP for `Problem to Project Africa` with an initial country focus on `Burkina Faso`.

### Source of truth used
- `Problem_to_Project_Africa_Blueprint.md`

### Important note
The technical architecture file referenced in the project brief, `Problem_to_Project_Africa_Technical_Architecture.md`, is not present in the current workspace at the time of writing this PRD. The technical assumptions below are therefore derived from the blueprint and from the stack direction already defined:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- modular AI layer
- future multi-provider support

---

## 1. Product Summary

`Problem to Project Africa` helps African talents transform:
- their skills
- their raw ideas
- or a real local problem they observed

into a concrete, relevant, prioritized, and feasible project adapted to their local reality.

The MVP must answer one core question well:

`Given this user's context in Burkina Faso, what project should they build next, and what is the clearest first path to execute it?`

---

## 2. MVP Objective

### Primary objective
Help a user go from uncertainty to one recommended project with:
- local relevance
- feasibility assessment
- a clear MVP
- a 30-day roadmap
- one concrete next step

### Success condition
The user should leave the product feeling:
- "This project makes sense for my context"
- "I understand why this is the right project to start with"
- "I know exactly what to do next"

---

## 3. Users

### Primary target users
- African students
- recent graduates
- junior developers
- early entrepreneurs
- African diaspora members wanting to build something useful for Burkina Faso

### MVP user segments
1. `Skills -> Project`
User has skills but no project idea.

2. `Idea -> Project`
User has a raw idea but needs validation, reframing, and prioritization.

3. `Problem -> Project`
User observed a real local problem but does not know how to turn it into an executable project.

---

## 4. Jobs To Be Done

### Functional jobs
- Help me identify a project worth building in Burkina Faso.
- Help me decide whether my idea is relevant and realistic.
- Help me turn a local problem into a project scope I can actually start.
- Help me choose something that matches my level, time, and skills.

### Emotional jobs
- Reduce confusion.
- Reduce fear of wasting time on the wrong idea.
- Increase confidence that the project is locally useful.
- Make me feel I can start now, not "one day later".

---

## 5. Product Promise

In less than 10 minutes, the platform should produce:
- 3 to 5 project options
- 1 recommended project
- a local relevance explanation
- a feasibility level
- a suggested MVP
- a 30-day roadmap
- a skills gap list
- a next action

---

## 6. Geographic and Sector Scope

### Country scope for MVP
- Burkina Faso only

### Supported sectors in MVP
- agriculture
- education
- health
- commerce and informal economy
- energy and logistics

### Local reality principles
Recommendations must account for:
- intermittent electricity
- low bandwidth or poor connectivity
- constrained budgets
- difficult operating environments
- urban and rural differences
- informal workflows and non-digital realities

---

## 7. Core User Inputs

The intake form must collect a common base plus mode-specific inputs.

### Common inputs
- country
- city or region
- current level
- primary domain
- skills
- time available per week
- goal
- preferred sector
- project preference
  - digital
  - operational
  - hybrid

### Mode-specific inputs

#### Skills -> Project
- technical skills
- non-technical skills
- tools already mastered
- strongest interest area
- type of project desired
  - portfolio
  - startup
  - social impact
  - side project

#### Idea -> Project
- raw idea
- target audience
- problem being solved
- why the user wants to build it
- known constraints
- whether any validation exists already

#### Problem -> Project
- observed problem
- where it happens
- who is affected
- frequency or urgency
- current workaround if any
- resources available

---

## 8. Core Outputs

Every completed result must return the following blocks.

### A. Relevant problems
- 3 to 5 locally relevant problems connected to the user's profile or input

### B. Project ideas
- 3 to 5 project concepts

### C. Recommended project
- title
- one-line concept
- why it is the best match

### D. Local relevance explanation
- why this matters in Burkina Faso
- who is affected
- what local constraint makes the opportunity important

### E. Feasibility
- difficulty
  - beginner
  - intermediate
  - advanced
- cost to start
  - low
  - medium
  - high
- execution complexity
  - low
  - medium
  - high

### F. Suggested MVP
- smallest useful version
- first 3 features
- what to avoid building first

### G. 30-day roadmap
- week 1
- week 2
- week 3
- week 4

### H. Skills to learn
- missing or weak skills to strengthen next

### I. Next concrete step
- a single action the user can do in the next 24 hours

---

## 9. Recommendation Logic

The AI layer must not act like open-ended chat. It must produce structured recommendations.

### Inputs to evaluate
- user profile
- mode
- sector
- experience level
- time available
- country context
- raw idea or problem if provided

### Scoring dimensions
Each suggested project should be scored on:
- local relevance
- urgency
- feasibility
- cost to start
- complexity
- skill fit
- portfolio value
- business potential
- expansion potential

### Recommendation rule
The final recommendation should favor:
- high local relevance
- medium to high feasibility
- low to medium starting cost for beginners
- strong alignment with available user time
- strong alignment with actual skills or learnable gap

### Guardrails
- Do not recommend AI or heavy tech unless it materially improves the solution.
- Prefer low-friction MVPs.
- If a non-software or hybrid project is more appropriate, say so.
- Explicitly mention offline-first or low-connectivity design when relevant.

---

## 10. Knowledge Layer for Burkina Faso

The MVP needs a structured context layer for Burkina Faso.

### Minimum country context objects
- country profile
- key sectors
- common constraints
- urban vs rural differences
- infrastructure realities
- entrepreneurship barriers
- education and digital access realities

### How context should be used
The AI engine should blend:
- user input
- sector heuristics
- Burkina Faso context rules
- recommendation templates

### MVP implementation approach
Start with:
- curated static context documents
- sector heuristics
- prompt templates
- structured enums and weights

Do not depend on a large dynamic knowledge graph in the first release.

---

## 11. MVP Features

### In scope
- landing page
- auth
- mode selection
- adaptive intake form
- recommendation generation
- structured results page
- project detail view
- roadmap view
- save result history
- simple user dashboard

### Out of scope
- team matching
- mentor marketplace
- investor discovery
- collaboration feeds
- community posting
- multi-country intelligence
- advanced analytics for institutions
- autonomous project management agents

---

## 12. Screens and Functional Requirements

## 12.1 Landing Page

### Goal
Explain the value proposition and push the user to start a recommendation flow.

### Required sections
- hero
- problem statement
- how it works
- 3 entry modes
- Burkina Faso focus
- example outputs
- CTA

### Primary CTA
- Start now

### Acceptance criteria
- User understands the platform in less than 20 seconds.
- User can start a flow from hero or mode section.

## 12.2 Mode Selection

### Goal
Let the user choose the right starting mode.

### Required options
- I have skills but no idea
- I have an idea
- I observed a problem

### Acceptance criteria
- Each option clearly explains what input is expected.
- One click leads to the correct form variant.

## 12.3 Adaptive Intake Form

### Goal
Collect enough structured context to generate a useful result.

### Functional requirements
- step-based or sectioned form
- common fields plus mode-specific questions
- validation on required fields
- save draft locally in session if the user refreshes
- estimated completion time visible

### Acceptance criteria
- Form completion time under 7 minutes for most users
- Required fields are clear
- User can review before submission

## 12.4 Results Page

### Goal
Show the recommendation summary and alternative directions.

### Required blocks
- recommended project
- 3 to 5 alternatives
- relevance explanation
- feasibility summary
- MVP summary
- CTA to open full project detail
- CTA to save result

### Acceptance criteria
- User can understand the recommendation without opening extra pages.
- Alternatives are clearly distinct from the top recommendation.

## 12.5 Project Detail Page

### Goal
Explain the recommended project deeply enough for the user to commit.

### Required blocks
- problem statement
- target users
- why it matters locally
- proposed solution
- suggested MVP
- first features
- risks and constraints
- required skills

### Acceptance criteria
- User can explain the project to someone else after reading this page.

## 12.6 Roadmap Page

### Goal
Turn the recommendation into execution steps.

### Required blocks
- week-by-week plan
- milestone per week
- learnings needed
- first deliverable
- recommended next step

### Acceptance criteria
- Each week includes concrete actions, not vague motivation.

## 12.7 User Dashboard

### Goal
Let the user revisit prior recommendations.

### Required blocks
- saved generations
- saved projects
- timestamps
- status
  - new
  - saved
  - in progress

### Acceptance criteria
- User can reopen any saved result.

---

## 13. Data Requirements

### Core entities
- User
- UserProfile
- RecommendationSession
- RecommendationInput
- ProjectRecommendation
- ProjectAlternative
- Roadmap
- SavedProject
- CountryContext
- SectorContext

### Minimum saved fields

#### UserProfile
- user_id
- country
- region
- level
- domain
- skills
- preferred_sectors
- weekly_time
- goal

#### RecommendationSession
- id
- user_id
- mode
- input_payload
- recommended_project_id
- created_at

#### ProjectRecommendation
- id
- session_id
- title
- concept
- why_fit
- local_relevance
- feasibility_level
- estimated_cost
- complexity
- mvp_summary
- next_step

#### Roadmap
- id
- recommendation_id
- week_1
- week_2
- week_3
- week_4

---

## 14. Technical Assumptions for MVP

### Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS
- component-based UI system

### Backend
- Next.js server routes or server actions for MVP orchestration
- Supabase for auth, database, and persisted recommendation history

### AI layer
- provider abstraction from day one
- one initial provider for MVP execution
- prompt modules separated by mode
- structured JSON output required from the model

### Recommendation pipeline
1. collect and validate input
2. load Burkina Faso context
3. build mode-specific prompt
4. run recommendation engine
5. validate structured output
6. store session and results
7. render UI

### Non-functional requirements
- mobile-first responsive UI
- clear loading states
- retry-safe generation flow
- observable errors
- result persistence

---

## 15. Output Contract

The AI response for each generation should map to a stable application schema.

### Required response sections
- relevant_problems
- project_ideas
- recommended_project
- relevance_reason
- feasibility
- suggested_mvp
- roadmap_30_days
- skills_to_learn
- next_step

### Why this matters
This reduces:
- hallucinated formatting
- inconsistent rendering
- fragile frontend parsing

---

## 16. Key UX Principles

- Keep the product action-oriented.
- Keep the interface clear, not academic.
- Avoid generic motivational language.
- Make Burkina Faso context visible in the output.
- Show why a project is recommended, not only what is recommended.
- Keep every result grounded in feasibility.

---

## 17. Metrics

### Primary MVP metric
- percentage of completed recommendation flows that are saved by users

### Supporting metrics
- landing page to flow start conversion
- form completion rate
- recommendation completion rate
- save rate
- return visit rate
- percentage of users opening roadmap page

### Qualitative signals
- users say the recommendation feels locally relevant
- users say the roadmap is actionable
- users say the platform helped them decide what to build

---

## 18. Risks

### Risk 1
Recommendations feel generic and not local enough.

### Mitigation
Use Burkina Faso-specific context and sector heuristics from the first version.

### Risk 2
The product recommends projects too ambitious for beginners.

### Mitigation
Weight feasibility and user level heavily.

### Risk 3
The output feels inspirational but not actionable.

### Mitigation
Force structured MVP, roadmap, and next-step blocks.

### Risk 4
The form becomes too long.

### Mitigation
Keep mode-specific fields tight and prioritize only decision-critical inputs.

---

## 19. Open Questions

- Which authentication method should be used first in Supabase: email magic link, Google, or both?
- Should the MVP launch in English first, French first, or bilingual from day one?
- Should we support anonymous generation before sign-up, then require auth to save?
- Should recommendations expose numeric scores or only qualitative labels?
- Which AI provider should be the first implementation default?

---

## 20. Build Order

### Phase 1
- finalize PRD
- finalize technical architecture
- define database schema
- define AI output schema

### Phase 2
- scaffold Next.js app
- set up Tailwind
- set up Supabase
- create app layout and design system foundations

### Phase 3
- build landing page
- build mode selection
- build adaptive intake form

### Phase 4
- build recommendation pipeline
- render results page
- render project detail page
- render roadmap page

### Phase 5
- add auth
- add saved history
- add dashboard

### Phase 6
- polish UX
- seed Burkina Faso context
- run real user testing

---

## 21. Release Definition

The MVP is ready to test when a Burkina Faso-focused user can:
- land on the site
- choose a mode
- submit contextual input
- receive structured project recommendations
- understand one top recommendation
- save it
- revisit it later

---

## 22. Execution Summary

This MVP is not trying to build the whole ecosystem.

It is trying to prove one thing well:

`Can we reliably turn a user's skills, idea, or observed problem into a locally relevant and executable project recommendation for Burkina Faso?`

If yes, the product has a strong foundation for expansion.
