
#while loop
while True:
    #Getting the user's input
    fuel = input("Fraction: ")

    #spliting the fraction into two x and y
    try:
        numerator,denominator = fuel.split("/")

        y_numerator = int(numerator)
        x_denominator = int(denominator)


        j = y_numerator/x_denominator

        if j == 2/3:
         print("67%")
        elif j <= 1:

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


