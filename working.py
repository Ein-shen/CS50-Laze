import re
import sys

time_AM =  [("12", "00"),("1", "01"),("2","02"),("3","03"),("4","04"),("5","05"),("6","06"),("7", "07"),
            ("8","08"),("9","09"),("10","10"),("11","11")]

time_PM = [("12","12"),("1","13"),("2","14"),("3","15"),("4","16"),("5","17"),("6","18"),("7", "19"), ("8","20"),
           ("9","21"), ("10","22"), ("11","23"), ("12","00") ]

def main():
    print(convert(input("Hours: ")))
    sys.exit()


def convert(s):


        bay = re.search(r"^([0-9]{1,2})?(:[0-9]{1,2})? (AM|PM) to ([0-9]{1,2})?(:[0-9]{1,2})? (AM|PM)$", s)


        if bay:


            first_G_orasan =   bay.group(1)
            second_G_minuto = bay.group(2)
            buntag_hapon = bay.group(3)
            fourth_G_orasan = bay.group(4)
            fifth_G_minuto = bay.group(5)
            hapon_buntag = bay.group(6)
        else:
                raise ValueError



            new_fifth_G_minuto = None
            new_second_G_minuto = None

            if fifth_G_minuto:
                new_fifth_G_minuto = int(fifth_G_minuto.replace(':',""))
                # print(f"{new_second_G_minuto}")
            else:
                pass

            if second_G_minuto:
                new_second_G_minuto = int(second_G_minuto.replace(':',""))
                # print(f"{new_second_G_minuto}")
            else:
                 pass


            if buntag_hapon == "PM":
                for i in time_PM:
                    if first_G_orasan == i[0]:
                        slyde = i[1]
                        converted_slyde = int(slyde)
                        #   print(converted_slyde)

            elif buntag_hapon == "AM":
                for i in time_AM:
                    if first_G_orasan == i[0]:
                        slyde = i[1]
                        converted_slyde = int(slyde)
                        # print(converted_slyde)

                    elif hapon_buntag == "PM":
                            for i in time_PM:
                                if fourth_G_orasan == i[0]:
                                    sinaw = i[1]
                                    converted_sinaw = int(sinaw)


                    elif hapon_buntag == "AM":
                            for i in time_AM:
                                if fourth_G_orasan == i[0]:
                                     sinaw = i[1]
                                     converted_sinaw = int(sinaw)



            # if  new_second_G_minuto and new_fifth_G_minuto:
            #      return(f"{converted_slyde}:{new_second_G_minuto} to {converted_sinaw}:{new_fifth_G_minuto}")  #Functioned     10:11 AM to 8 PM

            if new_fifth_G_minuto:
                 return(f"{converted_slyde:02} or :00" 'to' f"{converted_sinaw:02}"':'f"{new_fifth_G_minuto} or :00")  #Functioned     10 AM to 8:50 PM

            elif new_second_G_minuto:
                  return(f"{converted_slyde:02}:{new_second_G_minuto} to {converted_sinaw:02}:00") #Functioned     10:11 AM to 8 PM

            else:
                 return(f"{converted_slyde:02}:00 to {converted_sinaw}:00") #Functioned /2 need i modify mali n











            # else:
            #      return(f"{converted_slyde}{converted_sinaw}:00") #Functioned #




            # else:
            #      return (f"{converted_slyde:02}{converted_sinaw:02}")



        # return None
# 10 AM to 8:50 PM
















                                        # else:
                                        #     return(f"{converted_slyde:02}:00 to {converted_sinaw}:00")







                                                                        # 9 AM to 5 AM
                                                                        # 9 PM to 5 PM
                                                                        # 9 AM to 5 PM
                                                                        # 9 PM to 5 AM
                                                                        # 10 AM to 8:50 PM
                                                                        # 10:11 AM
                                                                        #  10:11 AM to 8:50 PM





if __name__ == "__main__":
    main()
