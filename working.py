import re
import sys


def main():
    print(convert(input("Hours: ")))
    sys.exit()


def convert(s):

        bay = re.search(r"^([0-9]{1,2})?:?([0-9]{1,2})? (AM|PM) to ([0-9]{1,2})?:?([0-9]{1,2})? (AM|PM)$", s)


        if not bay:
             raise ValueError
        elif bay == None:
             raise ValueError

        oras1 = bay.group(1)
        minuto1 = bay.group(2)
        alp1 = bay.group(3)
        oras2 = bay.group(4)
        minuto2 = bay.group(5)
        alp2 = bay.group(6)

        if not minuto1:
             minuto1 = "00"

        if not minuto2:
             minuto2 = "00"

        if int(minuto1) >= 60 or int(minuto2)>= 60:
            raise ValueError

        return f"{bayntekwatro(oras1, minuto1, alp1)} to {bayntekwatro(oras2, minuto2, alp2)}"

def bayntekwatro(oras, minuto, b_h):

        if int(oras) < 1 or int(oras) > 12:
             raise ValueError


        if b_h == "AM" and oras == 12:
              oras = int(oras)
              oras = 0
     #    print(oras)

        if b_h == "PM" and oras != 12:
               oras = int(oras)
               oras += 12
     #    print(oras)






        return f"{int(oras):02d}:{minuto:02}"



     #    if int(oras2) < 1 or int(oras2 )> 12:

     #    return (f"{int(oi):02}:{int(minuto):02} to {int(oi2):02}:{int(minuto):02}") or (f"{int(oi):02}00 :{int(oi2):02}00")
















#         if bay:


#             first_G_orasan =   bay.group(1)
#             second_G_minuto = bay.group(2)
#             buntag_hapon = bay.group(3)
#             fourth_G_orasan = bay.group(4)
#             fifth_G_minuto = bay.group(5)
#             hapon_buntag = bay.group(6)



#             new_fifth_G_minuto = None
#             new_second_G_minuto = None
#             converted_sinaw = ()
#             new_second_G_minuto  = ()



#             if fifth_G_minuto:
#                 new_fifth_G_minuto = int(fifth_G_minuto.replace(':',""))
#                 # print(f"{new_second_G_minuto}")
#             else:
#                 pass

#             if second_G_minuto:
#                 new_second_G_minuto = int(second_G_minuto.replace(':',""))
#                 # print(f"{new_second_G_minuto}")
#             else:
#                  pass


#             if buntag_hapon == "PM":
#                 for i in time_PM:
#                     if first_G_orasan == i[0]:
#                         slyde = i[1]
#                         converted_slyde = int(slyde)
#                         print(type(converted_sinaw))
#                         #   print(converted_slyde)

#             elif buntag_hapon == "AM":
#                 for i in time_AM:
#                     if first_G_orasan == i[0]:
#                         slyde = i[1]
#                         converted_slyde = int(slyde)
#                         print(type(converted_sinaw))
#                         # print(converted_slyde)

#                     elif hapon_buntag == "PM":
#                             for i in time_PM:
#                                 if fourth_G_orasan == i[0]:
#                                     sinaw = i[1]
#                                     converted_sinaw = int(sinaw)
#                                     print(type(converted_slyde))


#                     elif hapon_buntag == "AM":
#                             for i in time_AM:
#                                 if fourth_G_orasan == i[0]:
#                                      sinaw = i[1]
#                                      converted_sinaw = int(sinaw)




#                     else:
#                          raise ValueError


#             # if  new_second_G_minuto and new_fifth_G_minuto:
#             #      return(f"{converted_slyde}:{new_second_G_minuto} to {converted_sinaw}:{new_fifth_G_minuto}")  #Functioned     10:11 AM to 8 PM

#             if new_fifth_G_minuto:
#                  return(f"{converted_slyde:02} or :00" 'to' f"{converted_sinaw:02}"':'f"{new_fifth_G_minuto} or :00")  #Functioned     10 AM to 8:50 PM

#             if new_second_G_minuto:
#                   return(f"{converted_slyde:02}:{new_second_G_minuto} to {converted_sinaw:02}:00") #Functioned     10:11 AM to 8 PM

#             else:
#                  return(f"{converted_slyde:02}:00 to {converted_sinaw:02}:00") #Functioned /2 need i modify mali n











#             # else:
#             #      return(f"{converted_slyde}{converted_sinaw}:00") #Functioned #




#             # else:
#             #      return (f"{converted_slyde:02}{converted_sinaw:02}")



#         # return None
# # 10 AM to 8:50 PM
















#                                         # else:
#                                         #     return(f"{converted_slyde:02}:00 to {converted_sinaw}:00")







#                                                                         # 9 AM to 5 AM
#                                                                         # 9 PM to 5 PM
#                                                                         # 9 AM to 5 PM
#                                                                         # 9 PM to 5 AM
#                                                                         # 10 AM to 8:50 PM
#                                                                         # 10:11 AM
#                                                                         #  10:11 AM to 8:50 PM





if __name__ == "__main__":
    main()
