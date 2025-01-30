



#vowels list
vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']


#user's input
name = input("Input: ")

#covert str to cha
cha = list(vowels)

# Removing the vowels
print("Output: ", end="")
for c in name:
    if c not in vowels:
        print(c, end="")
print()

