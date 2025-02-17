
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
         elif "," in calendar:
               calendar = calendar.replace("," , "")
               month, day, year = calendar.split(" ")
         elif calendar == "," or "/":
              continue
         elif calendar == "/" in months:
              continue
         else:
               break
         if month in months:
             month = months.index(month) + 1
         elif month.isdigit():
             month = int(month)
             break

    except:
            month = int(month)
            day = int(day)

    try:
      if  (month) > 1 and (month) >= 12 and (day) > 1 and (day) >= 31:
            print("Invalid date. Please enter a valid month (1-12) and day (1-31).")
            continue
      else:
            break

    except ValueError:
        print()
        continue

    except EOFError:
         print()
         continue

print(year + '-'f"{int(month):02}-{int(day):02}")

