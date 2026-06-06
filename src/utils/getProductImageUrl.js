const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const isAbsoluteUrl = (value) => /^(https?:|data:|blob:)/i.test(value);

export const getProductImageUrl = (image, fallback = "https://via.placeholder.com/256?text=No+Image") => {
  const source = Array.isArray(image) ? image[0] : image;

  if (!source) {
    return fallback;
  }

  if (isAbsoluteUrl(source)) {
    return source;
  }

  if (source.startsWith("/images/")) {
    return `${backendUrl}${source}`;
  }

  if (source.startsWith("images/")) {
    return `${backendUrl}/${source}`;
  }

  return `${backendUrl}/images/${source.replace(/^\/+/, "")}`;
};