

def main():

    text = input("Text: ")

    word = word_count(text)
    letter = letter_count(text)
    sentence = sentence_count(text)

    L = float(letter / word) * 100
    S = float(sentence / word) * 100

    formula = 0.0588 * L - 0.296 * S - 15.8

    if formula < 1:
        print("Before Grade 1")
    elif formula >= 16:
        print("Grade 16+")
    else:
        print("Grade %.0f" % round(formula))


def word_count(text):
    words = 1

    for i in range(len(text)):
        if text[i] == " ":
            words += 1

    return words


def letter_count(text):
    letters = 0

    for i in range(len(text)):
        if text[i].isalpha():
            letters += 1

    return letters


def sentence_count(text):

    sentences = 0

    for i in range(len(text)):
        if text[i] == "." or text[i] == "!" or text[i] == "?":
            sentences += 1

    return sentences


if __name__ == "__main__":
    main()
