import csv
import sys


def main():

    if len(sys.argv) != 3:
        print('Usage: python dna.py data.csv sequence.txt')
        sys.exit(1)

    # TODO: Check for command-line usage
    with open(sys.argv[1], 'r') as DBfile:
        reader = csv.DictReader(DBfile)
        inside_database = [row for row in reader]

    # TODO: Read database file into a variable
    rows_Acc = {}
    with open(sys.argv[2], 'r') as fileSQ:
        SQ = fileSQ.read()

    # TODO: Find longest match of each STR in DNA sequence
    for i in inside_database[0].keys():
        if i == 'name':
            continue
        rows_Acc[i] = longest_match(SQ, i)

    # TODO: Check database for matching profiles
    for j in inside_database:
        match = True
        for k in j.keys():
            if k == 'name':
                continue

            if int(j[k]) != rows_Acc[k]:
                match = False
                break

        if match:
            print(j['name'])
            return

    print('no match')


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
