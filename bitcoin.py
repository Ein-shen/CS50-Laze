import requests
import sys


while True:
    try:
     bit = float(input(""))

    except ValueError:
      sys.exit("Missing command-line argument ")
