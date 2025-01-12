



def main():
    prep = input("Expression: ")
    x, y, z = prep.split()
    x = int(x)
    z = int(z)
    cal = op(x, y, z)
    print(cal)

def op (x, y, z):
    if y == "+":
        return float(x + z)
    elif y == "-":
        return float(x - z)
    elif y == "*":
        return float(x * z)
    elif y == "/":
        return x / z
    else:
            "Invalid entry"



main()

