#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Points assigned to each letter of the alphabet
int alphabet_score[] = {1, 3, 3, 2,  1, 4, 2, 4, 1, 8, 5, 1, 3,
                        1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

int compute_score(string word);

int main(void)
{
    // Prompt the user for two words
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    // Compute the score of each word
    int player1_score = compute_score(word1);
    int player2_score = compute_score(word2);

    // Print the winner
    if (player1_score > player2_score)
    {
        printf("Player 1 wins!\n");
    }
    else if (player1_score < player2_score)
    {
        printf("Player 2 wins!\n");
    }
    else
    {
        printf("Tie!\n");
    }
}

int compute_score(string word)
{
    // Keep track of score
    int score = 0;

    // Compute score for each character
    for (int i = 0, mes = strlen(word); i < mes; i++)
    {
        if (isupper(word[i]))
        {
            score += alphabet_score[word[i] - 'A'];
        }
        else if (islower(word[i]))
        {
            score += alphabet_score[word[i] - 'a'];
        }
    }

    return score;
}
