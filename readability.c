#include <ctype.h>
#include <cs50.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void)
{
    // Prompt the user for some text
    string text = get_string("Text: ");

    // Count the number of letters, words, and sentences in the text
    int letters = count_letters(text);
    int words = count_words(text);
    int sentences = count_sentences(text);

    // Compute the Coleman-Liau index
    float letter  =  (letters / (float) words) *  100;
    float sentence = (sentences / (float) words) * 100;

    float index = 0.0588 * letter - 0.296 * sentence - 15.8;

    // Print the grade level
    if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade 0.%f\n", round(index));
    }

}

int count_letters(string text)
{
    int letter_score = 0;

    // Compute score for each character
    for (int i = 0, mes = strlen(text); i < mes; i++)
    {
        if (isupper(text[i]))
        {
            letter_score++;
        }
        else if (islower(text[i]))
        {
            letter_score++;
        }
    }
    return letter_score;
}

int count_words(string text)
{
    int word_score = 1;

    for (int i = 0, mes = strlen(text);  i < mes; i++)
    {
        if (text[i] == ' ')
        {
            word_score++;
        }
    }
    // Return the number of words in text
    return  word_score;
}

int count_sentences(string text)
{

    int sentence_score  = 0;

    for (int i = 0, mes = strlen(text); i < mes; i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            sentence_score++;
        }
    }
    // Return the number of sentences in text
    return  sentence_score;
}

