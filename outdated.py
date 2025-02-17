
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
         calendar = input("Date: ").title().strip()
         if "/" in calendar:
               month, day, year = calendar.split("/")
         elif "," in calendar:
               calendar = calendar.replace("," , "")
               month, day, year = calendar.split(" ")
         elif calendar == "," or "/":
              continue
         else:
               break
         if month in months:
             month = months.index(month) + 1
         elif month.isdigit():
             month = int(month)
             break
         else:
             continue
         if (month) > 12 or (day) > 31:
             continue




         try:
            day = int(day)

         except ValueError:
              print()
              continue

    except  EOFError:
        print()
        continue

print(year + '-'f"{int(month):02}-{int(day):02}")

