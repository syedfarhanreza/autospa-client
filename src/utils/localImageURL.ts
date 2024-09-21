export const local_img_url = (img: File) => {
  return new Promise<string>((resolve, reject) => {
    if (!img || !img.type.startsWith("image/")) {
      reject(new Error("Invalid file type. Please select an image."));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Error reading the file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsDataURL(img);
  });
};
