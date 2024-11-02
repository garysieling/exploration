import cv2
import os
import glob
# Create the output directory if it doesn't exist
input_dir = 'Scans'  # Folder containing input images
output_dir = 'output'
os.makedirs(output_dir, exist_ok=True)
import re

import cv2
import numpy as np
from sklearn.cluster import KMeans

def lighten_and_make_transparent(image, threshold=200):
    # Check if the image has an alpha channel (4 channels), if not, convert it to BGRA
    if image.shape[2] == 3:  # If the image has 3 channels (BGR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)


    # Check if the image has an alpha channel (4 channels), if not, convert it to BGRA
    if image.shape[2] == 3:  # If the image has 3 channels (BGR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

    # Create a mask for bright areas
    mask = cv2.cvtColor(image, cv2.COLOR_BGRA2GRAY) > threshold

    # Create a new image for the output (RGBA)
    output_image = np.zeros((image.shape[0], image.shape[1], 4), dtype=np.uint8)

    # Copy original image to output where the mask is False
    output_image[~mask] = image[~mask]  # Copy original pixels (including alpha channel)

    # Lighten the bright areas by setting them to white (255, 255, 255, 0)
    output_image[mask] = [255, 255, 255, 0]  # White with full transparency

    # Save the output image
    return output_image

def convert_hues_to_non_overlapping_ranges(dominant_hues):
    # Sort hues to ensure they're in order
    dominant_hues = sorted(dominant_hues)
    
    print("sorted hues")
    print(dominant_hues)
    hue_ranges = {}
    
    for i, hue in enumerate(dominant_hues):
        if i == 0:
            # First hue: range goes from hue up to halfway to the next hue
            next_hue = dominant_hues[i + 1]
            lower_bound = max(0, hue - 10)
            upper_bound = (hue + next_hue) // 2
        elif i == len(dominant_hues) - 1:
            # Last hue: range goes from halfway from the previous hue up to hue
            prev_hue = dominant_hues[i - 1]
            lower_bound = (prev_hue + hue) // 2
            upper_bound = min(180, hue + 10)
        else:
            # Middle hues: range is between halfway from the previous to halfway to the next hue
            prev_hue = dominant_hues[i - 1]
            next_hue = dominant_hues[i + 1]
            lower_bound = (prev_hue + hue) // 2
            upper_bound = (hue + next_hue) // 2

        # Store each range in the dictionary
        hue_ranges[f"color{i+1}"] = ((lower_bound, 50, 50), (upper_bound, 255, 255))

    return hue_ranges


def make_black_transparent(image):
    # Convert image to RGBA if it's not already
    if image.shape[2] == 3:  # RGB
        rgba_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)
    else:
        rgba_image = image  # Already RGBA

    # Create a mask for black areas (you can adjust the threshold as needed)
    # Threshold for black: values close to [0, 0, 0]
    black_mask = cv2.inRange(rgba_image[:, :, :3], (0, 0, 0), (50, 50, 50))

    # Set the alpha channel to 0 (transparent) where the mask is non-zero
    rgba_image[:, :, 3] = np.where(black_mask > 0, 0, 255)  # Set transparency to 0 for black, 255 otherwise

    return rgba_image

def find_dominant_hues(frame, output_path, base_type, frame_number, num_colors=3, saturation_threshold=100):
    # Load image
    hsv_image = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Filter by saturation to keep only highly saturated pixels
    saturated_mask = hsv_image[:, :, 1] > saturation_threshold
    saturated_pixels = hsv_image[saturated_mask]
    
    # Extract only the hue values of saturated pixels
    hues = saturated_pixels[:, 0].reshape(-1, 1)
    
    # Apply k-means clustering to find the most common hues
    kmeans = KMeans(n_clusters=num_colors, random_state=0).fit(hues)
    dominant_hues = kmeans.cluster_centers_.astype(int).flatten()

    hue_ranges = convert_hues_to_non_overlapping_ranges(dominant_hues)

    separation_index = 0
    for color_name, (lower, upper) in hue_ranges.items():
        mask = cv2.inRange(hsv_image, np.array(lower), np.array(upper))
        
        # Create an output image where the color is isolated
        isolated_color = cv2.bitwise_and(hsv_image, hsv_image, mask=mask)

        final_frame = make_black_transparent(isolated_color)
        # Save each color-separated image
        color_output_path = os.path.join(output_path, f"{base_type}_color{separation_index}_{frame_number}.png")
        #print(color_output_path)
        cv2.imwrite(color_output_path, final_frame)

        
        separation_index = separation_index + 1

    #return dominant_hues



