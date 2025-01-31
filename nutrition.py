

#fruit's calories
Cal = [("apple", 130), ("avocado", 50), ("sweet cherries", 100), ("kiwifruit", 90), ("pear", 100)]


#Getting the user's input
fruit = input("Item: ").lower()


#The condition to print the C_value
for x in Cal:
  if fruit == x[0]:
    print("Calories: ", x[1])
    break








