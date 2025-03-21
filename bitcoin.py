import requests
import sys
import json

if sys.argv[1].isdigit():
   amount = requests.get("https://api.coincap.io/v2/assets/bitcoin" + sys.argv[1])
   print(amount.json())

elif  sys.argv != sys.argv[1].isdigit():
    sys.exit("Command-line argument is not a number")
else:
    sys.exit("Missing command-line argument ")
amount  =  requests.get  = ("https://api.coincap.io/v2/assets/bitcoin")

print(f"${amount:,.4f}")