def get_real_frame_number(filename):
    # Use regex to extract page and frame numbers from the filename
    match = re.search(r"\w+(\d+)_frame_(\d+)\.png", filename)
    
    if match:
        # Convert page and frame numbers to integers
        page_number = int(match.group(1))
        frame_number = int(match.group(2))
        
        # Calculate the real frame number
        real_frame_number = (page_number - 1) * 12 + frame_number + 1
        return real_frame_number
    else:
        raise ValueError("Filename format is incorrect. Expected format: sketch_page_X_frame_Y.png")


for src in glob.glob(os.path.join(input_dir, '*.png')):
    print("Working on " + src)
    # Get the base name of the file without extension
    base_name = os.path.basename(src).replace('.png', '')

    # Load the image
    image = cv2.imread(src)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # First Pass: Find the largest block surrounded by a thick black line

    # Apply a binary threshold to create a high-contrast image
    _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)

    # Find contours in the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Initialize variables to store the largest contour
    largest_contour = None
    max_area = 0

    # Loop through contours to find the largest one
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > max_area:
            max_area = area
            largest_contour = contour

    # Get the bounding box of the largest contour
    x, y, w, h = cv2.boundingRect(largest_contour)

    # Get the bounding box of the largest contour
    x, y, w, h = cv2.boundingRect(largest_contour)

    # Trim 40 pixels on all sides
    trim_size = 60
    x_trimmed = max(x + trim_size, 0)
    y_trimmed = max(y + trim_size, 0)
    w_trimmed = max(w - 2 * trim_size, 1)  # Ensure width is at least 1
    h_trimmed = max(h - 2 * trim_size, 1)  # Ensure height is at least 1

    # Crop the largest block with trimming
    largest_block = image[y_trimmed:y_trimmed + h_trimmed, x_trimmed:x_trimmed + w_trimmed]

    # Save the cropped largest block (optional)
    cv2.imwrite(os.path.join(output_dir, 'largest_' + src + '.png'), largest_block)

    # Second Pass: Find and save individual frames within the largest block

    # Convert the cropped block to grayscale and threshold it again
    gray_block = cv2.cvtColor(largest_block, cv2.COLOR_BGR2GRAY)
    # Apply histogram equalization
    # Apply CLAHE
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    gray_clahe = clahe.apply(gray_block)
    # Apply histogram equalization
    #gray_equalized = cv2.equalizeHist(gray_block)

    #cv2.imwrite("output/gray.png", gray_block)
    #cv2.imwrite("output/gray_equalized.png", gray_block)
    #cv2.imwrite("output/gray_clahe.png", gray_clahe)

    _, thresh_block = cv2.threshold(gray_clahe, 200, 255, cv2.THRESH_BINARY_INV)

    # Find contours within the largest block
    block_contours, _ = cv2.findContours(thresh_block, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)


    # Sort contours by area in descending order
    sorted_contours = sorted(block_contours, key=cv2.contourArea, reverse=True)[1:13]

    first = True
    x = 0
    y = 0
    w = 0
    h = 0
    frame_count = 0
    for contour in sorted_contours:
        # Filter contours by area if needed
        if cv2.contourArea(contour) > 2000:  # Adjust this value based on frame size
            # Get bounding box of each small contour
            if (first):
                x, y, w, h = cv2.boundingRect(contour)
                
                trim_size = 30
                x = max(x + trim_size, 0)
                y = max(y + trim_size, 0)
                w = max(w - 2 * trim_size, 1)  # Ensure width is at least 1
                h = max(h - 2 * trim_size, 1)  # Ensure height is at least 1

            # Crop each frame from the largest block
            frame = largest_block[y:y+h, x:x+w]
            
            # Save each frame as a separate image file
            base_type = base_name.split("_")[0]

            real_frame_number = get_real_frame_number(f'{base_name}_frame_{frame_count}.png')
                
            if (base_type.startswith("color")):
                find_dominant_hues(frame, output_dir, base_type, real_frame_number)

                #cv2.imwrite(output_path, frame)
            else:
                output_path = os.path.join(output_dir, f'{base_type}_frame_{real_frame_number}.png')

                frame = lighten_and_make_transparent(frame, 200)
                cv2.imwrite(output_path, frame)
            
            frame_count += 1

    print(f"Saved {frame_count} frames to the '{output_dir}' folder.")
