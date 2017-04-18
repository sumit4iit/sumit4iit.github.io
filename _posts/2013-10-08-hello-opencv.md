---
layout: post
title: Hello OpenCV
date: '2013-10-08T16:14:00.001-07:00'
author: Sumit Agrawal
tags: 
modified_time: '2013-10-10T10:17:56.543-07:00'
blogger_id: tag:blogger.com,1999:blog-680750426739773469.post-2247409442868582247
blogger_orig_url: http://codewithgeeks.blogspot.com/2013/10/hello-opencv.html
---

Simple code for reading and displaying image.

{% highlight cpp %}

/*
 * display.cpp
 *
 *  Created on: Oct 9, 2013
 *      Author: sumit4iit
 */
#include<iostream>
#include "cv.h"
#include "highgui.h"
#include <cstring>
using namespace cv;
using namespace std;

int main()
{
 // Path of the image to display.
 string path = "res/download.jpg";

 // Mat is data structure which is used for storing images, rather matrices in opencv.
 // imread function allows us to read actual image from the disk and store it in the Mat format.
 // CV_LOAD_IMAGE_COLOR Flag makes sure that image is read in color format.
 Mat image = imread(path,CV_LOAD_IMAGE_COLOR);

 Mat M(2,2,CV_8UC3, Scalar(0,0,255));
 cout<<"M: "<<endl<<M<<endl;

 // Make sure that image was read properly
 if(!image.data)
 {
  cout<<"fail\n";
  return -1;
 }

 // This function is defined in highgui module of opencv.
 // Allows us to create window of named 'out'.
 // Flag CV_WINDOW_AUTOSIZE assigns attribute size to created window automatically based on the data to display.
 namedWindow("out",CV_WINDOW_AUTOSIZE);

 // Display image in the window named 'out'
 imshow("out",image);

 // Wait for keyboard interrupt.
 waitKey(0);
 return 0;
}

{% endhighlight %}