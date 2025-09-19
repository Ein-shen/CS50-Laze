
# YOUR PROJECT TITLE: Past life generator

#### Video Demo:  <https://youtu.be/R3OJSubspqo?si=9iByckARdlXaGZ5T>

#### Description: The Past Life Generator is a fun little Python program I created that tries to imagine what a person’s “past life” might have been. The idea behind it is simple: you enter your name, age, and hobby, and then the program generates a short story about who you might have been in the past. It prints back the information you gave it, along with some randomly generated details about your life, how long you lived, what role or “status” you had in society, and even your cause of death.

I built this project mainly to practice my Python skills, especially learning how to take user input and work with the `random` library. I wanted to make something that wasn’t just numbers or calculations, but something that could feel playful and entertaining. Instead of just saying “Hello, world!”, this project actually interacts with the user and creates a unique result each time it runs. That’s what makes it fun — no two runs are exactly the same.

### How It Works
When you run the program, the first thing it does is ask you to type in your name, age, and hobby. Once you’ve done that, it combines your input with random choices from lists that I wrote into the program. For example, the program has a list of possible “statuses” like leader tribe, warrior, or Prince, a list of causes of death like war, food poisoning, or an execution, and a random number generator for how many years the person lived. Using `random.choice()` and `random.choice()`, it picks one item from each list. Then it prints a short story about your supposed past life.

An example might look like this:
*“In your past life, Shen, you were a Prince. You lived 23 years, and your cause of death was .”*
Of course, the details will change every time you run the program.

### Why I Made This
I wanted to create something simple but creative. Instead of just printing numbers or solving equations, this project makes the computer feel like a storyteller. It also gave me the chance to practice some basic but important programming concepts:
- Getting and using user input
- Using Python’s `random` library
- Formatting strings and output in a readable way

### Challenges
One challenge I faced was making the sentences come out smoothly. At first, the sentences sounded a bit awkward or repetitive. To fix this, I added more variety to the lists of possible outcomes and made sure the wording stayed consistent. Another challenge was making sure the input and output looked clean, so the program was easy to use.

### Future Ideas
If I were to improve this project, I’d love to add more details to the generated story. For example, the program could tell you where you lived in your past life, what your family was like, or even what achievements you had. Another idea is to turn it into a simple graphical app, so instead of running in the terminal, it could run in a window with buttons and a nicer layout.

### Conclusion
The Past Life Generator is a lighthearted project, but for me, it was also a meaningful way to practice programming. It taught me how to use randomness, how to handle user input, and how to put everything together into a program that people can actually play with. Even though it’s simple, it shows how coding can turn ideas into something interactive and fun.

