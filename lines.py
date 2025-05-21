import sys
import os
val = []



get_input = "".join(sys.argv[1:])




if get_input == "":
   sys.exit("Too few command-line arguments")
if len(sys.argv) > 2:
   sys.exit("Too many command-line arguments")
if not get_input.endswith(".py"):
   sys.exit("Not a Python file")
if get_input == os.path.exists("hello.py") or os.path.exists("goodbye.py"):
   sys.exit("2")
elif not os.path.exists(get_input):
   sys.exit("File does not exist")
