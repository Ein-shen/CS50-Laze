


from pyfiglet import Figlet
import sys





figlet = Figlet()
figlet.setFont(font=sys.argv[2])
f = "standard"
figlet.setFont(font=f)




if len(sys.argv) == 3:
    sys.exit("Invalid usage")
elif "-f rectangle" in sys.argv:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs), sys.argv[2])
















#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
