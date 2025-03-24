
import requests
import sys


if len(sys.argv) != 2:
    try:
    r = requests.get('https://api.github.com/events' + sys.argv[1])

    except RequestException:
    print(r.url)


elif  sys.argv != sys.argv[0].isdigit():
    sys.exit("Command-line argument is not a number")
else:
    sys.exit("Missing command-line argument ")



