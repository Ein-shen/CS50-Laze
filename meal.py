def main():
    clock = input("What time is it? ")
    hours, minutes = clock.split(":")
    hours = float(hours)
    minutes = float(minutes)
    show = convert(hours, minutes)
    print(show)

def convert(hours, minutes):
    all = hours + minutes / 60
    if 7 <= all < 8:
        return "breakfast"
    elif 12 <= all < 13:
        return "lunch times"
    elif 18 <= all < 19:
        return "dinner time"
    else:
        return "Invalid"

if __name__ == "__main__":
    main()
