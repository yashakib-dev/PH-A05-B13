# 1. What is the difference between var, let, and const?
=>var is the old way. It has some problems like it can be redeclared and it doesn't follow block scope properly.
=>let is the modern version. It works inside block scope and we can change its value later, but we cannot redeclare it in the same scope.
=>const is also block scoped, but once we assign a value we cannot change it later.

# 2. What is the spread operator (...)?
=>If I have an array, I can copy it or combine it with another array easily using spread operator.
The spread operator is used to spread or expand elements of an array or object.
So basically, it helps us combine or copy data easily.

# 3. What is the difference between map(), filter(), and forEach()?

=>forEach() just loops through the array and runs a function for each element. It doesn't return a new array.
=>ap() also loops through the array, but it returns a new array with modified values.
=>filter() is used when we want to select specific elements based on a condition.

# 4. What is an arrow function?

In JavaScript, we use arrow function to write a normal function in a shorter way.
Instead of writing the full function keyword, we use =>.

# 5. What are template literals?

Template literals are used for creating dynamic strings easily.
We use backticks ` ` for creating a template literals.
It is useful for inserting  variables directly inside the string using ${}.
So it helps when we want to create dynamic strings.