# resize-base64-promise

Functions that resize a Base64 image. Pass a Base64 string of an image, the maximum width, and the maximum height.

| Function | Description |
| ------ | ----------- |
| resizeBase64ForMaxWidth | resizes an image to the maximum width, the aspect ratio of the image is maintained |
| resizeBase64ForMaxHeight | resizes an image to the maximum height, the aspect ratio of the image is maintained |
| resizeBase64ForMaxWidthAndMaxHeight | resizes an image to the maximum width and maximum height, the aspect ratio of the image is not maintained |

Every function takes the parameters listed below.

| Parameter | Description |
| ------ | ----------- |
| base64String | the image to resize as a Base64 string |
| maxWidth | the maxmium width that the image should be resized to |
| maxHeight | the maxmium height that the image should be resized to |

## Restrictions

* The function can only be used in frontend code.
* Since enlarging images is not desirable due to the loss of quality, the functions resizeBase64ForMaxWidth and resizeBase64ForMaxHeight do not support it. Use the function resizeBase64ForMaxWidthAndMaxHeight for free resizing (shrinking and enlarging).

## Installation

```
npm i --save https://github.com/hendrik-scholz/resize-base64-promise/#master
```

## Test

1. Run 'npm test' from the directory where the package.json is located.
2. Open http://localhost:3000/ in your browser.
3. Click on a link in the list of test cases and check the results of that test case.

## Example

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<script type="module">
	import { resizeBase64ForMaxHeight } from '../index.js';
	
	let base64Image_320x240 = 'data:image/jpeg;base64,/9j/4AAQSk...';
	let maxWidth = 2;
	let maxHeight = 120;
	
	resizeBase64ForMaxHeight(base64Image_320x240, maxWidth, maxHeight)
		.then((resizedImage) => {
			document.getElementById('originalImage').src = base64Image_320x240;
			document.getElementById('resizedImage').src = resizedImage;
		})
		.catch(errorMessage => alert(errorMessage));
</script>
</head>
<body>
	<img id="originalImage">

	<img id="resizedImage">
</body>
</html>
```

See test/resizeBase64ImageFrom320x240ToMaxHeight120.html for details.