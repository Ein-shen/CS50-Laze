def main():
    dollars = dollars_to_float(input("How much was the meal? "))
    percent = percent_to_float(input("What percentage would you like to tip? "))
    tip = dollars * percent
    print(f"Leave ${tip:.2f}")


def dollars_to_float(d):
    # TODO
   remove_dollar_sign = float(d.removeprefix("$"))
   return remove_dollar_sign



def percent_to_float(p):
    # TODO
    remove_percent_sign = float(p.removesuffix("%"))/100
    return remove_percent_sign




main()
