from pyfiglet import Figlet
import sys


figlet = Figlet()
figlet.setFont(font=sys.argv[2])
f = "standard"
figlet.setFont(font=f)


if "-f" in sys.argv and "rectangles" in sys.argv:
    figs = input("Input: ")
    figlet.setFont(font="rectangles")
    print(f"Output: \n\n{figlet.renderText(figs)}")
    sys.exit()

if "-f" in sys.argv and "slant" in sys.argv:
    figs = input("Input: ")
    figlet.setFont(font="slant")
    print(f"Output: \n\n{figlet.renderText(figs)}")
    sys.exit()

if "-f" in sys.argv and "alphabet" in sys.argv:
    figlet.setFont(font="alphabet")
    figs = input("Input: ")
    print(f"Output: \n\n{figlet.renderText(figs)}")
    sys.exit()

elif len(sys.argv) == 3:
    sys.exit("Invalid usage")



