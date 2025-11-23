
import { Course } from './types';

export const PYTHON_COURSE: Course = {
  id: 'python-101',
  title: 'Python for Everyone',
  description: 'A gender-inclusive introduction to programming. Learn the basics of Python with practical examples focused on real-world impact.',
  level: 'Beginner',
  duration: '4 Weeks',
  image: '', // Image handled by component now
  lessons: [
    {
      id: 'step-1',
      title: 'Hello, Steam4All!',
      description: 'Learn how to output text to the console using the print function.',
      instruction: `
### Your First Line of Code

Welcome! Programming is a powerful tool for change. Let's start by making the computer speak. 

In Python, the \`print()\` function outputs text to the screen.

**Task:**
1. Type \`print("Equality for all!")\` in the code editor.
2. Click **Run Code** to see your message.
      `,
      initialCode: `# Write your code below\n`,
      expectedOutputKeyword: 'Equality for all!'
    },
    {
      id: 'step-2',
      title: 'Variables: Storing Data',
      description: 'Understand how to store and retrieve data using variables.',
      instruction: `
### Keeping Track of Info

Think of a **variable** as a labeled box where you can store data. 

**Task:**
1. Create a variable named \`goal\` and set it to "SDG 5".
2. Create another variable named \`meaning\` and set it to "Gender Equality".
3. Print both variables.
      `,
      initialCode: `# Create variables\ngoal = "SDG 5"\nmeaning = "Gender Equality"\n\n# Print them below\n`,
      expectedOutputKeyword: 'Gender Equality'
    },
    {
      id: 'step-3',
      title: 'Math & Logic',
      description: 'Perform basic arithmetic operations using Python.',
      instruction: `
### Python Calculator

Computers are excellent at math. We can perform calculations to solve problems.

**Task:**
1. Imagine a diverse team of 4 developers.
2. If they each write 50 lines of code per day, calculate the total lines.
3. Print the result.
      `,
      initialCode: `devs = 4\nlines_per_dev = 50\n\n# Calculate total\ntotal_lines = devs * lines_per_dev\n\n# Print result\n`,
      expectedOutputKeyword: '200'
    },
    {
      id: 'step-4',
      title: 'Conditionals: Making Choices',
      description: 'Control the flow of your program with if/else statements.',
      instruction: `
### If, Else If, Else

Code needs to make decisions based on data. We use \`if\`, \`elif\`, and \`else\`.

**Task:**
1. Create a variable \`year\` and set it to 2030 (The target year for SDGs).
2. Write logic: 
   - If \`year\` is equal to 2030, print "Target Year".
   - Else, print "Keep working".
      `,
      initialCode: `year = 2030\n\n# Check the year\nif year == 2030:\n    # print message\n    pass\nelse:\n    # print other message\n    pass`,
      expectedOutputKeyword: 'Target Year'
    },
    {
      id: 'step-5',
      title: 'Loops: The Power of Repetition',
      description: 'Automate repetitive tasks using loops to process lists.',
      instruction: `
### Automating Tasks

Instead of writing the same code over and over, use a loop! This is great for processing lists of data.

**Task:**
1. We have a list of STEAM fields: \`["Science", "Tech", "Engineering", "Art", "Math"]\`.
2. Use a \`for\` loop to print each field one by one.
      `,
      initialCode: `# Create the list\nfields = ["Science", "Tech", "Engineering", "Art", "Math"]\n\n# Loop through the list\nfor field in fields:\n    # print the field\n    pass\n`,
      expectedOutputKeyword: 'Math'
    },
    {
      id: 'step-6',
      title: 'Final Challenge: Impact Calculator',
      description: 'Apply everything you have learned to build a calculator.',
      instruction: `
### Putting It All Together

Let's build a tool to calculate our educational reach.

**Task:**
1. Set \`monthly_students\` to 100.
2. Use a loop to sum this up for 12 months.
3. If the total is greater than 1000, print "Goal Exceeded!".
4. Else, print "Keep growing!".
      `,
      initialCode: `monthly_students = 100\ntotal_students = 0\n\n# Loop 12 times to add to total\nfor month in range(12):\n    total_students = total_students + monthly_students\n\n# Check if goal met\nprint("Total:", total_students)\n\n# Add your if/else logic here\n`,
      expectedOutputKeyword: 'Goal Exceeded!'
    }
  ]
};

export const FEATURES = [
  {
    title: 'Access for All',
    description: 'We prioritize accessibility and inclusivity, ensuring that coding education is available to everyone, regardless of background.',
    icon: 'Gift'
  },
  {
    title: 'AI Mentorship',
    description: 'Our AI-powered tutor provides a safe, judgment-free space to ask questions and debug code at your own pace.',
    icon: 'Bot'
  },
  {
    title: 'Inclusive Community',
    description: 'Join a global network of learners supporting the goal of gender equality in science and technology.',
    icon: 'Users'
  }
];
