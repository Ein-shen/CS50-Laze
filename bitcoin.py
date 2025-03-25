
import requests
import sys
import json



if len(sys.argv) != 2:
    sys.exit("Missing command-line argument ")

r = requests.get("https://api.coincap.io/v2/assets/bitcoin")
res =  r.json()
res["data"]["priceUsd"]
json.dumps(res, indent=2)

amount = float(res["data"]["priceUsd"])


print(f"${amount:,.4f}")
