const DEFAULT_RATIO = 1;

function validateInput(base64String, maxWidth, maxHeight) {
  const validationResult = {
    isValid: false,
    errorMessage: 'An error occurred.'
  };

  if (!base64String) {
    validationResult.errorMessage = `The input parameter base64String is ${base64String}.`;
  } else if (typeof (base64String) !== 'string') {
    validationResult.errorMessage = 'The input parameter base64String is not of type \'string\'.';
  } else if (!base64String.startsWith('data:image')) {
    validationResult.errorMessage = 'The input parameter base64String does not start with \'data:image\'.';
  } else if (!maxWidth) {
    validationResult.errorMessage = `The input parameter maxWidth is ${maxWidth}.`;
  } else if (typeof (maxWidth) !== 'number') {
    validationResult.errorMessage = 'The input parameter maxWidth is not of type \'number\'.';
  } else if (maxWidth < 2) {
    validationResult.errorMessage = 'The input parameter maxWidth must be at least 2 pixel.';
  } else if (!maxHeight) {
    validationResult.errorMessage = `The input parameter maxHeight is ${maxHeight}.`;
  } else if (typeof (maxHeight) !== 'number') {
    validationResult.errorMessage = 'The input parameter maxHeight is not of type \'number\'.';
  } else if (maxHeight < 2) {
    validationResult.errorMessage = 'The input parameter maxHeight must be at least 2 pixel.';
  } else {
    validationResult.isValid = true;
    validationResult.errorMessage = null;
  }

  return validationResult;
}

function maxWidthRatioFunction(imageWidth, imageHeight, targetWidth, targetHeight) {
  let ratio = DEFAULT_RATIO;

  if (imageWidth > targetWidth) {
    ratio = targetWidth / imageWidth;
  }

  return {
    width: ratio,
    height: ratio
  };
}

function maxHeightRatioFunction(imageWidth, imageHeight, targetWidth, targetHeight) {
  let ratio = DEFAULT_RATIO;

  if (imageHeight > targetHeight) {
    ratio = targetHeight / imageHeight;
  }

  return {
    width: ratio,
    height: ratio
  };
}

function maxWidthMaxHeightRatioFunction(imageWidth, imageHeight, targetWidth, targetHeight) {
  const widthRatio = targetWidth / imageWidth;
  const heightRatio = targetHeight / imageHeight;

  return {
    width: widthRatio,
    height: heightRatio
  };
}

function resizeBase64(base64String, maxWidth, maxHeight, ratioFunction) {
  return new Promise((resolve, reject) => {
    // Create and initialize two canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasCopy = document.createElement('canvas');
    const copyContext = canvasCopy.getContext('2d');

    // Create original image
    const img = new Image();
    img.src = base64String;

    img.onload = function onImageLoad() {
      const ratioResult = ratioFunction(img.width, img.height, maxWidth, maxHeight);
      const widthRatio = ratioResult.width;
      const heightRatio = ratioResult.height;

      // Draw original image in second canvas
      canvasCopy.width = img.width;
      canvasCopy.height = img.height;
      copyContext.drawImage(img, 0, 0);

      // Copy and resize second canvas to first canvas
      canvas.width = img.width * widthRatio;
      canvas.height = img.height * heightRatio;
      ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL());
    };

    img.onerror = function onImageError() {
      reject(new Error('Error while loading image.'));
    };
  });
}

function resizeBase64ForMaxWidth(base64String, maxWidth, maxHeight) {
  const promise = new Promise((resolve, reject) => {
    const validationResult = validateInput(base64String, maxWidth, maxHeight);

    if (validationResult.isValid === true) {
      resolve();
    } else {
      reject(validationResult.errorMessage);
    }
  }).then(() => resizeBase64(base64String, maxWidth, maxHeight, maxWidthRatioFunction));

  return promise;
}

function resizeBase64ForMaxHeight(base64String, maxWidth, maxHeight) {
  const promise = new Promise((resolve, reject) => {
    const validationResult = validateInput(base64String, maxWidth, maxHeight);

    if (validationResult.isValid === true) {
      resolve();
    } else {
      reject(validationResult.errorMessage);
    }
  }).then(() => resizeBase64(base64String, maxWidth, maxHeight, maxHeightRatioFunction));

  return promise;
}

function resizeBase64ForMaxWidthAndMaxHeight(base64String, maxWidth, maxHeight) {
  const promise = new Promise((resolve, reject) => {
    const validationResult = validateInput(base64String, maxWidth, maxHeight);

    if (validationResult.isValid === true) {
      resolve();
    } else {
      reject(validationResult.errorMessage);
    }
  }).then(() => resizeBase64(base64String, maxWidth, maxHeight, maxWidthMaxHeightRatioFunction));

  return promise;
}

export { resizeBase64ForMaxWidth };
export { resizeBase64ForMaxHeight };
export { resizeBase64ForMaxWidthAndMaxHeight };
