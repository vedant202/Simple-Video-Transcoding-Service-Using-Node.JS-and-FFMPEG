# video transcoding service
A video transcoding service primarily converts video files from one format or encoding to another. It includes changing codecs, adjusting bitrate, changing resolutions, or modifying frame rates and so on

# HLS or HTTP Live Streaming, is a protocol developed by Apple in 2009 for streaming audio/video over the internet.

It breaks the overall video into small segments (typically 2-10 seconds long), HTTP-based file downloads, each segment containing a short piece of the overall video.

It creates a master playlist (.m3u8 file) and segmented files (.ts files).

Manifest File (m3u8): The segmented files are listed in a playlist or manifest file with a .m3u8 extension. This file provides the front-end with URLs to the media segments and can include multiple playlists for different bitrate. You can consider it as a book's index page where list of chapters are mentioned with their page number and you use this index page to navigate through the list of chapters of the book. The same way we are going to use m3u8 file to navigate through the segments of the video.

Segment Files (.ts or MPEG-2 Transport Stream): The chunks or the video or you can say the segmented video files have the either .ts format or .mp4 format. As told earlier these are typically 2-10 seconds log video segment of the original video.

On front-end we just send the .m3u8 file and the video player uses it to fetch the segments and show the video to the user.

HLS supports adaptive bitrate streaming, which means it can automatically adjust the quality of the video stream in real-time based on the viewer's network conditions. If the network bandwidth decreases, HLS switches to a lower bitrate version of the video to prevent buffering.

HLS uses standard HTTP for delivery, making it widely compatible across devices and platforms. It supports both live streaming and video-on-demand content, and includes features for content encryption and authentication.

HLS supports encryption and digital rights management (DRM) to protect content from unauthorized access and copying.

# FFmpeg 
FFmpeg is a powerful, open-source software suite for handling multimedia data. It is used for recording, converting, and streaming audio and video.

It offers a command-line tool that is used to convert video and audio in different formats. Along with that it is capable of scaling, cropping, and filtering video files.

# Download FFMPEG
## ON Windows
winget install ffmpeg

OR
Download from official site
https://www.gyan.dev/ffmpeg/builds/
