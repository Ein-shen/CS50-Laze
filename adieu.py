import inflect


p = inflect.engine()

namelist = []


while True:
  try:
    
   name = input("Name: ").capitalize()
   namelist.append(name)
   joining = p.join(namelist)




  except EOFError:
    print()
    break



print(f"Adieu, adieu, to", joining)










