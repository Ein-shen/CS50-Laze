import inflect



inflect.engine()

count = []

while True:
  try:
   name = input("Name: ")

  except EOFError:
      print(f"Adieu, adieu, to", name)
      break




