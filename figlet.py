


from pyfiglet import Figlet
import sys





figlet = Figlet()
figlet.setFont(font=sys.argv[2])
f = "standard"
figlet.setFont(font=f)


if "-f" in sys.argv and "rectangles" in sys.argv:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs), sys.argv[2])
if "-f" in sys.argv and "slant" in sys.argv:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs), sys.argv[2])
if "-f" in sys.argv and "alphabet" in sys.argv:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs), sys.argv[2])

elif len(sys.argv) == 3:
    sys.exit("Invalid usage")









#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
