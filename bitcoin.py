
import requests
import sys


if sys.argv[1].isdigit():
   amount = requests.get("https://api.coincap.io/v2/assets/bitcoin")
   returnn = amount.json()
   for result in returnn["data"]:
    print(int(result["trackName"]))

elif  sys.argv != sys.argv[1].isdigit():
    sys.exit("Command-line argument is not a number")
else:
    sys.exit("Missing command-line argument ")



