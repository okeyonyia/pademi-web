import { DEFAULT_IMAGE, APP_TITLE } from "@/constant/index";
import React, { useState, useEffect } from "react";

const ImageError = ({ message }) => {
  const styles = {
    height: "200px",
    width: "100%",
    background: "tomato",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  };
  return <div style={styles}>{message}</div>;
};

const LazyImg = ({
  src = DEFAULT_IMAGE,
  alt = APP_TITLE,
  placeholder,
  title = APP_TITLE,
  rootMargin = "100px",
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || src);
  const [imageRef, setImageRef] = useState();

  const onLoad = () => {
    setImageSrc(src);
  };

  const handleError = (e) => {
    e.target.src = "/LOGO.webp";
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { rootMargin: rootMargin }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for older browsers
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  if (alt === true || !alt) {
    return (
      <ImageError message="alt attribute must contain string value on LazyImg component." />
    );
  }

  if (title === true || !title) {
    return (
      <ImageError message="title attribute must contain string value on LazyImg component." />
    );
  }

  return (
    <img
      ref={setImageRef}
      title={title}
      onError={handleError}
      loading="lazy"
      src={imageSrc}
      onLoad={onLoad}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImg;
