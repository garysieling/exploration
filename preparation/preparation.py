import cv2
import os
import glob

# Define the input and output paths
input_folder = 'input'
output_folder = 'output'

# Create subdirectories in the output folder for each preprocessing step
subfolders = ['grayscale', 'blur', 'edges', 'threshold', 'adaptive_threshold', 
              'skeleton', 'contrast', 'denoise', 'contours', 'denoise_a', 'denoise_b', 'denoise_c']
for subfolder in subfolders:
    os.makedirs(os.path.join(output_folder, subfolder), exist_ok=True)

# Get all frame files in the input folder
frame_files = sorted(glob.glob(os.path.join(input_folder, "frame*.png")))

# Process each frame
for frame_file in frame_files:
    print(frame_file)
    # Extract frame name for saving purposes
    frame_name = os.path.basename(frame_file)

    # Read the frame
    frame = cv2.imread(frame_file)

    # Grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY )
    #cv2.imwrite(os.path.join(output_folder, 'grayscale', frame_name), gray_frame)

    # Gaussian Blur
    #blurred_frame = cv2.GaussianBlur(gray_frame, (5, 5), 0)
    #cv2.imwrite(os.path.join(output_folder, 'blur', frame_name), blurred_frame)

    # Edge Detection (Canny)
    #edges = cv2.Canny(blurred_frame, threshold1=50, threshold2=150)
    #cv2.imwrite(os.path.join(output_folder, 'edges', frame_name), edges)

    # Binary Thresholding
    #_, thresh_frame = cv2.threshold(gray_frame, 127, 255, cv2.THRESH_BINARY)
    #cv2.imwrite(os.path.join(output_folder, 'threshold', frame_name), thresh_frame)

    # Adaptive Thresholding
    #adaptive_thresh_frame = cv2.adaptiveThreshold(
    #    gray_frame, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    #cv2.imwrite(os.path.join(output_folder, 'adaptive_threshold', frame_name), adaptive_thresh_frame)

    # Skeletonization
    #skeleton = cv2.ximgproc.thinning(thresh_frame)
    #cv2.imwrite(os.path.join(output_folder, 'skeleton', frame_name), skeleton)

    # Contrast Adjustment (Histogram Equalization)
    equalized_frame = cv2.equalizeHist(gray_frame)
    #cv2.imwrite(os.path.join(output_folder, 'contrast', frame_name), equalized_frame)
    blurred = cv2.GaussianBlur(equalized_frame, (9, 9), 10.0)
    sharpened = cv2.addWeighted(equalized_frame, 1.5, blurred, -0.5, 0)

    # Denoising
    denoised_frame = cv2.fastNlMeansDenoising(sharpened, None, 30, 7, 21)
    file1 = os.path.join(output_folder, 'denoise_c', frame_name)
    print(file1)
    cv2.imwrite(file1, denoised_frame)

    # next add the line drawing layer(s) over top
    # and the "key frame" extraction thing
    #equalized_frame2 = cv2.equalizeHist(cv2.fastNlMeansDenoising(gray_frame, None, 30, 7, 21))
    #file2 = os.path.join(output_folder, 'denoise_b', frame_name)
    #print(file2)
    #cv2.imwrite(os.path.join(output_folder, 'denoise_b', frame_name), denoised_frame)

    # Contour Detection
    #contours, _ = cv2.findContours(thresh_frame, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    #contour_frame = frame.copy()
    #cv2.drawContours(contour_frame, contours, -1, (255, 255, 255), 2)
    #cv2.imwrite(os.path.join(output_folder, 'contours', frame_name), contour_frame)

print("Processing complete. All processed frames saved in the output folder.")
