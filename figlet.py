


from pyfiglet import Figlet
import sys





figlet = Figlet()

if len(sys.argv) >= 4 or len(sys.argv) == 1:
    sys.exit("Invalid usage")
elif len(sys.argv) == 2:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs))








#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
