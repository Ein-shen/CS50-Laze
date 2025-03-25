
import requests
import sys
import json



if len(sys.argv) == 2:
    try:
        v = float(sys.argv[1])
    except:
        sys.exit("Command-line argument is not a number")
else:
    sys.exit("Missing command-line argument")



try:
    r = requests.get("https://api.coincap.io/v2/assets/bitcoin")

except requests.RequestException:
    print("Theres a problem")

res =  r.json()
res["data"]["priceUsd"]
json.dumps(res, indent=2)

amount = float(res["data"]["priceUsd"])


print(f"${amount:,.4f}")
