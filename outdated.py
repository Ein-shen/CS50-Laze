
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
         else:
               break
         if month in months:
             month = months.index(month) + 1
         elif month.isdigit():
             continue

         if (month) >= 12 or (day) >= 31:
            month = int(month)
            day = int(day)
            continue



         try:
            month = int(month)
            day = int(day)
         except ValueError:
                print()
                pass


         print(year + '-'f"{int(month):02}-{int(day):02}")
         break


    except  EOFError:
        print()
        continue



