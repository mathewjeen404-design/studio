export const REAL_WORLD_TEXTS = {
  email: [
    "Hi Jane, Just following up on our meeting from yesterday. Could you please send over the documents we discussed? I'm looking forward to reviewing them. Thanks, John",
    "Dear Hiring Manager, I am writing to express my strong interest in the Software Engineer position advertised on your company's website. My resume is attached for your review. Thank you for your time and consideration.",
    "Quick question - are we still on for lunch at 12:30 PM tomorrow? Let me know if anything changes on your end. I'm looking forward to catching up!",
    "Team, please find the agenda for our weekly sync attached. Take a moment to review it before the meeting and come prepared with any updates or questions you may have.",
    "This is a confirmation for your order #12345. We've received it and will notify you as soon as it ships. You can view your order details here: http://example.com/orders/12345"
  ],
  resume: [
    "Developed and maintained responsive web applications using React, Next.js, and TypeScript, resulting in a 30% increase in user engagement.",
    "Collaborated with cross-functional teams including designers and product managers to design and implement new features, improving application performance and scalability.",
    "Engineered and optimized backend services with Node.js and Express, leading to a 50% reduction in API response times.",
    "Implemented a comprehensive testing suite with Jest and React Testing Library, which increased code coverage from 60% to over 90%.",
    "Led a project to migrate a legacy codebase to a modern microservices architecture, significantly improving system reliability and developer productivity."
  ],
  code: {
    python: [
      "def fibonacci(n):\n    a, b = 0, 1\n    while a < n:\n        print(a, end=' ')\n        a, b = b, a+b",
      "import requests\n\nresponse = requests.get('https://api.github.com')\nif response.status_code == 200:\n    print('Success!')",
      "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return 'Woof!'",
    ],
    javascript: [
      "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);",
      "async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n  }\n}",
      "const person = { firstName: 'John', lastName: 'Doe' };\nconst { firstName, lastName } = person;",
    ],
  },
};
