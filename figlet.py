


from pyfiglet import Figlet
import sys





figlet = Figlet()
figlet.setFont(font=sys.argv[2])
f = "standard"
figlet.setFont(font=f)




if len(sys.argv) == 4:
    sys.exit("Invalid usage")
elif len(sys.argv) == 1:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs))
elif "-f" in sys.argv:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs), sys.argv[3])
















#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
