export function get(key) {
  return (obj) => obj[key];
}

export async function getReadFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result: url } } = finishedEvent;

      resolve(url);
    };

    reader.readAsDataURL(file);
  });
}
