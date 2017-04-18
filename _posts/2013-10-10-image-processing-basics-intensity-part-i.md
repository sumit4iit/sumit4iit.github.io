---
layout: post
title: 'Image Processing Basics: Intensity'
date: '2013-10-10T12:38:00.001-07:00'
author: Sumit Agrawal
tags: 
modified_time: '2013-10-25T10:08:07.004-07:00'
thumbnail: http://4.bp.blogspot.com/-q4nxgTQ3ak0/UlcMYQ1bjII/AAAAAAAAABY/1yTY0gfz1rM/s72-c/out.png
blogger_id: tag:blogger.com,1999:blog-680750426739773469.post-2455486355399421619
blogger_orig_url: http://codewithgeeks.blogspot.com/2013/10/image-processing-basics-intensity-part-i.html
---

A digital image is nothing but an array of numbers. Every number represents intensity of corresponding pixel. We usually use 8 bits for storing intensity of a pixel i.e. we can store 0 - 255 discrete intensity values.
As we increase number of bits associated with each pixel total number of intensity levels increases and hence quality of the image. So a gray image which has only one type of intensity and has dimension NxM, will have size of 8*NxM bits or NxM bytes. Similarly a color image with 8 bit representation would consume 3*NxM bytes of memory space.
Typical range of N and M is around 1000~2000. As you can see with increase in every bit of the image representation, size of image increases significantly.
In this post we are going to discuss how to access elements of image using iterators.
But before that let's discuss few terms.
* **Iterators** : Iterators are nothing but a way to access data from containers. C++ provides us a way to access elements from structures provided by standard template library like stack, queue and map. We are going to use iterators to access individual pixel of image.
* **typeof** : typeof is a special keyword provided by c++ which returns type of current object.
Let's start with code.
Function *saturate* takes *image*, *increase* and *channel* no as an input.
As an output it generates new image with increased intensity for given channel.

{% highlight cpp %}

// Scan Images and Modify.
#include<iostream>
#include "cv.h"
#include "highgui.h"
#include <cstring>
using namespace cv;
using namespace std;


void saturate(Mat image, int c, int increase)
{
	// No of channels in the current input image.
	int channels = image.channels();

	// if image is gray scale then number of channels is 1.
	if(channels == 1)
	{
		// create iterator for image and initialize it with the first element.
		// First element is returned by begin<uchar>() function.
		// Since we know that image is gray scale and we have assumed that the input
		// image is of 8 bit representation format we pass uchar or unsigned char as a
		// return data type to begin() function.
		// Similarly end() returns location of the last element of the container.
		for(typeof(image.begin<uchar>()) it = image.begin<uchar>(); it!= image.end<uchar>() ; it++)
		{
			// *it is the value pointed by iterator it.
			*it += increase;
		}
	}
	else if(channels == 3) 	// if we have color input
	{
		// Since input is a color image, every pixel represents a vector of size 3.
		// Vec3b is data type which represents Vector of length 3 where each element is uchar
		for(typeof(image.begin<vec3b>())it = image.begin<vec3b>(); it!= image.end<vec3b>(); it++ )
		{
			// c represents channel number.
			(*it)[c]+= increase;
		}
	}
}

int main()
{
	// path of image.
	string path = "res/download.jpg";

	// read color image
	Mat image = imread(path,CV_LOAD_IMAGE_GRAYSCALE);

	if(!image.data)
	{
		cout<<"fail\n";
		return -1;
	}

	// create clone of the image.

	Mat In = image.clone();

	// Function which adds increases intensity of every pixel in image by given value.
	saturate(image,1,40);

	namedWindow("original",CV_WINDOW_AUTOSIZE);
	namedWindow("out",CV_WINDOW_AUTOSIZE);
	imshow("out",image);
	imshow("original",In);
	waitKey(0);
	return 0;
}
{% endhighlight %}


Result:

First one is the original image and the second one is output image. The dark part in output is because of overflow.

[![](https://4.bp.blogspot.com/-q4nxgTQ3ak0/UlcMYQ1bjII/AAAAAAAAABY/1yTY0gfz1rM/s1600/out.png)](http://4.bp.blogspot.com/-q4nxgTQ3ak0/UlcMYQ1bjII/AAAAAAAAABY/1yTY0gfz1rM/s1600/out.png)[![](https://1.bp.blogspot.com/-JohK4DJaK64/UlcMbcwdjpI/AAAAAAAAABg/EEhLBsBh8DE/s1600/original.png)](http://1.bp.blogspot.com/-JohK4DJaK64/UlcMbcwdjpI/AAAAAAAAABg/EEhLBsBh8DE/s1600/original.png)
