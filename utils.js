export function get(key) {
  return (obj) => obj[key];
}

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result: url } } = finishedEvent;

      resolve(url);
    };

    reader.readAsDataURL(file);
  });
}

export async function getUploadImages(files) {
  const getReadFile = [].map.call(files, async (file) => {
    const result = await readFile(file);
    return result;
  });

  const uploadImages = await Promise.all(getReadFile);

  return uploadImages;
}

export function getMediaQuery(breakpoints) {
  return breakpoints.reduce((points, point) => ({
    ...points,
    ...{
      [point]: `@media (max-width: ${point}px)`,
    },
  }), {});
}
