
#while loop
while True:
    #Getting the user's input
    fuel = input("Fraction: ")

    #spliting the fraction into two x and y
    try:
        denominator,numerator = fuel.split("/")

        x_denominator = int(denominator)
        y_numerator = int(numerator)

        j = x_denominator/y_numerator

        if j < 1:
            break
    #exception from error or invalid input
    except (ValueError, ZeroDivisionError):
        pass

#changing the value to percentage
percentage = int(j * 100)

#Condtion of printing
if percentage <= 1:
    print("E")
elif percentage >= 99:
    print("F")
else:
     print(f"{percentage}%")


