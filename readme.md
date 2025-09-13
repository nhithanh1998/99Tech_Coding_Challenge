# 99Tech Coding Challenge

Thank you for taking the time to review my work. This document will help you quickly understand what’s here, how to run it, and how to assess the implementation.

---

## 📂 Project Structure

```
/
├── src/
│   └── problem4/   # A SumToN challenge
│   └── problem5/   # A CrudeServer challenge
│   └── problem6/   # An Architecture challenge
├── jest.config.js  # Configuration for tests
├── tsconfig.json   # TypeScript configuration
├── package.json    # Dependencies, scripts
├── package-lock.json
├── .gitignore
└── README.md       # (this file)
```

## ⚙️ How to Run

### Challenge 4: Three ways to sum to n

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run test**

   ```bash
   npm test
   ```

This uses Jest to verify behavior as per the assignment requirements.

- Implementation: `src/problem4/sumToN.ts`
- Unit tests: `src/problem4/sumtoN.test.ts`

### Challenge 5: A Crude Server Challenged

1. **Go to the problem 5 directory**

   ```bash
   cd src/problem5
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run build**

   ```bash
   npm run build
   ```

4. **Start API Server local**

   ```bash
   npm start
   ```

---

## 📋 Usage / Assumptions

- Node.js v14+ required.
- Tests written in Jest.
- Each challenge is self-contained under its respective directory.
- Challenge 6 is an architecture design specification and does not require execution.
