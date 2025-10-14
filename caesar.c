#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char rotate(char c, int n);

int main(int argc, string argv[])
{
    // Make sure program was run with just one command-line argument
    if (argc == 2)
    {
        // Make sure every character in argv[1] is a digit
        for (int i = 0, len = strlen(argv[1]); i < len; i++)
        {
            if (!isdigit(argv[1][i]))
            {
                printf("Usage: ./caesar key\n");
                return 1;
            }
        }

        // Convert argv[1] from string to int
        int change_num = atoi(argv[1]) % 26;

        // Prompt user for plaintext
        string user = get_string("Plaintext: ");

        printf("ciphertext: ");

        for (int j = 0; j < strlen(user); j++)
        {
            char c = rotate(user[j], change_num);
            printf("%c", c);
        }

        printf("\n");
        return 0;
    }

    else
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }
}

char rotate(char c, int n)
{
    if (isupper(c))
    {
        return ((c - 'A' + n) % 26) + 'A';
    }
    else if (islower(c))
    {
        return ((c - 'a' + n) % 26) + 'a';
    }
    else
    {
        return c;
    }
}
