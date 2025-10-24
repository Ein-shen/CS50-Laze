#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main(int argc, char *argv[])
{
   // Accept a single command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card
    FILE *card = fopen(argv[1], "r");

    // Create a buffer for a block of data
    uint8_t buffer[512];
    int jpg_found = 1;
    int jpg_count = 0;
    char filename[8];
    FILE *jpg_img = NULL;

    // While there's still data left to read from the memory card
    while (fread(buffer, 1, 512, card) == 512)
    {
        // Create JPEGs from the data
        if (buffer[0] == 0xff &&  buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            jpg_found = 0;
        }
        if (jpg_found == 0)
        {
            if (jpg_count != 0)
            {
                fclose(jpg_img);
            }
            if (jpg_count == 0)
            {
                sprintf(filename, "%03i.jpg", jpg_count);
                jpg_count++;

                jpg_img = fopen(filename, "w");
                fwrite(buffer, 1, 512, jpg_img);

                jpg_found = 1;
            }

        }
        else if(jpg_count != 0)
        {
               fwrite(buffer, 512, 1, jpg_img);

        }

    }
    fclose(jpg_img);
    fclose(card);

    return 0;
}
