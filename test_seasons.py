import pytest
from seasons import birth


def main():


   test_invalid_input()
   test_year_month_day()





def test_year_month_day():
   assert birth("1999-01-01") == "thirteen million, nine hundred thirty-nine thousand, two hundred"
   assert birth("2001-01-01") == "twelve million, eight hundred eighty-six thousand, five hundred sixty"
   assert birth("1995-01-01") == "sixteen million, forty-three thousand forty"
   assert birth("2020-06-01") == "two million, six hundred seventy-five thousand, five hundred twenty"
   assert birth("1998-06-20") == "fourteen million, two hundred twenty thousand"


def test_invalid_input():
    with pytest.raises(SystemExit):
        birth("February 6th, 1998")


