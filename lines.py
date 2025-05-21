import sys

val = []



get_input = "".join(sys.argv[1:])




if get_input == "":
   sys.exit("Too few command-line arguments")
if len(sys.argv) > 2:
   sys.exit("Too many command-line arguments")
if not get_input.endswith(".py"):
   sys.exit("Not a Python file")

