

play = input()


play = play.encode('utf-8')

f_str = play.replace(b" ",b"...")

f_str = f_str.decode('utf-8')

print(f_str)
