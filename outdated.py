
months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

while True:
    try:
         calendar = input("Date: ").title()
         if "/" in calendar:
               month, day, year = calendar.split("/")
               continue
         elif "," in calendar:
               calendar = calendar.replace("," , "")
               month, day, year = calendar.split(" ")
               if month in months:
                    month = months.index(month) + 1
               elif month.isdigit():
                    month = int(month)
                    break


         try:
            day = int(day)
            if (month) > 12 or (day) > 31:
                print()
                continue
            else:
                break

         except ValueError:
              print()
              continue

    except  EOFError:

        continue

print(year + '-' f"{int(month):02}-{int(day):02}")
