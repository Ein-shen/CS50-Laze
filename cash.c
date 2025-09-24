#include <cs50.h>
#include <stdio.h>

int cal_quarters(int cents);
int cal_nikels(int cents);
int cal_dimes(int cents);
int cal_penies(int cents);


int main(void)
{
    int value, total;
    do
    {
        value = get_int("Change owed: ");
    }
    while (value < 0);


    int q_kowens = cal_quarters(value);
    value = value - (25*q_kowens);

    int n_kowens = cal_nikels(value);
    value = value - (5*n_kowens);

    int d_kowens = cal_dimes(value);
    value = value - (10*d_kowens);

    int p_kowens = cal_penies(value);
    value = value - (1*p_kowens  );

    total = q_kowens + n_kowens + d_kowens + p_kowens + value;

    printf("%i\n", total);



    return 0;
    }

int cal_quarters(int cents)
{
    return cents / 25;
}


int cal_nikels(int cents)
{
    return cents / 5;
}

int cal_dimes(int cents)
{
    return cents / 10;
}

int cal_penies(int cents)
{
    return cents / 1;
}
