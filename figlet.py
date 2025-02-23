


from pyfiglet import Figlet
import sys





figlet = Figlet()
figlet.getFonts()
f = "standard"
figlet.setFont(font=f)




if len(sys.argv) == 3:
    sys.exit("Invalid usage")
elif len(sys.argv) == 1 or len(sys.argv) == 2:
    figs = input("Input: ")
    print(f"Output: ", figlet.renderText(figs))
else:
    len(sys.argv) == :

    print(f"Output: ", figlet.renderText(figs), sys.argv[2])














#print(f"Output: ", figlet.renderText(figs), sys.argv[2])
