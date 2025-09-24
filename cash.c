#include <cs50.h>
#include <stdio.h>

int calculate_quarters(int cents);

int main(void)
{
    // Prompt the user for change owed, in cents
    int cents;
    do
    {
        cents = get_int("Change owed: ");
    }
    while (cents < 0);

    // Calculate how many quarters you should give customer
    int quarters = calculate_quarters(cents);
     printf("%i\n", quarters);


    cents = cents - (quarters * 25);
    printf("Remaining cents: %i\n", cents);

    return 0;
    }

int calculate_quarters(int cents)
{
    // Use integer division to get whole quarters
    int quarters = cents / 25;
    return quarters;
}
