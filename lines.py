import sys

val = []



get_input = "".join(sys.argv[1:])

if get_input == "":
   sys.exit("Too few command-line arguments")
elif get_input != ".py":
   sys.exit("Not a Python file")


