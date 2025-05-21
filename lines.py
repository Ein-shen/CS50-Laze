import sys

val = []



get_input = "".join(sys.argv[1:])



if not get_input.endswith(".py"):
   sys.exit("Not a Python file")
elif get_input == "":
   sys.exit("Too few command-line arguments")

