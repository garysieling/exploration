#rm input/*

ffmpeg -i ./video/IMG_5965.MOV \
	  -vf "fps=48" "input/frame%d.png"
