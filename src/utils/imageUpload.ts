export const uploadImg = async (img: File) => {
  const form = new FormData();
  form.append("image", img);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    {
      method: "POST",
      body: form,
    }
  );
  const data = await res.json();
  return data.data;
};
