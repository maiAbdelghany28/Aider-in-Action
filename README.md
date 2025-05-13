#################################################################################
##           Aider in Action: Practical Demonstration and Assignment           ##
#################################################################################

## Author
Mai Waheed  
New Giza University – Applied Data Mining – Spring 2025

# React Calculator – Enhanced with Aider AI

This project is a fork of the [React Calculator](https://github.com/ahfarmer/calculator) app, enhanced using the Aider AI coding assistant and NGU LLM. The goal was to extend the calculator's functionality while documenting the process of using an AI-powered pair programming tool.

---

## Original Project Functionality

The original app is a simple calculator built with React. It supports:
- Basic arithmetic operations (+, –, ×, ÷)
- Button-based input
- Clear screen and result display

---

## Added Features

### 1. Dark Mode Toggle
- Allows users to switch between light and dark themes.
- Implemented using a toggle button and theme-aware CSS classes.



---

### 2. Calculation History
- Users can view a panel of past calculations.
- Automatically updates when operations are performed.
- Includes a "Clear History" button to reset past results.



---

### 3. Scientific Mode
- Adds trigonometric, logarithmic, and square root functions:
  - `sin`, `cos`, `tan`, `log`, `√`, and `^`
- Users can toggle scientific mode on and off as needed.

---

## Implementation Process

1. **Project Setup**
   - Cloned the original repo
   - Installed dependencies using `npm install`

2. **Configured Aider**
   - Connected to NGU LLM using custom config
   - Used `/add` to load key React files into Aider's context

3. **Feature Development**
   - Prompts sent to Aider to add features incrementally
   - Reviewed code using `/diff` before applying changes
   - Manually tested in the browser via `npm start`

4. **Testing**
   - Verified each feature manually and through added test cases

---

## Challenges Faced & Solutions

| Challenge                        | Solution                                                     |
|----------------------------------|--------------------------------------------------------------|
| Aider defaulted to Gemini        | Manually set `--model` and environment variables             |
| Layout issues in History panel  | Refined layout in small iterations with Aider feedback       |
| Theme switching bug              | Used context-aware CSS and global theme state                |
| Scientific inputs caused errors | Handled input fallback in `calculate.js` using conditionals  |

---

## Aider Commands Used

| Command        | Purpose                                        |
|----------------|------------------------------------------------|
| `/ls`          | List project files                             |
| `/add`         | Add source files to Aider's working context    |
| `/ask`         | Prompted Aider to modify or explain code       |
| `/diff`        | Reviewed code changes                          |
| `/commit`      | Applied code changes                           |
| `/run npm start` | Ran app for manual testing                  |
| `/test`        | Verified unit tests (where applicable)         |

**Most effective prompt example:**
```text
/ask Add a toggle button to switch between light and dark mode using React state and CSS classes.
