#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
        // Loop over all pixels
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                // Take average of red, green, and blue
                int average = (image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3;
                // Update pixel values
                image[i][j].rgbtRed = average;
            }
        }
        return;
}


// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{

        // Loop over all pixels
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                // Compute sepia values

                // Update pixel with sepia values
            }
        }
        return;
    }



// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{

        // Loop over all pixels
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                // Swap pixels
            }
        }
        return;
    }



// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
        // Create a copy of image
        RGBTRIPLE copy[height][width];
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                copy[i][j] = image[i][j];
            }
        }
        return;
    }


