from fpdf import FPDF


class pdf_file():
    def __init__(self, name):
        self._pdf = FPDF()
        self._pdf.add_page()
        self._pdf.set_font("helvetica", "B", 50)
        self._pdf.cell(100, 50, "CS50 Shirtificate", new_x="LMARGIN", new_y="NEXT", align="C", center=True)
        self._pdf.image("shirtificate.png", w=self._pdf.epw)
        self._pdf.set_text_color(255, 255, 255)

        if name:
            self._pdf.set_font("helvetica", "B", 30)
            self._pdf.cell(75, -240, name + " took CS50", align="C", center=True)
        self._pdf.output("shirtificate.pdf")


        self._pdf = pdf_file



def main():
    name = input("Name: ")
    pdf_file(name)



if __name__ == "__main__":
    main()
