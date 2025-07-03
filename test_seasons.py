import pytest
from seasons import birth
import sys

def main():
   test_ValueError()



def test_ValueError():
    with pytest.raises(ValueError):
      birth("January 9, 2020")



