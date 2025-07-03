import pytest
from seasons import birth
import sys

def main():
   test_ValueError()
   test_year_month_day()



# def test_ValueError():
#     with pytest.raises(ValueError):
#       birth(sys.exit("Re-try"))

def test_year_month_day():
   assert birth("1999-01-01") == "Five hundred twenty-five thousand, six hundred minutes"
   assert birth("2001-01-01") == "One million, fifty-one thousand, two hundred minutes"
   assert birth("1995-01-01") == "Two million, six hundred twenty-nine thousand, four hundred forty minutes"
   assert birth("2020-06-01") == "Six million, ninety-two thousand, six hundred forty minutes"
   assert birth("1998-06-20") == "Eight hundred six thousand, four hundred minutes"



