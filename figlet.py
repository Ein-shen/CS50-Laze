


from pyfiglet import Figlet
import sys





figlet = Figlet()

if len(sys.argv) >= 3:
    sys.exit("Invalid usage")
elif len(sys.argv) == 1:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs))


if len(sys.argv) == 1








#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
