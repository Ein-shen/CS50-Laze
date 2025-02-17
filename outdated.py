
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
         elif calendar == "/" in months:
              continue
         else:
               break
         if month in months:
             month = months.index(month) + 1
             continue
         elif month.isdigit():
             month = int(month)
                continue
           else:
                break


    

print(year + '-'f"{int(month):02}-{int(day):02}")

