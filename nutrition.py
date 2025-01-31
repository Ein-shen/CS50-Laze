

#fruit's calories
Cal = [("apple", 130), ("avocado", 50), ("sweet cherries", 100)]


#Getting the user's inout
fruit = input("Item: ").lower()


#The condition to printing the Cvalue
for x in Cal:
  if fruit == x[0]:
    print("Calories: ", x[1])
    break

else:
    print("Fruit not found.")






